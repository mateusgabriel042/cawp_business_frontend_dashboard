import React, {useState, useEffect, useContext} from 'react';
import './style.css';
import Main from '../../components/Dashboard/Main/index.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading/index.jsx';

const Dashboard = () => {
	const [loading, setLoading] = useState(false);

	return (
		<>
			<div className="area-dashboard">
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				{ (loading) ? (<Loading />) : (<Main></Main>) }
			</div>
		</>
	);
};

export default Dashboard;