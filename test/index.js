// test
import test from 'ava';
import React from 'react';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

// src
import * as component from 'src/index';
import * as bb from 'src/bb';

const BillboardChart = component.default;

const nextFrame = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000 / 60 + 50);
  });
};

test('if componentDidMount will fire updateChart with props on the first frame after render', async (t) => {
  const instance = {
    props: {},
    updateChart: sinon.spy()
  };

  const componentDidMount = component.createComponentDidMount(instance);

  componentDidMount();

  await nextFrame();

  t.true(instance.updateChart.calledOnce);
  t.true(instance.updateChart.calledWith(instance.props));
});

test('if shouldComponentUpdate will return true if not pure', (t) => {
  const instance = {
    context: {},
    props: {
      isPure: false
    }
  };

  const shouldComponentUpdate = component.createShouldComponentUpdate(instance);

  const nextProps = {...instance.props};
  const nextState = null;
  const nextContext = {};

  const result = shouldComponentUpdate(nextProps, nextState, nextContext);

  t.true(result);
});

test('if shouldComponentUpdate will return true if pure and props are not equal', (t) => {
  const instance = {
    context: {},
    props: {
      isPure: true
    }
  };

  const shouldComponentUpdate = component.createShouldComponentUpdate(instance);

  const nextProps = {...instance.props, className: 'foo'};
  const nextState = null;
  const nextContext = {};

  const result = shouldComponentUpdate(nextProps, nextState, nextContext);

  t.true(result);
});

test('if shouldComponentUpdate will return true if pure and context is not equal', (t) => {
  const instance = {
    context: {},
    props: {
      isPure: true
    }
  };

  const shouldComponentUpdate = component.createShouldComponentUpdate(instance);

  const nextProps = {...instance.props};
  const nextState = null;
  const nextContext = {apiKey: 'apiKey'};

  const result = shouldComponentUpdate(nextProps, nextState, nextContext);

  t.true(result);
});

test('if shouldComponentUpdate will return false if pure and props / context are equal', (t) => {
  const instance = {
    context: {},
    props: {
      isPure: true
    }
  };

  const shouldComponentUpdate = component.createShouldComponentUpdate(instance);

  const nextProps = {...instance.props};
  const nextState = null;
  const nextContext = {...instance.context};

  const result = shouldComponentUpdate(nextProps, nextState, nextContext);

  t.false(result);
});

test('if componentWillUpdate will update the chart with nextProps', (t) => {
  const instance = {
    updateChart: sinon.spy()
  };

  const componentWillUpdate = component.createComponentWillUpdate(instance);

  const nextProps = {};

  componentWillUpdate(nextProps);

  t.true(instance.updateChart.calledOnce);
  t.true(instance.updateChart.calledWith(nextProps));
});

test('if componentWillUnmount will call destroyChart', (t) => {
  const instance = {
    destroyChart: sinon.spy()
  };

  const componentWillUnmount = component.createComponentWillUnmount(instance);

  componentWillUnmount();

  t.true(instance.destroyChart.calledOnce);
});

test('if assignElementToRef will assign the element passed to the refName', (t) => {
  const instance = {};
  const refName = 'refName';

  const assignElementToRef = component.createAssignElementToRef(instance, refName);

  const element = {};

  assignElementToRef(element);

  t.is(instance[refName], element);
});

test('if destroyChart will call destroy on the chart and set it to null when successful', (t) => {
  const destroy = sinon.spy();

  const instance = {
    chart: {
      destroy
    }
  };

  const destroyChart = component.createDestroyChart(instance);

  destroyChart();

  t.true(destroy.calledOnce);
  t.is(instance.chart, null);
});

test('if destroyChart will call console.error if there is an error destrorying the chart', (t) => {
  const error = new Error('boom');

  const instance = {
    chart: {
      destroy: sinon.stub().throws(error)
    }
  };

  const destroyChart = component.createDestroyChart(instance);

  const consoleStub = sinon.stub(console, 'error');

  destroyChart();

  t.true(instance.chart.destroy.calledOnce);

  t.true(consoleStub.calledOnce);
  t.true(consoleStub.calledWith('Internal billboard.js error', error));

  consoleStub.restore();
});

test('if generateChart will call generate on bb with the config stripped of extra props', (t) => {
  const instance = {
    chartElement: {
      chart: 'element'
    },
    props: {
      className: 'className',
      isPure: false,
      style: {},
      unloadBeforeLoad: false,
      config: 'value'
    }
  };

  const generateChart = component.createGenerateChart(instance);

  const fakeBb = {
    generate: sinon.spy()
  };

  const bbStub = sinon.stub(bb, 'default').returns(fakeBb);

  generateChart();

  t.true(bbStub.calledOnce);

  t.true(fakeBb.generate.calledOnce);
  t.deepEqual(fakeBb.generate.args[0], [{bindto: instance.chartElement, config: instance.props.config}]);

  bbStub.restore();
});

test('if loadData will call load on the instance chart', (t) => {
  const instance = {
    chart: {
      load: sinon.spy()
    }
  };

  const loadData = component.createLoadData(instance);

  const data = {};

  loadData(data);

  t.true(instance.chart.load.calledOnce);
  t.true(instance.chart.load.calledWith(data));
});

test('if redrawChart will trigger flush on the chart', (t) => {
  const instance = {
    chart: {
      flush: sinon.spy()
    }
  };

  const redraw = component.createRedraw(instance);

  redraw();

  t.true(instance.chart.flush.calledOnce);
});

test('if unloadData will call unload on the instance chart', (t) => {
  const instance = {
    chart: {
      unload: sinon.spy()
    }
  };

  const unloadData = component.createUnloadData(instance);

  const data = {};

  unloadData(data);

  t.true(instance.chart.unload.calledOnce);
  t.true(instance.chart.unload.calledWith(data));
});

test('if updateChart will create the chart if it does not exist and then load the data', (t) => {
  const chart = {};

  const instance = {
    chart: null,
    generateChart: sinon.stub().returns(chart),
    loadData: sinon.spy(),
    unloadData: sinon.spy()
  };

  const updateChart = component.createUpdateChart(instance);

  const props = {
    data: {},
    unloadBeforeLoad: false
  };

  updateChart(props);

  t.true(instance.generateChart.calledOnce);
  t.is(instance.chart, chart);


  t.true(instance.loadData.calledOnce);
  t.true(instance.loadData.calledWith({...props.data, unload: props.unloadBeforeLoad}));
});

test('if updateChart will not create the chart if it already is populated', (t) => {
  const chart = {};

  const instance = {
    chart,
    generateChart: sinon.stub().returns(chart),
    loadData: sinon.spy(),
    unloadData: sinon.spy()
  };

  const updateChart = component.createUpdateChart(instance);

  const props = {
    data: {},
    unloadBeforeLoad: false
  };

  updateChart(props);

  t.true(instance.generateChart.notCalled);


  t.true(instance.loadData.calledOnce);
  t.true(instance.loadData.calledWith({...props.data, unload: props.unloadBeforeLoad}));
});

test('if updateChart will unload the data if unloadBeforeLoad is set to true', (t) => {
  const chart = {};

  const instance = {
    chart: null,
    generateChart: sinon.stub().returns(chart),
    loadData: sinon.spy(),
    unloadData: sinon.spy()
  };

  const updateChart = component.createUpdateChart(instance);

  const props = {
    data: {},
    unloadBeforeLoad: true
  };

  updateChart(props);

  t.true(instance.generateChart.calledOnce);
  t.is(instance.chart, chart);


  t.true(instance.loadData.calledOnce);
  t.true(instance.loadData.calledWith({...props.data, unload: props.unloadBeforeLoad}));
});

test.serial('if BillboardChart renders correctly with default props', async (t) => {
  const props = {};

  const chart = {
    load: sinon.spy()
  };

  const bbStub = {
    generate() {
      return chart;
    }
  };

  const stub = sinon.stub(bb, 'default').returns(bbStub);

  const wrapper = shallow(<BillboardChart {...props} />);

  t.snapshot(toJson(wrapper));

  await nextFrame();

  t.true(stub.calledOnce);

  stub.restore();
});

test.serial('if BillboardChart renders correctly with a custom className', async (t) => {
  const props = {
    className: 'className'
  };

  const chart = {
    load: sinon.spy()
  };

  const bbStub = {
    generate() {
      return chart;
    }
  };

  const stub = sinon.stub(bb, 'default').returns(bbStub);

  const wrapper = shallow(<BillboardChart {...props} />);

  t.snapshot(toJson(wrapper));

  await nextFrame();

  t.true(stub.calledOnce);

  stub.restore();
});

test.serial('if BillboardChart renders correctly with a custom style object', async (t) => {
  const props = {
    style: {
      display: 'inline-block'
    }
  };

  const chart = {
    load: sinon.spy()
  };

  const bbStub = {
    generate() {
      return chart;
    }
  };

  const stub = sinon.stub(bb, 'default').returns(bbStub);

  const wrapper = shallow(<BillboardChart {...props} />);

  t.snapshot(toJson(wrapper));

  await nextFrame();

  t.true(stub.calledOnce);

  stub.restore();
});
