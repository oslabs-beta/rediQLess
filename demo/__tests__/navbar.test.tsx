/**
 * @description Testing the functionality of the navigation bar to see if components are renderer after the the button is clicked.
 */

// import dependencies
import React from 'react';

// import react-testing methods
import {render,screen} from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

//import query component
import Navbar from '../client/containers/navcontainer';


describe('Testing the functionality of the Nav bar', ()=> {
	test('When Features button is clicked the features component and it\'s children show up',  () => {
		// Arrange
		render(<Navbar/>)
		const featuresButton = screen.getByText(/Features/i);
		expect(featuresButton).toBeInTheDocument();
		// Act

		// Assert
		
	  })
})
