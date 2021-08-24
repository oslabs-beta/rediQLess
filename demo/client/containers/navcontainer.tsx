/**
 * This is a JSX container that contains the navbar information which includes the features, demo, team member information, the github link for the documentation to the product, and the download button for the NPM package
 * @module ReactScroll helps to link to the parts of the SPA and smoothly transition to that area of the application.
 */

import React from "react";

const Navbar = ():JSX.Element => {

  return (
  <nav
      className={
        ("w-full flex px-2 py-3 bg-rdgreen-default mb-3")
      }
    >
    <div className="flex w-11/12 justify-center">
      <ul className="flex items-center">
      <li className="px-2">
          <a
            href=""
          >
            FEATURES
          </a>
      </li>
      <li className="px-2">
          <a
            href=""
          >
            DEMO
          </a>
      </li>
      <li className="px-2">
      <i
                  className={
                    ("text-black") +
                    " fab fa-github fa-3x text-xl leading-lg"
                  }
                />
      </li>
      <li className="px-2">
          <a
            href=""
          >
            TEAM
          </a>
      </li>
      <li className="px-2">
          <a
            href="https://github.com/oslabs-beta/rediQLess"
            target="_blank"
          >
            GITHUB
          </a>
      </li>  

      </ul>
      </div>
      <div className="flex items-center justify-end w-1/12">
      <button
                className={
                  ("bg-white text-gray-800 active:bg-gray-100") +
                  " text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg hover:bg-green-500 outline-none focus:ring-4 focus-ring-green-500 lg:mr-1 lg:mb-0 ml-3 mb-3"
                }
                type="button"
                style={{ transition: "all .15s ease" }}
              >
                <i className="fas fa-arrow-alt-circle-down"></i> Download
      </button>  
      </div>
    </nav>
  );
}

export default Navbar;