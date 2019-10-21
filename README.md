# sms-sdk-toolbox-ui
Symphony Market Solutions SDK - Toolbox-UI

![Alt text](src/styles/storybook.gif?raw=true "Storybook")


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
 "sms-sdk-toolbox-ui": "git+ssh://git@github.com:SymphonyPlatformSolutions/sms-sdk-toolbox-ui.git#stage",
```
> You need to have access to the toolbox repository for the method above to work, also you need to have 
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

Having the library up in running, simply import the components you want to use:

```jsx harmony
import { Box , Text, Button } from 'sms-sdk-toolbox-ui';
```

