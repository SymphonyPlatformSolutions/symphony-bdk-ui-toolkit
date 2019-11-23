import uuid from 'uuid';

// Recursively label each renderable object with a uuid
export const labelize = (obj) => {
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

export const buildSelectableArray = (obj) => {
  if (!obj || !obj.length) {
    return [];
  }
  return obj.reduce((acc, el) => {
    if (el.suboptions) {
      return [...acc, ...el.suboptions];
    }
    return [...acc, el];
  }, []);
};

export const getItemFromUid = (content, uid) => {
  for (let i = 0; i < content.length; i++) {
    if (content[i].suboptions) {
      for (let j = 0; j < content[i].suboptions.length; j++) {
        if (content[i].suboptions[j].uid === uid) {
          return content[i].suboptions[j];
        }
      }
    } else if (content[i].uid === uid) {
      return content[i];
    }
  }
  return null;
};
