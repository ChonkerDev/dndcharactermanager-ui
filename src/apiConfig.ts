const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiEndpoints = {
  login: `${API_BASE_URL}/api/login`,
  validateMe: `${API_BASE_URL}/api/login/validateMe`,
};