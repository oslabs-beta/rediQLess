import React from "react";
import Query from "../components/query";
import Chart from "../components/chart";

const DemoContainer = () => {
    return (
	<div className="bg-khaki-lighter ml-auto mr-auto mt-10 mb-10 p-10 border-2  w-4/5 text-darkblue-default border-deeppink-default shadow-2xl rounded-lg">
		<div className="">
			<h1 className="text-center">The Numbers Speak For Themselves.</h1>
		</div>
		<div className="flex justify-evenly">
		<Query />
        <Chart/>
		</div>
    </div>
	)
}

export default DemoContainer;
