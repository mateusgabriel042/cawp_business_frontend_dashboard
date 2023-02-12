import React, {useState, useEffect, useContext} from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { BiPencil, BiTrash, BiShowAlt, BiXCircle} from "react-icons/bi";
import Header from '../Header/index.jsx';
import apiService from '../../../../services/api.js';
import Loading from '../../../../components/Loading/index.jsx';
import Pagination from '../../../../components/Pagination/index.jsx';
import { Can } from "react-access-level";
import { showNotify, verifyError } from '../../../../services/actionsAppService.jsx';

const List = () => {
	const [endpointRegisters, setEndpointRegisters] = useState([]);
	const [endpoint, setEndpoint] = useState('user');
	const [roleEndpoint, setRoleEndpoint] = useState('user');
	const [loading, setLoading] = useState(false);
	const [offset, setOffset] = useState(1);
	const [qtdPages, setQtdPages] = useState(1);
	const api = apiService.get();
	let valuePrev = localStorage.getItem('searchValuePrev');

	const { column, value } = useParams();

	const list = () => {
		setLoading(true);
		let queryApi = '';
		if(typeof column !== "undefined" && typeof value !== "undefined"){
			if(valuePrev !== value){
				setOffset(1)
				localStorage.setItem('searchValuePrev', value);
			}
			queryApi = `api/${endpoint}/search/${column}/${value}?page=${offset}`;
		}else{
			queryApi = `api/${endpoint}?page=${offset}`;
		}
		
		api.get(queryApi)
		.then(resp => {
			setEndpointRegisters(resp.data.data.users);
			setQtdPages(resp.data.data.pagination.pages);
			setLoading(false);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setLoading(false);
			verifyError(error);
		})
	}
	
	const deleteEndpoint = (id, e) => {
		setLoading(true);
		api.delete(`api/${endpoint}/${id}`)
		.then(resp => {
			showNotify('success', 'O registro foi deletado com sucesso!');
			list();
			setLoading(false);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setLoading(false);
			verifyError(error);
		})
	}

	const removeRole = (idUser, idRole, e) => {
		setLoading(true);
		api.delete(`api/${endpoint}/remove-role/${idUser}/${idRole}`)
		.then(resp => {
			showNotify('success', 'Função removida com sucesso!');
			list();
			setLoading(false);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setLoading(false);
			verifyError(error);
		})
	}

	const removePermission = (idUser, idPermission, e) => {
		setLoading(true);
		api.delete(`api/${endpoint}/remove-permission/${idUser}/${idPermission}`)
		.then(resp => {
			showNotify('success', 'Permissão removida com sucesso!');
			list();
			setLoading(false);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setLoading(false);
			verifyError(error);
		})
	}

	useEffect(() => {
		list();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [column, value, offset])


	return (
		<>
			<div className="area-crud">

				<Header></Header>

				<Can 
					resource={roleEndpoint}
					authority={`${roleEndpoint}-view`}
					otherwiseComponent={<label>Sem acesso!</label>}
				>
					<h5 className="mb-3">Todos os registros</h5>

					{ (loading) ? (<Loading />) : (

						(endpointRegisters?.length === 0) ? (
		                    <label>Nenhum registro encontrado...</label>
		                ) : (
		                	<div>
			                    <Table striped hover>
									<thead>
										<tr>
											<th>Nome</th>
											<th>Email</th>
											<th>Função</th>
											<th>Permissões</th>
											<th>Ações</th>
										</tr>
									</thead>
									<tbody>
										{endpointRegisters?.map((item) => (
											<tr key={item.id}>
												<td>{item.name}</td>
												<td>{item.email}</td>
												<td>
													{item.role.length > 0 ?
														(<Button className="button-remove-tag bg-gray">
															{item.role[0]?.name} <i onClick={(e) => {if (window.confirm('Você realmente deseja remover esta função do usuário?')) removeRole(item.id, item.role[0].id, e)}}><BiXCircle /></i>
														</Button>) : <label>-</label>
													}
												</td>
												<td>
													{item.permissions?.map((permission) => (
														<Button className="button-remove-tag bg-gray">{permission.name} <i onClick={(e) => {if (window.confirm('Você realmente deseja remover esta permissão do usuário?')) removePermission(item.id, permission.id, e)}}><BiXCircle /></i></Button>
													))}
												</td>
												<td className="actions-3">
													<Can resource={roleEndpoint} authority={`${roleEndpoint}-view`}>
														<Link to={`/dashboard/${roleEndpoint}/view/${item.id}`} className="btn bg-green">
															<BiShowAlt size="20" />
														</Link>
													</Can>
													<Can resource={roleEndpoint} authority={`${roleEndpoint}-update`}>
														<Link to={`/dashboard/${roleEndpoint}/edit/${item.id}`} className="btn bg-yellow">
															<BiPencil size="20" />
														</Link>
													</Can>
													<Can resource={roleEndpoint} authority={`${roleEndpoint}-delete`}>
														<Button className="bg-red" onClick={(e) => {if (window.confirm('Você realmente deseja excluir este registro?')) deleteEndpoint(item.id, e)}}>
															<BiTrash size="20" />
														</Button>
													</Can>
												</td>
											</tr>
										))}
									</tbody>
								</Table>
								<Pagination
									qtdPages={qtdPages}
									offset={offset}
									setOffset={setOffset}
								/>

							</div>
		                )
		            )}
	            </Can>
	            
			</div>
		</>
	);
};

export default List;