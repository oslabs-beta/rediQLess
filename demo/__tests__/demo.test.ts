import {addTwo} from '../faketest';

describe('This is the fake test section', ()=> {
	it('has an answer of three', ()=>{
		expect(1 + 2).toBe(3)
	})

	test('Add Two function with arg of 1 to have result of 3', () => {
		expect(addTwo(1)).toBe(3)
	});
	
	test('basic again', () => {
		expect(addTwo(0)).toBe(2)
	})
})
