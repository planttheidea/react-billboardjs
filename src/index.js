import { bb } from 'billboard.js';
import PropTypes from 'prop-types';
import React from 'react';

import {
  AREA_SHAPE,
  AXIS_SHAPE,
  BAR_SHAPE,
  COLOR_SHAPE,
  DATA_SHAPE,
  DONUT_SHAPE,
  GAUGE_SHAPE,
  GRID_SHAPE,
  INTERACTION_SHAPE,
  LEGEND_SHAPE,
  LINE_SHAPE,
  PADDING_SHAPE,
  PIE_SHAPE,
  POINT_SHAPE,
  RADAR_SHAPE,
  REGION_SHAPE,
  RESIZE_SHAPE,
  SIZE_SHAPE,
  SPLINE_SHAPE,
  SUBCHART_SHAPE,
  SVG_SHAPE,
  TITLE_SHAPE,
  TOOLTIP_SHAPE,
  TRANSITION_SHAPE,
  ZOOM_SHAPE,
} from './shapes';

const raf = requestAnimationFrame || ((fn) => setTimeout(fn, 17));

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

  static propTypes = {
    area: AREA_SHAPE,
    axis: AXIS_SHAPE,
    bar: BAR_SHAPE,
    className: PropTypes.string,
    clipPath: PropTypes.bool,
    color: COLOR_SHAPE,
    data: DATA_SHAPE.isRequired,
    domProps: PropTypes.object,
    donut: DONUT_SHAPE,
    gauge: GAUGE_SHAPE,
    grid: GRID_SHAPE,
    interaction: INTERACTION_SHAPE,
    isPure: PropTypes.bool,
    legend: LEGEND_SHAPE,
    line: LINE_SHAPE,
    onafterinit: PropTypes.func,
    onbeforeinit: PropTypes.func,
    oninit: PropTypes.func,
    onmouseout: PropTypes.func,
    onmouseover: PropTypes.func,
    onrendered: PropTypes.func,
    onresize: PropTypes.func,
    onresized: PropTypes.func,
    padding: PADDING_SHAPE,
    pie: PIE_SHAPE,
    point: POINT_SHAPE,
    radar: RADAR_SHAPE,
    regions: PropTypes.arrayOf(REGION_SHAPE),
    resize: RESIZE_SHAPE,
    size: SIZE_SHAPE,
    spline: SPLINE_SHAPE,
    style: PropTypes.object,
    subchart: SUBCHART_SHAPE,
    svg: SVG_SHAPE,
    title: TITLE_SHAPE,
    tooltip: TOOLTIP_SHAPE,
    transition: TRANSITION_SHAPE,
    unloadBeforeLoad: PropTypes.bool,
    zoom: ZOOM_SHAPE,
  };

  static getInstances = () => {
    return bb.instance;
  };

  componentDidMount() {
    this.updateChart(this.props);
  }

  shouldComponentUpdate(nextProps) {
    return !!nextProps.isPure && shallowEqual(this.props, nextProps);
  }

  componentDidUpdate() {
    this.updateChart(this.props);
  }

  componentWillUnmount() {
    this.destroyChart();
  }

  config = (...args) => {
    if (!this.chart) {
      // eslint-disable-next-line no-console
      return console.error(
        'You are trying to set the config a chart that does not exist.' +
          'Have you passed `data`?',
      );
    }

    return this.chart.config(...args);
  };

  exportChart = (mimeType, onExported) => {
    if (!this.chart) {
      // eslint-disable-next-line no-console
      return console.error('No chart is available to be exported.');
    }

    this.chart.export(mimeType, onExported);
  };

  destroyChart = () => {
    if (!this.chart) {
      // eslint-disable-next-line no-console
      return console.warn('No chart is available to destroy.');
    }

    this.chart.destroy();
    this.chart = null;
  };

  loadData = (data) => {
    if (!this.chart) {
      // eslint-disable-next-line no-console
      return console.error(
        'No chart is available to which data can be loaded. It may already have been destroyed, or has never been drawn.',
      );
    }

    this.chart.load(data);
  };

  redraw = () => {
    if (!this.chart) {
      // eslint-disable-next-line no-console
      return console.error('No chart is available to draw.');
    }

    this.chart.flush();
  };

  setChart = (data) => {
    if (!this.chart) {
      const {
        className: classNameIgnored,
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

    this.loadData(data);
  };

  setChartElementRef = (element) => {
    this.chartElement = element;
  };

  unloadData = (data) => {
    if (!this.chart) {
      // eslint-disable-next-line no-console
      return console.error(
        'No chart is available from which data can be unloaded. It may already have been destroyed, or has never been drawn.',
      );
    }

    this.chart.unload(data);
  };

  updateChart = () => {
    raf(() => {
      const { data, unloadBeforeLoad } = this.props;
      const dataToLoad = unloadBeforeLoad ? { ...data, unload: true } : data;

      raf(() => {
        this.setChart(dataToLoad);
      });
    });
  };

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

export default BillboardChart;
