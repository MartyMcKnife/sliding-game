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
    console.error(error, array, position1, position2);
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
    curItem.column < array[0].length - 1
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
    curItem.row < array.length - 1
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
  direction?: "top" | "down" | "left" | "right"
) => {
  //Copy array so as to not mutate the original
  const arr: Array<Array<number>> = JSON.parse(JSON.stringify(array));

  const itemPos = findItem(arr, element);
  const nearbyItems = findNearby(arr, itemPos);

  //Remove all null items from nearbyItems
  const nearby = Object.fromEntries(
    Object.entries(nearbyItems).filter(([_, v]) => v != null)
  );

  let elm: NearbyItem | null;
  if (direction) {
    elm = nearbyItems[direction as keyof Nearby];
  } else {
    //Find lowest item in nearbyItems
    const lowest = Object.values(nearby).reduce((lowest, item) => {
      if (item && item.item < lowest.item) {
        return item;
      } else {
        return lowest;
      }
    });
    elm = lowest;
  }
  if (elm) {
    if (element === 0 || elm.item === 0) {
      return swap(arr, itemPos, elm.position);
    } else {
      return arr;
    }
  } else {
    return arr;
  }
};

export const shuffle2DArray = (array: Array<Array<number>>, times = 500) => {
  //Copy array - we let this be mutable as we are changing it 50 times
  let arr: Array<Array<number>> = JSON.parse(JSON.stringify(array));

  for (let i = 0; i <= times; i++) {
    const empSpace = findItem(arr, 0);

    //Find nearby and remove values that aren't valid
    if (empSpace) {
      const nearby = Object.fromEntries(
        Object.entries(findNearby(arr, empSpace)).filter(([_, v]) => v != null)
      );

      //Pick random item from object
      const keys = Object.keys(nearby);
      // @ts-ignore
      const nearChosen = nearby[keys[Math.floor(Math.random() * keys.length)]];
      //Make the move!
      arr = swap(arr, empSpace, nearChosen.position);
    }
  }
  return arr;
};

export const genGame = (rows: number, columns: number, shuffle = true) => {
  //Start at 1 to avoid 0 being first item
  let start = 1;
  let array: Array<Array<number>> = [];

  for (let i = rows - 1; i >= 0; i--) {
    let tempArr: Array<number> = [];
    for (let j = columns - 1; j >= 0; j--) {
      tempArr.push(start);
      start += 1;
    }
    array.push(tempArr);
  }

  //Before performing the return, we need to replace the last item with a 0, to make the game work
  array[array.length - 1][array[0].length - 1] = 0;

  return shuffle ? shuffle2DArray(array) : array;
};

export const checkSolved = (
  array: Array<Array<number>>,
  element: number,
  reference: Array<Array<number>>
) => {
  //Get relevant positions
  const curPos = findItem(array, element);
  const correctPos = findItem(reference, element);
  //Logical check - will return true/false depending on evaluation
  return curPos.column === correctPos.column && curPos.row === correctPos.row;
};
