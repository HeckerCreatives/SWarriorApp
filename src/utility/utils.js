export const sumArray = array => {
  return array.reduce((a, b) => a + b, 0);
};

export const decodeUrlParameter = encoded => {
  const decoded = atob(encoded);
  return decoded;
};

export const decrypt = (encrypted, password) => {
  let decrypted = "";
  for (let i = 0; i < encrypted.length; i++) {
    decrypted += String.fromCharCode(
      encrypted.charCodeAt(i) ^ password.charCodeAt(i % password.length)
    );
  }
  return decrypted;
};

export const handleCharLimit = str => `${str.substring(0, 15)}...`;

export const handleDate = date =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// export const IMAGE_ENDPOINT = "http://localhost:5000/";
export const IMAGE_ENDPOINT = "https://swarrior-g4tor.ondigitalocean.app/";

// export const SOCKET_ENDPOINT = "http://localhost:5000/";
export const SOCKET_ENDPOINT = "https://swarrior-g4tor.ondigitalocean.app/";
