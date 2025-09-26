import axios from 'axios';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const REGISTER_URL = '/api/auth/register/';

export const registerUser = async (data: RegisterData) => {
  const response = await axios.post(REGISTER_URL, data);
  return response.data;
};