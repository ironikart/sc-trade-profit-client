/*global describe, it*/
import expect from 'expect';
import Expression from '../src/app/util/Expression';

describe('User actions', () => {
    it('can be run with basic math', () => {
        let expr = new Expression([
            'total=a + b',
            'multiply=total * 10'
        ]);

        const scope = {a: 2, b: 4};

        let result = expr.run(scope);

        expect(result).toInclude({'total': 6});
        expect(result).toInclude({'multiply': 60});
    });

    it ('can handle conditions', () => {
        let expr = new Expression([
            'total=a + b',
            'multiply=total*10',
            '  AND total >= 10'
        ]);

        let failCondition = expr.run({a: 1, b: 1});

        expect(failCondition).toInclude({'total': 2});
        // Failed conditions will assign a 0 value right now.
        expect(failCondition).toInclude({'multiply': 0});

        let passCondition = expr.run({a: 5, b: 5});

        expect(passCondition).toInclude({'total': 10});
        expect(passCondition).toInclude({'multiply': 100});
    });

    it('supports descriptions', () => {
        let expr = new Expression([
            'total=a + b',
            '#> A single line description.',
            '#> A multi ',
            '#> line description.',
            'multiply=total*10'
        ]);

        const scope = {a: 3, b: 3};
        let result = expr.run(scope);

        expect(result).toInclude({'multiply': 60});

        const jsonExport = expr.toJSON();

        expect(jsonExport.length).toEqual(2);
        expect(jsonExport[0].assignment.name).toEqual('total');
        expect(typeof jsonExport[0].assignment.expr).toEqual('object');
        expect(jsonExport[1].assignment.name).toEqual('multiply');
        expect(jsonExport[1].description.length).toEqual(3);
        expect(jsonExport[1].description[0]).toEqual('A single line description.');
        expect(jsonExport[1].description[1]).toEqual('A multi ');
        expect(jsonExport[1].description[2]).toEqual('line description.');
    });
});
