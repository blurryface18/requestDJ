
import React from 'react';
import './Footer.css'; // We'll style it separately

const Footer = () => {
    return (
        <footer className="footer">
            <div>&copy; {new Date().getFullYear()} RequestDJ · All rights reserved.</div>
            <div className="footer-subtext">Designed by Bidzee & Manufactured by Desgade</div>
        </footer>
    );
};

export default Footer;

