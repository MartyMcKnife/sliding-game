import { swap } from './../../utils/logic';

describe('Swap Function', () => {
    const testData = {
        array: [[0,1,2],[3,4,5],[6,7,8]],
        position1: {
            row: 0,
            column: 0
        },
        position2: {
            row: 1,
            column: 0
        }

    } 
    test('should return a multidimensional array', () => { 
        const output = swap(testData.array, testData.position1, testData.position2)
        expect(Array.isArray(output)).toBe(true)
        expect(Array.isArray(output[0])).toBe(true)
     })
     test('should swap values', () => {
        console.log(`Before swap: ${testData.array}`)
        const output = swap(testData.array, testData.position1, testData.position2)
        console.log(`After swap: ${output} (Original: ${testData.array})`)
        expect(output).toStrictEqual([[3,1,2],[0,4,5],[6,7,8]])
     } )
     test('should return same array if out of bounds', () => {
        const output = swap(testData.array, testData.position1, {row: 9, column: 1})
        expect(output).toStrictEqual(testData.array)
     })
 })