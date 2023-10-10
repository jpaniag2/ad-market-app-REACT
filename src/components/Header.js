import React from 'react';
import '../style/components/Header.css'; // Import the CSS file

function Header() {
  return (
    <header className="header"> {/* Use the 'header' class for styling */}
      <h1>Ad Market</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/ads">Ads</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
