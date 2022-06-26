import React from 'react';

import './style.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from "../../../components/Route/privateRoute.jsx";
import Header from '../Header/index.jsx';
import Sidebar from '../Sidebar/index.jsx';

import Overview from '../../../pages/Dashboard/Overview/View/index.jsx';

import ListUser from '../../../pages/Dashboard/User/List/index.jsx';
import RegisterEditUser from '../../../pages/Dashboard/User/RegisterEdit/index.jsx';
import ViewUser from '../../../pages/Dashboard/User/View/index.jsx';

import ListRole from '../../../pages/Dashboard/AccessControl/List/index.jsx';
import RegisterEditRole from '../../../pages/Dashboard/AccessControl/RegisterEdit/index.jsx';
import ViewRole from '../../../pages/Dashboard/AccessControl/View/index.jsx';

import ViewProfile from '../../../pages/Dashboard/Profile/View/index.jsx';

import ErrorPage from '../../../pages/Error/index.jsx';

const Main = () => {
	return (
		<>
		    <div className="area-dashboard">
		    	<BrowserRouter>
		    		<Sidebar></Sidebar>

		    		<div className="area-main">
		    			<Header></Header>
			    		<Switch>
			    			<PrivateRoute path="/dashboard" exact component={Overview} />

			    			<PrivateRoute path="/dashboard/user/list" component={ListUser} />
			    			<PrivateRoute path="/dashboard/user/register" component={RegisterEditUser} />
			    			<PrivateRoute path="/dashboard/user/edit/:id" component={RegisterEditUser} />
			    			<PrivateRoute path="/dashboard/user/view/:id" component={ViewUser} />
			    			<PrivateRoute path="/dashboard/user/search/:column/:value" component={ListUser} />

			    			<PrivateRoute path="/dashboard/access-control/list" component={ListRole} />
			    			<PrivateRoute path="/dashboard/access-control/register" component={RegisterEditRole} />
			    			<PrivateRoute path="/dashboard/access-control/edit/:id" component={RegisterEditRole} />
			    			<PrivateRoute path="/dashboard/access-control/view/:id" component={ViewRole} />
			    			<PrivateRoute path="/dashboard/access-control/search/:column/:value" component={ListRole} />

			    			<PrivateRoute path="/dashboard/profile/view" component={ViewProfile} />

			    			<PrivateRoute path="/error-page/:code" component={ErrorPage} />
							<Route component={ErrorPage} />

			    		</Switch>
		    		</div>
		    	</BrowserRouter>
		    </div>
		</>
	);
};

export default Main;