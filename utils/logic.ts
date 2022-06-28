interface Position {
  row: number;
  column: number;
}

interface NearbyItem {
  item: number;
  position: Position;
}
interface Nearby {
  top: NearbyItem | null;
  bottom: NearbyItem | null;
  left: NearbyItem | null;
  right: NearbyItem | null;
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
  //Return nothing if there is no item
  //@ts-ignore
  return position || null;
};

export const findNearby = (
  array: Array<Array<number>>,
  curItem: Position
): Nearby => {
  //We have to check whether each item exists before accessing it
  //We can do this by checking whether the index of the item we
  //are trying to find is at the start of the end of the array
  //If it meets either of these conditions, we return null
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

export const moveDirection = (
  array: Array<Array<number>>,
  element: number,
  direction: "top" | "down" | "left" | "right"
) => {
  //Copy array so as to not mutate the original
  const arr: Array<Array<number>> = JSON.parse(JSON.stringify(array));

  const itemPos = findItem(arr, element);
  const nearbyItems = findNearby(arr, itemPos);

  const elm = nearbyItems[direction as keyof Nearby];

  if (!elm || elm.item > 0) {
    // Return unmodified array as action is illegal
    return arr;
  } else {
    return swap(arr, itemPos, elm.position);
  }
};

export const shuffle2DArray = (array: Array<Array<number>>, times = 40) => {
  //Copy array - we let this be mutable as we are changing it 40 times
  let arr: Array<Array<number>> = JSON.parse(JSON.stringify(array));

  for (let i = 0; i <= 40; i++) {
    const empSpace = findItem(array, 0);

    //Find nearby and remove values that aren't valid
    const nearby = Object.fromEntries(
      Object.entries(findNearby(array, empSpace)).filter((i) => i != null)
    );

    //Pick random item from object
    const keys = Object.keys(nearby);
    // @ts-ignore
    nearby[keys[Math.floor(Math.random() * keys.length)]];

    //Make the move!
    arr = swap(arr, empSpace, nearby.position);
  }
  return arr;
};
