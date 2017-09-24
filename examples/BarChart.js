// external dependencies
import React, {PureComponent} from 'react';

// src
import BillboardChart from '../src';

const CHART_DATA = {
  columns: [['data1', 30, 200, 100, 400, 150, 250], ['data2', 130, 100, 140, 200, 150, 50]],
  types: {
    data1: 'bar',
    data2: 'area',
    data3: 'area-spline'
  }
};

const CHART_AXIS = {
  rotated: true,
  x: {
    categories: ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'],
    type: 'category'
  }
};

class BarChart extends PureComponent {
  static displayName = 'BarChart';

  componentDidMount() {
    setTimeout(() => {
      this.element.loadData({
        columns: [['data3', 130, 150, 200, 300, 200, 100]]
      });
    }, 1000);
  }

  element = null;

  getRef = (Instance) => {
    this.element = Instance;

    console.log(Instance);
  };

  render() {
    return (
      /* eslint-disable prettier */
      <BillboardChart
        axis={CHART_AXIS}
        className="bar"
        data={CHART_DATA}
        ref={this.getRef}
      />
      /* eslint-enable prettier*/
    );
  }
}

export default BarChart;
