import React, {useState, useEffect, useContext} from 'react';
import HeaderRole from '../Header/index.jsx';
import { BiXCircle } from "react-icons/bi";
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import apiService from '../../../../services/api.js';
import Loading from '../../../../components/Loading/index.jsx';
import { Can } from "react-access-level";
import { verifyError } from '../../../../services/actionsAppService.jsx';

const ViewRole = ({ match, location }) => {
	const api = apiService.get()
	const [role, setRole] = useState([]);
	const [loading, setLoading] = useState(false);

	const {
	    params: { id }
	} = match;

	const viewRole = () => {
		setLoading(true);
	    api.get(`api/role/${id}`)
		.then(resp => {
			setRole(resp.data.data.role);
			setLoading(false);
		})
		.catch(error =>{
			setLoading(false);
			verifyError(error);
		})
	}

	function removePermission(idRole, idPermission, e) {
		setLoading(true);
		api.delete(`api/role/remove-permission/${idRole}/${idPermission}`)
		.then(resp => {
			viewRole()
			setLoading(false);
		})
		.catch(error =>{
			setLoading(false);
			verifyError(error);
		})
	}

	
	useEffect(() => {
		viewRole()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	

	return (
		<>
			<div className="area-crud">
				<HeaderRole></HeaderRole>

				<Can 
					resource="acl"
					authority="acl-view"
					otherwiseComponent={<label>Sem acesso!</label>}
				>
					<h5 className="mb-3">Dados da função</h5>

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
									<td>{role?.id}</td>
								</tr>
								<tr>
									<td>Nome</td>
									<td>{role?.name}</td>
								</tr>
								<tr>
									<td>Slug</td>
									<td>{role?.slug}</td>
								</tr>
								<tr>
									<td>Permissões</td>
									<td>{role.permissions?.map((permission) => (
										<Button variant="dark" className="button-remove-tag">{permission.name} <i onClick={(e) => removePermission(role.id, permission.id, e)}><BiXCircle /></i></Button>
									))}</td>
								</tr>
							</tbody>
						</Table>
					)}
				</Can>
				
			</div>
		</>
	);
};

export default ViewRole;