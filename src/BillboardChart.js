// external dependencies
import shallowEqual from 'fbjs/lib/shallowEqual';
import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, createElementRef } from 'react-parm';
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

const [MAJOR_VERSION, MINOR_VERSION] = React.version
  .split('.')
  .map((section) => parseInt(section, 10));

const UNSAFE_LIFECYCLES_DEPRECATED =
  MAJOR_VERSION > 16 || (MAJOR_VERSION === 16 && MINOR_VERSION >= 3);

/** 
 * @function componentDidMount 
 * 
 * @description 
 * on mount, update the chart based on props 
 +
 * @param {Object} props the props passed to the component
 * @param {function} updateChart the method to update the chart
 * @returns {void}
 */
export const componentDidMount = ({ props, updateChart }) =>
  requestAnimationFrame(() => updateChart(props));

/**
 * @function shouldComponentUpdate
 *
 * @description
 * if the component is pure, base the update on whether props and context have changed
 *
 * @param {Object} context the instance context
 * @param {Object} props the instance props
 * @param {Object} nextProps the next props
 * @param {Object} nextStateIgnored the next state
 * @param {Object} nextContext the next context
 * @returns {boolean} should the component update
 */

export const shouldComponentUpdate = (
  { context, props },
  [nextProps, , nextContext]
) =>
  nextProps.isPure
    ? !shallowEqual(props, nextProps) || !shallowEqual(context, nextContext)
    : true;

/**
 * @function componentWillUpdate
 *
 * @description
 * when the component will update, update the chart with the new props
 *
 * @param {function} updateChart the method to update the chart
 * @param {Object} nextProps the next props
 * @returns {void}
 */
export const componentWillUpdate = ({ updateChart }, [nextProps]) =>
  updateChart(nextProps);

/**
 * @function componentWillUnmount
 *
 * @description
 * prior to unmount, destroy the chart
 *
 * @param {function} destroyChart the method to destroy the chart
 * @returns {void}
 */
export const componentWillUnmount = ({ destroyChart }) => destroyChart();

/**
 * @function config
 *
 * @description
 * get or set the config on the chart
 *
 * @param {BB} chart the chart instance
 * @param {Array<any>} args the args to call config with
 * @returns {void}
 */
export const config = ({ chart }, args) => chart && chart.config(...args);

/**
 * @function destroyChart
 *
 * @description
 * destroy the chart and set the ref to null
 *
 * @param {ReactComponent} instance the component instance
 */
export const destroyChart = (instance) => {
  if (instance.chart) {
    try {
      instance.chart.destroy();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Internal billboard.js error', error);
    }
  }

  instance.chart = null;
};

/**
 * @function exportChart
 *
 * @description
 * export the chart if it exists
 *
 * @param {BB} chart the chart instance
 * @param {string} mimeType the mimetype of the image
 * @param {function} callback the callback with the data URL
 * @returns {void}
 */
export const exportChart = ({ chart }, [mimeType, callback]) =>
  chart && chart.export(mimeType, callback);

/**
 * @function generateChart
 *
 * @description
 * generate the chart based on the props passed
 *
 * @param {HTMLElement} chartElement the element to bind the chart to
 * @param {Object} props the props passed to the instance
 * @returns {Object} the chart instance that was generated
 */
export const generateChart = ({
  chartElement,
  props: {
    className: classNameIgnored,
    isPure: isPureIgnored,
    style: styleIgnored,
    unloadBeforeLoad: unloadBeforeLoadIgnored,
    ...config
  },
}) =>
  bb().generate({
    bindto: chartElement,
    ...config,
  });

/**
 * @function getInstances
 *
 * @description
 * get all chart instances created by billboard
 *
 * @returns {Array<Object>} the array of chart instances
 */
export const getInstances = () => bb().instance;

/**
 * @function loadData
 *
 * @description
 * load new data to the existing chart
 *
 * @param {BB} chart the chart instance
 * @param {Object} data the data to load
 * @returns {void}
 */
export const loadData = ({ chart }, [data]) => chart && chart.load(data);

/**
 * @function redraw
 *
 * @description
 * trigger a redraw of the chart
 *
 * @returns {void}
 */
export const redraw = ({ chart }) => chart && chart.flush();

/**
 * @function unloadData
 *
 * @description
 * unload data from the existing chart
 *
 * @param {BB} chart the chart instance
 * @param {Object} data the data to unload
 * @returns {void}
 */
export const unloadData = ({ chart }, [data]) => chart && chart.unload(data);

/**
 * @function updateChart
 *
 * @description
 * update the chart with the new data
 *
 * @param {ReactComponent} instance the component instance
 * @param {Object} props the props to update the chart with
 */
export const updateChart = (instance, [props]) => {
  const { generateChart, loadData } = instance;
  const { data, unloadBeforeLoad } = props;

  if (!instance.chart) {
    instance.chart = generateChart(props);
  }

  loadData(unloadBeforeLoad ? { ...data, unload: true } : data);
};

const BillboardChart = ({ className, domProps, style }, instance) => (
  <div
    className={className}
    style={style}
    {...domProps}
    ref={createElementRef(instance, 'chartElement')}
  />
);

BillboardChart.displayName = 'BillboardChart';

BillboardChart.propTypes = {
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

BillboardChart.defaultProps = {
  isPure: false,
  unloadBeforeLoad: false,
};

BillboardChart.getInstances = getInstances;

const schema = {
  chart: null,
  chartElement: null,
  componentDidMount,
  componentWillUnmount,
  config,
  destroyChart,
  exportChart,
  generateChart,
  loadData,
  redraw,
  shouldComponentUpdate,
  unloadData,
  updateChart,
};

if (UNSAFE_LIFECYCLES_DEPRECATED) {
  schema.UNSAFE_componentWillUpdate = componentWillUpdate;
} else {
  schema.componentWillUpdate = componentWillUpdate;
}

export default createComponent(BillboardChart, schema);
