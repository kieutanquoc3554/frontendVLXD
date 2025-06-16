import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = `${apiUrl}/api/auth`;

const login = async ({ email, password }) => {
  const response = await axios.post(
    `${API_URL}/login`,
    { email, password },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/me`, {
    withCredentials: true,
  });
  return response.data;
};

export default { login, getCurrentUser };
