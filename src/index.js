import { bb } from 'billboard.js';
import React from 'react';

function shallowEqual(a, b) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  const length = aKeys.length;

  if (length !== bKeys.length) {
    return false;
  }

  let index = -1;

  while (++index < length) {
    const key = aKeys[index];

    if (key !== bKeys[index] || a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}

class BillboardChart extends React.Component {
  static displayName = 'BillboardChart';

  static getInstances = () => {
    return bb.instance;
  };

  constructor(props) {
    super(props);

    // Explicit binds instead of arrow functions for lower memory footprint.
    this.exportChart = this.exportChart.bind(this);
    this.destroyChart = this.destroyChart.bind(this);
    this.loadData = this.loadData.bind(this);
    this.redraw = this.redraw.bind(this);
    this.setChart = this.setChart.bind(this);
    this.setChartElementRef = this.setChartElementRef.bind(this);
    this.unloadData = this.unloadData.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
  }

  componentDidMount() {
    this.updateChart();
  }

  shouldComponentUpdate(nextProps) {
    return !nextProps.isPure || !shallowEqual(this.props, nextProps);
  }

  componentDidUpdate() {
    this.updateChart();
  }

  componentWillUnmount() {
    this.destroyChart();
  }

  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = null;
  }

  exportChart(mimeType, onExported) {
    if (!this.chart) {
      // eslint-disable-next-line no-console
      return console.error('No chart is available to export.');
    }

    this.chart.export(mimeType, onExported);
  }

  loadData(data) {
    if (!this.chart) {
      // eslint-disable-next-line no-console
      return console.error(
        'No chart is available to which data can be loaded. It may already have been destroyed, or has never been drawn.',
      );
    }

    this.chart.load(data);
  }

  redraw() {
    if (!this.chart) {
      // eslint-disable-next-line no-console
      return console.error('No chart is available to draw.');
    }

    this.chart.flush();
  }

  setChart(data) {
    if (this.chart) {
      this.loadData(data);
    } else {
      const {
        className: classNameIgnored,
        domProps: domPropsIgnored,
        isPure: isPureIgnored,
        style: styleIgnored,
        unloadBeforeLoad: unloadBeforeLoadIgnored,
        ...config
      } = this.props;

      this.chart = bb.generate({
        bindto: this.chartElement,
        ...config,
      });
    }
  }

  setChartElementRef(element) {
    this.chartElement = element;
  }

  unloadData(data) {
    if (!this.chart) {
      // eslint-disable-next-line no-console
      return console.error(
        'No chart is available from which data can be unloaded. It may already have been destroyed, or has never been drawn.',
      );
    }

    this.chart.unload(data);
  }

  updateChart() {
    const { data, unloadBeforeLoad } = this.props;
    const dataToLoad = unloadBeforeLoad ? { ...data, unload: true } : data;

    this.setChart(dataToLoad);
  }

  updateConfig(name, value, redraw) {
    if (!this.chart) {
      // eslint-disable-next-line no-console
      return console.error(
        'You are trying to set the config a chart that does not exist.' +
          'Have you passed `data`?',
      );
    }

    return this.chart.config(name, value, redraw);
  }

  render() {
    const { className, domProps, style } = this.props;

    return (
      <div
        className={className}
        style={style}
        {...domProps}
        ref={this.setChartElementRef}
      />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  BillboardChart.propTypes = require('./propTypes').default;
}

export default BillboardChart;
