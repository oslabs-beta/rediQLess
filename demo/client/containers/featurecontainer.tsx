/**
 * @description This section of the SPA is the feature component.  It describes the key features of our product.
 */

 import React from "react";



 const FeaturesContainer = () => {

	return (
		<div className="items-center">
			<h1 className="text-center mt-10 mb-10">Not just caching, it's RediQLess.</h1>
			<div className="flex justify-around">
				<div>
					Feature 1
				</div>
				<div>
					Logo
				</div>
				<div>
					Feature 2
				</div>
			</div>
		</div>
	)
 }

 export default FeaturesContainer;