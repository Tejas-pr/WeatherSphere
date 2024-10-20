import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Importing icons

const Footer = () => {
  return (
    <footer className="bg-[#1A57D3] text-white text-center py-4">
      <div>
        <span>Thank you for visiting!</span>
      </div>
      <div className="my-2 flex justify-center ">
        <a
          href="https://github.com/Tejas-pr?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 hover:text-gray-200"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/tejas-p-r-057a4622a/"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 hover:text-gray-200"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://x.com/tejas67061437"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 hover:text-gray-200"
        >
          <FaTwitter size={24} />
        </a>
      </div>
      <div>
        <span>© 2024 Tejas. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
