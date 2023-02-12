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
    const endpoint = 'house';
    const roleEndpoint = 'properties-house';
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
									<td>Preço</td>
									<td>{formatMoney(endpointSelected.price, 'pt-BR', 'BRL')}</td>
								</tr>
								<tr>
									<td>Preço do IPTU</td>
									<td>{formatMoney(endpointSelected.iptu_price, 'pt-BR', 'BRL')}</td>
								</tr>
								<tr>
									<td>Preço do condomínio</td>
									<td>{formatMoney(endpointSelected.condominium_price, 'pt-BR', 'BRL')}</td>
								</tr>
								<tr>
									<td>Preço do condominio incluso?</td>
									<td>{endpointSelected?.condominium_price_include ? 'Sim' : 'Não'}</td>
								</tr>
								<tr>
									<td>Preço do IPTU do condominio incluso?</td>
									<td>{endpointSelected?.condominium_iptu_include ? 'Sim' : 'Não'}</td>
								</tr>
								<tr>
									<td>Tipo de residencia</td>
									<td>{endpointSelected?.type_residence}</td>
								</tr>
								<tr>
									<td>Tipo de pagamento</td>
									<td>{endpointSelected?.type_payment}</td>
								</tr>
								<tr>
									<td>Divisão máxima de parcelas</td>
									<td>{endpointSelected?.installments_max}</td>
								</tr>
								<tr>
									<td>Link no google maps</td>
									<td>{endpointSelected?.link_google_maps}</td>
								</tr>
								<tr>
									<td>Quantidade de piscinas</td>
									<td>{endpointSelected?.quantity_pool}</td>
								</tr>
								<tr>
									<td>Quantidade de quartos</td>
									<td>{endpointSelected?.quantity_bedroom}</td>
								</tr>
								<tr>
									<td>Quantidade de banheiros</td>
									<td>{endpointSelected?.quantity_bathrooms}</td>
								</tr>
								<tr>
									<td>Quantidade de suites</td>
									<td>{endpointSelected?.quantity_suites}</td>
								</tr>
								<tr>
									<td>Quantidade de garagens</td>
									<td>{endpointSelected?.quantity_garage}</td>
								</tr>
								<tr>
									<td>Tem vista para o mar?</td>
									<td>{endpointSelected?.contain_view_from_sea ? 'Sim' : 'Não'}</td>
								</tr>
								<tr>
									<td>Tem mobilia?</td>
									<td>{endpointSelected?.contain_furnished ? 'Sim' : 'Não'}</td>
								</tr>
								<tr>
									<td>Tem lavanderia?</td>
									<td>{endpointSelected?.contain_laundry ? 'Sim' : 'Não'}</td>
								</tr>
								<tr>
									<td>Tem quintal?</td>
									<td>{endpointSelected?.contain_backyard ? 'Sim' : 'Não'}</td>
								</tr>
								<tr>
									<td>Tem ar-condicionado?</td>
									<td>{endpointSelected?.contain_air_conditioner ? 'Sim' : 'Não'}</td>
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