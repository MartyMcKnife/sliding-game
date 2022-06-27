interface Position {
    row: number;
    column: number;
}


export const swap = (array: Array<Array<number>>, position1: Position, position2: Position) => {
    //Copy array so we don't mutate the original
    //We have to use JSON.parse and stringify because of JS weirdness
    const arr = JSON.parse(JSON.stringify(array));
    try {
        const temp = arr[position1.row][position1.column];
        arr[position1.row][position1.column] = arr[position2.row][position2.column];
        arr[position2.row][position2.column] = temp

    } catch (error) {
        console.error(error)
    }

    return arr
}