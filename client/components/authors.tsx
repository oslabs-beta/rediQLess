/**
 * @description This is a JSX container that imports authorinfo, strongly types the values through the Author interface then passes the information as props for it's parent components.
 */
 import React, { useState } from 'react';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'
 import {faChevronUp} from '@fortawesome/free-solid-svg-icons'
 
 
 
 // Setting the interface for Author tells TS what kind of filetypes to expect when used as a parameter below
 // interface is the keyword used to do this (an object that creates all of your prop types)
 interface Author {
   name: string,
   image: string,
   info: string,
   github: string,
   linkedin: string
 }
 
 /* AuthorProfile is a component that takes in props sent down from the Author container
    name, image, info, github, linkedin come from the interface that types out the props 
 */
 const authorProfile = ({name, image, info, github, linkedin}: Author):JSX.Element => {
   //Show Modal is a true/false state that will display modal which will be another component 
   const [showModal, setShowModal] = useState(false)
 
   return (
     <div className="
     flex flex-col center items-center 
     w-1/4 
      xs:w-full
      xs:mb-8

      sm:w-full
      sm:mb-8

      md:w-1/2
      md:mb-8
      
      ">
       <img className="w-3/4 rounded-full mb-4" src={image}></img>
       <h1 className="mb-4 text-khaki-alt xs:text-3xl sm:text-3xl md:text-4xl">{name}</h1>
       {!showModal &&
         <button 
         className="hover:animate-bounce hover:scale-150 hover:bg-blue-500 bg-transparent text-white-default font-bold uppercase text-sm rounded "
         type="button"
         >
         <FontAwesomeIcon  onClick={() => setShowModal(true)} className="favoriteSelected transform transition duration-500 hover:scale-150" icon={faInfoCircle} size="lg"/>
         </button>
       }
       <div>
         {showModal && 
           <div className="flex flex-col mx-auto text-center py-8">
             <article className="py-2">
               {info}
             </article>
             <button
               
               type="button"
             >
             <FontAwesomeIcon  onClick={() => setShowModal(false)} className="favoriteSelected transform transition duration-500 hover:scale-150 hover:animate-pulse" icon={faChevronUp} size="sm"/>
             </button>
           </div>
         }
       </div>
       <div className="flex">
       <a 
                 className={
                   ("lg:text-white lg:hover:text-gray-300 text-gray-800") +
                   " px-3 py-4 lg:py-2"
                 }
                 href={github}
                 target="_blank"
               >
                 <i
                   className={
                     ("text-white") +
                     " fab fa-github fa-2x  text-xl leading-lg"
                   }
                 />
               </a>
         <a
                 className={
                   ("lg:text-white lg:hover:text-gray-300 text-gray-800") +
                   " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                 }
                 href={linkedin}
                 target="_blank"
               >
                 <i
                   className={
                     ("text-white ") +
                     " fab fa-linkedin fa-3x "
                   }
                 />
               </a>
       </div>
     </div>
   )
 }
 
 
 export default authorProfile;