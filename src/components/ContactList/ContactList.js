import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

export default function ContactList({ contacts, onDeleteButtonClick }) {
  return (
    <ul className={styles.contactsList}>
      {contacts.map((contact, idx) => (
        <li
          key={contact.id}
          className={idx % 2 === 0 ? styles.even : styles.odd}
        >
          <span>
            {contact.name}: {contact.number}
          </span>
          <button
            type="button"
            id={contact.id}
            className={styles.deleteButton}
            onClick={e => onDeleteButtonClick(e.target.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = PropTypes.shape({
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
}).isRequired;