/*global describe, it*/
import expect from 'expect';
import Expression from '../src/app/util/Expression';

describe('User actions', () => {
    it('can be run with basic math', () => {
        var expr = new Expression([
            'total=a + b',
            'multiply=total * 10'
        ]);

        var scope = {a: 2, b: 4};

        var result = expr.run(scope);

        expect(result).toInclude({'total': 6});
        expect(result).toInclude({'multiply': 60});
    });

    it ('can handle conditions', () => {
        var expr = new Expression([
            'total=a + b',
            'multiply=total*10',
            '  AND total >= 10'
        ]);

        var failCondition = expr.run({a: 1, b: 1});

        expect(failCondition).toInclude({'total': 2});
        // Failed conditions will assign a 0 value right now.
        expect(failCondition).toInclude({'multiply': 0});

        var passCondition = expr.run({a: 5, b: 5});

        expect(passCondition).toInclude({'total': 10});
        expect(passCondition).toInclude({'multiply': 100});
    });
});
