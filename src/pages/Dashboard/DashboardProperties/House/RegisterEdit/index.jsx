import React, {useState, useEffect, useContext} from 'react';
import HeaderMain from '../../HeaderMain/index.jsx';
import Header from '../Header/index.jsx';
import { Button, Form, Row, Col } from 'react-bootstrap';
import apiService from '../../../../../services/api.js';
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import apiLocations from '../../../../../services/apiLocations.js';
import Loading from '../../../../../components/Loading/index.jsx';
import { Can } from "react-access-level";
import { showNotify, verifyError } from '../../../../../services/actionsAppService.jsx';
import './style.css';
import { NumericFormat } from 'react-number-format';
import InputMask from "react-input-mask";

const RegisterEdit = () => {
	const { id } = useParams();

	const system = 'properties';
    const endpoint = 'house';
    const roleEndpoint = 'properties-house';
	const api = apiService.get();
	const history = useHistory();
	const [errors, setErrors] = useState('');
	const [loading, setLoading] = useState(false);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);

	const { register, handleSubmit, setValue, getValues } = useForm();
	
	const onSubmit = data => {
		if(id !== undefined)
			update(data);
		else
			create(data);
	}

	const create = data => {
		setLoading(true);
		
		api.post(`api/${system}/${endpoint}`, data)
		.then(resp => {
			showNotify('success', 'Registro realizado com sucesso!');
			setLoading(false);
			history.push(`/dashboard/${system}/${endpoint}/list`);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setErrors(error?.response?.data?.data?.errors)
			setLoading(false);
			verifyError(error);
		})
	}

	const update = data => {
		setLoading(true);

		api.put(`api/${system}/${endpoint}/${id}`, data)
		.then(resp => {
			showNotify('success', 'Registro atualizado com sucesso!');
			setLoading(false);
			history.push(`/dashboard/${system}/${endpoint}/list`);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setErrors(error?.response?.data?.data?.errors);
			setLoading(false);
			verifyError(error);
		})
	}

	const initEndpoint = () => {
		setLoading(true);
		api.get(`api/${system}/${endpoint}/${id}`)
		.then(resp => {
			const data = resp.data.data.endpointItem;
			setValue("title", data?.title);
			setValue("type_residence", data?.type_residence);
			setValue("type_payment", data?.type_payment);
			setValue("zipcode", data?.zipcode || '');
			setValue("city_id", data?.city_id);
			setValue("city", data?.city);
			setValue("state_id", data?.state_id);
			setValue("state", data?.state);
			setValue("street", data?.street);
			setValue("number", data?.number);
			setValue("neighborhood", data?.neighborhood);
			setValue("complement", data?.complement);			
			setValue("price", data?.price);
			setValue("iptu_price", data?.iptu_price);
			setValue("condominium_price", data?.condominium_price);
			setValue("condominium_price_include", data?.condominium_price_include);
			setValue("condominium_iptu_include", data?.condominium_iptu_include);
			setValue("link_google_maps", data?.link_google_maps);
			setValue("installments_max", data?.installments_max);
			setValue("quantity_pool", data?.quantity_pool);
			setValue("quantity_bedroom", data?.quantity_bedroom);
			setValue("quantity_bathrooms", data?.quantity_bathrooms);
			setValue("quantity_suites", data?.quantity_suites);
			setValue("quantity_garage", data?.quantity_garage);
			setValue("contain_view_from_sea", data?.contain_view_from_sea);
			setValue("contain_furnished", data?.contain_furnished);
			setValue("contain_laundry", data?.contain_laundry);
			setValue("contain_backyard", data?.contain_backyard);
			setValue("contain_air_conditioner", data?.contain_air_conditioner);
			setValue("phone_number", data?.phone_number || '');
			setValue("cellphone_number", data?.cellphone_number || '');
			setValue("facebook", data?.facebook);
			setValue("instagram", data?.instagram);
			setValue("description", data?.description);

			setLoading(false);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setErrors(error.message)
			verifyError(error);
		})
	}

	const onChangeState = (ev) => {
		const { value } = ev.target;
		
		apiLocations.get(`estados/${value}/municipios`)
		.then((res) => {
			setCities(res.data);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			console.log(error);
		})
	}

	const initStates = () => {
	    apiLocations.get('estados')
		.then((res) => {
			setStates(res.data);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			console.log(error);
		})
	}

	const initCities = (idState) => {
		apiLocations.get(`estados/${idState}/municipios`)
		.then((res) => {
			setCities(res.data)
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			console.log(error);
		})
	}

	useEffect(() => {
		initStates()
		if(id !== undefined){
			initEndpoint();
		}else{
			document.getElementById('form-register').reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	return (

		<>
			<div className="area-crud">
				<HeaderMain />

				<div className='section-crud'>
					<Header />
					<Can 
						resource={roleEndpoint}
						authority={`${roleEndpoint}-create`}
						otherwiseComponent={<label>Sem acesso!</label>}
					>
						<h5 className="mb-3">Formulário</h5>

						{ (loading) ? (<Loading />) : (null)}

						<Form onSubmit={handleSubmit(onSubmit)} className="form-register" id="form-register">
							<Row className="mb-3">
								<Col sm="4">
									<Form.Group>
										<label htmlFor="title" className="form-label">Titulo:<span className="req-span">*</span></label>
										<input type="text" name="title" className="form-control" id="title" {...register("title")} />
										<span className="error-message">{errors?.title ? errors.title[0] : null}</span>
									</Form.Group>
								</Col>

								<Col sm="4">
									<Form.Group>
										<label htmlFor="type_residence" className="form-label">Tipo da casa:</label>
										<select className="form-select" id="type_residence" name="type_residence" {...register("type_residence")}>
											<option value="">Selecionar</option>
											<option value="casa">Casa</option>
											<option value="condominio">Condomínio</option>
											<option value="vila">Vila</option>
											<option value="chacara">Chacara</option>
											<option value="quarto">Quarto</option>
											<option value="kitnet">Kitnet</option>
										</select>
										<span className="error-message">{errors?.type_residence ? errors.type_residence[0] : null}</span>
									</Form.Group>
								</Col>

								<Col sm="4">
									<Form.Group>
										<label htmlFor="type_payment" className="form-label">Tipo de pagamento:</label>
										<select className="form-select" id="type_payment" name="type_payment" {...register("type_payment")}>
											<option value="">Selecionar</option>
											<option value="aluguel">Aluguel</option>
											<option value="venda">Venda</option>
										</select>
										<span className="error-message">{errors?.type_payment ? errors.type_payment[0] : null}</span>
									</Form.Group>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm="3">
									<Form.Group>
										<label htmlFor="zipcode" className="form-label">CEP:</label>
										<InputMask mask="99999-999" name="zipcode" className="form-control" id="zipcode" {...register("zipcode")} />
										<span className="error-message">{errors?.zipcode ? errors.zipcode[0] : null}</span>
									</Form.Group>
								</Col>
								<Col sm="4">
									<Form.Group>
										<label htmlFor="state" className="form-label">Estado:</label>
										<select className="form-select" name="state_id" {...register("state_id")} onChange={(ev) => onChangeState(ev)} >
											<option value="">Selecionar</option>
											{states?.map((state, index) => (
												<option value={state.id} key={index}>{state.sigla}</option>
											))}
										</select>
										<span className="error-message">{errors?.state_id ? errors.state_id[0] : null}</span>
									</Form.Group>
								</Col>
								<Col sm="5">
									<Form.Group>
										<label htmlFor="city" className="form-label">Cidade:</label>
										<select className="form-select" name="city_id" {...register("city_id")} >
											<option value="">Selecionar</option>
											{cities?.map((city, index) => (
												<option value={city.id} key={index}>{city.nome}</option>
											))}
										</select>
										<span className="error-message">{errors?.city_id ? errors.city_id[0] : null}</span>
									</Form.Group>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm="5">
									<Form.Group>
										<label htmlFor="street" className="form-label">Endereço:</label>
										<input type="text" name="street" className="form-control" id="street" {...register("street")} />
										<span className="error-message">{errors?.street ? errors.street[0] : null}</span>
									</Form.Group>
								</Col>
								<Col sm="5">
									<Form.Group>
										<label htmlFor="neighborhood" className="form-label">Bairro:</label>
										<input type="text" name="neighborhood" className="form-control" id="neighborhood" {...register("neighborhood")} />
										<span className="error-message">{errors?.neighborhood ? errors.neighborhood[0] : null}</span>
									</Form.Group>
								</Col>
								<Col sm="2">
									<Form.Group>
										<label htmlFor="number" className="form-label">Nº:</label>
										<input type="text" name="number" maxlength="6" className="form-control" id="number" {...register("number")} />
										<span className="error-message">{errors?.number ? errors.number[0] : null}</span>
									</Form.Group>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm="12">
									<Form.Group>
										<label htmlFor="complement" className="form-label">Complemento:</label>
										<input type="text" name="complement" className="form-control" id="complement" {...register("complement")} />
										<span className="error-message">{errors?.complement ? errors.complement[0] : null}</span>
									</Form.Group>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm="3">
									<label htmlFor="price" className="form-label">Preço:<span className="req-span">*</span></label>
									<div class="input-group">
										<span class="input-group-text">R$</span>
										<NumericFormat
											value={getValues('price')}
											name="price"
											id="price"
											className="form-control"
											decimalScale={2}
											decimalSeparator=","
											fixedDecimalScale
											thousandSeparator="."
											onChange={(e) => setValue("price", e.target.value)}
										/>
									</div>
									<span className="error-message">{errors?.price ? errors.price[0] : null}</span>
								</Col>

								<Col sm="3">
									<label htmlFor="iptu_price" className="form-label">Preço do IPTU:<span className="req-span">*</span></label>
									<div class="input-group">
										<span class="input-group-text">R$</span>
										<NumericFormat
											value={getValues('iptu_price')}
											name="iptu_price"
											id="iptu_price"
											className="form-control"
											decimalScale={2}
											decimalSeparator=","
											fixedDecimalScale
											thousandSeparator="."
											onChange={(e) => setValue("iptu_price", e.target.value)}
										/>
									</div>
									<span className="error-message">{errors?.iptu_price ? errors.iptu_price[0] : null}</span>
								</Col>

								<Col sm="3">
									<label htmlFor="condominium_price" className="form-label">Preço do condomínio:<span className="req-span">*</span></label>
									<div class="input-group">
										<span class="input-group-text">R$</span>
										<NumericFormat
											value={getValues('condominium_price')}
											name="condominium_price"
											id="condominium_price"
											className="form-control"
											decimalScale={2}
											decimalSeparator=","
											fixedDecimalScale
											thousandSeparator="."
											onChange={(e) => setValue("condominium_price", e.target.value)}
										/>
									</div>
									<span className="error-message">{errors?.condominium_price ? errors.condominium_price[0] : null}</span>
								</Col>

								<Col sm="3">
									<Form.Group>
										<label htmlFor="condominium_price_include" className="form-label">Taxa de condomínio incluso:</label>
										<select className="form-select" id="condominium_price_include" name="condominium_price_include" {...register("condominium_price_include")}>
											<option value="">Selecionar</option>
											<option value="1">Sim</option>
											<option value="0">Não</option>
										</select>
										<span className="error-message">{errors?.condominium_price_include ? errors.condominium_price_include[0] : null}</span>
									</Form.Group>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm="3">
									<Form.Group>
										<label htmlFor="condominium_iptu_include" className="form-label">IPTU Incluso:</label>
										<select className="form-select" id="condominium_iptu_include" name="condominium_iptu_include" {...register("condominium_iptu_include")}>
											<option value="">Selecionar</option>
											<option value="1">Sim</option>
											<option value="0">Não</option>
										</select>
										<span className="error-message">{errors?.condominium_iptu_include ? errors.condominium_iptu_include[0] : null}</span>
									</Form.Group>
								</Col>

								<Col sm="9">
									<Form.Group>
										<label htmlFor="link_google_maps" className="form-label">Link no google maps:<span className="req-span">*</span></label>
										<input type="text" name="link_google_maps" className="form-control" id="link_google_maps" {...register("link_google_maps")} />
										<span className="error-message">{errors?.link_google_maps ? errors.link_google_maps[0] : null}</span>
									</Form.Group>
								</Col>
								
							</Row>

							<Row className="mb-3">
								<Col sm="3">
									<Form.Group>
										<label htmlFor="installments_max" className="form-label">Quantidade máxima de parcelas:<span className="req-span">*</span></label>
										<NumericFormat displayType="input" name="installments_max" className="form-control" id="installments_max" onChange={(e) => setValue("installments_max", e.target.value)} />
										<span className="error-message">{errors?.installments_max ? errors.installments_max[0] : null}</span>
									</Form.Group>
								</Col>

								<Col sm="3">
									<Form.Group>
										<label htmlFor="quantity_pool" className="form-label">Quantidade de piscinas:<span className="req-span">*</span></label>
										<NumericFormat displayType="input" name="quantity_pool" className="form-control" id="quantity_pool" onChange={(e) => setValue("quantity_pool", e.target.value)} />
										<span className="error-message">{errors?.quantity_pool ? errors.quantity_pool[0] : null}</span>
									</Form.Group>
								</Col>

								<Col sm="3">
									<Form.Group>
										<label htmlFor="quantity_bedroom" className="form-label">Quantidade de quartos:<span className="req-span">*</span></label>
										<NumericFormat displayType="input" name="quantity_bedroom" className="form-control" id="quantity_bedroom" onChange={(e) => setValue("quantity_bedroom", e.target.value)} />
										<span className="error-message">{errors?.quantity_bedroom ? errors.quantity_bedroom[0] : null}</span>
									</Form.Group>
								</Col>

								<Col sm="3">
									<Form.Group>
										<label htmlFor="quantity_bathrooms" className="form-label">Quantidade de banheiros:<span className="req-span">*</span></label>
										<NumericFormat displayType="input" name="quantity_bathrooms" className="form-control" id="quantity_bathrooms" onChange={(e) => setValue("quantity_bathrooms", e.target.value)} />
										<span className="error-message">{errors?.quantity_bathrooms ? errors.quantity_bathrooms[0] : null}</span>
									</Form.Group>
								</Col>
							</Row>
							
							<Row className="mb-3">
								<Col sm="3">
									<Form.Group>
										<label htmlFor="quantity_suites" className="form-label">Quantidade de suítes:<span className="req-span">*</span></label>
										<NumericFormat displayType="input" name="quantity_suites" className="form-control" id="quantity_suites" onChange={(e) => setValue("quantity_suites", e.target.value)} />
										<span className="error-message">{errors?.quantity_suites ? errors.quantity_suites[0] : null}</span>
									</Form.Group>
								</Col>

								<Col sm="3">
									<Form.Group>
										<label htmlFor="quantity_garage" className="form-label">Quantidade de garagens:<span className="req-span">*</span></label>
										<NumericFormat displayType="input" name="quantity_garage" className="form-control" id="quantity_garage" onChange={(e) => setValue("quantity_garage", e.target.value)} />
										<span className="error-message">{errors?.quantity_garage ? errors.quantity_garage[0] : null}</span>
									</Form.Group>
								</Col>

								<Col sm="3">
									<Form.Group>
										<label htmlFor="contain_view_from_sea" className="form-label">Tem vista pro mar:</label>
										<select className="form-select" id="contain_view_from_sea" name="contain_view_from_sea" {...register("contain_view_from_sea")}>
											<option value="">Selecionar</option>
											<option value="1">Sim</option>
											<option value="0">Não</option>
										</select>
										<span className="error-message">{errors?.contain_view_from_sea ? errors.contain_view_from_sea[0] : null}</span>
									</Form.Group>
								</Col>

								<Col sm="3">
									<Form.Group>
										<label htmlFor="contain_furnished" className="form-label">Tem mobília:</label>
										<select className="form-select" id="contain_furnished" name="contain_furnished" {...register("contain_furnished")}>
											<option value="">Selecionar</option>
											<option value="1">Sim</option>
											<option value="0">Não</option>
										</select>
										<span className="error-message">{errors?.contain_furnished ? errors.contain_furnished[0] : null}</span>
									</Form.Group>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm="3">
									<Form.Group>
										<label htmlFor="contain_laundry" className="form-label">Tem lavanderia:</label>
										<select className="form-select" id="contain_laundry" name="contain_laundry" {...register("contain_laundry")}>
											<option value="">Selecionar</option>
											<option value="1">Sim</option>
											<option value="0">Não</option>
										</select>
										<span className="error-message">{errors?.contain_laundry ? errors.contain_laundry[0] : null}</span>
									</Form.Group>
								</Col>

								<Col sm="3">
									<Form.Group>
										<label htmlFor="contain_backyard" className="form-label">Tem quintal:</label>
										<select className="form-select" id="contain_backyard" name="contain_backyard" {...register("contain_backyard")}>
											<option value="">Selecionar</option>
											<option value="1">Sim</option>
											<option value="0">Não</option>
										</select>
										<span className="error-message">{errors?.contain_backyard ? errors.contain_backyard[0] : null}</span>
									</Form.Group>
								</Col>

								<Col sm="3">
									<Form.Group>
										<label htmlFor="contain_air_conditioner" className="form-label">Tem ar-condicionado:</label>
										<select className="form-select" id="contain_air_conditioner" name="contain_air_conditioner" {...register("contain_air_conditioner")}>
											<option value="">Selecionar</option>
											<option value="1">Sim</option>
											<option value="0">Não</option>
										</select>
										<span className="error-message">{errors?.contain_air_conditioner ? errors.contain_air_conditioner[0] : null}</span>
									</Form.Group>
								</Col>

								<Col sm="3">
									<Form.Group>
										<label htmlFor="phone_number" className="form-label">Telefone fixo:</label>
										<InputMask mask="(99) 9999-9999" placeholder='(xx) xxxx-xxxx' name="phone_number" className="form-control" id="phone_number" {...register("phone_number")} />
										<span className="error-message">{errors?.phone_number ? errors.phone_number[0] : null}</span>
									</Form.Group>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm="4">
									<Form.Group>
										<label htmlFor="cellphone_number" className="form-label">Telefone móvel:</label>
										<InputMask mask="(99) 99999-9999" placeholder='(xx) xxxxx-xxxx' name="cellphone_number" className="form-control" id="cellphone_number" {...register("cellphone_number")} />
										<span className="error-message">{errors?.cellphone_number ? errors.cellphone_number[0] : null}</span>
									</Form.Group>
								</Col>

								<Col sm="4">
									<Form.Group>
										<label htmlFor="facebook" className="form-label">Facebook:<span className="req-span">*</span></label>
										<input type="text" name="facebook" className="form-control" id="facebook" {...register("facebook")} />
										<span className="error-message">{errors?.facebook ? errors.facebook[0] : null}</span>
									</Form.Group>
								</Col>

								<Col sm="4">
									<Form.Group>
										<label htmlFor="instagram" className="form-label">Instagram:<span className="req-span">*</span></label>
										<input type="text" name="instagram" className="form-control" id="instagram" {...register("instagram")} />
										<span className="error-message">{errors?.instagram ? errors.instagram[0] : null}</span>
									</Form.Group>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm="12">
									<Form.Group>
										<label htmlFor="description" className="form-label">Descrição:</label>
										<textarea name="description" className="form-control" id="description" rows="7" {...register("description")}></textarea>
										<span className="error-message">{errors?.description ? errors.description[0] : null}</span>
									</Form.Group>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col>
									<Button type="submit" className="btn">{id !== undefined ? 'Salvar' : 'Cadastrar'}</Button>
								</Col>
							</Row>

							
						</Form>
					</Can>
				</div>
			</div>
		</>
	);
};

export default RegisterEdit;