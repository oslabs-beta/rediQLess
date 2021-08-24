import React from "react";



const Hype = () => {
	return (
	<div>
		<div className="flex justify-evenly py-12">
			<div className="text-center">
				<h1 className="mb-6">Hype 1</h1>
                <button className="transition duration-300 ease-in-out py-3 px-6 text-white rounded-lg bg-deeppink-default">LOADING</button>
				<article>Lorem ipsum blah blah blah</article>
			</div>
            <img className="max-w-md transition ease-out duration-700" src="http://neologisms.blogs.wm.edu/files/2016/03/vaporwave-1.jpg"/>
		</div>
		<div className="flex justify-evenly py-12">
			<img className="max-w-md"  src="http://neologisms.blogs.wm.edu/files/2016/03/vaporwave-1.jpg"/>
			<div className="text-center">
				<h1 className="mb-6">Hype 1</h1>
				<article>Lorem ipsum blah blah blah</article>
			</div>
		</div>
		<div className="flex justify-evenly py-12">
		<div className="text-center">
				<h1 className="mb-6">Hype 1</h1>
				<article>Lorem ipsum blah blah blah</article>
			</div>
			<img className="max-w-md transform hover:animate-bounce hover:rotate-45"  src="http://neologisms.blogs.wm.edu/files/2016/03/vaporwave-1.jpg"/>
		</div>
	</div>
		
	)
};

export default Hype;