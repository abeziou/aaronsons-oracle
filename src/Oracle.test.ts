import Oracle, { type FivegramCount } from "./Oracle.ts";

describe('test predictions', () => {
    test("should predict 'f' with insufficient guesses", () => {
        const oracle = new Oracle();
        expect(oracle.predictLetter()).toEqual('f');
        
        [..."ddd"].forEach(l => oracle.recordLetter(l));
        expect(oracle.predictLetter()).toEqual('f');
    });

    test("should predict highest count letter", () => {
        const oracle = new Oracle(new Map<string, FivegramCount>([
            ["fffff",  { fCount: 1, dCount: 0 }],
            ["ffffd",  { fCount: 0, dCount: 1 }]
        ]));

        // "fffff" fivegram has fCount > dCount -> should predict f
        [..."fffff"].forEach(l => oracle.recordLetter(l));
        expect(oracle.predictLetter()).toEqual('f');
        
        // typing d changes latest fivegram to "ffffd" with 
        // dCount > fCount -> should predict d
        oracle.recordLetter('d');
        expect(oracle.predictLetter()).toEqual('d');
    });
});