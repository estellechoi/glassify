import axios from 'axios';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_WEB2_ENDPOINT_BASE_URL });

export const fetchAssetInfo = () => api.get('/asset/info');
