import axios from "axios";

import { API_URL } from "./config_url";

//import { config_token } from "./config_url";

const REST_API_BASE_URL =API_URL+'/api/public/genre'


export const listGenre = () => axios.get(REST_API_BASE_URL);