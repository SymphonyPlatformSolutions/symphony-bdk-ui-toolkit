// Use this file to generated the fake data.
const Faker = require('faker');

/*
  -- DEMO
  Demo mock information, for the purpose of showing a full react-redux flow.
  It can - and should - be deleted when developing your own integration.
*/
function generateDemoInfo() {
  return [
    {
      id: 9,
      name: 'Jiló',
      isFruit: false,
      actionsMenu: [{
        label: 'Edit',
        callback: (item) => {
          console.log('Item', item);
        },
        type: 'primary',
      }],
    },
    { id: 1, name: 'Açaí', isFruit: true },
    { id: 2, name: 'Pitaya', isFruit: true },
    { id: 7, name: 'Moranga', isFruit: false },
    { id: 5, name: 'Pitanga', isFruit: true },
    { id: 0, name: 'Guarana', isFruit: true },
    { id: 10, name: 'Maxixe', isFruit: false },
    { id: 6, name: 'Cará', isFruit: false },
    { id: 4, name: 'Sapoti', isFruit: true },
    { id: 8, name: 'Chuchu', isFruit: false },
    { id: 3, name: 'Graviola', isFruit: true },
  ];
}

function getBotRooms() {
  return [
    { name: 'Bot Room A', stream_id: 'streamID01' },
    { name: 'Bot Room B', stream_id: 'streamID02' },
    { name: 'Bot Room C', stream_id: 'streamID03' },
  ];
}

const mockInstances = [{
  name: 'Main instance',
  url: 'https://main.instance.com',
  id: '1',
}, {
  name: 'Premised instance',
  url: 'https://premised.instance.com',
  id: '2',
}];

const initMockNotifications = [{
  name: 'Ali',
  instance_id: '1',
  is_editable: true,
  id: '1',
}, {
  name: 'Barry',
  instance_id: '2',
  is_editable: false,
  id: '2',
}, {
  name: 'Carrie',
  instance_id: '1',
  is_editable: true,
  id: '3',
}];

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

  return updatedChosen;
};


module.exports = {
  generateDemoInfo, getBotRooms, mockInstances, initMockNotifications, generateSSEDemoData, RandomlyUpdateSSEDemoData,
};
