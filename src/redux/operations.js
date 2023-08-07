import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://64cbd7e42eafdcdc8519643d.mockapi.io/api';

export const fetchContact = createAsyncThunk(
  'phoneBook/fetchContact',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'phoneBook/addContact',
  async (newContact, thunkApi) => {
    try {
      console.log(newContact);

      const response = await axios.post(`/contacts/${newContact.contactId}`);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.massage);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'phoneBook/deleteContact',
  async (contactId, thunkApi) => {
    try {
      console.log(contactId);

      const response = await axios.delete(`/contacts/${contactId}`);
      console.log('Delete');

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.massage);
    }
  }
);
