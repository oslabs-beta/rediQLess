/**
 * This is a JSX container that contains the navbar information which includes the features, demo, team member information, the github link for the documentation to the product, and the download button for the NPM package
 */

 import React from 'react'

 interface Nav {
   currentNav: any,
   currentNavChange: React.Dispatch<any>,
 }
 
 const Navbar = ({currentNav, currentNavChange}:Nav): JSX.Element => {
   return (
     <nav
       className={
         'text-deeppink-default w-full flex px-2 py-3 bg-darkblue-default  mb-3'
       }
     >
       <div className="flex flex-grow justify-center">
         <ul className="flex items-center">
           <li className="px-2 transform transition duration-500 hover:scale-110">
             <button className="hover-underline-animation" onClick={()=>{currentNavChange({ ...currentNav,
               features: true,
               demo: false,
               team: false
             })}}>FEATURES</button>
           </li>
           <li className="px-2 transform transition duration-500 hover:scale-110">
             <button className="hover-underline-animation"  onClick={()=>{currentNavChange({ ...currentNav,
               features: false,
               demo: true,
               team: false
             })}}>DEMO</button>
           </li>
           <li className="px-2">
             <img
               className="object-scale-down h-12"
               src="https://i.ibb.co/ykt2gcX/REDIQLESS-LOGO-YELLOW-R.png"
               /* ^^^ the image for the navbar */
             />
           </li>
           <li className="px-2 transform transition duration-500 hover:scale-110">
             <button className="hover-underline-animation"  onClick={()=>{currentNavChange({ ...currentNav,
               features: false,
               demo: false,
               team: true
             })}}>TEAM</button>
           </li>
           <li className="px-2 transform transition duration-500 hover:scale-110">
             <a className="hover-underline-animation"  href="https://github.com/oslabs-beta/rediQLess" target="_blank">
               GITHUB
             </a>
           </li>
         </ul>
         <div className="absolute right-10 top-5">
           <button
             className={
               'transform transition duration-500 hover:scale-110 bg-black-midnight text-khaki-alt active:bg-gray-100' +
               ' text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:ring-4 focus-ring-green-500 lg:mr-1 lg:mb-0 ml-3 mb-3'
             }
             type="button"
             style={{ transition: 'all .15s ease' }}
           >
             <i className="fas fa-arrow-alt-circle-down"></i> Download
           </button>
         </div>
       </div>
     </nav>
   )
 }
 
 export default Navbar