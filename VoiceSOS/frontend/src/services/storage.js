export const getLocalContacts = () => {
  const contacts = localStorage.getItem('voicesos_contacts');
  return contacts ? JSON.parse(contacts) : [];
};

export const saveLocalContact = (contact) => {
  const contacts = getLocalContacts();
  contacts.push(contact);
  localStorage.setItem('voicesos_contacts', JSON.stringify(contacts));
  return contacts;
};

export const getUserSettings = () => {
  const settings = localStorage.getItem('voicesos_settings');
  return settings ? JSON.parse(settings) : { hasCompletedSetup: false, triggerPhrase: "Help me" };
};

export const saveUserSettings = (settings) => {
  const currentSettings = getUserSettings();
  const newSettings = { ...currentSettings, ...settings };
  localStorage.setItem('voicesos_settings', JSON.stringify(newSettings));
  return newSettings;
};
