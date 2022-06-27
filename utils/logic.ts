interface Position {
  row: number;
  column: number;
}

export const swap = (
  array: Array<Array<number>>,
  position1: Position,
  position2: Position
) => {
  //Copy array so we don't mutate the original
  //We have to use JSON.parse and stringify because of JS weirdness
  const arr = JSON.parse(JSON.stringify(array));
  try {
    const temp = arr[position1.row][position1.column];
    arr[position1.row][position1.column] = arr[position2.row][position2.column];
    arr[position2.row][position2.column] = temp;
  } catch (error) {
    console.error(error);
  }

  return arr;
};

export const findItem = (
  array: Array<Array<number>>,
  element: number | string
) => {
  let position: Position;

  array.map((row, iR) => {
    row.map((column, iC) => {
      if (column === element) {
        position = { row: iR, column: iC };
      }
    });
  });
  //@ts-ignore
  return position || null;
};

export const findNearby = (array: Array<Array<number>>, curItem: Position) => {
  const left =
    curItem.column > 0
      ? {
          item: array[curItem.row][curItem.column - 1],
          position: { row: curItem.row, column: curItem.column - 1 },
        }
      : null;
  const right =
    curItem.column < array[0].length
      ? {
          item: array[curItem.row][curItem.column + 1],
          position: { row: curItem.row, column: curItem.column + 1 },
        }
      : null;
  const top =
    curItem.row > 0
      ? {
          item: array[curItem.row - 1][curItem.column],
          position: { row: curItem.row - 1, column: curItem.column },
        }
      : null;
  const bottom =
    curItem.row < array.length
      ? {
          item: array[curItem.row + 1][curItem.column],
          position: { row: curItem.row + 1, column: curItem.column },
        }
      : null;

  return { left, right, top, bottom };
};
