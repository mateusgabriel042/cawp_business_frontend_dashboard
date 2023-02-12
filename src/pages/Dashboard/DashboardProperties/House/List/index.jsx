import React, {useState, useEffect } from 'react';
import HeaderMain from '../../HeaderMain/index.jsx';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiPencil, BiTrash, BiShowAlt } from "react-icons/bi";
import Header from '../Header/index.jsx';
import apiService from '../../../../../services/api.js';
import Loading from '../../../../../components/Loading/index.jsx';
import Pagination from '../../../../../components/Pagination/index.jsx';
import { Can } from "react-access-level";
import { useParams } from "react-router-dom";
import { showNotify, verifyError, formatMoney } from '../../../../../services/actionsAppService.jsx';
import './style.css';

const List = () => {
	
	const [endpointRegisters, setEndpointRegisters] = useState([]);
	const system = 'properties';
    const endpoint = 'house';
    const roleEndpoint = 'properties-house';
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
			queryApi = `api/${system}/${endpoint}/search/${column}/${value}?page=${offset}`;
		}else{
			queryApi = `api/${system}/${endpoint}?page=${offset}`;
		}
		
		api.get(queryApi)
		.then(resp => {
			setEndpointRegisters(resp.data.data.endpointItems);
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
		api.delete(`api/${system}/${endpoint}/${id}`)
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

	useEffect(() => {
		list();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [column, value, offset])


	return (

		<>
			<div className="area-crud">
				<HeaderMain />
				
				<div className='section-crud'>
					<Header />
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
												<th>Titulo</th>
												<th>Cidade</th>
												<th>Estado</th>
												<th>Tipo da residencia</th>
												<th>Tipo de pagamento</th>
												<th>Preço</th>
												<th>Ações</th>
											</tr>
										</thead>
										<tbody>
											{endpointRegisters?.map((item) => (
												<tr key={item.id}>
													<td>{item?.title || '-'}</td>
													<td>{item?.city || '-'}</td>
													<td>{item?.state || '-'}</td>
													<td>{item?.type_residence || '-'}</td>
													<td>{item?.type_payment || '-'}</td>
													<td>{formatMoney(item.price, 'pt-BR', 'BRL')}</td>
													<td className="actions-3">
														<Can resource={roleEndpoint} authority={`${roleEndpoint}-view`}>
															<Link to={`/dashboard/${system}/${endpoint}/view/${item.id}`} className="btn bg-green">
																<BiShowAlt size="20" />
															</Link>
														</Can>
														<Can resource={roleEndpoint} authority={`${roleEndpoint}-update`}>
															<Link to={`/dashboard/${system}/${endpoint}/edit/${item.id}`} className="btn bg-yellow">
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
			</div>
		</>
	);
};

export default List;