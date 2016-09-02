import { ExtendableError } from './ExtendableError';

class ExpressionError extends ExtendableError {
    constructor(m) {
        super(m);
    }
}

export { ExpressionError };