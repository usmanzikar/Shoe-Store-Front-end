import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-6 px-6 md:px-12" id='contact'>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/10 pb-10">
        
        {/* Logo + Description */}
        <div>
          <img src={logo} alt="Shoe Logo" className="h-14 w-auto cursor-pointer" />
          <p className="text-sm text-gray-400">
            Step up your style. Explore a range of trendy and comfortable footwear for every occasion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-orange-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">Shop</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">About</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-orange-400 transition">Sneakers</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">Formal</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">Boots</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">Loafers</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-orange-400 text-xl">
            <a href="#"><FaFacebookF className="hover:text-white transition" /></a>
            <a href="#"><FaInstagram className="hover:text-white transition" /></a>
            <a href="#"><FaTwitter className="hover:text-white transition" /></a>
            <a href="#"><FaYoutube className="hover:text-white transition" /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} usmanzikar437@gmail.com. All rights reserved.
      </div>
    </footer>
  );
}
