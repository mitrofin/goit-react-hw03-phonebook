import { Component } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";
import styles from "./App.css";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = (contactObj) => {
    if (this.state.contacts.some(({ name }) => name === contactObj.name)) {
      return alert(`${contactObj.name} already exists in your phonebook`);
    }
    this.setState((prevState) => {
      return {
        contacts: [...prevState.contacts, contactObj],
      };
    });
  };

  handleFilterChange = (filter) => {
    this.setState({
      filter,
    });
  };

  handleDeleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  getFilteredContactsList = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContactsList = this.getFilteredContactsList();
    return (
      <div>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />

        {contacts.length > 0 && <h2 className={styles.title}>Contacts:</h2>}
        {contacts.length > 1 && (
          <Filter
            initialValue={filter}
            onFilterChange={this.handleFilterChange}
          />
        )}
        {filteredContactsList.length > 0 && (
          <ContactList
            contacts={filteredContactsList}
            onDeleteButtonClick={this.handleDeleteContact}
          />
        )}
      </div>
    );
  }
}
