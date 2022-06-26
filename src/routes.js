import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/index.jsx";
import NotFound from "./pages/Error/index.jsx";
import Dashboard from "./pages/Dashboard/index.jsx";
import LoginRoute from "./components/Route/loginRoute.jsx";
import PrivateRoute from "./components/Route/privateRoute.jsx";

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<LoginRoute exact path="/" component={Login} />
			<Route path="/login" component={Login} />
			<PrivateRoute path="/dashboard" component={Dashboard} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Routes;