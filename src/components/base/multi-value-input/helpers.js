export const flattenArray = arr => arr.reduce((acc, el) => {
  if (!Array.isArray(el)) {
    return [...acc, el];
  }
  return [...acc, ...flattenArray(el)];
}, []);

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
