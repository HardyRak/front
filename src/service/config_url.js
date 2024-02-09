
export const API_URL = "https://springweb-production.up.railway.app";
export const API_URL_lien = window.location.origin;


const token = localStorage.getItem('token');

export const config_token = {
  headers: {
    'Authorization': token ? `Bearer ${token}` : '', // Vérification du token
    'Content-Type': "application/json",
  }
};
