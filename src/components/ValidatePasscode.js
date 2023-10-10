import React, { useState } from 'react';

function ValidatePasscode() {
  const [passcode, setPasscode] = useState('');

  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the passcode here
    console.log('Passcode submitted:', passcode);
  };

  return (
    <div onSubmit={handleSubmit}>
        <label>
          Enter Passcode:
          <input
            type="password"
            value={passcode}
            onChange={handlePasscodeChange}
          />
        </label>
        <button type="submit">Submit</button>
    </div>
  );
}

export default ValidatePasscode;
