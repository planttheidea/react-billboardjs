# react-billboardjs

<img src="https://img.shields.io/badge/build-passing-brightgreen.svg"/>
<img src="https://img.shields.io/badge/coverage-100%25-brightgreen.svg"/>
<img src="https://img.shields.io/badge/license-MIT-blue.svg"/>

React component for the billboard.js charting library

_This is based on [react-c3js](https://github.com/bcbcarl/react-c3js), with modifications for `billboard.js` and enhancements for rendering_

- [react-billboardjs](#react-billboardjs)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Production usage](#production-usage)
  - [Required props](#required-props)
    - [data](#data)
  - [Optional props](#optional-props)
    - [className](#classname)
    - [domProps](#domprops)
    - [isPure](#ispure)
    - [style](#style)
    - [unloadBeforeLoad](#unloadbeforeload)
  - [Managing the internal chart](#managing-the-internal-chart)
    - [destroyChart](#destroychart)
    - [exportChart](#exportchart)
    - [loadData](#loaddata)
    - [redraw](#redraw)
    - [unloadData](#unloaddata)
    - [updateConfig](#updateconfig)
    - [Chart instance](#chart-instance)
  - [Managing all charts](#managing-all-charts)
    - [getInstances](#getinstances)
  - [Development](#development)

## Installation

```
$ npm install react-billboardjs --save
```

## Usage

```js
import React, { Component } from 'react';

// component and styles
import BillboardChart from 'react-billboardjs';
import 'billboard.js/dist/billboard.css';

const CHART_DATA = {
  columns: [
    ['data1', 30, 20, 50, 40, 60, 50],
    ['data2', 200, 130, 90, 240, 130, 220],
    ['data3', 300, 200, 160, 400, 250, 250],
  ],
  type: 'line',
};

class LineChart extends Component {
  render() {
    return <BillboardChart data={CHART_DATA} />;
  }
}
```

Make sure to include the CSS file provided with `billboard.js` to include appropriate styles for billboard. The example above is if you are using `webpack` or a similar bundler, but the styles are global so bring them in however is best for your application.

### Production usage

The `PropTypes` of this package are quite large, as they try to be comprehensive coverage for the configuration of `billboard.js`. If you do not want to incur this cost in production, then you can point your package to the `min` build which excludes them. Example in a webpack config:

```js
module.exports = {
  // ...config
  resolve: {
    alias: {
      'react-billboardjs': path.resolve(
        __dirname, // assuming config is top of the directory
        'node_modules/react-billboardjs/dist/react-billboardjs.min.js',
      ),
    },
  },
};
```

This creates a much smaller bundle, as the minified + gzipped size of `react-billboardjs` drops from 4.51KiB to 1.39KiB.

## Required props

### data

The `data` passed to the configuration object for the `billboard.js` chart. It is a pass-through to the `data` property on [bb.generate()](https://naver.github.io/billboard.js/release/latest/doc/bb.html#.generate).

## Optional props

All top-level properties available on the `billboard.js` options are passable as props, so for more detail about each of those props please check [their documentation site](https://naver.github.io/billboard.js/release/latest/doc/). There are also a few additional props specific to the component, which are detailed below.

### className

_string_

An additional `className` that is passed to the element that the chart is rendered into.

```js
<BillboardChart
  className="fancy"
  ...
/>
```

### domProps

_Object_

Any additional props that you want passed to the element that the chart is rendered into.

```js
<BillboardChart
  domProps={{'data-type': 'chart'}}
  ...
/>
```

### isPure

_boolean_

Are the prop values passed based on a shallow-equal comparison of props and context. This can prevent unnecessary re-renders when set to `true`, but expects any prop changes to be new objects (meaning arrays / objects that are mutated will not trigger a render).

```js
<BillboardChart
  isPure
  ...
/>
```

### style

_Object_

An additional `style` object that is passed to the element that the chart is rendered into.

```js
const STYLE = {
  display: 'inline-block'
};

<BillboardChart
  style={STYLE}
  ...
/>
```

One caveat to keep in mind is that there are two styles that will always be applied from `billboard.js` even if the properties are included in the `style` object:

- `max-height` (dynamically calculated based on the height of the container)
- `position` (set to `relative`)

If you want either of these to apply to the chart, the easiest way to accomplish this is to have a standard `<div>` that wraps the chart that you can apply these styles to.

### unloadBeforeLoad

_boolean_

Should the current data be unloaded before the new data will be loaded.

```js
<BillboardChart
  unloadBeforeLoad
  ...
/>
```

## Managing the internal chart

If you capture the `ref` of the chart, you will gain access to the instance, which allows you to use both the component methods and the `billboard.js` native chart.

```js
class Chart extends PureComponent {
  getRef = (ChartInstance) => {
    this.chartInstance = ChartInstance;
  };

  render() {
    return (
      <BillboardChart
        data={...}
        ref={this.getRef}
      />
    );
  }
}
```

### destroyChart

Destroys the chart and sets the internal chart to `null` (equivalent to the native [Chart.destroy](https://naver.github.io/billboard.js/release/latest/doc/Chart.html#destroy) method).

```js
this.chartInstance.destroyChart();
```

### exportChart

Exports the chart using the functionality introduced in `1.2.0` of `billboard.js` (equivalent to the native [Chart.export](https://naver.github.io/billboard.js/release/latest/doc/Chart.html#export) method).

```js
this.chartInstance.exportChart('image/png', (dataUrl) => {
  const link = document.createElement('a');

  link.download = 'chart.png';
  link.href = dataUrl;
  link.textContent = 'Download chart as PNG';

  document.body.appendChild(link);
});
```

### loadData

Loads new data into the chart (equivalent to the native [Chart.load](https://naver.github.io/billboard.js/release/latest/doc/Chart.html#load) method).

```js
this.chartInstance.loadData({
  columns: [['data1', 100, 50]],
});
```

### redraw

Forces a redraw of the chart.

```js
this.chartInstance.redraw();
```

### unloadData

Loads new data into the chart (equivalent to the native [Chart.unload](https://naver.github.io/billboard.js/release/latest/doc/Chart.html#unload) method).

```js
this.chartInstance.unloadData({
  ids: ['data1'],
  done() {
    console.log('unloaded data1!');
  },
});
```

### updateConfig

Updates the configuration value of a specific item (equivalent to the native [Chart.config](https://naver.github.io/billboard.js/release/latest/doc/Chart.html#config) method).

```js
this.chartInstance.updateConfig('line.max', 100);
```

### Chart instance

If you want to access the native `billboard.js` chart instance, it is available on the `chart` property of the `ref`.

```js
this.chartInstance.chart.defocus('data1');
```

## Managing all charts

The `BillboardChart` component itself has some static methods that are used to get information about the global `bb` object.

### getInstances

Get all chart objects for all charts rendered. This aligns with the `bb.instance` property.

```js
console.log(BillboardChart.getInstances()); // [Chart, Chart]
```

## Development

Standard stuff, clone the repo and `npm install` dependencies. The npm scripts available:

- `build` => run rollup to build distributed files
- `clean` => remove the distributed files in `dist`
- `dev` => run webpack dev server to run example app (playground!)
- `lint` => run ESLint against all files in the `src` folder
- `lint:fix` => run `lint` with `--fix` applied
- `prepublishOnly` => runs `lint`, `test`, and `build` scripts
- `release` => release a new version of the package (requires `release-it` installed globally)
- `release:beta` => release a new beta version of the package (requires `release-it` installed globally)
- `test` => run AVA test functions with `NODE_ENV=test`
- `test:coverage` => run `test` but with `nyc` for coverage checker
- `test:watch` => run `test`, but with persistent watcher
