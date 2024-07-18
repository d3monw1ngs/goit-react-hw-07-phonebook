import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialContactsState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

// const validatedContacts = initialContactsState.map(contact => ({
//   id: contact.id,
//   name: String(contact.name),
//   number: String(contact.number),
// }));

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare({ name, number }) {
        return { 
          payload: { 
            id: nanoid(), 
            name: String(name),
            number: String(number),
          },
        };
      },
    },
    deleteContact: (state, action) => {
      return state.filter(contact => contact.id !== action.payload)
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
