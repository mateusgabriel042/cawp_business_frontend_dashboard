import React, {useState, useEffect, useContext} from 'react';
import Header from '../Header/index.jsx';
import { Button, Form, Row, Col } from 'react-bootstrap';
import apiService from '../../../../services/api.js';
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Loading from '../../../../components/Loading/index.jsx';
import { MultiSelect } from "react-multi-select-component";
import { Can } from "react-access-level";
import { showNotify, verifyError } from '../../../../services/actionsAppService.jsx';

const RegisterEdit = () => {
	const { id } = useParams();

	const [endpoint, setEndpoint] = useState('user');
	const [roleEndpoint, setRoleEndpoint] = useState('user');
	const api = apiService.get();
	const history = useHistory();
	const [roles, setRoles] = useState([]);
	const [permissions, setPermissions] = useState([]);
	const [selectedPermissions, setSelectedPermissions] = useState([]);
	const [errors, setErrors] = useState('');
	const [loading, setLoading] = useState(false);

	const { register, handleSubmit, setValue, getValues } = useForm();
	
	const onSubmit = data => {
		if(id !== undefined)
			update(data);
		else
			create(data);
	}

	const create = data => {
		setLoading(true);

		data.permissions = [];
		selectedPermissions.forEach(function(item){
			data.permissions.push({
				'id_permission': item.value,
			});
		});

		console.log(data);
		
		api.post(`api/${endpoint}`, data)
		.then(resp => {
			showNotify('success', 'Registro realizado com sucesso!');
			setLoading(false);
			history.push(`/dashboard/${endpoint}/list`);
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

		data.permissions = [];
		selectedPermissions.forEach(function(item){
			data.permissions.push({
				'id_permission': item.value,
			});
		});

		console.log(data);

		api.put(`api/${endpoint}/${id}`, data)
		.then(resp => {
			showNotify('success', 'Registro atualizado com sucesso!');
			setLoading(false);
			history.push(`/dashboard/${endpoint}/list`);
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
		api.get(`api/${endpoint}/${id}`)
		.then(resp => {
			const data = resp.data.data.user;
			setValue("name", data.name);
			setValue("email", data.email);
			setValue("role_id", data.role[0]?.id);
			setValue("user_service_id", data.user_service?.id);

			let permissionsTemp = [];
			data.permissions.forEach(function(item){
				permissionsTemp.push({
					label: item.name,
					value: item.id,
				});
			});
			setSelectedPermissions(permissionsTemp);

			setLoading(false);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setErrors(error.message)
			verifyError(error);
		})
	}



	const initRoles = () => {
		api.get('api/role/all')
		.then(resp => {
			setRoles(resp.data.data.roles);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setErrors(error.message)
			verifyError(error);
		})
	}

	const initPermissions = () => {
		api.get('api/permission/all')
		.then(resp => {
			let permissionsTemp = [];
			resp.data.data.permissions.forEach(function(item){
				permissionsTemp.push({
					label: item.name,
					value: item.id,
				});
			});
			setPermissions(permissionsTemp);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setErrors(error.message);
			verifyError(error);
		})
	}

	useEffect(() => {
		if(id !== undefined){
			initEndpoint();
		}else{
			document.getElementById('form-register').reset();
		}
		initRoles();
		initPermissions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	return (
		<>
			<div className="area-crud">
				<Header></Header>

				<Can 
					resource={roleEndpoint}
					authority={`${roleEndpoint}-create`}
					otherwiseComponent={<label>Sem acesso!</label>}
				>
					<h5 className="mb-3">Formulário</h5>

					{ (loading) ? (<Loading />) : (null)}

					<Form onSubmit={handleSubmit(onSubmit)} className="form-register" id="form-register">
						<Row className="mb-3">
							<Col sm="6">
								<Form.Group>
								    <label htmlFor="name" className="form-label">Nome:<span className="req-span">*</span></label>
								    <input type="text" name="name" className="form-control" id="name" {...register("name")} />
								    <span className="error-message">{errors?.name ? errors.name[0] : null}</span>
								</Form.Group>
							</Col>

							<Col sm="6">
								<Form.Group>
								    <label htmlFor="email" className="form-label">Email:<span className="req-span">*</span></label>
								    <input type="email" name="email" className="form-control" id="email" {...register("email")} />
								    <span className="error-message">{errors?.email ? errors.email[0] : null}</span>
								</Form.Group>
							</Col>
						</Row>

						<Row className="mb-3">
							<Col sm="6">
								<Form.Group>
								    <label htmlFor="role" className="form-label">Função:</label>
								    <select className="form-select" name="role_id" {...register("role_id")} >
								    	<option value="">Selecionar</option>
								    	{roles?.map((role, index) => (
								    		<option value={role.id} key={index}>{role.name}</option>
								    	))}
							        </select>
								    <span className="error-message">{errors?.role_id ? errors.role_id[0] : null}</span>
								</Form.Group>
							</Col>

							<Col sm="6">
								<Form.Group>
								    <label htmlFor="permissions" className="form-label">Permissões:</label>
								    <MultiSelect
								        options={permissions}
								        value={selectedPermissions}
								        onChange={setSelectedPermissions}
								        labelledBy="Selecionar permissões"
								    />
								    <span className="error-message">{errors?.permissions ? errors.permissions[0] : null}</span>
								</Form.Group>
							</Col>
						</Row>

						<Row className="mb-3">
							<Col sm="6">
								<Form.Group>
								    <label htmlFor="password" className="form-label">Senha:<span className="req-span">*</span></label>
								    <input type="password" name="password" className="form-control" id="password" {...register("password")} />
								    <span className="error-message">{errors?.password ? errors.password[0] : null}</span>
								</Form.Group>
							</Col>

							<Col sm="6">
								<Form.Group>
								    <label htmlFor="password_confirmation" className="form-label">Confirmar senha:<span className="req-span">*</span></label>
								    <input type="password" name="password_confirmation" className="form-control" id="password_confirmation" {...register("password_confirmation")} />
								    <span className="error-message">{errors?.password_confirmation ? errors.password_confirmation[0] : null}</span>
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
		</>
	);
};

export default RegisterEdit;