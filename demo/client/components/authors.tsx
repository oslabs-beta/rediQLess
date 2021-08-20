import React from "react";

interface Author {
	name: string,
	image: string,
	info: string,
	github: string,
	linkedin: string
}

const authorProfile = ({name, image, info, github, linkedin}: Author):JSX.Element => {

//redo h1 in tailwindcss
//github and linkedin i class with link 
	return (
		<div className="flex flex-col center items-center w-1/4 mx-8">
			<h1 className="mb-4">{name}</h1>
			<img className="w-3/4 rounded-full mb-4" src={image}></img>
			<article>{info}</article>
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
                    ("lg:text-white text-gray-500") +
                    " fab fa-github fa-3x text-xl leading-lg "
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
                    ("lg:text-white text-gray-500") +
                    " fab fa-linkedin fa-4x "
                  }
                />
              </a>
      </div>
		
		</div>
	)
}

export default authorProfile;