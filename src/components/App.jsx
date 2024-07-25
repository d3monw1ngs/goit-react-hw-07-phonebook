import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, addContact, deleteContact } from '../redux/operators';
import { setFilter } from '../redux/filterSlice';
import { getContacts, getFilter, getLoader, getError } from '../redux/selectors'; 
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { RotatingLines } from 'react-loader-spinner';

export const App = () => {
  const contacts = useSelector(getContacts) || [];
  const filter = useSelector(getFilter) || ''; 
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoader);
  const error = useSelector(getError)

   useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = contact => {
    dispatch(addContact(contact));
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleSetFilter = newFilter => {
    dispatch(setFilter(newFilter));
  };

  const filteredContacts = contacts.filter(contact =>
    typeof contact.name === 'string' && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} addContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={handleSetFilter} />

      {isLoading && <p><RotatingLines
          visible={true}
          height="76"
          width="76"
          color="blue"
          strokeWidth="3"
          animationDuration="0.2"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
          /></p>}
      {error && <p>Error: {error}</p>}
      
      <ContactList 
        contacts={filteredContacts} 
        onDeleteContact={handleDeleteContact} />
    </>
  );
};

