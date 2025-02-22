export function save(key, value) {
  console.log(`Saving ${key}: ${value}`);
  localStorage.setItem(key, value);
}

export function load(key) {
  return localStorage.getItem(key);
}

export function remove(key) {
  localStorage.removeItem(key);
}
