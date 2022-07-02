//Inverter for keyboard directions - our logic is based on empty tile being ref, but player will assume they are moving towards it
export const dirs = {
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top",
};

export const parsedA = {
  ArrowLeft: dirs["left"],
  ArrowRight: dirs["right"],
  ArrowUp: dirs["top"],
  ArrowDown: dirs["bottom"],
};

export const parsedB = {
  w: dirs["top"],
  a: dirs["left"],
  s: dirs["bottom"],
  d: dirs["right"],
};
