import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import css from '../components/App.module.css';

export function App() {
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contact</h2>
      <Filter />
      <ContactList />
    </div>
  );
}
