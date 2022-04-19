const fs = require("fs/promises");
const path = require("path");

const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(id) {
  const contacts = await listContacts();
  const ID = id.toString();
  const result = contacts.find(item => item.id === ID);
  if (!result) {
    return null;
  }
  return result;
}

function updateContacts(contacts) {
  fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function removeContact(id) {
  const contacts = await listContacts();
  const ID = id.toString();
  const idx = contacts.findIndex((item) => item.id === ID);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await updateContacts(newContacts);
  return contacts[idx];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name: name, email: email, phone: phone, id: v4() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
