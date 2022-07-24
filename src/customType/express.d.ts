// ./src/customType/express.d.ts

declare global {
	namespace Express {
		interface Request {
			requestTime?: string | number | undefined;
		}
	}
}