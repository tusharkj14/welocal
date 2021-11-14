import * as React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex items-center justify-center bg-black">
      <div className="md:w-2/3 w-full px-4 sm:px-12 pb-10 text-white flex flex-col">
        <div className="w-full text-7xl font-bold pt-8 ">
          <h1 className="w-full md:w-2/3">How can we help you. get in touch</h1>
        </div>
        <div className="flex mt-8 flex-col md:flex-row md:justify-between">
          <p className="w-full md:w-2/3 text-gray-400">
            Feel free to give feedback
          </p>
          <div className="w-44 pt-3 md:pt-0">
            <a
              className="bg-red-500 justify-center text-center rounded-lg shadow
             px-10 py-3 flex items-center cursor-pointer"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex mt-16 mb-12 sm:px-10 md:px-24 lg:px-44 flex-row items-center justify-around">
            <a href="https://github.com/" target="_blank">
              <i className="bx bxl-github text-5xl cursor-pointer" />
            </a>
            <a href="https://www.linkedin.com/in/" target="_blank">
              <i className="bx bxl-linkedin text-5xl cursor-pointer" />
            </a>
            <a href="https://twitter.com/" target="_blank">
              <i className="bx bxl-twitter text-5xl cursor-pointer" />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <i className="bx bxl-instagram text-5xl cursor-pointer" />
            </a>
          </div>
          <hr className="border-gray-600" />
          <p className="w-full text-center mt-4 text-gray-600">
            Created by HolyUranus
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
