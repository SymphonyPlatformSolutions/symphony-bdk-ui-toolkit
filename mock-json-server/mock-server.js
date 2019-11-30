// This is responsible to create the mock server.
const jsonServer = require('json-server');
const {
  generateSSEDemoData, RandomlyUpdateSSEDemoData, RandomlyCreateSSEDemoData,
  DeleteSSEDemoData,
} = require('./mock-file');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Mock delay, for testing loading states. Units are in ms.
const MOCK_DELAY = 1000;
let sseEventId = 0;
const SSE_DEMO_DATA = generateSSEDemoData();

const actionlist = [];
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
 * SSE Events Mock
 */

server.post('/financial-demo', (req, res) => {
  const payload = req.body;
  console.log('aqui');
  if (payload.action === 'auto') {
  console.log('acola');
    autoPilot = payload.isAuto;
  } else {
    console.log('fafa');
    actionlist.push(payload.action);
  }
  res.sendStatus(200);
});

server.get('/financial-demo', (req, res) => {
  console.log('Got financial elements!');
  send(() => res.jsonp(SSE_DEMO_DATA));
});

const updateMockData = (res) => {
  const updatedData = RandomlyUpdateSSEDemoData(SSE_DEMO_DATA);
  res.write(`id: ${sseEventId}\n`);
  res.write('event:update\n');
  res.write(`data: ${JSON.stringify(updatedData)}`);
  res.write('\n\n');
};

const createMockData = (res) => {
  const createdData = RandomlyCreateSSEDemoData(SSE_DEMO_DATA);
  res.write(`id: ${sseEventId}\n`);
  res.write('event:create\n');
  res.write(`data: ${JSON.stringify(createdData)}`);
  res.write('\n\n');
};

const deleteMockData = (res) => {
  const deletedData = DeleteSSEDemoData(SSE_DEMO_DATA);
  res.write(`id: ${sseEventId}\n`);
  res.write('event:remove\n');
  res.write(`data: ${JSON.stringify(deletedData)}`);
  res.write('\n\n');
};

server.get('/sse-events', (req, res) => {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });

  console.log(autoPilot);
  res.write('retry: 2000\n');
  if (autoPilot) {
    console.log(sseEventId);
    switch (sseEventId % 3) {
      case 0: {
        updateMockData(res);
        break;
      }
      case 1: {
        createMockData(res);
        break;
      }
      case 2: {
        deleteMockData(res);
        break;
      }
    }
    sseEventId += 1;
  } else if (actionlist.length) {
    console.log(sseEventId);
    const newAction = actionlist.pop();
    switch (newAction) {
      case 'update': {
        updateMockData(res);
        break;
      }
      case 'create': {
        createMockData(res);
        break;
      }
      case 'remove': {
        deleteMockData(res);
        break;
      }
    }
    sseEventId += 1;
  }
  res.send();
});

server.listen(3000, () => {
  console.log('JSON Server is running');
});
