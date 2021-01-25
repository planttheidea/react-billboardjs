import React, { PureComponent } from 'react';
import { render } from 'react-dom';

import 'billboard.js/dist/billboard.css';

// charts
import BarChart from './BarChart';
import DonutChart from './DonutChart';
import LineChart from './LineChart';

class App extends PureComponent {
  element = null;

  state = { visible: false };

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => ({ visible: true }));
    }, 0);
  }

  render() {
    return (
      <div>
        <h1>App</h1>

        {this.state.visible && (
          <div>
            <LineChart />
            <BarChart />
            <DonutChart />
          </div>
        )}
      </div>
    );
  }
}

const renderApp = (container) => {
  render(<App />, container);
};

// document.body.style.backgroundColor = '#1d1d1d';
// document.body.style.color = '#d5d5d5';
document.body.style.margin = 0;
document.body.style.padding = 0;

const div = document.createElement('div');

div.id = 'app-container';

div.style.boxSizing = 'border-box';
div.style.height = '100vh';
div.style.overflow = 'auto';
div.style.padding = '15px';
div.style.width = '100vw';

renderApp(div);

document.body.appendChild(div);
