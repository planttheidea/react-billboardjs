// external dependencies
import React, {PureComponent} from 'react';

// src
import BillboardChart from '../src';

const CHART_DATA = {
  json: {
    data1: [30],
    data2: [120]
  },
  type: 'donut'
};

const SIZE = {
  height: 500,
  width: 500
};

const STYLE = {
  display: 'inline-block'
};

class DonutChart extends PureComponent {
  static displayName = 'DonutChart';

  componentDidMount() {
    setTimeout(() => {
      this.element.loadData({
        json: {
          setosa: [
            0.2,
            0.2,
            0.2,
            0.2,
            0.2,
            0.4,
            0.3,
            0.2,
            0.2,
            0.1,
            0.2,
            0.2,
            0.1,
            0.1,
            0.2,
            0.4,
            0.4,
            0.3,
            0.3,
            0.3,
            0.2,
            0.4,
            0.2,
            0.5,
            0.2,
            0.2,
            0.4,
            0.2,
            0.2,
            0.2,
            0.2,
            0.4,
            0.1,
            0.2,
            0.2,
            0.2,
            0.2,
            0.1,
            0.2,
            0.2,
            0.3,
            0.3,
            0.2,
            0.6,
            0.4,
            0.3,
            0.2,
            0.2,
            0.2,
            0.2
          ],
          versicolor: [
            1.4,
            1.5,
            1.5,
            1.3,
            1.5,
            1.3,
            1.6,
            1.0,
            1.3,
            1.4,
            1.0,
            1.5,
            1.0,
            1.4,
            1.3,
            1.4,
            1.5,
            1.0,
            1.5,
            1.1,
            1.8,
            1.3,
            1.5,
            1.2,
            1.3,
            1.4,
            1.4,
            1.7,
            1.5,
            1.0,
            1.1,
            1.0,
            1.2,
            1.6,
            1.5,
            1.6,
            1.5,
            1.3,
            1.3,
            1.3,
            1.2,
            1.4,
            1.2,
            1.0,
            1.3,
            1.2,
            1.3,
            1.3,
            1.1,
            1.3
          ],
          virginica: [
            2.5,
            1.9,
            2.1,
            1.8,
            2.2,
            2.1,
            1.7,
            1.8,
            1.8,
            2.5,
            2.0,
            1.9,
            2.1,
            2.0,
            2.4,
            2.3,
            1.8,
            2.2,
            2.3,
            1.5,
            2.3,
            2.0,
            2.0,
            1.8,
            2.1,
            1.8,
            1.8,
            1.8,
            2.1,
            1.6,
            1.9,
            2.0,
            2.2,
            1.5,
            1.4,
            2.3,
            2.4,
            1.8,
            1.8,
            2.1,
            2.4,
            2.3,
            1.9,
            2.3,
            2.5,
            2.3,
            1.9,
            2.0,
            2.3,
            1.8
          ]
        }
      });

      setTimeout(() => {
        this.element.unloadData({
          ids: ['data1', 'data2']
        });
      }, 1000);
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
        data={CHART_DATA}
        ref={this.getRef}
        size={SIZE}
        style={STYLE}
      />
      /* eslint-enable prettier*/
    );
  }
}

export default DonutChart;
