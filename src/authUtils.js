
async function verifyPasscode(passcode) {
    try {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT_POST_PASSCODE_VALIDATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passcode }),
      });
  
      if (response.ok) {
        return true; // Authentication successful
      }
  
      return false; // Authentication failed
    } catch (error) {
      console.error('Error verifying passcode:', error);
      return false; // Authentication failed due to an error
    }
  }

  async function getUniqueAdId(passcode) {
    try {
      const endpoint = `ads/passcode/${passcode}`
      const url = `http://localhost:3000/${endpoint}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        return data; // Return data from the response if authentication is successful
      }
  
      return null; // Return null if authentication failed
    } catch (error) {
      console.error('Error verifying passcode:', error);
      // console.log(`${'http://localhost:3000/ads/passcode/'}${passcode}`)
      return null; // Authentication failed due to an error
    }
  }
  
  
  export {verifyPasscode, getUniqueAdId}
