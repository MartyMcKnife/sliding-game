export const calcRaw = (time: number, moves: number) => {
  return time * moves;
};

export const calcActual = (time: number, moves: number) => {
  const raw = 500000 - calcRaw(time, moves);

  return raw < 0 ? 0 : raw;
};
