import React, {useState, useEffect, useContext} from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiPencil, BiTrash, BiShowAlt, BiXCircle } from "react-icons/bi";
import HeaderUser from '../Header/index.jsx';
import apiService from '../../../../services/api.js';
import Loading from '../../../../components/Loading/index.jsx';
import Pagination from '../../../../components/Pagination/index.jsx';
import { Can } from "react-access-level";
import { showNotify, verifyError } from '../../../../services/actionsAppService.jsx';

const ListRole = ({ match, location }) => {
	const [roles, setRoles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [offset, setOffset] = useState(1);
	const [qtdPages, setQtdPages] = useState(1);
	const api = apiService.get()

	let valuePrev = localStorage.getItem('searchValuePrev');
	const {
	    params: { column, value }
	} = match;

	const listRoles = () => {
		setLoading(true);
		let queryApi = '';
		if(typeof column !== "undefined" && typeof value !== "undefined"){
			if(valuePrev !== value){
				setOffset(1)
				localStorage.setItem('searchValuePrev', value);
			}
			queryApi = `api/role/search/${column}/${value}?page=${offset}`;
		}else{
			queryApi = `api/role?page=${offset}`;
		}
		
		api.get(queryApi)
		.then(resp => {
			setRoles(resp.data.data.roles);
			setQtdPages(resp.data.data.pagination.pages);
			setLoading(false);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setLoading(false);
			verifyError(error);
		})
	}
	
	function deleteRole(id, e) {
		setLoading(true);
		api.delete(`api/role/${id}`)
		.then(resp => {
			showNotify('success', 'Função deletada com sucesso!');
			listRoles()
			setLoading(false);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setLoading(false);
			verifyError(error);
		})
	}

	function removePermission(idRole, idPermission, e) {
		setLoading(true);
		api.delete(`api/role/remove-permission/${idRole}/${idPermission}`)
		.then(resp => {
			listRoles()
			setLoading(false);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setLoading(false);
			verifyError(error);
		})
	}

	useEffect(() => {
		listRoles()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [column, value, offset])


	return (
		<>
			<div className="area-crud">

				<HeaderUser></HeaderUser>

				<Can 
					resource="acl"
					authority="acl-view"
					otherwiseComponent={<label>Sem acesso!</label>}
				>
					<h5 className="mb-3">Lista de funções</h5>

					{ (loading) ? (<Loading />) : (

						(roles?.length === 0) ? (
		                    <label>Nenhum registro encontrado...</label>
		                ) : (
		                	<div>
			                    <Table striped hover>
									<thead>
										<tr>
											<th>Nome</th>
											<th>Permissões</th>
											<th>Ações</th>
										</tr>
									</thead>
									<tbody>
										{roles?.map((role) => (
											<tr key={role.id}>
												<td>{role.name}</td>
												<td>{role.permissions?.map((permission, index) => (
													<Button key={index} className="button-remove-tag bg-gray">{permission.name} <i onClick={(e) => {if (window.confirm('Você realmente deseja remover esta permissão da função?')) removePermission(role.id, permission.id, e)}}><BiXCircle /></i></Button>
												))}</td>
												<td className="actions-3">
													<Can resource="acl" authority="acl-view">
														<Link to={`/dashboard/access-control/view/${role.id}`} className="btn bg-green">
															<BiShowAlt />
														</Link>
													</Can>
													<Can resource="acl" authority="acl-update">
														<Link to={`/dashboard/access-control/edit/${role.id}`} className="btn bg-yellow">
															<BiPencil />
														</Link>
													</Can>
													<Can resource="acl" authority="acl-delete">
														<Button className="bg-red" onClick={(e) => {if (window.confirm('Você realmente deseja excluir este registro?')) deleteRole(role.id, e)}}>
															<BiTrash />
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

export default ListRole;