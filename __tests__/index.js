import '@babel/polyfill';

import React from 'react';
import { bb } from 'billboard.js';
import BillboardChart from '../src/index';
import { render } from '@testing-library/react';

jest.mock('billboard.js', () => {
  const actual = jest.requireActual('billboard.js');

  return {
    ...actual,
    bb: {
      ...actual.bb,
      generate: jest.fn(actual.bb.generate),
    },
  };
});

describe('react-billboardjs', () => {
  afterEach(jest.clearAllMocks);

  test('component mount should create a new chart with data', () => {
    const data = {
      columns: [['values', 30, 20, 50, 40, 60, 50]],
      type: 'line',
    };
    const domProps = { 'data-testid': 'line' };
    const ref = React.createRef(null);

    const { container } = render(
      <BillboardChart data={data} domProps={domProps} ref={ref} />,
    );

    const instance = ref.current;

    expect(instance.chartElement).not.toBeNull();

    expect(bb.generate).toHaveBeenCalledWith({
      bindto: expect.any(HTMLDivElement),
      data,
    });
    expect(container.querySelector('svg')).not.toBeNull();
  });

  test('component update should load the new data in the existing chart', () => {
    const data = {
      columns: [['values', 30, 20, 50, 40, 60, 50]],
      type: 'line',
    };
    const domProps = { 'data-testid': 'line' };
    const ref = React.createRef(null);

    const { rerender } = render(
      <BillboardChart data={data} domProps={domProps} ref={ref} />,
    );

    const instance = ref.current;

    const spy = jest.spyOn(instance.chart, 'load');

    bb.generate.mockClear();

    const nextData = {
      ...data,
      columns: [...data.columns, ['values', 1, 2, 3, 4, 5, 6]],
    };

    rerender(<BillboardChart data={nextData} domProps={domProps} ref={ref} />);

    expect(bb.generate).not.toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(nextData);

    spy.mockRestore();
  });

  test('a pure component should only update if the props have changed', () => {
    const data = {
      columns: [['values', 30, 20, 50, 40, 60, 50]],
      type: 'line',
    };
    const domProps = { 'data-testid': 'line' };
    const ref = React.createRef(null);

    const { rerender } = render(
      <BillboardChart data={data} domProps={domProps} isPure ref={ref} />,
    );

    const instance = ref.current;

    const spy = jest.spyOn(instance.chart, 'load');

    bb.generate.mockClear();

    rerender(
      <BillboardChart data={data} domProps={domProps} isPure ref={ref} />,
    );

    expect(spy).not.toHaveBeenCalled();

    const nextData = {
      ...data,
      columns: [...data.columns, ['values', 1, 2, 3, 4, 5, 6]],
    };

    rerender(
      <BillboardChart data={nextData} domProps={domProps} isPure ref={ref} />,
    );

    expect(spy).toHaveBeenCalledWith(nextData);

    spy.mockRestore();
  });

  test('destroyChart destroy the chart and null it out', () => {
    const data = {
      columns: [['values', 30, 20, 50, 40, 60, 50]],
      type: 'line',
    };
    const domProps = { 'data-testid': 'line' };
    const ref = React.createRef(null);

    render(<BillboardChart data={data} domProps={domProps} ref={ref} />);

    const instance = ref.current;

    const spy = jest.spyOn(instance.chart, 'destroy');

    instance.destroyChart();

    expect(spy).toHaveBeenCalled();
    expect(instance.chart).toBeNull();

    spy.mockRestore();
  });

  test('exportChart should export the chart as an image', () => {
    const data = {
      columns: [['values', 30, 20, 50, 40, 60, 50]],
      type: 'line',
    };
    const domProps = { 'data-testid': 'line' };
    const ref = React.createRef(null);

    render(<BillboardChart data={data} domProps={domProps} ref={ref} />);

    const instance = ref.current;

    const spy = jest.spyOn(instance.chart, 'export');
    const onExport = jest.fn();

    instance.exportChart('image/png', onExport);

    expect(spy).toHaveBeenCalledWith('image/png', onExport);

    spy.mockRestore();
  });

  test('loadData should load the new data in the chart', () => {
    const data = {
      columns: [['values', 30, 20, 50, 40, 60, 50]],
      type: 'line',
    };
    const domProps = { 'data-testid': 'line' };
    const ref = React.createRef(null);

    render(<BillboardChart data={data} domProps={domProps} ref={ref} />);

    const instance = ref.current;

    const spy = jest.spyOn(instance.chart, 'load');

    const nextData = {
      ...data,
      columns: [...data.columns, ['values', 1, 2, 3, 4, 5, 6]],
    };

    instance.loadData(nextData);

    expect(spy).toHaveBeenCalledWith(nextData);

    spy.mockRestore();
  });

  test('redraw should force a flush of the chart', () => {
    const data = {
      columns: [['values', 30, 20, 50, 40, 60, 50]],
      type: 'line',
    };
    const domProps = { 'data-testid': 'line' };
    const ref = React.createRef(null);

    render(<BillboardChart data={data} domProps={domProps} ref={ref} />);

    const instance = ref.current;

    const spy = jest.spyOn(instance.chart, 'flush');

    instance.redraw();

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  test('unloadData should unload the data in the chart', () => {
    const data = {
      columns: [['values', 30, 20, 50, 40, 60, 50]],
      type: 'line',
    };
    const domProps = { 'data-testid': 'line' };
    const ref = React.createRef(null);

    render(<BillboardChart data={data} domProps={domProps} ref={ref} />);

    const instance = ref.current;

    const spy = jest.spyOn(instance.chart, 'unload');

    const unloaded = {
      ids: ['values'],
    };

    instance.unloadData(unloaded);

    expect(spy).toHaveBeenCalledWith(unloaded);

    spy.mockRestore();
  });

  test('updateConfig should update a config setting on the chart', () => {
    const data = {
      columns: [['values', 30, 20, 50, 40, 60, 50]],
      type: 'line',
    };
    const domProps = { 'data-testid': 'line' };
    const ref = React.createRef(null);

    render(<BillboardChart data={data} domProps={domProps} ref={ref} />);

    const instance = ref.current;

    const spy = jest.spyOn(instance.chart, 'config');

    instance.updateConfig('line.max', 100, true);

    expect(spy).toHaveBeenCalledWith('line.max', 100, true);

    spy.mockRestore();
  });

  describe('statics', () => {
    test('getInstances should return an array of chart instances', () => {
      const data = {
        columns: [['values', 30, 20, 50, 40, 60, 50]],
        type: 'line',
      };
      const domProps = { 'data-testid': 'line' };
      const ref = React.createRef(null);

      render(<BillboardChart data={data} domProps={domProps} ref={ref} />);

      const instance = ref.current;

      const instances = BillboardChart.getInstances();

      expect(instances).toEqual([instance.chart]);
    });
  });

  describe('error handling', () => {
    test('exportChart should notify if the chart does not exist', () => {
      const data = {
        columns: [['values', 30, 20, 50, 40, 60, 50]],
        type: 'line',
      };
      const domProps = { 'data-testid': 'line' };
      const ref = React.createRef(null);

      render(<BillboardChart data={data} domProps={domProps} ref={ref} />);

      const instance = ref.current;

      instance.destroyChart();

      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      instance.exportChart('image/png', () => {});

      expect(spy).toHaveBeenCalledWith('No chart is available to export.');

      spy.mockRestore();
    });

    test('loadData should notify if the chart does not exist', () => {
      const data = {
        columns: [['values', 30, 20, 50, 40, 60, 50]],
        type: 'line',
      };
      const domProps = { 'data-testid': 'line' };
      const ref = React.createRef(null);

      render(<BillboardChart data={data} domProps={domProps} ref={ref} />);

      const instance = ref.current;

      instance.destroyChart();

      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const nextData = {
        ...data,
        columns: [...data.columns, ['values', 1, 2, 3, 4, 5, 6]],
      };

      instance.loadData(nextData);

      expect(spy).toHaveBeenCalledWith(
        'No chart is available to which data can be loaded. It may already have been destroyed, or has never been drawn.',
      );

      spy.mockRestore();
    });

    test('redraw should notify if the chart does not exist', () => {
      const data = {
        columns: [['values', 30, 20, 50, 40, 60, 50]],
        type: 'line',
      };
      const domProps = { 'data-testid': 'line' };
      const ref = React.createRef(null);

      render(<BillboardChart data={data} domProps={domProps} ref={ref} />);

      const instance = ref.current;

      instance.destroyChart();

      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      instance.redraw();

      expect(spy).toHaveBeenCalledWith('No chart is available to draw.');

      spy.mockRestore();
    });

    test('unloadData should notify if the chart does not exist', () => {
      const data = {
        columns: [['values', 30, 20, 50, 40, 60, 50]],
        type: 'line',
      };
      const domProps = { 'data-testid': 'line' };
      const ref = React.createRef(null);

      render(<BillboardChart data={data} domProps={domProps} ref={ref} />);

      const instance = ref.current;

      instance.destroyChart();

      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const unloaded = {
        ids: ['values'],
      };

      instance.unloadData(unloaded);

      expect(spy).toHaveBeenCalledWith(
        'No chart is available from which data can be unloaded. It may already have been destroyed, or has never been drawn.',
      );

      spy.mockRestore();
    });

    test('updateConfig should notify if the chart does not exist', () => {
      const data = {
        columns: [['values', 30, 20, 50, 40, 60, 50]],
        type: 'line',
      };
      const domProps = { 'data-testid': 'line' };
      const ref = React.createRef(null);

      render(<BillboardChart data={data} domProps={domProps} ref={ref} />);

      const instance = ref.current;

      instance.destroyChart();

      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      instance.updateConfig('line.max', 100);

      expect(spy).toHaveBeenCalledWith(
        'You are trying to set the config a chart that does not exist.' +
          'Have you passed `data`?',
      );

      spy.mockRestore();
    });
  });
});
