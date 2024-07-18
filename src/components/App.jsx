import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact } from '../redux/contactsSlice';
import { setFilter } from '../redux/filterSlice';
import { getContacts, getFilter } from '../redux/selectors'; 
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter); 
  const dispatch = useDispatch();

  const validatedContacts = contacts.map(contact => ({
    id: contact.id,
    name: String(contact.name),
    number: String(contact.number),
  }));

  const handleAddContact = contact => {
    dispatch(addContact(contact));
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleSetFilter = newFilter => {
    dispatch(setFilter(newFilter));
  };

  const filteredContacts = contacts.filter(contact => {
    console.log('Contact:', contact);
    console.log('Contact name:', contact.name)

    return typeof contact.name === 'string' && contact.name.toLowerCase().includes(filter.toLowerCase())
});

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm contacts={validatedContacts} addContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={handleSetFilter} />
      
      <ContactList 
        contacts={filteredContacts} 
        onDeleteContact={handleDeleteContact} />
    </>
  );
};

