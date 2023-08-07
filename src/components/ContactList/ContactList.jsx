import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {
  selectFilteredContacts,
  setDeletContact,
} from 'redux/phoneBookReducer';

import css from '../ContactList/ContactList.module.css';

export const ContactList = () => {
  const filteredContactsByName = useSelector(selectFilteredContacts);
console.log(filteredContactsByName);

  const dispatch = useDispatch();

  const deleteContact = contactId => {
    dispatch(setDeletContact(contactId));
  };

  return (
    <ul>
      {filteredContactsByName.map(({ name, number, id }) => (
        <li key={id} className={css.contactsItem}>
          <p>
            {name}: {number}
          </p>
          <button onClick={() => deleteContact(id)}>Delet</button>
        </li>
      ))}
    </ul>
  );
};
