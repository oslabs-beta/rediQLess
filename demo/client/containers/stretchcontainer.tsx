import React from "react";
import Stretch from "../components/stretch";
import stretchInfo from "../util/stretchinfo"

const StretchContainer = () => {

	return (
		<div className="m-auto flex flex-wrap  justify-center py-10 border-2  w-4/5 bg-khaki-lighter border-deeppink-default shadow-2xl rounded-lg">
			{stretchInfo.map((el, index:number) => {
			return <Stretch key={index} title={el.title} goal={el.goal} imageLink={el.imgUrl}/>
		})}	
		</div>

	)
};

export default StretchContainer;
