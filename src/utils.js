// eslint-disable-next-line arrow-body-style
/**
 * check if is HTML element dom node
 * @return {Boolean}
 */
const isNode = (el) => ((typeof HTMLElement === 'function')
  ? (el instanceof HTMLElement)
  : (el && (typeof el === 'object') && (el.nodeType === 1) && (typeof el.nodeName === 'string')));

/**
 * check if is string
 * @param {*} el
 * @return {Boolean}
 */
const isString = (el) => typeof el === 'string';

/**
 * check if is null
 * @param {*} object
 * @return {Boolean}
 */
const isNull = (object) => object === null;

/**
 * get string length by font scale
 * @param {String} string
 * @param {*} scale font scale
 * @return {Number}
 *
 * @example length('Hello, 世界'， 0.5)
 * // 5.5
 */
const length = (string, scale) => {
  let l = 0;
  if (typeof string === 'string') {
    for (let i = 0; i < string.length; i++) {
      l += string.charCodeAt(i) < 128 ? scale : 1;
    }
  }
  return l;
};

export default {
  isNode,
  isString,
  isNull,
  length,
};
