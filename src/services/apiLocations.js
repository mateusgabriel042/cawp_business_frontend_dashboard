import axios from 'axios';

const apiLocations = axios.create({
	baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
});

export default apiLocations