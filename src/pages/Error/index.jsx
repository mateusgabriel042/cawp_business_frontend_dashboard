import React from 'react';
import './style.css';

const NotFound = ({ match, location }) => {
	let {
	    params: { code }
	} = match;

	let title = '';
	let message = '';

	if(parseInt(code) === 403){
		title = 'Acesso não autorizado.';
        message = 'Você não tem acesso a este serviço, pessa permissão ao administrador!';
	} else if(parseInt(code) === 500) {
		title = 'Erro no servidor.';
        message = 'Ocorreu algum erro em nosso servidor!';
	} else {
		code = 404;
		title = 'Página não encontrada.';
        message = 'A página solicitada não foi encontrada, ou encontra-se indisponível.';
	}

	return(
		<>
			<div className="area-page-error">
				<div className="container">
					<span>Erro {code}</span>
					<h2>{title}</h2>
					<p>{message}</p>
				</div>
			</div>
		</>
	);
}

export default NotFound;
