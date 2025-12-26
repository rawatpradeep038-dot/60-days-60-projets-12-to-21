import { customAlphabet } from 'nanoid';

// Custom alphabet define karo (kaunse characters use honge)
// Similar looking characters hata diye (0/O, 1/l/I)
const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz';

// nanoid function banao with custom alphabet
const nanoid = customAlphabet(alphabet, 6);

// Random short code generate karo
export const generateShortCode = (length = 6) => {
  return nanoid(length);
};

// Custom alias validate karo
export const isValidCustomAlias = (alias) => {
  // Only alphanumeric, hyphens, underscores allowed
  const pattern = /^[a-zA-Z0-9_-]+$/;
  
  // Min 3, Max 20 characters
  if (alias.length < 3 || alias.length > 20) {
    return false;
  }
  
  return pattern.test(alias);
};

// Reserved words jo use nahi kar sakte
const reservedWords = [
  'api', 'admin', 'analytics', 'docs', 'about',
  'contact', 'terms', 'privacy', 'help', 'support'
];

export const isReservedWord = (word) => {
  return reservedWords.includes(word.toLowerCase());
};