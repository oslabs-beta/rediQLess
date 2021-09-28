/**
 * @jsdom
 */

// import dependencies
import React from 'react';

// import react-testing methods
import {render,screen} from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

//import query component
import Query from '../client/components/query';


describe('Query container', ()=> {
	test('load query component and query button is clickable',  () => {
		// Arrange
		render(<Query />)
		const linkElement = screen.getByText(/Query/i);
		expect(linkElement).toBeInTheDocument();
		// Act

		// Assert
		
	  })
})
