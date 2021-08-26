import React from "react";
import Chart from "../components/chart";

const DemoContainer = () => {
    return (
	<div className="m-auto mt-20 py-10 border-2 border-gray-50 w-4/5 bg-darkblue-default border-deeppink-default shadow-2xl rounded-lg">
		<div>
			<h1 className="text-center">RediQLess Metrics</h1>
		</div>
        <Chart/>
    </div>
	)
}

export default DemoContainer;
