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
		<div>
			<h1>{name}</h1>
			<img src={image}></img>
			<article>{info}</article>
			<a
                className={
                  ("lg:text-white lg:hover:text-gray-300 text-gray-800") +
                  " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                }
                href={github}
              >
                <i
                  className={
                    ("lg:text-white text-gray-500") +
                    " fab fa-github text-lg leading-lg "
                  }
                />
                <span className="lg:hidden inline-block ml-2">Star</span>
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
                    " fab fa-linkedin text-lg leading-lg "
                  }
                />
                <span className="lg:hidden inline-block ml-2">Star</span>
              </a>
		</div>
	)
}

export default authorProfile;