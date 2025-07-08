import axios from '../api/mockApi';

export const fetchTrafficRoutes = () => axios.get('/api/routes');