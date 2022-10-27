import axios from 'axios';

const web2 = axios.create({ baseURL: process.env.NEXT_PUBLIC_WEB2_ENDPOINT_BASE_URL });

export default web2;
