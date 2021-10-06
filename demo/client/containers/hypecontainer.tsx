/**
 * @description The Hype container contains the hype component which informs the user the core features of RediQLess
 */

import React from "react";
import Hype from "../components/hype";

const HypeContainer = () => {

	return (
		<div className="m-auto py-10 px-6 border-2 w-4/5 bg-khaki-lighter border-deeppink-default shadow-2xl rounded-lg
		md:flex-col
		md:items-center">
			<Hype/>
		</div>

	)
};

export default HypeContainer;