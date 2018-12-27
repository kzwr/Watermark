const isNode = (el) => {
  if (typeof el === 'string') return true;
  return false;
};

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
  length,
};
