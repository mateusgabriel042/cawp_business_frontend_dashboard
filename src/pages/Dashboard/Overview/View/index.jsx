import React, {useState, useEffect, useContext} from 'react';
import apiService from '../../../../services/api.js';
import Loading from '../../../../components/Loading/index.jsx';
import { Can } from "react-access-level";
import { ProgressBar } from 'react-bootstrap';
import { verifyError } from '../../../../services/actionsAppService.jsx';
import Maps from '../../../../components/MapViewLocales/index.jsx';
import { Link } from "react-router-dom";
import './style.css';
import ImageTypeSystem1 from '../../../../assets/images/img-typesystem-1.png';
import ImageTypeSystem2 from '../../../../assets/images/img-typesystem-2.png';
import ImageTypeSystem3 from '../../../../assets/images/img-typesystem-3.png';


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
							    	<span>0</span>
							    	<label>Visualisações</label>
							    </div>
							    <div className="col box-number">
							    	<span>0</span>
							    	<label>Likes</label>
							    </div>
						   		<div className="col box-number">
						    		<span>0</span>
							    	<label>Feedbacks</label>
						    	</div>
						    	<div className="col box-number">
						    		<span>0</span>
							    	<label>Usuários</label>
						    	</div>
						    	<div className="col-12 lb-info-numbers-dashboard">
							    	<label>Dados referentes a interações dos usuários em suas páginas</label>
						    	</div>
							</div>
						</>
					)}
				</Can>

				<div className="row mb-4">
					<div className="col-4">
						<div className="card">
							<img src={ImageTypeSystem2} className="card-img-top" alt="..." />
							<div className="card-body">
							    <h5 className="card-title">Webstore</h5>
							    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							    <Link to='/dashboard-webshop' className="btn btn-primary">Painel</Link>
							</div>
						</div>
					</div>

					<div className="col-4">
						<div className="card">
							<img src={ImageTypeSystem1} className="card-img-top" alt="..." />
							<div className="card-body">
							    <h5 className="card-title">Imóveis</h5>
							    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							    <Link to='/dashboard/properties' className="btn btn-primary">Painel</Link>
							</div>
						</div>
					</div>

					<div className="col-4">
						<div className="card">
							<img src={ImageTypeSystem3} className="card-img-top" alt="..." />
							<div className="card-body">
							    <h5 className="card-title">Emprego</h5>
							    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							    <Link to='/dashboard-jobs' className="btn btn-primary">Painel</Link>
							</div>
						</div>
					</div>


				</div>

			</div>
		</>
	);
};

export default Overview;