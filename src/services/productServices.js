import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const API = `${apiUrl}/api`;

export const fetchCategories = () => {
  axios.get(`${API}/category`);
};
