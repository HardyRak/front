import axios from "axios";

import { API_URL } from "./config_url";
import { config_token } from "./config_url";

const REST_API_BASE_URL = API_URL + '/api/public';
const REST_API_BASE_URL2 = API_URL + '/api/utilisateurs';

class UserEntityService {
  login(loginDto) {
    return axios.post(`${REST_API_BASE_URL}/login`, loginDto);
  }

  register(registerDto) {
    return axios.post(`${REST_API_BASE_URL}/registerUser`, registerDto);
  }

  getUsers() {
    return axios.get(`${REST_API_BASE_URL2}`, config_token);
  }

  createUser(user) {
    return axios.post(`${REST_API_BASE_URL2}/`, user, config_token);
  }

  getUserById(id) {
    return axios.get(`${REST_API_BASE_URL2}/${id}`, config_token);
  }

  updateUser(id, user) {
    return axios.put(`${REST_API_BASE_URL2}/${id}`, user, config_token);
  }

  deleteUser(id) {
    return axios.delete(`${REST_API_BASE_URL2}/${id}`, config_token);
  }
}

export default new UserEntityService();