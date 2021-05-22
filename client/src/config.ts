import { defined } from './utils';

export type EnvVarValidationFunction<T> = (
	parsedValue: T
) => string | undefined;

export class EnvVarError extends Error {}

const trueVals = ['true', '1'];
const falseVals = ['false', '0'];

export const boolEnv = (
	name: string,
	fallback?: boolean,
	validate?: EnvVarValidationFunction<boolean>
): boolean => {
	const runValidate = (val: boolean): void => {
		if (!defined(validate)) return;

		const validationResult = validate(val);

		if (!defined(validationResult)) return;

		throw new EnvVarError(validationResult);
	};

	const env = process.env[name];

	if (defined(env)) {
		const normalizedEnv = env.toLowerCase();

		if (trueVals.some(val => val === normalizedEnv)) {
			runValidate(true);

			return true;
		}

		if (falseVals.some(val => val === normalizedEnv)) {
			runValidate(false);

			return false;
		}
	}

	if (fallback !== undefined) {
		runValidate(fallback);

		return fallback;
	}

	throw new EnvVarError('Expected boolean value for env var: ' + name + '.');
};

export const requireEnv = (
	name: string,
	fallback?: string,
	validate?: EnvVarValidationFunction<string>
): string => {
	const env = process.env[name];
	let output: string | undefined;

	if (defined(env)) {
		output = env;
	} else if (defined(fallback)) {
		output = fallback;
	}

	if (!defined(output)) {
		throw new EnvVarError('Missing required env var: ' + name + '.');
	}

	if (!defined(validate)) {
		return output;
	}

	const validationResult = validate(output);

	if (defined(validationResult)) {
		throw new EnvVarError(validationResult);
	}

	return output;
};

export const numberEnv = (name: string, fallback?: number): number => {
	const env = process.env[name];
	const num = Number(env);

	if (!isNaN(num)) {
		return num;
	}

	if (fallback === undefined) {
		throw new EnvVarError(
			'Received ' + env + ' for ' + name + ' but expected number.'
		);
	}

	return fallback;
};

export const env = (name: string): string | undefined => process.env[name];

export const validateUrlTrailingSlash: (
	name: string
) => EnvVarValidationFunction<string> = name => parsedValue => {
	if (parsedValue.charAt(parsedValue.length - 1) !== '/') {
		return `${name} must be a URL with a trailing slash.`;
	}

	return;
};

export const ra = ([name]: TemplateStringsArray, ..._: never[]): string =>
	`REACT_APP_${name}`;

export const NODE_ENV = requireEnv('NODE_ENV', 'production');
export const API_URL = requireEnv(ra`API_URL`, 'http://localhost:3000');
