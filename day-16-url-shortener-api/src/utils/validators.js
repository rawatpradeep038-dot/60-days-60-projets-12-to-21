// URL valid hai ya nahi check karo
export const isValidUrl = (url) => {
  try {
    const urlObj = new URL(url);
    // Only http aur https allow karo
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

// Malicious URLs block karo
export const isSafeUrl = (url) => {
  const blacklistedDomains = [
    'bit.ly', 'tinyurl.com', // Already short URLs
    'localhost', '127.0.0.1' // Local addresses
  ];
  
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    // Check blacklisted domains
    for (const domain of blacklistedDomains) {
      if (hostname.includes(domain)) {
        return false;
      }
    }
    
    return true;
  } catch {
    return false;
  }
};