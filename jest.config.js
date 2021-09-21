module.exports = {
	roots: ['<rootDir>/demo/__tests__'],
	testMatch: [
		'**/__tests/**/*.+(ts|tsx|js)',
		'**/?(*.)+(spec|test).+(ts|tsx|js)',
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
};
