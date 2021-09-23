/**
 * @jsdom
 */

// import dependencies
import React from 'react';

// import react-testing methods
import {render, fireEvent, waitFor, screen} from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

//import query component
import Query from '../client/components/query';



test('load query component and query button is clickable', async () => {
	// Arrange
	render(<Query />)
	// Act
	fireEvent.click(screen.getByText('Query'))

	// Assert

  })