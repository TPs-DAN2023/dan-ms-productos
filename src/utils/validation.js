export default function isDuplicated(list, field, value) {
  return list.some(item => item[field] === value);
}

export default function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function validateName(name) {
  return name.length >= 3 && name.length <= 80;
}