const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log("Error: ${error.message}".red);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result || null;
  } catch (error) {
    console.log("Error: ${error.message}".red);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const indexContact = contacts.findIndex((item) => item.id === contactId);
    if (indexContact === -1) {
      return null;
    }
    const [deleteContact] = contacts.splice(indexContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deleteContact;
  } catch (error) {
    console.log("Error: ${error.message}".red);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const updateContacts = [newContact, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log("Error: ${error.message}".red);
  }
};

listContacts();

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
