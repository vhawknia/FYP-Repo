import forge from 'node-forge';

// Function to generate RSA keys
export const generateRSAKeys = async () => {
  const { pki } = forge;
  const { rsa } = pki;

  try {
    // Generate RSA key pair asynchronously
    const keypair = await new Promise((resolve, reject) => {
      rsa.generateKeyPair({ bits: 2048, e: 0x10001 }, (err, keypair) => {
        if (err) {
          reject(err);
        } else {
          resolve(keypair);
        }
      });
    });

    // Convert keys to PEM format
    const publicKeyPem = pki.publicKeyToPem(keypair.publicKey);
    const privateKeyPem = pki.privateKeyToPem(keypair.privateKey);

    return { publicKey: publicKeyPem, privateKey: privateKeyPem };
  } catch (err) {
    console.error('Error generating keys:', err);
    throw err;
  }
};

// Function to sign data using the private key
export const signDataWithPrivateKey = (data, privateKeyPem) => {
  // Serialize data to a JSON string
  const dataString = JSON.stringify(data);

  // Convert PEM-formatted private key to a forge private key object
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

  // Create a message digest (hash) of the data
  const md = forge.md.sha256.create();
  md.update(dataString, 'utf8');

  // Sign the message digest with the private key
  const signature = privateKey.sign(md);

  // Encode the signature as base64
  const signatureBase64 = forge.util.encode64(signature);

  return signatureBase64;
};
