import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

let previousTokenSaved = null;

let tokenSaved = () => {
	let dataUser = JSON.parse(localStorage.getItem('dataUser'));
	return dataUser !== null ? decodeURIComponent(escape(atob(dataUser.token))) : null;
}

let headers = {
	'Authorization': `Bearer ${tokenSaved()}`
};

const api = axios.create({
	baseURL: BACKEND_URL,
	withCredentials: true,
	headers: headers,
});

const apiService = {
	get: () => {
		if(previousTokenSaved !== tokenSaved()){
			previousTokenSaved = tokenSaved()

			return axios.create({
				baseURL: BACKEND_URL,
				withCredentials: true,
				headers: {
					'Authorization': `Bearer ${tokenSaved()}`
				}
			});
		}
		return api
	},

	getPublic: () => {
		return axios.create({
			baseURL: BACKEND_URL,
			withCredentials: true
		});
	}
}

export default apiService;