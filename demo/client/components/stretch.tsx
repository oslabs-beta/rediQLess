import React from 'react';

interface StretchInfo {
	title: string,
	goal: string,
  imageLink : string,
}

const Stretch = ({title, goal, imageLink}: StretchInfo):JSX.Element => {
  return (
    <div className="w-1/2">
        <div className="py-12">
          <div className="transform transition duration-500 hover:scale-110 text-center mx-6 text-white-default bg-deeppink-default shadow-2xl rounded-lg border-darkblue-default border-2">
            <h2 className="mb-2 p-3">{title}</h2>
            <img className="m-auto"src={imageLink}/>
            <p className="p-3">{goal}</p>
          </div> 
        </div>
    </div>
  )
}

export default Stretch
