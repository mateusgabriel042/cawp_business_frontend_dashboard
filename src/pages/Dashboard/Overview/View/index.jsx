import React, {useState, useEffect, useContext} from 'react';
import apiService from '../../../../services/api.js';
import Loading from '../../../../components/Loading/index.jsx';
import { Can } from "react-access-level";
import { ProgressBar } from 'react-bootstrap';
import { verifyError } from '../../../../services/actionsAppService.jsx';
import Maps from '../../../../components/MapViewLocales/index.jsx';
import './style.css';

const Overview = () => {
	const api = apiService.get();
	const [loading, setLoading] = useState(false);
	const [allData, setAllData] = useState({});
	
	const dashboardData = () => {
		setLoading(true);
	    api.get(`api/dashboard`)
		.then(resp => {
			setAllData(resp.data.data.allData);
			setLoading(false);
		})
		.catch(error =>{
			setLoading(false);
			verifyError(error);
		})
	}

	
	useEffect(() => {
		dashboardData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (

		<>
			<div className="area-page-dashboard">

				<Can 
					resource="dashboard"
					authority="dashboard-view"
					otherwiseComponent={<label>Sem acesso!</label>}
				>
					<h2 className="title-endpoint">Dashboard</h2>

					{ (loading) ? (<Loading />) : (
						<>
							<div className="row mb-4">
							    <div className="col box-number">
							    	<span>{allData?.dataUsers?.count}</span>
							    	<label>Usuários</label>
							    </div>
							    <div className="col box-number">
							    	<span>{allData?.dataUsers?.count}</span>
							    	<label>Usuários</label>
							    </div>
						   		<div className="col box-number">
						    		<span>{allData?.dataUsers?.count}</span>
							    	<label>Usuários</label>
						    	</div>
						    	<div className="col box-number">
						    		<span>{allData?.dataUsers?.count}</span>
							    	<label>Usuários</label>
						    	</div>
						    	<div className="col-12 lb-info-numbers-dashboard">
							    	<label>Dados referentes a todos os registros do sistema</label>
						    	</div>
							</div>
						</>
					)}
				</Can>

			</div>
		</>
	);
};

export default Overview;