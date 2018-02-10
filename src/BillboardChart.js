// external dependencies
import shallowEqual from 'fbjs/lib/shallowEqual';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// billboard
import bb from './bb';

// shapes
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
  REGION_SHAPE,
  RESIZE_SHAPE,
  SIZE_SHAPE,
  SPLINE_SHAPE,
  SUBCHART_SHAPE,
  SVG_SHAPE,
  TITLE_SHAPE,
  TOOLTIP_SHAPE,
  TRANSITION_SHAPE,
  ZOOM_SHAPE
} from './shapes';

export const createComponentDidMount = (instance) => {
  /**
   * @function componentDidMount
   *
   * @description
   * on mount, update the chart based on props
   */
  return () => {
    requestAnimationFrame(() => {
      instance.updateChart(instance.props);
    });
  };
};

export const createShouldComponentUpdate = (instance) => {
  /**
   * @function shouldComponentUpdate
   *
   * @description
   * if the component is pure, base the update on whether props and context have changed
   *
   * @param {Object} nextProps the next props
   * @param {Object} nextState the next state
   * @param {Object} nextContext the next context
   * @returns {boolean} should the component update
   */
  return (nextProps, nextState, nextContext) => {
    const {isPure} = nextProps;

    return isPure ? !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.context, nextContext) : true;
  };
};

export const createComponentWillUpdate = (instance) => {
  /**
   * @function componentWillUpdate
   *
   * @description
   * when the component will update, update the chart with the new props
   *
   * @param {Object} nextProps the next props
   */
  return (nextProps) => {
    instance.updateChart(nextProps);
  };
};

export const createComponentWillUnmount = (instance) => {
  /**
   * @function componentWillUnmount
   *
   * @description
   * prior to unmount, destroy the chart
   */
  return () => {
    instance.destroyChart();
  };
};

export const createAssignElementToRef = (instance, refName) => {
  /**
   * @function assignElementToRef
   *
   * @description
   * set the element DOM node to the refName passed
   *
   * @param {HTMLElement} element the element to assign to the ref
   */
  return (element) => {
    instance[refName] = element;
  };
};

export const createDestroyChart = (instance) => {
  /**
   * @function destroyChart
   *
   * @description
   * destroy the chart and set the ref to null
   */
  return () => {
    try {
      instance.chart.destroy();

      instance.chart = null;
    } catch (error) {
      console.error('Internal billboard.js error', error); // eslint-disable-line no-console
    }
  };
};

export const createExportChart = (instance) => {
  /**
   * @function exportChart
   *
   * @description
   * export the chart if it exists
   *
   * @param {string} mimeType the mimetype of the image
   * @param {function} callback the callback with the data URL
   */
  return (mimeType, callback) => {
    if (instance.chart) {
      instance.chart.export(mimeType, callback);
    }
  };
};

export const createGenerateChart = (instance) => {
  /**
   * @function generateChart
   *
   * @description
   * generate the chart based on the props passed
   *
   * @returns {Object} the chart instance that was generated
   */
  return () => {
    const {
      className: classNameIgnored,
      isPure: isPureIgnored,
      style: styleIgnored,
      unloadBeforeLoad: unloadBeforeLoadIgnored,
      ...config
    } = instance.props;

    return bb().generate({
      bindto: instance.chartElement,
      ...config
    });
  };
};

export const createLoadData = (instance) => {
  /**
   * @function loadData
   *
   * @description
   * load new data to the existing chart
   *
   * @param {Object} data the data to load
   */
  return (data) => {
    instance.chart.load(data);
  };
};

export const createRedraw = (instance) => {
  /**
   * @function redraw
   *
   * @description
   * trigger a redraw of the chart
   */
  return () => {
    instance.chart.flush();
  };
};

export const createUnloadData = (instance) => {
  /**
   * @function unloadData
   *
   * @description
   * unload data from the existing chart
   *
   * @param {Object} data the data to unload
   */
  return (data) => {
    instance.chart.unload(data);
  };
};

export const createUpdateChart = (instance) => {
  /**
   * @function updateChart
   *
   * @description
   * update the chart with the new data
   *
   * @param {Object} props the props to update the chart with
   */
  return (props) => {
    const {data, unloadBeforeLoad} = props;

    if (!instance.chart) {
      instance.chart = instance.generateChart(props);
    }

    if (unloadBeforeLoad) {
      instance.unloadData();
    }

    instance.loadData(data);
  };
};

class BillboardChart extends Component {
  static displayName = 'BillboardChart';

  static propTypes = {
    area: AREA_SHAPE,
    axis: AXIS_SHAPE,
    bar: BAR_SHAPE,
    className: PropTypes.string,
    clipPath: PropTypes.bool,
    color: COLOR_SHAPE,
    data: DATA_SHAPE.isRequired,
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
    zoom: ZOOM_SHAPE
  };

  static defaultProps = {
    isPure: false,
    unloadBeforeLoad: false
  };

  // lifecycle methods
  componentDidMount = createComponentDidMount(this);
  shouldComponentUpdate = createShouldComponentUpdate(this);
  componentWillUpdate = createComponentWillUpdate(this);
  componentWillUnmount = createComponentWillUnmount(this);

  // instance values
  chart = null;
  chartElement = null;

  // instance methods
  destroyChart = createDestroyChart(this);
  exportChart = createExportChart(this);
  generateChart = createGenerateChart(this);
  loadData = createLoadData(this);
  redraw = createRedraw(this);
  setChartRef = createAssignElementToRef(this, 'chartElement');
  unloadData = createUnloadData(this);
  updateChart = createUpdateChart(this);

  render() {
    const {className, style} = this.props;

    return (
      <div
        className={className}
        ref={this.setChartRef}
        style={style}
      />
    );
  }
}

export default BillboardChart;
