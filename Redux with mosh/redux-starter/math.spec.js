import { isEven } from './src/math';

describe("isEven",() => {

    it("should return true if given an even number", () => {
        // function under test (SUT)
        const result = isEven(2);
        expect(result).toEqual(true);
    })
    
    it("should return false if given an odd number", () => {
        // function under test (SUT)
        const result = isEven(1);
        expect(result).toEqual(false);
    })
})
