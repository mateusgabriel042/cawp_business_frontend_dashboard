import React from 'react';

import {Route, Redirect} from 'react-router';

const PrivateRoute = props => {
	const dataUser = JSON.parse(localStorage.getItem('dataUser'));
	const isLogged = !! dataUser?.token;
	
	return isLogged ? <Route {...props} /> : <Redirect to="/login" />
}

export default PrivateRoute;