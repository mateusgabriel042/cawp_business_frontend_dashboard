import React, {useContext} from 'react';
import { Row, Col } from 'react-bootstrap';

const ViewProfile = () => {
	//obtendo dados usuario logado do local storage
	let user = JSON.parse(localStorage.getItem('dataUser'));

	//ordenando as permissos da funcao pelo nome
	if(user.role.length > 0){
		user.role[0].permissions = user.role[0].permissions.sort(function (a, b) {
			return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
		});
	}

	//ordenando as funcoes extras pelo nome
	if(user.permissions.length > 0){
		user.role[0].permissions = user.role[0].permissions.sort(function (a, b) {
			return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
		});
	}

	//funcao que converte primeira letra para maiuscula
	const firstCharUpperCase = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	return (
		<>
			<div className="area-profile">

				<h2 className="mb-4">Meu perfil</h2>

				<Row className="mb-3">
					<Col sm="6">
						<div className="card">
							<div className="card-header">
							    Dados pessoais
							</div>
							<ul className="list-group list-group-flush">
								<li className="list-group-item"><b>ID: </b>{user.id}</li>
								<li className="list-group-item"><b>Nome: </b>{user.name}</li>
							    <li className="list-group-item"><b>Email: </b>{user.email}</li>
							</ul>
						</div>
					</Col>

					<Col sm="6">
						<div className="card mb-3">
							<div className="card-header">
							    Função
							</div>
							<ul className="list-group list-group-flush">
								{user.role?.map((role) => (
									<li className="list-group-item" key={role.id}>{firstCharUpperCase(role.name)}</li>
								))}
								
							</ul>
						</div>

						<div className="card mb-3">
							<div className="card-header">
							    Permissões da função
							</div>
							<ul className="list-group list-group-flush">
								{user?.role[0]?.permissions.map((permission) => (
									<li className="list-group-item" key={permission.id}>{permission.name}</li>
								))}
							</ul>
						</div>

						<div className="card mb-3">
							<div className="card-header">
							    Permissões extras
							</div>
							<ul className="list-group list-group-flush">
								{user?.permissions.map((permission) => (
									<li className="list-group-item" key={permission.id}>{permission.name}</li>
								))}
							</ul>
						</div>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default ViewProfile;