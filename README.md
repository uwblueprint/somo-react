# Somo Project React App

### Setup
1. Install `Node.js` if you don't have it already.
2. `npm install` to install all the dependencies.
3. `npm run start` to start the app on [localhost](http://localhost:8080/).
4. `npm run test` to run tests in the `test` folder.

### Directory Structure
```
webpack.config.js
src/
  index.html    --> HTML page that gets served
  App.jsx       --> injects the root component into the HTML page
  containers/   --> React components that interact with Redux
  components/   --> UI components
  constants/    --> js files that contain common constants
  actions/      --> Redux actions that get dispatched
  reducers/     --> Redux reducers that handle updating state
test/
```

### Tools/Plugins
* [Webpack](https://webpack.github.io/)
* [ES6](https://babeljs.io/docs/learn-es2015/)
* [Babel](https://babeljs.io/)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [react-redux](https://github.com/reactjs/react-redux)
* [react-router](https://github.com/ReactTraining/react-router)
* [immutable-js](https://facebook.github.io/immutable-js)
* [Mocha](https://mochajs.org/)
* [expect](https://github.com/mjackson/expect)

### Useful Resources
* [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)
* [When to make a something part of the component state](https://twitter.com/dan_abramov/status/749710501916139520)
* [Containers vs. Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.83k2l937e)
