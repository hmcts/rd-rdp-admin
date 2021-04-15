module.exports = {
	root: false,
	env: { browser: true, es6: true, node: true },
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:@angular-eslint/recommended',
		'prettier/@typescript-eslint',
	],

	parserOptions: {
		project: ['./tsconfig.eslint.json'],
		tsconfigRootDir: __dirname,
		sourceType: 'module',
		extraFileExtensions: ['.json', '.lock'],
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'prettier/prettier': 'off',

		'lines-between-class-members': 'off',
		'no-useless-constructor': 'off',
		'no-restricted-syntax': 'off',
		'prefer-const': 'off',
		'import/prefer-default-export': 'off',
		'implicit-arrow-linebreak': 'off',
		'object-curly-newline': [
			'off',
			{
				ObjectExpression: 'never',
				ObjectPattern: { multiline: true },
				ImportDeclaration: 'always',
				ExportDeclaration: { multiline: true, minProperties: 3 },
			},
		],
		'function-paren-newline': 'off',

		'@typescript-eslint/no-unsafe-call': 'warn',
		'@typescript-eslint/restrict-plus-operands': 'warn',
		'@typescript-eslint/no-useless-constructor': ['warn'],
		'@typescript-eslint/no-unsafe-assignment': 'warn',
		'@typescript-eslint/no-unsafe-return': 'warn',
		'@typescript-eslint/no-var-requires': 'warn',
		'@typescript-eslint/unbound-method': 'off',
		'@typescript-eslint/require-await': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'warn',
		'@typescript-eslint/restrict-template-expressions': 'warn',
		'@typescript-eslint/ban-ts-comment': 'warn',
		'@typescript-eslint/ban-types': 'warn',
		'@typescript-eslint/no-inferrable-types': 'warn',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/no-misused-promises': ['off', { checksConditionals: false }],

		'@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],
	},
};