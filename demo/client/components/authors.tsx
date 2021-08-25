/**
 * @description This is a JSX container that imports authorinfo, strongly types the values through the Author interface then passes the information as props for it's parent components.
 */

 import React, { useState } from 'react';

interface Author {
	name: string,
	image: string,
	info: string,
	github: string,
	linkedin: string
}

const authorProfile = ({name, image, info, github, linkedin}: Author):JSX.Element => {
  const [showModal, setShowModal] = useState(false)

	return (
		<div className="flex flex-col center items-center w-1/4 ">
			<img className="w-3/4 rounded-full mb-4" src={image}></img>
      <h1 className="mb-4">{name}</h1>
      <button 
          className="transform transition duration-500 hover:scale-110 bg-darkblue-default text-white-default font-bold uppercase text-sm px-6 py-3 rounded "
          type="button"
          onClick={() => setShowModal(true)}
          >
            About
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-2 border-deeppink-default  rounded-lg shadow-lg relative flex flex-col w-full bg-darkblue-default outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    {info}
                  </p>
                </div>
                {/*footer*/}
                  <button
                    className="bg-khaki-default text-deeppink-default font-bold uppercase px-6 py-2 text-sm rounded"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>

              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
			{/* <article>{info}</article> */}
      <div className="flex">
      <a
                className={
                  ("lg:text-white lg:hover:text-gray-300 text-gray-800") +
                  " px-3 py-4 lg:py-2"
                }
                href={github}
              >
                <i
                  className={
                    ("text-white") +
                    " fab fa-github fa-3x text-xl leading-lg"
                  }
                />
              </a>
			  <a
                className={
                  ("lg:text-white lg:hover:text-gray-300 text-gray-800") +
                  " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                }
                href={linkedin}
              >
                <i
                  className={
                    ("text-white ") +
                    " fab fa-linkedin fa-4x "
                  }
                />
              </a>
      </div>
		
		</div>
	)
}

export default authorProfile;