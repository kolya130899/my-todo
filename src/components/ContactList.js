import React from "react";

import "./css/ContactList.css";

function generateId() {
  return `${new Date().getTime()}${Math.random()}`;
}

const initialContacts = [
  {
    id: generateId(),
    name: "Martin",
    phone: "380954970632",
    email: "example@example.com",
    isFavourite: false,
    isEditing: false
  },
  {
    id: generateId(),
    name: "John",
    phone: "380502184769",
    email: "example@example.com",
    isFavourite: true,
    isEditing: false
  },
  {
    id: generateId(),
    name: "Inna",
    phone: "380954515912",
    email: "example@example.com",
    isFavourite: false,
    isEditing: false
  },
  {
    id: generateId(),
    name: "Etan",
    phone: "380502181234",
    email: "example@example.com",
    isFavourite: true,
    isEditing: false
  }
];
const FILTER_STATE = {
  ALL: "ALL",
  FAVOURITE: "FAVOURITE"
};

export default class ContactList extends React.Component {
  state = {
    contacts: initialContacts,
    filterFavourite: FILTER_STATE.ALL,
    newName: "",
    newPhone: "",
    newEmail: ""
  };

  getFilteredContacts() {
    if (this.state.filterFavourite === FILTER_STATE.FAVOURITE) {
      return this.state.contacts.filter(contacts => contacts.isFavourite);
    }
    return this.state.contacts;
  }

  showFiltered = filterFavourite => () => {
    this.setState({
      filterFavourite
    });
  };

  editItem = contact => () => {
    this.setState({
      contacts: this.state.contacts.map(item => {
        if (item !== contact) return item;
        return {
          ...item,
          isEditing: !item.isEditing
        };
      })
    });
  };

  handleItemChange = contact => event => {
    event.preventDefault();
    this.setState({
      contacts: this.state.contacts.map(item => {
        if (item !== contact) return item;
        return {
          ...item,
          [event.target.name]: event.target.value
        };
      })
    });
  };

  handleCheck = contact => event => {
    this.setState({
      contacts: this.state.contacts.map(item => {
        if (item !== contact) return item;
        return {
          ...item,
          isFavourite: event.target.checked
        };
      })
    });
  };

  handleNewItem = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addNewItem = event => {
    event.preventDefault();
    const newItem = {
      id: generateId(),
      name: this.state.newName,
      phone: this.state.newPhone,
      email: this.state.newEmail,
      isFavourite: false,
      isEditing: false
    };
    this.setState({
      contacts: [...this.state.contacts, newItem],
      newName: "",
      newPhone: "",
      newEmail: ""
    });
  };

  render() {
    return (
      <div className="my-app">
        <form onSubmit={this.addNewItem} className="new-item-form">
          <input
            value={this.state.newName}
            onChange={this.handleNewItem}
            type="text"
            name="newName"
            required
            className="new-item new-item-field"
            placeholder="Name"
          />
          <input
            value={this.state.newPhone}
            onChange={this.handleNewItem}
            type="number"
            name="newPhone"
            min="380000000000"
            max="389999999999"
            required
            className="new-item new-item-field"
            placeholder="Phone"
          />
          <input
            value={this.state.newEmail}
            onChange={this.handleNewItem}
            type="email"
            name="newEmail"
            required
            className="new-item new-item-field"
            placeholder="Email"
          />
          <button type="submit" className="btn new-item new-item-btn">
            Add
          </button>
        </form>

        <button
          className="btn service-btn s1"
          onClick={this.showFiltered(FILTER_STATE.ALL)}
        >
          All
        </button>
        <button
          className="btn service-btn"
          onClick={this.showFiltered(FILTER_STATE.FAVOURITE)}
        >
          Favourite
        </button>

        {this.getFilteredContacts().map(item => (
          <div
            key={item.id}
            className={item.isFavourite ? "is-favourite list" : "list"}
            id={item.isEditing === true ? "is-editing" : ""}
          >
            <input
              type="checkbox"
              checked={item.isFavourite}
              onChange={this.handleCheck(item)}
            />

            <input
              type="text"
              name="name"
              value={item.name}
              className="props"
              disabled={!item.isEditing}
              onChange={this.handleItemChange(item)}
            />

            <input
              type="number"
              name="phone"
              value={item.phone}
              className="props"
              disabled={!item.isEditing}
              onChange={this.handleItemChange(item)}
            />

            <input
              type="email"
              name="email"
              value={item.email}
              className="props"
              disabled={!item.isEditing}
              onChange={this.handleItemChange(item)}
            />

            <button className="btn edit-btn" onClick={this.editItem(item)}>
              {item.isEditing === true ? "Save" : "Edit"}
            </button>
          </div>
        ))}
      </div>
    );
  }
}

// •	When "Add Contact" button is clicked, new contact card should appear with following fields:
// // // // o	Name
// // // // o	Phone
// // // // o	Email
// // // // o	Edit Button.
// // // // o	Favourite Button.
// •	Edit contact button should navigate to new screen that will allow editing of a contact and saving it.
// •	Favourite button should add contact to list of favourites.
// •	Create "Favourites" view that only displays favourited contacts.
// •	Save state in local storage.
