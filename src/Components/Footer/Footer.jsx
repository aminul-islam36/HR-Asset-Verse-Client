import { BsTwitterX } from "react-icons/bs";
import {
  FaCameraRetro,
  FaFacebook,
  FaHeart,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="w-11/12 mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            <Logo />
          </h2>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} AssetVerse. All rights reserved.
          </p>
          <p className="mt-2 text-sm">
            Empowering companies with efficient asset management.
          </p>
        </div>

        {/*  Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm flex gap-2 items-center">
            <FaCameraRetro /> support@assetverse.com
          </p>
          <p className="text-sm mt-2 flex gap-2 items-center">
            <MdAddIcCall />
            +1 (555) 123-4567
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="hover:text-white" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-white" href="/about">
                About
              </a>
            </li>
            <li>
              <a className="hover:text-white" href="/packages">
                Packages
              </a>
            </li>
          </ul>
        </div>

        {/*  Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-white">
              <BsTwitterX />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-white">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-white">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom  Footer*/}
      <div className="text-center text-gray-600 text-sm mt-10 border-t border-gray-700 pt-4">
        Made with <FaHeart className="inline-block text-red-500" /> for growing
        businesses.
      </div>
    </footer>
  );
};

export default Footer;
