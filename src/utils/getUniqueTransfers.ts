import { TransfersState } from "../types";

function getUniqueTransfers(filterObject: TransfersState): number[] {
  const keyMap: Record<string, number> = {
    allTransfers: -1,
    withoutTransfers: 0,
    oneTransfer: 1,
    twoTransfer: 2,
    threeTransfer: 3,
  };

  if (filterObject.allTransfers) {
    return [0, 1, 2, 3];
  }
  return Object.entries(filterObject)
    .filter(([, value]) => value)
    .map(([key]) => keyMap[key]);
}

export default getUniqueTransfers;
