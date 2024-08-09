const handleObjectData = (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === "bigint") {
      obj[key] = obj[key].toString();
    }
  }
  return obj;
};

const handleArrayData = (arr) => {
  return arr.map((obj) => {
    for (let key in obj) {
      if (typeof obj[key] === "bigint") {
        obj[key] = obj[key].toString();
      }
    }
    return obj;
  });
};

module.exports = { handleArrayData, handleObjectData };
