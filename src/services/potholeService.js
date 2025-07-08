import axios from '../api/mockApi';

export const fetchPotholes = () => axios.get('/api/potholes');