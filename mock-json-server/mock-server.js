// This is responsible to create the mock server.
const jsonServer = require('json-server');
const MockCandlestickChartData = require('./data/msft');

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

const {
  generateSSEDemoData, RandomlyUpdateSSEDemoData, RandomlyCreateSSEDemoData,
  DeleteSSEDemoData,
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

server.get('/chart-candlestick-data', (req, res) => {
  console.log('Got Candlestick chart Data!');
  send(() => res.jsonp(MockCandlestickChartData));
});

server.get('/chart-lines-data', (req, res) => {
  console.log('Got Line chart Data!');
  send(() => res.jsonp(LINES_CHART_DATA));
});

/** *
 * SSE Events Mock
 */

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

const buildSSEEvent = (res, type, data) => {
  res.write(`id: ${sseEventId}\n`);
  res.write(`event:${type}\n`);
  res.write(`data: ${JSON.stringify(data)}`);
  res.write('\n\n');
};

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
    const elementsToUpdate = actionList.filter(el => el === SSE_EVENT_TYPES.UPDATE);
    const elementsToCreate = actionList.filter(el => el === SSE_EVENT_TYPES.CREATE);
    const elementsToRemove = actionList.filter(el => el === SSE_EVENT_TYPES.REMOVE);
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

server.listen(3000, () => {
  console.log('JSON Server is running');
});
