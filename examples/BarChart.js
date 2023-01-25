// external dependencies
import React, { PureComponent } from 'react';
import { area, areaSpline, bar } from 'billboard.js';

// src
import BillboardChart from '../src';

const CHART_DATA = {
  columns: [
    ['data1', 30, 200, 100, 400, 150, 250],
    ['data2', 130, 100, 140, 200, 150, 50],
  ],
  types: {
    data1: bar(),
    data2: area(),
  },
};

const CHART_AXIS = {
  rotated: true,
  x: {
    categories: ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'],
    type: 'category',
  },
};

const DOM_PROPS = {
  'data-type': 'bar',
};

class BarChart extends PureComponent {
  static displayName = 'BarChart';

  state = {
    data: CHART_DATA,
  };

  componentDidMount() {
    setTimeout(() => {
      this.instance.loadData({
        columns: [['data3', 130, 150, 200, 300, 200, 100]],
        types: {
          data3: areaSpline(),
        },
      });

      console.log(BillboardChart.getInstances());

      setTimeout(() => {
        // this.instance.destroyChart();

        this.instance.exportChart({ mimeType: 'image/jpeg' }, (dataUrl) =>
          console.log(dataUrl),
        );
      }, 1000);
    }, 3000);
  }

  instance = null;

  getRef = (Instance) => {
    this.instance = Instance;

    console.log(Instance);
  };

  render() {
    const { data } = this.state;

    if (!data) {
      return <p>Loading...</p>;
    }

    console.log(data);

    return (
      /* eslint-disable prettier */
      <BillboardChart
        axis={CHART_AXIS}
        className="bar"
        data={data}
        domProps={DOM_PROPS}
        ref={this.getRef}
      />
      /* eslint-enable prettier*/
    );
  }
}

export default BarChart;
