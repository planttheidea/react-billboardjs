// external dependencies
import React, {PureComponent} from 'react';

// src
import BillboardChart from '../src';

const LINE_CHART_DATA = {
  columns: [
    ['data1', 30, 20, 50, 40, 60, 50],
    ['data2', 200, 130, 90, 240, 130, 220],
    ['data3', 300, 200, 160, 400, 250, 250]
  ],
  type: 'line'
};

const SUBCHART = {
  show: true
};

class LineChart extends PureComponent {
  static displayName = 'LineChart';

  state = {
    data: LINE_CHART_DATA
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState(
        ({data}) => {
          return {
            data: {
              ...data,
              columns: data.columns.map((values) => {
                return values[0] === 'data3' ? ['data3', 130, 150, 200, 300, 200, 100] : values;
              })
            }
          };
        },
        () => {
          setTimeout(() => {
            this.element.unloadData({
              ids: 'data1'
            });
          }, 1000);
        }
      );
    }, 1000);
  }

  element = null;

  getRef = (Instance) => {
    this.element = Instance;
  };

  render() {
    return (
      /* eslint-disable prettier */
      <BillboardChart
        data={this.state.data}
        isPure
        ref={this.getRef}
        subchart={SUBCHART}
      />
      /* eslint-enable prettier*/
    );
  }
}

export default LineChart;
