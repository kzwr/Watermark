import Watermark from '../src/Watermark';

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

const defaultOptions = {
  textArray: ['example'],
  fontSize: 26,
  fontFamily: 'serif',
  padding: 25,
  lineHeight: -1,
  rotate: 0,
  fontScale: 0.5,
  color: '#eeeeee',
  observe: true,
  auto: true,
};

beforeEach(() => {
  const body = document.body;
  body.style.background = '';
});

describe('test constructor', () => {
  test('test both el and options undefined', () => {
    const watermark = new Watermark();
    expect(watermark.$el).toBeNull();
    expect(watermark.options).toEqual(defaultOptions);
  });

  test('"el" is selector', () => {
    const watermark = new Watermark('body');
    expect(watermark.$el).toEqual(document.body);
  });

  test('"el" is dom node', () => {
    const watermark = new Watermark(document.body);
    expect(watermark.$el).toEqual(document.body);
  });

  test('"el" is options', () => {
    const watermark = new Watermark({
      textArray: ['test'],
    });
    expect(watermark.options.textArray).toEqual(['test']);
  });
});

describe('test mount', () => {
  test('test default', () => {
    const watermark = new Watermark();
    watermark.mount();
    expect(watermark.$el).toBeNull();
  });

  test('test selector', () => {
    const watermark = new Watermark();
    watermark.mount('body');
    expect(watermark.$el).toEqual(document.body);
  });

  test('test dom node', () => {
    const watermark = new Watermark();
    watermark.mount(document.body);
    expect(watermark.$el).toEqual(document.body);
  });
});

describe('test set', () => {
  test('test set default', () => {
    const watermark = new Watermark();
    watermark.set();
    expect(watermark.options).toEqual(defaultOptions);
  });

  test('test set empty object', () => {
    const watermark = new Watermark();
    expect(watermark.set({}).options).toEqual(defaultOptions);
  });

  test('test set value', () => {
    const watermark = new Watermark();
    watermark.set({
      textArray: ['test'],
      rotate: Math.PI / 6,
      color: 'rgb(255, 255, 255)',
    });
    const { textArray, rotate, color } = watermark.options;
    expect(textArray).toEqual(['test']);
    expect(rotate).toBe(Math.PI / 6);
    expect(color).toBe('rgb(255, 255, 255)');
  });
});

describe('test draw', () => {
  test('draw default', () => {
    const watermark = new Watermark();
    watermark.draw();
    expect(watermark.background).toBe('');
    expect(watermark.canvas).toBeNull();
  });

  test('draw after mount', () => {
    const watermark = new Watermark();
    watermark.mount('body').draw();
    expect(watermark.background).not.toBe('');
    expect(watermark.canvas).toBeInstanceOf(HTMLCanvasElement);
  });

  test('test auto false', () => {
    const watermark = new Watermark('body', {
      auto: false,
    });
    watermark.draw();
    expect(watermark.background).toBe('');
  });
  
  test('test auto true', () => {
    const watermark = new Watermark('body', {
      auto: true,
    });
    watermark.draw();
    expect(watermark.background).not.toBe('');
  });
});

describe('test render', () => {
  test('rende background by api',() => {
    const watermark = new Watermark('body', {
      auto: false,
    });
    watermark.draw().render();
    expect(watermark.$el.style.background).not.toBe('');
  });

  test('rende background manully', () => {
    const watermark = new Watermark('body', {
      auto: false,
    });
    const canvas = watermark.draw().canvas;
    const dataUrl = canvas.toDataURL();
    const body = document.body;
    body.style.background = `url(${dataUrl})`;
    expect(body.style.background).not.toBe('');
  });
});

describe('test destory', () => {
  test('test destory directly', () => {
    const watermark = new Watermark();
    watermark.destory();
    expect(watermark.observer).toBeNull();
    expect(watermark.options).toEqual(defaultOptions);
  });

  test('test destory after mount and set', () => {
    const watermark = new Watermark();
    watermark.mount('body');
    watermark.set({
      textArray: ['test'],
    }).draw();
    watermark.destory();
    expect(watermark.observer).toBeNull();
    expect(watermark.options).toEqual(defaultOptions);
  });
});
