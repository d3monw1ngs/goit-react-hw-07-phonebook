import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = 'https://669e1f509a1bda36800576f3.mockapi.io/contacts';

// Async thunk for fetching contacts
export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get(BASE_URL);
        console.log("Fetched contacts:", response.data);
        return response.data;
      } catch (error) {
        console.error("Fetch contacts error:", error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

// Async thunk for adding contacts
export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (contact, thunkAPI) => {
      try {
        const response = await axios.post(BASE_URL, contact);
        console.log("Added contact:", response.data);
        return response.data;
      } catch (error) {
        console.error("Add contact error:", error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

// Async thunk for deleting contacts
export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId, thunkAPI) => {
      try {
        await axios.delete(`${BASE_URL}/${contactId}`);
        console.log("Deleted contact:", contactId);
        return contactId;
      } catch (error) {
        console.error("Delete contact error:", error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  