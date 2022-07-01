import {
  swap,
  findItem,
  findNearby,
  moveDirection,
  shuffle2DArray,
  genGame,
  checkSolved,
} from "./../../utils/logic";

const testData = {
  array: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ],
  position1: {
    row: 0,
    column: 0,
  },
  position2: {
    row: 1,
    column: 0,
  },
  item: 1,
};

describe("Swap Function", () => {
  test("should return a multidimensional array", () => {
    const output = swap(testData.array, testData.position1, testData.position2);
    expect(Array.isArray(output)).toBe(true);
    expect(Array.isArray(output[0])).toBe(true);
  });
  test("should swap values", () => {
    const output = swap(testData.array, testData.position1, testData.position2);
    expect(output).toStrictEqual([
      [3, 1, 2],
      [0, 4, 5],
      [6, 7, 8],
    ]);
  });
  test("should return same array if out of bounds", () => {
    const output = swap(testData.array, testData.position1, {
      row: 9,
      column: 1,
    });
    expect(output).toStrictEqual(testData.array);
  });
});

describe("Find item", () => {
  test("Returns object with row and column", () => {
    const output = findItem(testData.array, testData.item);

    expect(output).toHaveProperty("row");
    expect(output).toHaveProperty("column");
  });

  test("Returns object with right row and column", () => {
    const output = findItem(testData.array, testData.item);

    expect(output).toHaveProperty("row", 0);
    expect(output).toHaveProperty("column", 1);
  });

  test("Returns null if no item found", () => {
    expect(findItem(testData.array, 99)).toBeNull();
  });
});

describe("Find Nearby", () => {
  const position = findItem(testData.array, testData.item);
  test("should return four items", () => {
    expect(findNearby(testData.array, position)).toMatchObject({
      top: null,
      bottom: expect.anything(),
      left: expect.anything(),
      right: expect.anything(),
    });
  });

  test("should return the right numbers", () => {
    expect(findNearby(testData.array, position)).toMatchObject({
      top: null,
      left: {
        item: 0,
        position: {
          row: 0,
          column: 0,
        },
      },
      right: {
        item: 2,
        position: {
          row: 0,
          column: 2,
        },
      },
      bottom: {
        item: 4,
        position: {
          row: 1,
          column: 1,
        },
      },
    });
  });
});

describe("move Direction", () => {
  test("should return the same array if no move exists", () => {
    expect(moveDirection(testData.array, 1, "top")).toStrictEqual(
      testData.array
    );
  });

  test("should return same array if not swapping with a 0", () => {
    expect(moveDirection(testData.array, 4, "top")).toStrictEqual(
      testData.array
    );
  });

  test("should work as expected (moves in specified direction)", () => {
    expect(moveDirection(testData.array, 1, "left")).toStrictEqual([
      [1, 0, 2],
      [3, 4, 5],
      [6, 7, 8],
    ]);
  });
});

describe("shuffle", () => {
  test("should shuffle the array", () => {
    expect(shuffle2DArray(testData.array)).not.toBe(testData.array);
  });

  test("should shuffle between rows", () => {
    expect(shuffle2DArray(testData.array)[0]).not.toContain([1, 2, 3]);
  });
});

describe("generate Game", () => {
  test("should generate a base board", () => {
    expect(genGame(2, 2, false)).toStrictEqual([
      [1, 2],
      [3, 0],
    ]);
  });

  test("should generate a 1x1 (honestly why)", () => {
    expect(genGame(1, 1, false)).toStrictEqual([[0]]);
  });

  test("should handle uneven amount of rows", () => {
    expect(genGame(2, 1, false)).toStrictEqual([[1], [0]]);
  });

  test("should handle uneven amount of columns", () => {
    const out = genGame(1, 2, false);
    console.log(`Uneven Cols : ${out}`);
    expect(out).toStrictEqual([[1, 0]]);
  });

  test("should shuffle the board after generation", () => {
    const out = genGame(2, 2);
    console.log(`Shuffled 2x2: ${out}`);
    expect(out).not.toBe([
      [1, 2],
      [3, 0],
    ]);
  });

  test("should still shuffle with odd amounts of row/cols", () => {
    const out = genGame(1, 2);
    console.log(`Shuffled 1x2: ${out}`);
    expect(out).not.toBe([[1, 0]]);
  });
});

describe("check solved", () => {
  test("should return false if in wrong spot", () => {
    expect(
      checkSolved(
        [
          [0, 2, 1],
          [3, 4, 5],
          [6, 7, 8],
        ],
        2,
        testData.array
      )
    ).toBe(false);
  });
  test("should return true if in right spot", () => {
    expect(
      checkSolved(
        [
          [0, 2, 1],
          [3, 4, 5],
          [6, 7, 8],
        ],
        0,
        testData.array
      )
    ).toBe(true);
  });
});
