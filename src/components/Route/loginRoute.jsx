import React from 'react';

import {Route, Redirect} from 'react-router';

const LoginRoute = props => {
	const dataUser = JSON.parse(localStorage.getItem('dataUser'));
	const isLogged = !! dataUser?.token;
	
	return isLogged ? <Redirect to="/dashboard" /> : <Route {...props} />
}

export default LoginRoute;