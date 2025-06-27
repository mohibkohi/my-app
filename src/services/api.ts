import axios from 'axios';
import { User } from '../types/User'

// const API_URL = 'http://localhost:5054/api/users'; // Adjust '/api/users' to match your actual endpoint
const API_URL = 'https://studentapitest20250626172847-adfva4akgefecfa0.canadacentral-01.azurewebsites.net/api/Friend';
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(API_URL);
  return response.data;
};

// Add this function to post a new student
export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await axios.post<User>(API_URL, user);
  return response.data;
};