export const buildBackReference = (arr, startPoint) => {
  let globalIndex = startPoint;
  let currSmartSize = 0;
  let resultArr = [];
  let subArray;
  let savePoint = -1;
  let smartSize;
  for (let i = 0; i < arr.length; i += 1) {
    if (!Array.isArray(arr[i])) {
      if (savePoint >= 0) {
        resultArr.push(savePoint);
        savePoint = -1;
      } else {
        resultArr.push(globalIndex - 1 < 0 ? 0 : globalIndex - 1);
      }
      globalIndex += 1;
      currSmartSize += 1;
    } else {
      [subArray, smartSize] = buildBackReference(arr[i], globalIndex);
      if (savePoint >= 0) {
        subArray[0] = savePoint;
      }
      savePoint = globalIndex;
      globalIndex += smartSize;
      currSmartSize += smartSize;
      resultArr = [...resultArr, ...subArray];
    }
  }
  if (startPoint === 0) {
    return [...resultArr, savePoint >= 0 ? savePoint : currSmartSize - 1];
  }
  return [resultArr, currSmartSize];
};

export const deepInsert = (item, arr, endpoints) => {
  let newSet;
  if (!arr || !arr.length) {
    if (Array.isArray(endpoints)) {
      [newSet] = deepInsert(item, null, endpoints[0]);
      return [[newSet], true];
    }
    return [item, true];
  }

  let placedNew;
  for (let i = 0; i < arr.length; i += 1) {
    if (Array.isArray(endpoints[i])) {
      [newSet, placedNew] = deepInsert(item, arr[i], endpoints[i]);
      if (placedNew) {
        const withoutLast = arr.slice(0, arr.length - 1);
        return [[...withoutLast, newSet], true];
      }
    }
  }

  if (arr.length === endpoints.length) {
    return [arr, false];
  }

  if (Array.isArray(endpoints[arr.length])) {
    [newSet, placedNew] = deepInsert(item, null, endpoints[arr.length]);

    return [[...arr, newSet], true];
  }

  return [[...arr, item], true];
};

export const deepReplaceLast = (item, arr) => {
  if (!arr || !arr.length) {
    return item;
  }
  const withoutLast = arr.slice(0, arr.length - 1);
  if (Array.isArray(arr[arr.length - 1])) {
    const newSet = deepReplaceLast(item, arr[arr.length - 1]);

    return [...withoutLast, newSet];
  }
  return [...withoutLast, item];
};
