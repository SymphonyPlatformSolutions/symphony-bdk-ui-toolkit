// This is responsible to create the mock server.
const jsonServer = require('json-server');
const Axios = require('axios');
const {
  generateSSEDemoData, RandomlyUpdateSSEDemoData, RandomlyCreateSSEDemoData,
  RandomlyDeleteSSEDemoData,
} = require('./mock-file');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Mock delay, for testing loading states. Units are in ms.
const MOCK_DELAY = 1000;
let sseEventId = 0;
const SSE_DEMO_DATA = generateSSEDemoData();

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

server.post('/api/parser', async (req, res) => {
  const payload = await Axios.post('https://renderer-tool.app.symphony.com/api/parser', req.body);
  res.json(payload.data).status(200).end();
});

/** *
 * SSE Events Mock
 */


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
  switch (sseEventId % 3) {
    case 0: {
      const updatedData = RandomlyUpdateSSEDemoData(SSE_DEMO_DATA);
      res.write(`id: ${sseEventId}\n`);
      res.write('event:update\n');
      res.write(`data: ${JSON.stringify(updatedData)}`);
      res.write('\n\n');
      res.send();
      break;
    }
    case 1: {
      const createdData = RandomlyCreateSSEDemoData(SSE_DEMO_DATA);
      res.write(`id: ${sseEventId}\n`);
      res.write('event:create\n');
      res.write(`data: ${JSON.stringify(createdData)}`);
      res.write('\n\n');
      res.send();
      break;
    }
    case 2: {
      const deletedData = RandomlyDeleteSSEDemoData(SSE_DEMO_DATA);
      res.write(`id: ${sseEventId}\n`);
      res.write('event:remove\n');
      res.write(`data: ${JSON.stringify(deletedData)}`);
      res.write('\n\n');
      res.send();
      break;
    }
  }
  sseEventId += 1;
});

server.listen(3000, () => {
  console.log('JSON Server is running');
});
