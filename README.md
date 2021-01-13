# symphony-bdk-ui-toolkit
Symphony BDK - UI Toolkit

[![NPM Package](https://img.shields.io/npm/v/symphony-bdk-ui-toolkit?style=shield&logo=npm)](https://www.npmjs.com/package/symphony-bdk-ui-toolkit)


This is the Component Library Project for the Rapid development of extension apps.

### Installing

Simply run:
```jsx
  yarn
```
> if you dont have yarn installed, do so by running: npm install -g yarn


### Running Locally
In order to access storybook run:
```jsx harmony
yarn storybook
```
or run the script
```shell script
./deploy_local.sh
```
> the above command will build the lib, and automatically get it running on localhost port 8000

### Building
In order to generate a fresh new build of this library, run:
```jsx harmony
yarn build
```

### Using it in your extension app

Install the library into your app:

```bash
npm install symphony-bdk-ui-toolkit
```

Once the library gets installed be sure to include these rules on the resolve section of your
webpack file (or equivalent rule for your bundler):

```jsx harmony
 resolve: {
  extensions: ['.js', '.jsx'],
  alias: {
    handlebars: 'handlebars/dist/handlebars.min.js',
    // https://github.com/facebook/react/issues/14721#issuecomment-458757426
    react: path.resolve('./node_modules/react'),
    'styled-components': path.resolve('./node_modules/styled-components'),
    'react-data-table-component': path.resolve('./node_modules/react-data-table-component'),
  },
},
```

Then import the styles this library exports into your entrypoint js file, like so:

```jsx harmony
import '../node_modules/symphony-bdk-ui-toolkit/dist/index.css';
```

### Peer Dependencies

There's a few components that require a peer dependency installation, that means that
although these components uses such dependency, it expects that it will be installed on your
project, **rather** than packaged and shipped with this toolkit. Here's the complete list of
peer dependencies:

```json
{
  "peerDependencies": {
    "axios": "^0.19.0",
    "d3-scale": "^3.2.1",
    "d3-shape": "^1.3.7",
    "d3-time": "^1.1.0",
    "d3-time-format": "^2.2.2",
    "prop-types": "^15.7.2",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-stockcharts": "^0.7.8",
    "styled-components": "^4.4.1"
  }
}
```


Having the library up in running, simply import the components you want to use:

```jsx harmony
import { Box , Text, Button } from 'symphony-bdk-ui-toolkit';
```

## How create a release
Open a terminal in at the root of your git
And run `yarn create-release [patch|minor|major] "your commit message"`