const KEY = "voicesos_contact";

export function saveLocalContact(contact) {
  localStorage.setItem(KEY, JSON.stringify(contact));
}

export function getLocalContact() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearLocalContact() {
  localStorage.removeItem(KEY);
}
