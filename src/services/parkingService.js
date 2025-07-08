import axios from '../api/mockApi';

export const fetchViolations = () => axios.get('/api/violations');