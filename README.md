# Somo Project React App

[![Build Status](https://circleci.com/gh/uwblueprint/somo-react.svg?style=shield&circle-token=445bca6f896b95053abd7429c03e39eb84d3ddcf)](https://circleci.com/gh/uwblueprint/somo-react)

### Setup
1. Install `Node.js` if you don't have it already.
2. `npm install` to install all the dependencies.
3. `npm run start` to start the app on [localhost](http://localhost:8080/).
4. `npm run test` to run tests in the `test` folder.

### Directory Structure
```
.
├── src
│   ├── actions/        # Redux actions that get dispatched
│   ├── components/     # UI components
│   ├── constants/      # js files that contain common constants
│   ├── containers/     # React components that interact with Redux
│   ├── selectors/      # utility functions that select certain sections of the Redux state
│   ├── reducers/       # Redux reducers that handle updating state
│   ├── App.jsx         # injects the root component into the HTML page
│   └── index.html      # HTML page that gets served
├── test/               # mocha tests
├── webpack.config.js   # Webpack config
├── package.json        # App dependencies and metadata
└── README.md
```

### Style Guide
1. Indentation
  * Use 2 spaces.
  * There should be no use of tabs.
2. Spacing
  * There should be no trailing whitespace.
  * There should be no empty new lines at the end of a file.
3. Line length
  * The maximum characters per line should be 100.
4. Imports
  * Separate the plugin class/function imports from our class/function imports from other language imports using 1 line.
  * Then order them by the module name.
  * See [here](src/App.jsx) for example.
5. Comments
  * Use `// This is a comment.` instead of `/* This is a comment. */`.
  * They must have correct grammer and sentence structure.
6. Use ES6 over ES5 when possible.


### Contributing Guidelines
* Create an issue for the task you're going to work on if it does not already exist [here](https://github.com/uwblueprint/somo/issues).
* Assign yourself to the issue.
* Create a new branch and work on the issue.
* Push your branch to Github and make a PR to merge with master.
* After code review, squash the commits and merge into master.

### Tools/Plugins
* [NodeJS](https://nodejs.org)
* [Webpack](https://webpack.github.io)
* [ES6](https://babeljs.io/docs/learn-es2015)
* [Babel](https://babeljs.io)
* [React](https://facebook.github.io/react)
* [Redux](http://redux.js.org)
* [react-redux](https://github.com/reactjs/react-redux)
* [react-router](https://github.com/ReactTraining/react-router)
* [immutable-js](https://facebook.github.io/immutable-js)
* [Mocha](https://mochajs.org)
* [Chai](http://chaijs.com)

### Useful Resources
* [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)
* [When to make a something part of the component state](https://twitter.com/dan_abramov/status/749710501916139520)
* [Containers vs. Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.83k2l937e)
