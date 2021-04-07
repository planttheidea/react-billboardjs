// external dependencies
import PropTypes from 'prop-types';

const {
  any,
  arrayOf,
  bool,
  func,
  instanceOf,
  number,
  object,
  objectOf,
  oneOf,
  oneOfType,
  shape,
  string,
} = PropTypes;

const AREA_SHAPE = shape({
  above: bool,
  front: bool,
  linearGradient: oneOfType([
    bool,
    shape({
      x: arrayOf(number),
      y: arrayOf(number),
      stops: arrayOf(any),
    }),
  ]),
  zerobased: bool,
});

const LABEL_SHAPE = oneOfType([
  shape({
    position: oneOf([
      'inner-bottom',
      'inner-center',
      'inner-left',
      'inner-middle',
      'inner-right',
      'inner-top',
      'outer-bottom',
      'outer-center',
      'outer-left',
      'outer-middle',
      'outer-right',
      'outer-top',
    ]),
    text: string,
  }),
  string,
]);

const AXIS_TYPE_SHAPE = oneOf(['category', 'indexed', 'timeseries']);

const AXIS_Y_PADDING_SHAPE = shape({
  bottom: number,
  top: number,
});

const AXIS_TICK_SHAPE = shape({
  count: number,
  culling: oneOfType([
    bool,
    shape({
      max: number,
    }),
  ]),
  format: func,
  outer: bool,
  rotate: number,
  show: bool,
  stepSize: number,
  text: shape({
    position: shape({
      x: number,
      y: number,
    }),
    show: bool,
  }),
  values: arrayOf(oneOfType([number, instanceOf(Date)])),
});

const AXES_SHAPE = arrayOf(
  shape({
    domain: arrayOf(number),
    tick: shape({
      outer: bool,
      format: func,
      count: number,
      values: arrayOf(number),
    }),
  }),
);

const AXIS_SHAPE = shape({
  rotated: bool,
  x: shape({
    axes: AXES_SHAPE,
    categories: arrayOf(string),
    clipPath: bool,
    extent: arrayOf(arrayOf(number)),
    height: number,
    label: LABEL_SHAPE,
    localtime: bool,
    max: number,
    min: number,
    padding: shape({
      left: number,
      right: number,
    }),
    show: bool,
    tick: shape({
      centered: bool,
      count: number,
      culling: oneOfType([
        bool,
        shape({
          max: number,
        }),
      ]),
      fit: bool,
      format: oneOfType([func, string]),
      multiline: bool,
      outer: bool,
      rotate: number,
      tooltip: bool,
      values: arrayOf(oneOfType([number, instanceOf(Date)])),
      width: number,
    }),
    type: AXIS_TYPE_SHAPE,
  }),
  y: shape({
    axes: AXES_SHAPE,
    center: number,
    clipPath: bool,
    default: arrayOf(number),
    format: func,
    inner: bool,
    inverted: bool,
    label: LABEL_SHAPE,
    max: number,
    min: number,
    padding: AXIS_Y_PADDING_SHAPE,
    show: bool,
    tick: AXIS_TICK_SHAPE,
    type: AXIS_TYPE_SHAPE,
  }),
  y2: shape({
    axes: AXES_SHAPE,
    center: number,
    default: arrayOf(number),
    inner: bool,
    inverted: bool,
    label: LABEL_SHAPE,
    max: number,
    min: number,
    padding: AXIS_Y_PADDING_SHAPE,
    show: bool,
    tick: AXIS_TICK_SHAPE,
  }),
});

const BACKGROUND_SHAPE = shape({
  class: string,
  color: string,
  imgUrl: string,
});

const BAR_SHAPE = shape({
  label: shape({
    threshold: number,
  }),
  padding: number,
  radius: oneOfType([
    number,
    shape({
      ratio: number,
    }),
  ]),
  sensitivity: number,
  width: oneOfType([
    number,
    shape({
      dataname: number,
      max: number,
      ratio: number,
    }),
  ]),
  zerobased: bool,
});

const BUBBLE_SHAPE = shape({
  maxR: oneOfType([number, func]),
  zerobased: bool,
});

const CANDLESTICK_SHAPE = shape({
  color: shape({
    down: oneOfType([
      string,
      shape({
        dataname: string,
      }),
    ]),
  }),
  width: number,
});

const COLOR_SHAPE = shape({
  onover: oneOfType([string, func, object]),
  pattern: arrayOf(string),
  tiles: func,
  threshold: shape({
    max: number,
    unit: string,
    value: string,
  }),
});

const LINE_SHAPE = shape({
  classes: arrayOf(string),
  connectNull: bool,
  point: oneOf([arrayOf(string), bool]),
  step: shape({
    type: oneOf(['step', 'step-after', 'step-before']),
  }),
  zerobased: bool,
});

const ORDER_SHAPE = oneOfType([func, oneOf(['asc', 'desc', '', null])]);

const DATA_TYPE_SHAPE = oneOf([
  'area',
  'area-line-range',
  'area-range',
  'area-spline',
  'area-step',
  'bar',
  'bubble',
  'donut',
  'gauge',
  'line',
  'pie',
  'radar',
  'scatter',
  'spline',
]);

const DATA_SHAPE = shape({
  axes: object,
  classes: object,
  color: oneOfType([
    func,
    shape({
      pattern: arrayOf(string),
      tiles: func,
    }),
  ]),
  colors: objectOf(
    oneOfType([
      func,
      shape({
        pattern: arrayOf(string),
        tiles: func,
      }),
    ]),
  ),
  columns: arrayOf(
    arrayOf(
      oneOfType([
        arrayOf(number),
        number,
        shape({
          height: number,
          low: number,
          mid: number,
        }),
        string,
      ]),
    ),
  ),
  empty: shape({
    label: LABEL_SHAPE,
  }),
  filter: func,
  groups: arrayOf(oneOfType([arrayOf(string), string])),
  headers: string,
  hide: oneOfType([bool, arrayOf(string)]),
  idConverter: func,
  json: oneOfType([arrayOf(object), object]),
  keys: shape({
    value: arrayOf(string),
    x: oneOfType([arrayOf(string), string]),
    y: oneOfType([arrayOf(string), string]),
    y2: oneOfType([arrayOf(string), string]),
  }),
  labels: oneOfType([
    bool,
    shape({
      format: func,
      position: shape({
        x: number,
        y: number,
      }),
    }),
  ]),
  line: LINE_SHAPE,
  mimeType: string,
  names: object,
  onclick: func,
  onmax: func,
  onmin: func,
  onout: func,
  onover: func,
  onselected: func,
  onunselected: func,
  order: ORDER_SHAPE,
  point: shape({
    focus: shape({
      expand: shape({
        enabled: bool,
        r: oneOfType([bool, number]),
      }),
    }),
    pattern: arrayOf(string),
    r: oneOfType([number, func]),
    select: shape({
      r: number,
    }),
    show: bool,
    type: oneOf(['circle', 'rectangle']),
  }),
  regions: object,
  rows: arrayOf(arrayOf(oneOfType([number, string]))),
  selection: shape({
    draggable: bool,
    enabled: bool,
    grouped: bool,
    isselectable: bool,
    multiple: bool,
  }),
  stack: shape({
    normalize: bool,
  }),
  type: DATA_TYPE_SHAPE,
  types: objectOf(DATA_TYPE_SHAPE),
  url: string,
  x: string,
  xFormat: string,
  xLocaltime: bool,
  xSort: bool,
  xs: object,
});

const DONUT_SHAPE = shape({
  expand: bool,
  label: shape({
    format: func,
    ratio: oneOfType([func, number]),
    show: bool,
    threshold: number,
  }),
  padAngle: number,
  startingAngle: number,
  title: string,
  width: number,
});

const GAUGE_SHAPE = shape({
  arcs: shape({
    minWidth: string,
  }),
  arcLength: number,
  background: bool,
  expand: oneOfType([
    bool,
    shape({
      duration: number,
      rate: number,
    }),
  ]),
  fullCircle: bool,
  label: shape({
    extents: func,
    format: func,
    show: bool,
  }),
  max: number,
  min: number,
  startingAngle: number,
  title: string,
  type: string,
  units: string,
  width: number,
});

const LINES_SHAPE = oneOfType([
  arrayOf(
    shape({
      class: string,
      position: string,
      text: string,
      value: oneOfType([number, string, instanceOf(Date)]),
    }),
  ),
  bool,
]);

const GRID_SHAPE = shape({
  focus: shape({
    edge: bool,
    show: bool,
    y: bool,
  }),
  front: bool,
  lines: shape({
    front: bool,
  }),
  x: shape({
    lines: LINES_SHAPE,
    show: bool,
  }),
  y: shape({
    lines: LINES_SHAPE,
    show: bool,
    ticks: oneOfType([bool, number]),
  }),
});

const INTERACTION_SHAPE = shape({
  brighten: bool,
  enabled: bool,
  inputType: shape({
    mouse: bool,
    touch: oneOfType([
      bool,
      shape({
        preventDefault: oneOfType([bool, number]),
      }),
    ]),
  }),
});

const LEGEND_SHAPE = shape({
  contents: shape({
    bindto: oneOfType([object, string]),
    template: oneOfType([func, string]),
  }),
  equally: bool,
  hide: bool,
  inset: shape({
    anchor: oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),
    step: number,
    x: number,
    y: number,
  }),
  item: shape({
    onclick: func,
    onout: func,
    onover: func,
    tile: shape({
      height: number,
      width: number,
    }),
  }),
  padding: number,
  position: oneOf(['bottom', 'right', 'inset']),
  show: bool,
  usePoint: bool,
});

const PADDING_SHAPE = shape({
  bottom: number,
  left: number,
  right: number,
  top: number,
});

const PIE_SHAPE = shape({
  expand: oneOfType([
    bool,
    shape({
      duration: number,
      rate: number,
    }),
  ]),
  innerRadius: number,
  label: shape({
    format: func,
    ratio: number,
    show: bool,
    threshold: number,
  }),
  outerRadius: number,
  padAngle: number,
  padding: number,
  startingAngle: number,
});

const POINT_SHAPE = shape({
  focus: shape({
    expand: shape({
      enabled: bool,
      r: number,
    }),
  }),
  opacity: number,
  pattern: arrayOf(string),
  r: oneOfType([number, func]),
  select: shape({
    r: number,
  }),
  show: bool,
  type: string,
});

const RADAR_SHAPE = shape({
  axis: shape({
    line: shape({
      show: bool,
    }),
    max: number,
    text: shape({
      position: shape({
        x: number,
        y: number,
      }),
      show: bool,
    }),
  }),
  direction: shape({
    clockwise: bool,
  }),
  level: shape({
    depth: number,
    show: bool,
    text: shape({
      format: func,
      show: bool,
    }),
  }),
  size: shape({
    ratio: number,
  }),
});

const REGION_SHAPE = shape({
  axis: string,
  class: string,
  end: oneOfType([number, string]),
  start: oneOfType([number, string]),
  style: object,
});

const RENDER_SHAPE = shape({
  lazy: bool,
  observe: bool,
});

const RESIZE_SHAPE = shape({
  auto: bool,
});

const SCATTER_SHAPE = shape({
  zerobased: bool,
});

const SIZE_SHAPE = shape({
  height: number,
  width: number,
});

const SPLINE_SHAPE = shape({
  interpolation: shape({
    type: string,
  }),
});

const SUBCHART_SHAPE = shape({
  axis: shape({
    x: shape({
      show: bool,
      tick: shape({
        show: bool,
        text: shape({
          show: bool,
        }),
      }),
    }),
  }),
  onbrush: oneOfType([bool, func]),
  show: bool,
  size: shape({
    height: number,
  }),
});

const SVG_SHAPE = shape({
  className: string,
});

const TITLE_SHAPE = shape({
  padding: PADDING_SHAPE,
  position: oneOf(['center', 'right', 'left']),
  text: string,
});

const TOOLTIP_SHAPE = shape({
  contents: oneOfType([
    func,
    shape({
      bindto: oneOfType([object, string]),
      template: string,
      text: object,
    }),
  ]),
  doNotHide: bool,
  format: shape({
    name: func,
    title: func,
    value: func,
  }),
  init: shape({
    show: bool,
    position: object,
    x: number,
  }),
  grouped: bool,
  linked: oneOfType([
    bool,
    shape({
      name: string,
    }),
  ]),
  onshow: func,
  onhide: func,
  onshown: func,
  onhidden: func,
  order: ORDER_SHAPE,
  position: func,
  show: bool,
});

const TRANSITION_SHAPE = shape({
  duration: number,
});

const ZOOM_SHAPE = shape({
  enabled: oneOfType([
    bool,
    shape({
      type: string,
    }),
  ]),
  extent: arrayOf(number),
  onzoom: func,
  onzoomend: func,
  onzoomstart: func,
  rescale: bool,
  resetButton: oneOfType([
    bool,
    shape({
      onclick: func,
      text: string,
    }),
  ]),
  x: shape({
    max: number,
    min: number,
  }),
  type: string,
});

const propTypes = {
  area: AREA_SHAPE,
  axis: AXIS_SHAPE,
  background: BACKGROUND_SHAPE,
  bar: BAR_SHAPE,
  bubble: BUBBLE_SHAPE,
  candlestick: CANDLESTICK_SHAPE,
  className: string,
  clipPath: bool,
  color: COLOR_SHAPE,
  data: DATA_SHAPE.isRequired,
  domProps: object,
  donut: DONUT_SHAPE,
  gauge: GAUGE_SHAPE,
  grid: GRID_SHAPE,
  interaction: INTERACTION_SHAPE,
  isPure: bool,
  legend: LEGEND_SHAPE,
  line: LINE_SHAPE,
  onafterinit: func,
  onbeforeinit: func,
  oninit: func,
  onout: func,
  onover: func,
  onrendered: func,
  onresize: func,
  onresized: func,
  padding: PADDING_SHAPE,
  pie: PIE_SHAPE,
  plugins: arrayOf(any),
  point: POINT_SHAPE,
  radar: RADAR_SHAPE,
  regions: arrayOf(REGION_SHAPE),
  render: RENDER_SHAPE,
  resize: RESIZE_SHAPE,
  scatter: SCATTER_SHAPE,
  size: SIZE_SHAPE,
  spline: SPLINE_SHAPE,
  style: object,
  subchart: SUBCHART_SHAPE,
  svg: SVG_SHAPE,
  title: TITLE_SHAPE,
  tooltip: TOOLTIP_SHAPE,
  transition: TRANSITION_SHAPE,
  unloadBeforeLoad: bool,
  zoom: ZOOM_SHAPE,
};

export default propTypes;
