// // import dependencies
// import React from 'react';

// // // import API mocking utilities from Mock Service Worker
// // import {rest} from 'msw'
// // import {setupServer} from 'msw/node'

// // add custom jest matchers from jest-dom
// import '@testing-library/jest-dom'

// // import react-testing methods
// import {render, fireEvent, waitFor, screen} from '@testing-library/react';

// //import query component
// import Query from '../client/components/query';



// test('load query component and query button is clickable', async () => {
// 	// Arrange
// 	render(<Query />)
// 	// Act
// 	fireEvent.click(screen.getByText('Query'))

// 	// wait until the `get` request promise resolves and
// 	// the component calls setState and re-renders.
// 	// `waitFor` waits until the callback doesn't throw an error
// 	await waitFor(() =>
// 	// getByRole throws an error if it cannot find an element
// 	screen.getByRole('button'),
// )
// 	// Assert
// 	// assert that the button is not disabled using
// 	// toBeDisabled, a custom matcher from jest-dom.
// 	expect(screen.getByRole('button')).not.toBeDisabled()
//   })