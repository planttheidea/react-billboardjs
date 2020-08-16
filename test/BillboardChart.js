// test
import test from 'ava';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import sinon from 'sinon';
import * as bb from 'src/bb';
// src
import * as component from 'src/BillboardChart';

const BillboardChart = component.default;

const nextFrame = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000 / 60 + 50);
  });

test('if componentDidMount will fire updateChart with props on the first frame after render', async (t) => {
  const instance = {
    props: {},
    updateChart: sinon.spy(),
  };

  component.componentDidMount(instance);

  await nextFrame();

  t.true(instance.updateChart.calledOnce);
  t.true(instance.updateChart.calledWith(instance.props));
});

test('if shouldComponentUpdate will return true if not pure', (t) => {
  const instance = {
    context: {},
    props: {
      isPure: false,
    },
  };

  const nextProps = { ...instance.props };
  const nextState = null;
  const nextContext = {};

  const result = component.shouldComponentUpdate(instance, [
    nextProps,
    nextState,
    nextContext,
  ]);

  t.true(result);
});

test('if shouldComponentUpdate will return true if pure and props are not equal', (t) => {
  const instance = {
    context: {},
    props: {
      isPure: true,
    },
  };

  const nextProps = { ...instance.props, className: 'foo' };
  const nextState = null;
  const nextContext = {};

  const result = component.shouldComponentUpdate(instance, [
    nextProps,
    nextState,
    nextContext,
  ]);

  t.true(result);
});

test('if shouldComponentUpdate will return true if pure and context is not equal', (t) => {
  const instance = {
    context: {},
    props: {
      isPure: true,
    },
  };

  const nextProps = { ...instance.props };
  const nextState = null;
  const nextContext = { apiKey: 'apiKey' };

  const result = component.shouldComponentUpdate(instance, [
    nextProps,
    nextState,
    nextContext,
  ]);

  t.true(result);
});

test('if shouldComponentUpdate will return false if pure and props / context are equal', (t) => {
  const instance = {
    context: {},
    props: {
      isPure: true,
    },
  };

  const nextProps = { ...instance.props };
  const nextState = null;
  const nextContext = { ...instance.context };

  const result = component.shouldComponentUpdate(instance, [
    nextProps,
    nextState,
    nextContext,
  ]);

  t.false(result);
});

test('if getSnapshotBeforeUpdate will update the chart with now-updated props', (t) => {
  const instance = {
    props: {},
    updateChart: sinon.spy(),
  };

  const prevProps = {};

  component.getSnapshotBeforeUpdate(instance, [prevProps]);

  t.true(instance.updateChart.calledOnce);
  t.true(instance.updateChart.calledWith(instance.props));
});

test('if componentWillUpdate will update the chart with nextProps', (t) => {
  const instance = {
    props: {},
    updateChart: sinon.spy(),
  };

  const nextProps = {};

  component.componentWillUpdate(instance, [nextProps]);

  t.true(instance.updateChart.calledOnce);
  t.true(instance.updateChart.calledWith(nextProps));
});

test('if componentWillUnmount will call destroyChart', (t) => {
  const instance = {
    destroyChart: sinon.spy(),
  };

  component.componentWillUnmount(instance);

  t.true(instance.destroyChart.calledOnce);
});

test('if config will call config on the underlying chart', (t) => {
  const instance = {
    chart: {
      config: sinon.spy(),
    },
  };

  const args = ['key', true, 123];

  component.config(instance, args);

  t.true(instance.chart.config.calledOnce);
  t.true(instance.chart.config.calledWith(...args));
});

test('if destroyChart will call destroy on the chart and set it to null when successful', (t) => {
  const destroy = sinon.spy();

  const instance = {
    chart: {
      destroy,
    },
  };

  component.destroyChart(instance);

  t.true(destroy.calledOnce);
  t.is(instance.chart, null);
});

test('if destroyChart will call console.error if there is an error destroying the chart', (t) => {
  const error = new Error('boom');

  const destroy = sinon.stub().throws(error);

  const instance = {
    chart: {
      destroy,
    },
  };

  const consoleStub = sinon.stub(console, 'error');

  component.destroyChart(instance);

  t.true(destroy.calledOnce);

  t.true(consoleStub.calledOnce);
  t.true(consoleStub.calledWith('Internal billboard.js error', error));

  consoleStub.restore();
});

test('if destroyChart will do nothing if there is no chart', (t) => {
  const instance = {};

  const consoleStub = sinon.stub(console, 'error');

  component.destroyChart(instance);

  t.true(consoleStub.notCalled);

  t.is(instance.chart, null);

  consoleStub.restore();
});

test('if exportChart will call export if the chart exists', (t) => {
  const instance = {
    chart: {
      export: sinon.spy(),
    },
  };

  const mimeType = 'mimeType';
  const callback = () => {};

  component.exportChart(instance, [mimeType, callback]);

  t.true(instance.chart.export.calledOnce);
  t.true(instance.chart.export.calledWith(mimeType, callback));
});

test('if exportChart will not call export if the chart does not exist', (t) => {
  const instance = {
    chart: null,
  };

  const mimeType = 'mimeType';
  const callback = () => {};

  t.notThrows(() => {
    component.exportChart(instance, [mimeType, callback]);
  });
});

test.serial(
  'if generateChart will call generate on bb with the config stripped of extra props',
  (t) => {
    const instance = {
      chartElement: {
        chart: 'element',
      },
      props: {
        className: 'className',
        config: 'value',
        isPure: false,
        style: {},
        unloadBeforeLoad: false,
      },
    };

    const fakeBb = {
      generate: sinon.spy(),
    };

    const bbStub = sinon.stub(bb, 'default').returns(fakeBb);

    component.generateChart(instance);

    t.true(bbStub.calledOnce);

    t.true(fakeBb.generate.calledOnce);
    t.deepEqual(fakeBb.generate.args[0], [
      { bindto: instance.chartElement, config: instance.props.config },
    ]);

    bbStub.restore();
  }
);

test('if loadData will do nothing if the chart does not exist', (t) => {
  const instance = {
    chart: null,
  };

  const data = {};

  try {
    component.loadData(instance, [data]);

    t.pass();
  } catch (error) {
    t.fail(error);
  }
});

test('if loadData will call load on the instance chart', (t) => {
  const instance = {
    chart: {
      load: sinon.spy(),
    },
  };

  const data = {};

  component.loadData(instance, [data]);

  t.true(instance.chart.load.calledOnce);
  t.true(instance.chart.load.calledWith(data));
});

test('if redraw will do nothing if the chart does not exist', (t) => {
  const instance = {
    chart: null,
  };

  try {
    component.redraw(instance);

    t.pass();
  } catch (error) {
    t.fail(error);
  }
});

test('if redraw will trigger flush on the chart', (t) => {
  const instance = {
    chart: {
      flush: sinon.spy(),
    },
  };

  component.redraw(instance);

  t.true(instance.chart.flush.calledOnce);
});

test('if unloadData will do nothing if the chart does not exist', (t) => {
  const instance = {
    chart: null,
  };

  const data = {};

  try {
    component.unloadData(instance, [data]);

    t.pass();
  } catch (error) {
    t.fail(error);
  }
});

test('if unloadData will call unload on the instance chart', (t) => {
  const instance = {
    chart: {
      unload: sinon.spy(),
    },
  };

  const data = {};

  component.unloadData(instance, [data]);

  t.true(instance.chart.unload.calledOnce);
  t.true(instance.chart.unload.calledWith(data));
});

test('if updateChart will create the chart if it does not exist and then load the data', (t) => {
  const chart = {};

  const instance = {
    chart: null,
    generateChart: sinon.stub().returns(chart),
    loadData: sinon.spy(),
    unloadData: sinon.spy(),
  };

  const props = {
    data: {},
    unloadBeforeLoad: false,
  };

  component.updateChart(instance, [props]);

  t.true(instance.generateChart.calledOnce);
  t.is(instance.chart, chart);

  t.true(instance.loadData.calledOnce);
  t.true(instance.loadData.calledWith(props.data));
});

test('if updateChart will not create the chart if it already is populated', (t) => {
  const chart = {};

  const instance = {
    chart,
    generateChart: sinon.stub().returns(chart),
    loadData: sinon.spy(),
    unloadData: sinon.spy(),
  };

  const props = {
    data: {},
    unloadBeforeLoad: false,
  };

  component.updateChart(instance, [props]);

  t.true(instance.generateChart.notCalled);

  t.true(instance.loadData.calledOnce);
  t.true(instance.loadData.calledWith(props.data));
});

test('if updateChart will unload the data if unloadBeforeLoad is set to true', (t) => {
  const chart = {};

  const instance = {
    chart: null,
    generateChart: sinon.stub().returns(chart),
    loadData: sinon.spy(),
    unloadData: sinon.spy(),
  };

  const props = {
    data: {},
    unloadBeforeLoad: true,
  };

  component.updateChart(instance, [props]);

  t.true(instance.generateChart.calledOnce);
  t.is(instance.chart, chart);

  t.true(instance.loadData.calledOnce);
  t.true(
    instance.loadData.calledWith({
      ...props.data,
      unload: props.unloadBeforeLoad,
    })
  );
});

test.serial(
  'if BillboardChart renders correctly with default props',
  async (t) => {
    const props = {
      data: {},
    };

    const chart = {
      load: sinon.spy(),
    };

    const bbStub = {
      generate() {
        return chart;
      },
    };

    const stub = sinon.stub(bb, 'default').returns(bbStub);

    const wrapper = shallow(<BillboardChart {...props} />);

    t.snapshot(toJson(wrapper));

    await nextFrame();

    t.true(stub.calledOnce);

    stub.restore();
  }
);

test.serial(
  'if BillboardChart renders correctly with a custom className',
  async (t) => {
    const props = {
      className: 'className',
      data: {},
    };

    const chart = {
      load: sinon.spy(),
    };

    const bbStub = {
      generate() {
        return chart;
      },
    };

    const stub = sinon.stub(bb, 'default').returns(bbStub);

    const wrapper = shallow(<BillboardChart {...props} />);

    t.snapshot(toJson(wrapper));

    await nextFrame();

    t.true(stub.calledOnce);

    stub.restore();
  }
);

test.serial(
  'if BillboardChart renders correctly with a custom style object',
  async (t) => {
    const props = {
      data: {},
      style: {
        display: 'inline-block',
      },
    };

    const chart = {
      load: sinon.spy(),
    };

    const bbStub = {
      generate() {
        return chart;
      },
    };

    const stub = sinon.stub(bb, 'default').returns(bbStub);

    const wrapper = shallow(<BillboardChart {...props} />);

    t.snapshot(toJson(wrapper));

    await nextFrame();

    t.true(stub.calledOnce);

    stub.restore();
  }
);

test.serial(
  'if BillboardChart renders correctly with custom domProps passed',
  async (t) => {
    const props = {
      data: {},
      domProps: {
        'data-foo': 'bar',
      },
    };

    const chart = {
      load: sinon.spy(),
    };

    const bbStub = {
      generate() {
        return chart;
      },
    };

    const stub = sinon.stub(bb, 'default').returns(bbStub);

    const wrapper = shallow(<BillboardChart {...props} />);

    t.snapshot(toJson(wrapper));

    await nextFrame();

    t.true(stub.calledOnce);

    stub.restore();
  }
);

test.serial(
  'if BillboardChart has a static method that returns the array of instances from the bb object',
  (t) => {
    const instance = ['foo', 'bar'];

    const stub = sinon.stub(bb, 'default').returns({
      instance,
    });

    const result = BillboardChart.getInstances();

    t.is(result, instance);

    stub.restore();
  }
);
