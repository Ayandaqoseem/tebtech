const dns = require('dns');
const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d', 
  });
};


// Validate email
const validateEmail = (email) => {
  const isValidStructure = email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  
  if (!isValidStructure) {
    return false;
  }
  
  // Extract domain from the email
  const domain = email.split('@')[1];
  
  return new Promise((resolve, reject) => {
    // Lookup MX records to validate the domain
    dns.resolveMx(domain, (err, addresses) => {
      if (err || addresses.length === 0) {
        resolve(false); 
      } else {
        resolve(true); 
      }
    });
  });
};

module.exports = {
  generateToken,
  validateEmail
};

