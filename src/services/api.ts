import axios from 'axios';
import { User } from '../models/User';
import { Album, Photo } from '../models/Album';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getAvatarUrl = (name: string, size = 40) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}`;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getUser = async (id: number): Promise<User> => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

export const getAlbums = async (): Promise<Album[]> => {
  const response = await axios.get(`${API_URL}/albums`);
  return response.data;
};

export const getAlbum = async (id: number): Promise<Album> => {
  const response = await axios.get(`${API_URL}/albums/${id}`);
  return response.data;
};

export const getAlbumsByUser = async (userId: number): Promise<Album[]> => {
  const response = await axios.get(`${API_URL}/users/${userId}/albums`);
  return response.data;
};

export const getPhotos = async (albumId: number): Promise<Photo[]> => {
  const response = await axios.get(`${API_URL}/albums/${albumId}/photos`);
  return response.data;
};