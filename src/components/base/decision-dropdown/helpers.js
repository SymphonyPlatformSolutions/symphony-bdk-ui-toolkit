import uuid from 'uuid';

// Recursively label each renderable object with a uuid
// Returns a deep copy of the object, but every group and option has a uid key
export const labelize = (obj) => {
  if (!obj) {
    return null;
  }
  if (Array.isArray(obj)) {
    return obj.map(l => labelize(l));
  }
  if (obj.options) {
    return {
      ...obj,
      uid: uuid.v4(),
      options: obj.options.map(l => labelize(l)),
    };
  }
  if (obj.suboptions) {
    return {
      ...obj,
      uid: uuid.v4(),
      suboptions: obj.suboptions.map(l => labelize(l)),
    };
  }
  return { ...obj, uid: uuid.v4() };
};

const filteringFunction = (obj, filterQuery) => {
  if (!filterQuery) {
    return true;
  }
  const lowercaseQuery = filterQuery.toLowerCase();
  if (obj.label.toLowerCase().includes(lowercaseQuery)) {
    return true;
  } if (obj.sublabel) {
    return obj.sublabel.toLowerCase().includes(lowercaseQuery);
  }
  return false;
};

// Returns an array of filtered selectable options from the object
// The options object is not iterable as it is, so converting it to an
// array gives order to the options
export const buildSelectableArray = (obj, filterQuery = '') => {
  if (!obj || !obj.length) {
    return [];
  }
  return obj.reduce((acc, el) => {
    if (el.suboptions) {
      return [...acc, ...el.suboptions.filter(x => filteringFunction(x, filterQuery))];
    }
    if (filteringFunction(el, filterQuery)) {
      return [...acc, el];
    }
    return acc;
  }, []);
};
