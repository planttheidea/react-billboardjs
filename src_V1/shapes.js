// external dependencies
import PropTypes from 'prop-types';

export const AREA_SHAPE = PropTypes.shape({
  above: PropTypes.bool,
  zerobased: PropTypes.bool,
});

export const LABEL_SHAPE = PropTypes.oneOfType([
  PropTypes.shape({
    position: PropTypes.oneOf([
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
    text: PropTypes.string,
  }),
  PropTypes.string,
]);

export const AXIS_TYPE_SHAPE = PropTypes.oneOf(['category', 'indexed', 'timeseries']);

export const AXIS_Y_PADDING_SHAPE = PropTypes.shape({
  bottom: PropTypes.number,
  top: PropTypes.number,
});

export const AXIS_TICK_SHAPE = PropTypes.shape({
  count: PropTypes.number,
  format: PropTypes.func,
  text: PropTypes.shape({
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }),
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])),
});

export const AXIS_SHAPE = PropTypes.shape({
  rotated: PropTypes.bool,
  x: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string),
    clipPath: PropTypes.bool,
    extent: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    height: PropTypes.number,
    label: LABEL_SHAPE,
    localtime: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    padding: PropTypes.shape({
      left: PropTypes.number,
      right: PropTypes.number,
    }),
    show: PropTypes.bool,
    tick: PropTypes.shape({
      centered: PropTypes.bool,
      count: PropTypes.number,
      culling: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
          max: PropTypes.number,
        }),
      ]),
      fit: PropTypes.bool,
      format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      multiline: PropTypes.bool,
      outer: PropTypes.bool,
      rotate: PropTypes.number,
      tooltip: PropTypes.bool,
      values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])),
      width: PropTypes.number,
    }),
    type: AXIS_TYPE_SHAPE,
  }),
  y: PropTypes.shape({
    center: PropTypes.number,
    default: PropTypes.arrayOf(PropTypes.number),
    format: PropTypes.func,
    inner: PropTypes.bool,
    inverted: PropTypes.bool,
    label: LABEL_SHAPE,
    max: PropTypes.number,
    min: PropTypes.number,
    padding: AXIS_Y_PADDING_SHAPE,
    show: PropTypes.bool,
    tick: AXIS_TICK_SHAPE,
    type: AXIS_TYPE_SHAPE,
  }),
  y2: PropTypes.shape({
    center: PropTypes.number,
    default: PropTypes.arrayOf(PropTypes.number),
    inner: PropTypes.bool,
    inverted: PropTypes.bool,
    label: LABEL_SHAPE,
    max: PropTypes.number,
    min: PropTypes.number,
    padding: AXIS_Y_PADDING_SHAPE,
    show: PropTypes.bool,
    tick: AXIS_TICK_SHAPE,
  }),
});

export const BAR_SHAPE = PropTypes.shape({
  padding: PropTypes.number,
  radius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      ratio: PropTypes.number,
    }),
  ]),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      max: PropTypes.number,
      ratio: PropTypes.number,
    }),
  ]),
  zerobased: PropTypes.bool,
});

export const COLOR_SHAPE = PropTypes.shape({
  pattern: PropTypes.arrayOf(PropTypes.string),
  threshold: PropTypes.shape({
    max: PropTypes.number,
    unit: PropTypes.string,
    value: PropTypes.string,
  }),
});

export const LINE_SHAPE = PropTypes.shape({
  classes: PropTypes.arrayOf(PropTypes.string),
  connectNull: PropTypes.bool,
  point: PropTypes.oneOf([PropTypes.arrayOf(PropTypes.string), PropTypes.bool]),
  step: PropTypes.shape({
    type: PropTypes.oneOf(['step', 'step-after', 'step-before']),
  }),
});

export const ORDER_SHAPE = PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(['asc', 'desc', '', null])]);

export const DATA_SHAPE = PropTypes.shape({
  axes: PropTypes.object,
  classes: PropTypes.object,
  color: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      pattern: PropTypes.arrayOf(PropTypes.string),
      tiles: PropTypes.func,
    }),
  ]),
  colors: PropTypes.object,
  columns: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.number,
        PropTypes.shape({
          height: PropTypes.number,
          low: PropTypes.number,
          mid: PropTypes.number,
        }),
        PropTypes.string,
      ])
    )
  ),
  empty: PropTypes.shape({
    label: LABEL_SHAPE,
  }),
  groups: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string])),
  hide: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.string)]),
  json: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
  keys: PropTypes.shape({
    value: PropTypes.arrayOf(PropTypes.string),
    x: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    y2: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  }),
  labels: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      format: PropTypes.func,
      position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    }),
  ]),
  line: LINE_SHAPE,
  mimeType: PropTypes.string,
  names: PropTypes.object,
  onclick: PropTypes.func,
  onmax: PropTypes.func,
  onmin: PropTypes.func,
  onout: PropTypes.func,
  onover: PropTypes.func,
  onselected: PropTypes.func,
  onunselected: PropTypes.func,
  order: ORDER_SHAPE,
  point: PropTypes.shape({
    focus: PropTypes.shape({
      expand: PropTypes.shape({
        enabled: PropTypes.bool,
        r: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
      }),
    }),
    pattern: PropTypes.arrayOf(PropTypes.string),
    r: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    select: PropTypes.shape({
      r: PropTypes.number,
    }),
    show: PropTypes.bool,
    type: PropTypes.oneOf(['circle', 'rectangle']),
  }),
  regions: PropTypes.object,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))),
  selection: PropTypes.shape({
    draggable: PropTypes.bool,
    enabled: PropTypes.bool,
    isselectable: PropTypes.bool,
    multiple: PropTypes.bool,
  }),
  type: PropTypes.oneOf([
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
  ]),
  types: PropTypes.object,
  url: PropTypes.string,
  x: PropTypes.string,
  xFormat: PropTypes.string,
  xLocaltime: PropTypes.bool,
  xSort: PropTypes.bool,
  xs: PropTypes.object,
});

export const DONUT_SHAPE = PropTypes.shape({
  expand: PropTypes.bool,
  label: PropTypes.shape({
    format: PropTypes.func,
    radio: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
    show: PropTypes.bool,
    threshold: PropTypes.number,
  }),
  padAngle: PropTypes.number,
  title: PropTypes.string,
  width: PropTypes.number,
});

export const GAUGE_SHAPE = PropTypes.shape({
  expand: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      duration: PropTypes.number,
    }),
  ]),
  fullCircle: PropTypes.bool,
  label: PropTypes.shape({
    extents: PropTypes.func,
    format: PropTypes.func,
    show: PropTypes.bool,
  }),
  max: PropTypes.number,
  startingAngle: PropTypes.number,
  units: PropTypes.string,
  width: PropTypes.number,
});

export const LINES_SHAPE = PropTypes.oneOfType([
  PropTypes.arrayOf(
    PropTypes.shape({
      class: PropTypes.string,
      position: PropTypes.string,
      text: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
    })
  ),
  PropTypes.bool,
]);

export const GRID_SHAPE = PropTypes.shape({
  focus: PropTypes.shape({
    show: PropTypes.bool,
  }),
  lines: PropTypes.shape({
    front: PropTypes.bool,
  }),
  x: PropTypes.shape({
    lines: LINES_SHAPE,
    show: PropTypes.bool,
  }),
  y: PropTypes.shape({
    lines: LINES_SHAPE,
    show: PropTypes.bool,
    ticks: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  }),
});

export const INTERACTION_SHAPE = PropTypes.shape({
  brighten: PropTypes.bool,
  enabled: PropTypes.bool,
  inputType: PropTypes.shape({
    mouse: PropTypes.bool,
    touch: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        preventDefault: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
      }),
    ]),
  }),
});

export const LEGEND_SHAPE = PropTypes.shape({
  contents: PropTypes.shape({
    bindto: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    template: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  }),
  equally: PropTypes.bool,
  hide: PropTypes.bool,
  inset: PropTypes.shape({
    anchor: PropTypes.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),
    step: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  item: PropTypes.shape({
    onclick: PropTypes.func,
    onout: PropTypes.func,
    onover: PropTypes.func,
    tile: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
    }),
  }),
  padding: PropTypes.number,
  position: PropTypes.oneOf(['bottom', 'right', 'inset']),
  show: PropTypes.bool,
  usePoint: PropTypes.bool,
});

export const PADDING_SHAPE = PropTypes.shape({
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  top: PropTypes.number,
});

export const PIE_SHAPE = PropTypes.shape({
  expand: PropTypes.bool,
  innerRadius: PropTypes.number,
  label: PropTypes.shape({
    format: PropTypes.func,
    ratio: PropTypes.number,
    show: PropTypes.bool,
    threshold: PropTypes.number,
  }),
  padAngle: PropTypes.number,
  padding: PropTypes.number,
});

export const POINT_SHAPE = PropTypes.shape({
  focus: PropTypes.shape({
    expand: PropTypes.shape({
      enabled: PropTypes.bool,
      r: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    }),
  }),
  r: PropTypes.number,
  select: PropTypes.shape({
    r: PropTypes.number,
  }),
  show: PropTypes.bool,
});

export const RADAR_SHAPE = PropTypes.shape({
  axis: PropTypes.shape({
    line: PropTypes.shape({
      show: PropTypes.bool,
    }),
    max: PropTypes.number,
    text: PropTypes.shape({
      show: PropTypes.bool,
    }),
  }),
  direction: PropTypes.shape({
    clockwise: PropTypes.bool,
  }),
  level: PropTypes.shape({
    depth: PropTypes.number,
    show: PropTypes.bool,
    text: PropTypes.shape({
      format: PropTypes.func,
      show: PropTypes.bool,
    }),
  }),
  size: PropTypes.shape({
    ratio: PropTypes.number,
  }),
});

export const REGION_SHAPE = PropTypes.shape({
  axis: PropTypes.string,
  class: PropTypes.string,
  end: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  start: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
});

export const RESIZE_SHAPE = PropTypes.shape({
  auto: PropTypes.bool,
});

export const SIZE_SHAPE = PropTypes.shape({
  height: PropTypes.number,
  width: PropTypes.number,
});

export const SPLINE_SHAPE = PropTypes.shape({
  interpolation: PropTypes.shape({
    type: PropTypes.string,
  }),
});

export const SUBCHART_SHAPE = PropTypes.shape({
  onbrush: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  show: PropTypes.bool,
  size: PropTypes.shape({
    height: PropTypes.number,
  }),
});

export const SVG_SHAPE = PropTypes.shape({
  className: PropTypes.string,
});

export const TITLE_SHAPE = PropTypes.shape({
  padding: PADDING_SHAPE,
  position: PropTypes.oneOf(['bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right']),
  text: PropTypes.string,
});

export const TOOLTIP_SHAPE = PropTypes.shape({
  contents: PropTypes.func,
  format: PropTypes.shape({
    name: PropTypes.func,
    title: PropTypes.func,
    value: PropTypes.func,
  }),
  grouped: PropTypes.bool,
  linked: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ]),
  order: ORDER_SHAPE,
  position: PropTypes.func,
  show: PropTypes.bool,
});

export const TRANSITION_SHAPE = PropTypes.shape({
  duration: PropTypes.number,
});

export const ZOOM_SHAPE = PropTypes.shape({
  enabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ]),
  extent: PropTypes.arrayOf(PropTypes.number),
  onzoom: PropTypes.func,
  onzoomend: PropTypes.func,
  onzoomstart: PropTypes.func,
  rescale: PropTypes.bool,
  resetButton: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      text: PropTypes.string,
    }),
  ]),
  x: PropTypes.shape({
    max: PropTypes.number,
    min: PropTypes.number,
  }),
});
