import axios from 'axios';
import { API_URL } from "./config_url";
import { config_token } from "./config_url";

const user = localStorage.getItem("userId"); // Récupère l'ID de l'utilisateur depuis le localStorage

const AnnonceService = {
  saveAnnonce: (annonce) => {
    return axios.post(`${API_URL}/api/annonce/save`, annonce, config_token);
  },
  
  getAllAnnonces: () => {
    return axios.get(`${API_URL}/api/annonce/all`);
  },
  
  getAllAnnoncesFilter: () => {
    return axios.get(`${API_URL}/api/favoris/${user}`, config_token);
  },
  
  deleteAnnonce: (annonceId) => {
    return axios.delete(`${API_URL}/api/annonce/delete/${annonceId}`, config_token);
  },
  
  findByIdUser: (userId) => {
    return axios.get(`${API_URL}/api/annonce/proprietaire/${userId}`, config_token);
  },
  
  updateAnnonce: (annonceId, updatedAnnonce) => {
    return axios.put(`${API_URL}/api/annonce/update/${annonceId}`, updatedAnnonce, config_token);
  }
};

export default AnnonceService;