const isDecimal = value => /^-?\d*\.?\d+$/.test('' + value);

export default {
  required: value => Boolean(value),

  isDecimal,

  isCoords: orig => {
    if (!orig) return false;
    // [x.xxx, y.yyy] or 'x.xxx, y.yyy'
    let v = Array.isArray(orig) ? orig : orig.split(','),
      x = ('' + v[0]).trim(),
      y = ('' + v[1]).trim(),
      r = v.length === 2 && isDecimal(x) && isDecimal(y);
    if (r) {
      r = [x, y];
      r.orig = orig;
    }
    return r;
  },
};
