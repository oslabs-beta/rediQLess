/**
 * @description A component that is imported in the the feature container.  It contains the Key Features of the REDIQLESS product.  
 */

import React from "react";

const Features = () => {
	return (
		<div className="flex">
				<div className="transform transition duration-500 hover:scale-110 text-darkblue-default w-2/5 px-8 py-6 border-2 bg-white-default border-sand-default shadow-2xl rounded-lg">
					<h1 className="text-center mb-4">Key Feature #1</h1>
					<article>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</article>
				</div>
				<div className="flex items-center justify-center w-1/5">
				{/* <img className="h-4/5" src="https://rediqless.s3.us-east-2.amazonaws.com/REDIQLESS_LOGOV1.png">
				</img> */}
				<img className="h-4/5" src="https://i.ibb.co/7R3RY9c/REDIQLESS-LOGOV1-5.png"></img>
				</div>
				
				<div className="transform transition duration-500 hover:scale-110 text-darkblue-default  w-2/5 px-8 py-6 bg-white-default border-2 border-sand-default  shadow-2xl rounded-lg">
				<h1 className="text-center mb-4">Key Feature #2</h1>
					<article>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</article>
				</div>
			</div>
	)
}

export default Features;