// Use this file to generated the fake data.
const Faker = require('faker');

const OPERATION_TYPES = [
  'Run',
  'Axe',
  'RFQ',
];

const ASSET_CLASSES = [
  'Stock',
  'Corp Bond',
];

const STOCK_SYMBOLS = [
  'NTFLX',
  'FB',
  'FITB',
  'Peak',
  'HES',
  'KHZ',
  'JBHT',
];

const COPORATE_BONDS = [
  'LQD',
  'VCSH',
  'VCIT',
  'IGSB',
  'FLOT',
  'IGIB',
  'SPSB',
  'SPIB',
  'VCLT',
  'USIG',
  'FLRN',
  'GSY',
];


const generateSSEDemoData = (size = 10) => {
  const data = [];
  for (let i = 0; i < size; i++) {
    const type = OPERATION_TYPES[Faker.random.number(OPERATION_TYPES.length - 1)];
    const asset = ASSET_CLASSES[Faker.random.number(ASSET_CLASSES.length - 1)];
    const product = asset === ASSET_CLASSES[0]
      ? STOCK_SYMBOLS[Faker.random.number(STOCK_SYMBOLS.length - 1)]
      : `${COPORATE_BONDS[Faker.random.number(COPORATE_BONDS.length - 1)]} 9 5/8 ${Faker.random.number(50)}`;


    const dealerData = Faker.random.boolean()
      ? {
        name: `${Faker.name.findName()}`,
        link: 'http://www.example.com',
      }
      : {
        name: 'Multiple',
        link: null,
      };

    let bidSize = null,
      bidPrice = null,
      askPrice = null,
      askSize = null;

    if (type === OPERATION_TYPES[1]) {
      if (Faker.random.boolean()) {
        bidSize = Faker.random.number(500);
        bidPrice = Faker.random.number(500);
      } else {
        askSize = Faker.random.number(500);
        askPrice = Faker.random.number(500);
      }
    } else {
      bidPrice = Faker.random.number(500);
      askPrice = bidPrice + 1;
      askSize = Faker.random.number(500);
      bidSize = Faker.random.number(500);
    }

    data.push({
      id: Faker.finance.account(),
      type,
      asset,
      product,
      bidSize,
      bid: bidPrice,
      ask: askPrice,
      askSize,
      time: Faker.date.recent(),
      dealer: dealerData,
      comment: '',
    });
  }
  return data;
};

const RandomlyUpdateSSEDemoData = (data) => {
  const tmpArr = Array.from(data);
  const updatedChosen = [];
  const numberOfUpdatedEntries = 1 + Faker.random.number(4);

  for (let i = 0; i < numberOfUpdatedEntries; i++) {
    const index = Faker.random.number(tmpArr.length - 1);
    updatedChosen.push(
      tmpArr.splice(index, 1)[0],
    );
  }

  updatedChosen.forEach((row) => {
    if (row.type === OPERATION_TYPES[1]) {
      if (row.bid !== null) {
        row.bidSize = Faker.random.number(500);
        row.bid = Faker.random.number(500);
      } else {
        row.askSize = Faker.random.number(500);
        row.ask = Faker.random.number(500);
      }
    } else {
      row.bid = Faker.random.number(500);
      row.ask = row.bid + Faker.random.number(3);
      row.askSize = Faker.random.number(500);
      row.bidSize = Faker.random.number(500);
    }
    row.time = Faker.date.recent();
  });

  updatedChosen.forEach((entry) => {
    const index = data.findIndex(elem => elem.id === entry.id);
    data[index] = entry;
  });

  return updatedChosen;
};

const RandomlyDeleteSSEDemoData = (data) => {
  const index = Faker.random.number(data.length - 1);
  const chosen = data[index];
  data.splice(index, 1);
  return [chosen];
};
const RandomlyCreateSSEDemoData = (data) => {
  const created = generateSSEDemoData(1);
  data.push(created[0]);
  return created;
};

module.exports = {
  generateSSEDemoData,
  RandomlyUpdateSSEDemoData,
  RandomlyDeleteSSEDemoData,
  RandomlyCreateSSEDemoData,
};
