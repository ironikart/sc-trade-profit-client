Trade Profit Calculator
=======================

for [Star Citizen](https://robertsspaceindustries.com/)

This is a prototype that features a customisable expression system to apply profit calculations to buy and sell activity in Star Citizen.

After cloning this repository, to install:

* Ensure [webpack](http://webpack.github.io/docs/installation.html) is installed:

```javascript
npm install webpack -g`
```

* Install local dependencies

```javascript
npm install
```

To build the client:
```javascript
webpack
```

To build production version:
```javascript
NODE_ENV=production webpack --optimize-minimize
```