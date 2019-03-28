import utils from '../src/utils';

describe('test isString', () => {
  test('string', () => {
    expect(utils.isString('')).toBe(true);
    expect(utils.isString('str')).toBe(true);
  });
  test('non-string', () => {
    expect(utils.isString()).toBe(false);
    expect(utils.isString({})).toBe(false);
  });
});

describe('test isNull', () => {
  test('test null', () => {
    expect(utils.isNull(null)).toBe(true);
  });
  test('test non-null', () => {
    expect(utils.isNull()).toBe(false);
    expect(utils.isNull({})).toBe(false);
  });
});

describe('test isNode', () => {
  test('node', () => {
    expect(utils.isNode(document.body)).toBe(true);
  });
  test('non-node', () => {
    expect(utils.isNode('')).toBe(false);
  });
});

test('test length', () => {
  const str = 'Hello, 世界';
  const scale = 0.5;
  expect(utils.length()).toBe(0);
  expect(utils.length(str, scale)).toBe(5.5);
});
