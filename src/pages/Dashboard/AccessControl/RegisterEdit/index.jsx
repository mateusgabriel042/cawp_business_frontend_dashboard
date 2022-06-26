import React, {useState, useEffect, useContext} from 'react';
import HeaderRole from '../Header/index.jsx';
import { Button, Form, Row, Col } from 'react-bootstrap';
import apiService from '../../../../services/api.js';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Loading from '../../../../components/Loading/index.jsx';
import PanelPermissions from '../../../../components/PanelPermissions/index.jsx';
import { Can } from "react-access-level";
import { showNotify, verifyError } from '../../../../services/actionsAppService.jsx';

const RegisterEditRole = ({ match, location }) => {
	const {
	    params: { id }
	} = match;

	const api = apiService.get();
	const history = useHistory();
	const [errors, setErrors] = useState('');
	const [loading, setLoading] = useState(false);
	const [allPermissions, setAllPermissions] = useState([]);
	const [permissions, setPermissions] = useState([]);
	const { register, handleSubmit, setValue, getValues } = useForm();

	const initAllPermissions = () => {
		api.get('api/permission/all')
		.then(resp => {
			setAllPermissions(resp.data.data.permissions);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setErrors(error?.response?.data?.data?.errors)
			verifyError(error);
		});
	}

	const initRole = () => {
		setLoading(true);
		api.get(`api/role/${id}`)
		.then(resp => {
			const data = resp.data.data.role;
			setValue("name", data.name);
			setValue("slug", data.slug);

			let permissionsTemp = [];
			data.permissions.forEach(function(item){
				permissionsTemp.push(item.name);
            })
            setPermissions(permissionsTemp);
            setValue("permissions", permissionsTemp)
			setLoading(false);
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setErrors(error.message)
			verifyError(error);
		})
	}

	const onSubmit = data => {
		if(id !== undefined)
			update(data);
		else
			create(data);
	}

	const create = data => {
		setLoading(true);
		data.permissions = [];
		permissions.forEach(function(item){
			data.permissions.push({
				'name': item,
				'slug': item.replace(/\s/g , "-"),
			});
		})
		api.post('api/role', data)
		.then(resp => {
			showNotify('success', 'Função registrada com sucesso!');
			setLoading(false);
			history.push('/dashboard/access-control/list');
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setErrors(error?.response?.data?.data?.errors)
			setLoading(false);
			verifyError(error);
		});
	}

	const update = data => {
		setLoading(true);

		data.permissions = [];
		permissions.forEach(function(item){
			data.permissions.push({
				'name': item,
				'slug': item.replace(/\s/g , "-"),
			});
		});

		console.log(data);

		api.put(`api/role/${id}`, data)
		.then(resp => {
			showNotify('success', 'Função atualizada com sucesso!');
			setLoading(false);
			history.push('/dashboard/access-control/list');
		})
		.catch(error =>{
			showNotify('error', 'Ops, ocorreu algum erro!');
			setErrors(error?.response?.data?.data?.errors)
			setLoading(false);
			verifyError(error);
		})
	}

	const selectedPermissions = permissions => {
		setPermissions(permissions);
	};

	useEffect(() => {
		initAllPermissions();
		if(id !== undefined){
			setValue("permissions", permissions)
			if(getValues("permissions")?.length === 0){
				initRole();
			}
		}else{
			document.getElementById('form-register').reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<>
			<div className="area-crud">
				<HeaderRole></HeaderRole>

				<Can 
					resource="acl"
					authority="acl-create"
					otherwiseComponent={<label>Sem acesso!</label>}
				>
					<h5 className="mb-3">Formulário de registro</h5>

					{ (loading) ? (<Loading />) : (null) }

					<Form onSubmit={handleSubmit(onSubmit)} className="form-register" id="form-register">
						<Row className="mb-3">
							<Col sm="6">
								<Form.Group>
								    <label htmlFor="name" className="form-label">Função:</label>
								    <input type="text" name="name" className="form-control" id="name" {...register("name")} />
								    <span className="error-message">{errors?.name ? errors.name[0] : null}</span>
								</Form.Group>
							</Col>

							<Col sm="6">
								<Form.Group>
								    <label htmlFor="slug" className="form-label">Slug:</label>
								    <input type="text" name="slug" className="form-control" id="slug" {...register("slug")} />
								    <span className="error-message">{errors?.slug ? errors.slug[0] : null}</span>
								</Form.Group>
							</Col>
						</Row>
						<Row className="mb-3">
							<Col sm="12">
								<Form.Group>
								    <label htmlFor="permissions" className="form-label">Permissões:</label>
								    <PanelPermissions
								    	allPermissions={allPermissions}
								    	initValues={getValues('permissions')}
								    	selectedPermissions={selectedPermissions}
								    	placeholder="permissão"
								    />
								    <span className="error-message">{errors?.permissions ? errors.permissions[0] : null}</span>
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

export default RegisterEditRole;