
import React from 'react';
import './Footer.css'; // We'll style it separately

const Footer = () => {
  return (
    <footer className="footer">
      &copy; {new Date().getFullYear()} RequestDJ · All rights reserved.
    </footer>
  );
};

export default Footer;

