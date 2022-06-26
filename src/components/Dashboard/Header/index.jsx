import React, {useContext} from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";

const Header = () => {
	const history = useHistory();
	let user = JSON.parse(localStorage.getItem('dataUser'));

	const logout = () => {
		localStorage.clear();
		window.location.reload();
	}


	return (
		<>
			<header>
				<nav>
					<div>
						<Link to='/dashboard/profile/view'>Perfil</Link>
					</div>

					<div>
						<label className="welcome">Olá: {user.name}</label>

						<Button className="btn" type="button" onClick={logout}>Sair</Button>
					</div>
				</nav>
			</header>
		</>
	);
};

export default Header;