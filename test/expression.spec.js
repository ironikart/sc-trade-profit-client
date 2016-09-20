/*global describe, it*/
import expect from 'expect';
import { parse, run } from '../index';

describe('User actions', () => {
    it('can be run with basic math', () => {
        let expr = parse([
            'total=a + b',
            'multiply=total * 10'
        ]);

        const scope = {a: 2, b: 4};

        let result = run(scope, expr);

        expect(result).toInclude({'total': 6});
        expect(result).toInclude({'multiply': 60});

        expect(Array.isArray(expr)).toEqual(true);
    });

    it ('can handle conditions', () => {
        let expr = parse([
            'total=a + b',
            'multiply=total*10',
            '  AND total >= 10'
        ]);

        expect(expr[1].conditions.length).toEqual(1);

        let failCondition = run({a: 1, b: 1}, expr);

        expect(failCondition).toInclude({'total': 2});
        // Failed conditions will assign a 0 value right now.
        expect(failCondition).toInclude({'multiply': 0});

        let passCondition = run({a: 5, b: 5}, expr);

        expect(passCondition).toInclude({'total': 10});
        expect(passCondition).toInclude({'multiply': 100});
    });

    it('supports descriptions', () => {
        let expr = parse([
            'total=a + b',
            '#> A single line description.',
            '#> A multi ',
            '#> line description.',
            'multiply=total*10'
        ]);

        const scope = {a: 3, b: 3};
        let result = run(scope, expr);

        expect(result).toInclude({'multiply': 60});
        expect(expr[0].description.length).toEqual(0);
        expect(expr[1].description.length).toEqual(3);
    });
});
