# symphony-bdk-toolkit-ui
Symphony BDK - UI-Toolkit

[![Generic badge](https://img.shields.io/badge/StyledComponents-4.4.1-blue.svg)](https://styled-components.com/docs)
[![Generic badge](https://img.shields.io/badge/React-16.12.0-blue.svg)](https://pt-br.reactjs.org/blog/2017/09/26/react-v16.0.html)
[![Generic badge](https://img.shields.io/badge/Storybook-5.3.3-blue.svg)](https://github.com/storybookjs/storybook)

![Alt text](public/readme/storybook.gif?raw=true "Storybook")


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

Install the library into your app, by adding it on your <strong><i>package.json</i></strong> e.g:

```jsx
 "symphony-bdk-toolkit-ui": "git+ssh://git@github.com:SymphonyPlatformSolutions/symphony-bdk-toolkit-ui.git#stage",
```
> You need to have access to the Toolkit repository for the method above to work, also you need to have 
>your ssh keys added to your github account

then run:
```jsx
yarn
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
import '../node_modules/symphony-bdk-toolkit-ui/dist/index.css';
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
import { Box , Text, Button } from 'symphony-bdk-toolkit-ui';
```

