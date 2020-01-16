// This is responsible to create the mock server.
const jsonServer = require('json-server');
const Faker = require('faker');
const MockCandlestickChartData = require('./data/msft');
const MockCandlestickIntradayData = require('./data/msft');

const US_BOND_2_YR_DATA = require('./data/us-bond-2yr-daily');
const US_BOND_5_YR_DATA = require('./data/us-bond-5yr-daily');
const US_BOND_10_YR_DATA = require('./data/us-bond-10yr-daily');
const US_BOND_30_YR_DATA = require('./data/us-bond-30yr-daily');

MockCandlestickChartData.forEach((entry) => {
  entry.close = parseFloat(entry.close, 10);
  entry.high = parseFloat(entry.high, 10);
  entry.low = parseFloat(entry.low, 10);
  entry.open = parseFloat(entry.open, 10);
  entry.volume = parseFloat(entry.volume, 10);
});

MockCandlestickIntradayData.forEach((entry) => {
  entry.id = Faker.finance.account();
  entry.high = parseFloat(entry.high, 10);
  entry.low = parseFloat(entry.low, 10);
  entry.open = parseFloat(entry.open, 10);
  entry.volume = parseFloat(entry.volume, 10);
});

MockCandlestickIntradayData.sort((a, b) => new Date(a.date) - new Date(b.date));

const {
  generateSSEDemoData,
  RandomlyUpdateSSEDemoData,
  RandomlyCreateSSEDemoData,
  DeleteSSEDemoData,
  createChartData,
  updateChartData,
} = require('./mock-file');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const SSE_EVENT_TYPES = {
  UPDATE: 'update',
  CREATE: 'create',
  REMOVE: 'remove',
  AUTO: 'auto',
};
const LINES_CHART_DATA = [];
for (let i = 0; i < US_BOND_2_YR_DATA.length - 1; i++) {
  LINES_CHART_DATA.push({
    date: US_BOND_2_YR_DATA[i].date,
    prices: [
      {
        label: '2 YR',
        high: US_BOND_2_YR_DATA[i].high,
        low: US_BOND_2_YR_DATA[i].low,
        close: US_BOND_2_YR_DATA[i].price,
      },
      {
        label: '5 YR',
        high: US_BOND_5_YR_DATA[i].high,
        low: US_BOND_5_YR_DATA[i].low,
        close: US_BOND_5_YR_DATA[i].price,
      },
      {
        label: '10 YR',
        high: US_BOND_10_YR_DATA[i].high,
        low: US_BOND_10_YR_DATA[i].low,
        close: US_BOND_10_YR_DATA[i].price,
      },
      {
        label: '30 YR',
        high: US_BOND_30_YR_DATA[i].high,
        low: US_BOND_30_YR_DATA[i].low,
        close: US_BOND_30_YR_DATA[i].price,
      },
    ],
  });
}

// Mock delay, for testing loading states. Units are in ms.
const MOCK_DELAY = 1000;
let sseEventId = 0;
const SSE_DEMO_DATA = generateSSEDemoData();

let actionList = [];
let autoPilot = false;

const chartActionList = [];
let chartAutoPilot = false;


function send(callback, delay = MOCK_DELAY) {
  if (MOCK_DELAY) {
    setTimeout(callback, delay);
  } else {
    callback();
  }
}

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

/** *
 * Mock Chart Data
 */
// createChartData(MockCandlestickIntradayData);

server.get('/chart-candlestick-data', (req, res) => {
  console.log('Got Candlestick chart Data!');
  send(() => res.jsonp(MockCandlestickChartData));
});

server.get('/chart-lines-data', (req, res) => {
  console.log('Got Line chart Data!');
  send(() => res.jsonp(LINES_CHART_DATA));
});

const buildSSEEvent = (res, type, data) => {
  res.write(`id: ${sseEventId}\n`);
  res.write(`event:${type}\n`);
  res.write(`data: ${JSON.stringify(data)}`);
  res.write('\n\n');
};

/** ****************************************
 * SSE Intraday Chart Mock
 **************************************** */

let interval = 4;
let counter = 0;
let bias = 1;

server.get('/intraday-chart-demo', (req, res) => {
  console.log('Got Intraday Chart elements!');
  send(() => res.jsonp(MockCandlestickIntradayData));
});

server.post('/intraday-chart-demo', (req, res) => {
  const payload = req.body;

  if (payload.action === SSE_EVENT_TYPES.AUTO) {
    counter = 0;
    chartAutoPilot = payload.isAuto;
  } else {
    chartActionList.push(payload.action);
  }

  res.sendStatus(200);
});

server.get('/sse-chart-events', (req, res) => {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });
  const lastEntry = MockCandlestickChartData[MockCandlestickChartData.length - 1];
  bias = lastEntry.close >= 66 ? -1 : lastEntry.close <= 58 ? 1 : bias;

  if (chartAutoPilot) {
    res.write('retry: 1000\n');
    if (counter === interval) {
      const createdData = createChartData(MockCandlestickIntradayData, bias);
      buildSSEEvent(res, SSE_EVENT_TYPES.CREATE, [createdData]);
      counter = 0;
      interval = 10 + Math.floor(Math.random() * 5);
      bias *= -1;
    } else {
      const updatedData = updateChartData(MockCandlestickChartData, bias);
      buildSSEEvent(res, SSE_EVENT_TYPES.UPDATE, [updatedData]);
      counter += 1;
    }
    sseEventId += 1;
  } else {
    res.write('retry: 1000\n');

    const elementsToUpdate = chartActionList.filter((el) => el === SSE_EVENT_TYPES.UPDATE);
    const elementsToCreate = chartActionList.filter((el) => el === SSE_EVENT_TYPES.CREATE);
    let i = 0;
    let arr = [];

    if (elementsToCreate.length) {
      elementsToCreate.forEach((entry) => {
        const index = chartActionList.findIndex((obj) => obj === entry);
        chartActionList.splice(index, 1);
      });

      for (i = 0; i < elementsToCreate.length; i++) {
        arr.push(createChartData(MockCandlestickIntradayData, bias));
      }

      sseEventId += 1;
      buildSSEEvent(res, SSE_EVENT_TYPES.CREATE, arr);
    } else if (elementsToUpdate) {
      elementsToUpdate.forEach((entry) => {
        const index = chartActionList.findIndex((obj) => obj === entry);
        chartActionList.splice(index, 1);
      });
      for (i = 0; i < elementsToUpdate.length; i++) {
        arr.push(updateChartData(MockCandlestickIntradayData, bias));
      }
      sseEventId += 1;
      buildSSEEvent(res, SSE_EVENT_TYPES.UPDATE, arr);
      arr = [];
    }
  }
  res.send();
});

/** ****************************************
 * SSE Events Mock
 **************************************** */

server.post('/financial-demo', (req, res) => {
  const payload = req.body;
  if (payload.action === SSE_EVENT_TYPES.AUTO) {
    autoPilot = payload.isAuto;
  } else {
    actionList.push(payload.action);
  }
  res.sendStatus(200);
});

server.get('/financial-demo', (req, res) => {
  console.log('Got financial elements!');
  send(() => res.jsonp(SSE_DEMO_DATA));
});

server.get('/sse-events', (req, res) => {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });

  res.write('retry: 2000\n');
  if (autoPilot) {
    switch (sseEventId % 3) {
      case 0: {
        if (SSE_DEMO_DATA.length <= 0) break;
        const updatedData = RandomlyUpdateSSEDemoData(SSE_DEMO_DATA, SSE_DEMO_DATA.length < 4);
        buildSSEEvent(res, SSE_EVENT_TYPES.UPDATE, updatedData);
        break;
      }
      case 1: {
        const createdData = RandomlyCreateSSEDemoData(SSE_DEMO_DATA);
        buildSSEEvent(res, SSE_EVENT_TYPES.CREATE, createdData);
        break;
      }
      case 2: {
        if (SSE_DEMO_DATA.length <= 0) break;
        const deletedData = DeleteSSEDemoData(SSE_DEMO_DATA);
        buildSSEEvent(res, SSE_EVENT_TYPES.REMOVE, deletedData);
        break;
      }
    }
    sseEventId += 1;
  } else {
    const elementsToUpdate = actionList.filter((el) => el === SSE_EVENT_TYPES.UPDATE);
    const elementsToCreate = actionList.filter((el) => el === SSE_EVENT_TYPES.CREATE);
    const elementsToRemove = actionList.filter((el) => el === SSE_EVENT_TYPES.REMOVE);
    actionList = [];

    elementsToUpdate.forEach(() => {
      if (SSE_DEMO_DATA.length <= 0) {
        return;
      }
      const updatedData = RandomlyUpdateSSEDemoData(SSE_DEMO_DATA, true);
      buildSSEEvent(res, SSE_EVENT_TYPES.UPDATE, updatedData);
      sseEventId += 1;
    });

    elementsToCreate.forEach(() => {
      const createdData = RandomlyCreateSSEDemoData(SSE_DEMO_DATA);
      buildSSEEvent(res, SSE_EVENT_TYPES.CREATE, createdData);
      sseEventId += 1;
    });

    elementsToRemove.forEach(() => {
      if (SSE_DEMO_DATA.length <= 0) {
        return;
      }
      const deletedData = DeleteSSEDemoData(SSE_DEMO_DATA);
      buildSSEEvent(res, SSE_EVENT_TYPES.REMOVE, deletedData);
      sseEventId += 1;
    });
  }

  res.send();
});

const FOOD = [
  { label: 'Burger', value: 'burger' },
  { label: 'Salad', value: 'salad' },
  { label: 'Milkshake', value: 'milkshake' },
  { label: 'Sides', value: 'sides' },
  { label: 'Pie', value: 'pie' },
];

const INGREDIENTS = {
  burger: [
    { label: 'Meat', value: 'meat' },
    { label: 'Bun', value: 'bun' },
    { label: 'Cheese', value: 'cheese' },
    { label: 'Onions', value: 'onions' },
  ],
  salad: [
    { label: 'Lettuce', value: 'lettuce' },
    { label: 'Tomatoes', value: 'tomatoes' },
    { label: 'Heart of Palm', value: 'heart-of-palm' },
  ],
  milkshake: [
    { label: 'Vanilla', value: 'vanilla' },
    { label: 'Chocolate', value: 'chocolate' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Cookies and Cream', value: 'cookies' },
  ],
  sides: [
    { label: 'Fries', value: 'fries' },
    { label: 'Onion Rings', value: 'onion-rings' },
    { label: 'Sweet Potato Fries', value: 'sweet-potato-fries' },
    { label: 'Chips', value: 'chips' },
    { label: 'Nachos', value: 'nachos' },
    { label: 'Carrot Sticks', value: 'carrot-sticks' },
  ],
  pie: [
    { label: 'Cherry', value: 'cherry' },
    { label: 'Apple', value: 'apple' },
    { label: 'Pumpkin', value: 'pumpkin' },
    { label: 'Key Lime', value: 'key-lime' },
  ],
};

const getByValue = (values, query) => values.filter(el => el.label.toLowerCase().includes(query));

server.get('/food', (req, res) => {
  const { query } = req.query;
  if (!query) {
    send(() => res.jsonp(FOOD));
  } else {
    console.log(getByValue(FOOD, query.toLowerCase()));
    send(() => res.jsonp(getByValue(FOOD, query.toLowerCase())));
  }
});

server.get('/ingredients', (req, res) => {
  const { query, food } = req.query;
  if (!query) {
    send(() => res.jsonp(INGREDIENTS[food]));
  } else {
    send(() => res.jsonp(getByValue(INGREDIENTS[food], query.toLowerCase())));
  }
});

const MULTI1 = [
  { label: 'Thing 1', value: '1' },
  { label: 'Thing 2', value: '2' },
];

const MULTI2 = [
  { label: 'Thing 1-1', value: '1-1' },
  { label: 'Thing 1-2', value: '1-2' },
];

const MULTI3 = [
  { label: 'Thing 2-1', value: '2-1' },
  { label: 'Thing 2-2', value: '2-2' },
];

server.get('/multi', (req, res) => {
  const { query } = req.query;

  if (!query) {
    send(() => res.jsonp(MULTI1));
  } else {
    send(() => res.jsonp(getByValue(MULTI1, query.toLowerCase())));
  }
});

server.get('/multi2', (req, res) => {
  const { query } = req.query;

  if (!query) {
    send(() => res.jsonp(MULTI2));
  } else {
    send(() => res.jsonp(getByValue(MULTI2, query.toLowerCase())));
  }
});

server.get('/multi3', (req, res) => {
  const { query } = req.query;

  if (!query) {
    send(() => res.jsonp(MULTI3));
  } else {
    send(() => res.jsonp(getByValue(MULTI3, query.toLowerCase())));
  }
});


server.listen(9999, () => {
  console.log('JSON Server is running');
});
