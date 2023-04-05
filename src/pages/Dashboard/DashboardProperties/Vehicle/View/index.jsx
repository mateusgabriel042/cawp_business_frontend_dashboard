import React, {useState, useEffect, useContext} from 'react';
import Header from '../Header/index.jsx';
import { Table } from 'react-bootstrap';
import apiService from '../../../../../services/api.js';
import Loading from '../../../../../components/Loading/index.jsx';
import { Can } from "react-access-level";
import { verifyError, formatMoney } from '../../../../../services/actionsAppService.jsx';
import { useParams } from "react-router-dom";

const View = () => {
	const api = apiService.get()
	const system = 'properties';
    const endpoint = 'vehicle';
    const roleEndpoint = 'properties-vehicle';
	const [endpointSelected, setEndpointSelected] = useState([]);
	const [loading, setLoading] = useState(false);

	const { id } = useParams();
	
	const view = () => {
		setLoading(true);
	    api.get(`api/${system}/${endpoint}/${id}`)
		.then(resp => {
			setEndpointSelected(resp.data.data.endpointItem);
			setLoading(false);
		})
		.catch(error =>{
			setLoading(false);
			verifyError(error);
		})
	}
	
	useEffect(() => {
		view();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	

	return (
		<>
			<div className="area-crud">
				<Header></Header>

				<Can 
					resource={roleEndpoint}
					authority={`${roleEndpoint}-view`}
					otherwiseComponent={<label>Sem acesso!</label>}
				>
					<h5 className="mb-3">Dados do registro</h5>

					{ (loading) ? (<Loading />) : (
						<Table striped hover>
							<thead>
								<tr>
									<th>Coluna</th>
									<th>Valor</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Id</td>
									<td>{endpointSelected?.id}</td>
								</tr>
								<tr>
									<td>Titulo</td>
									<td>{endpointSelected?.title}</td>
								</tr>
								<tr>
									<td>Rua</td>
									<td>{endpointSelected?.street}</td>
								</tr>
								<tr>
									<td>Nº</td>
									<td>{endpointSelected?.number}</td>
								</tr>
								<tr>
									<td>Bairro</td>
									<td>{endpointSelected?.neighborhood}</td>
								</tr>
								<tr>
									<td>Complemento</td>
									<td>{endpointSelected?.complement}</td>
								</tr>
								<tr>
									<td>CEP</td>
									<td>{endpointSelected?.zipcode}</td>
								</tr>
								<tr>
									<td>Id da cidade</td>
									<td>{endpointSelected?.city_id}</td>
								</tr>
								<tr>
									<td>Cidade</td>
									<td>{endpointSelected?.city}</td>
								</tr>
								<tr>
									<td>Id do estado</td>
									<td>{endpointSelected?.state_id}</td>
								</tr>
								<tr>
									<td>Estado</td>
									<td>{endpointSelected?.state}</td>
								</tr>
								<tr>
									<td>Preço da diária</td>
									<td>{formatMoney(endpointSelected?.daily_price, 'pt-BR', 'BRL')}</td>
								</tr>
								<tr>
									<td>Check-in</td>
									<td>{endpointSelected?.check_in}</td>
								</tr>
								<tr>
									<td>Check-out</td>
									<td>{endpointSelected?.check_out}</td>
								</tr>
								<tr>
									<td>Divisão máxima de parcelas</td>
									<td>{endpointSelected?.installments_max}</td>
								</tr>
								<tr>
									<td>Marca</td>
									<td>{endpointSelected?.brand}</td>
								</tr>
								<tr>
									<td>Ano</td>
									<td>{endpointSelected?.year_veicle}</td>
								</tr>
								<tr>
									<td>Tipo de veículo</td>
									<td>{endpointSelected?.type_veicle}</td>
								</tr>
								<tr>
									<td>Link no google maps</td>
									<td>{endpointSelected?.link_google_maps}</td>
								</tr>
								<tr>
									<td>Número do telefone</td>
									<td>{endpointSelected?.phone_number}</td>
								</tr>
								<tr>
									<td>Número do celular</td>
									<td>{endpointSelected?.cellphone_number}</td>
								</tr>
								<tr>
									<td>Facebook</td>
									<td>{endpointSelected?.facebook}</td>
								</tr>
								<tr>
									<td>Instagram</td>
									<td>{endpointSelected?.instagram}</td>
								</tr>
								<tr>
									<td>Descrição</td>
									<td>{endpointSelected?.description}</td>
								</tr>

								
							</tbody>
						</Table>
					)}
				</Can>
				
			</div>
		</>
	);
};

export default View;