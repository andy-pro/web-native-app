import slugify from 'slugify';

/* =============  Immutability helpers  ================== */

export const pushItem = (list, item) => list.concat(item);

export const unshiftItem = (list, item) => [item].concat(list);

export const updateItemById = (list, id, set) =>
  list.map(item => (item.id === id ? Object.assign(item, set) : item));

export const deleteItemById = (list, id) => list.filter(item => item.id !== id);

export const deleteItemsByArray = (list, ids, filter) => {
  if (!(ids instanceof Array)) ids = [ids];
  ids = ids.slice(0);
  return list.filter((item, j) => {
    for (let k = 0, len = ids.length; k < len; k++) {
      // if (item.id === ids[i]) {
      if (filter(item, ids, k, j)) {
        ids.splice(k, 1);
        return false;
      }
    }
    return true;
  });
};

export const deleteItemsByIds = (list, ids) =>
  deleteItemsByArray(list, ids, (e, a, k) => e.id === a[k]);

export const deleteItemsByIndexes = (list, ids) =>
  deleteItemsByArray(list, ids, (e, a, k, j) => j === a[k]);

/* =============  end of Immutability helpers  ================== */

export const firstToUpper = str => str.substr(0, 1).toUpperCase() + str.substr(1);

export const convToArray = obj => (Array.isArray(obj) ? obj : [obj]);

export const compose = (...fns) => data => {
  /*  Performs right-to-left function composition.
    All functions must be unary. */
  for (let i = 0, len = fns.length; i < len; i++) {
    data = fns[len - i - 1](data);
  }
  return data;
};

export const pick = (obj, props) =>
  props.reduce((o, k) => {
    o[k] = obj[k];
    return o;
  }, {});

export const omit = (obj, props) =>
  Object.keys(obj).reduce((o, k) => {
    if (!props.includes(k)) o[k] = obj[k];
    return o;
  }, {});

export const fmtCost = cost => Number(cost || 0).toFixed(2).replace(/[.,]00$/, '');

export const getValue = v => (typeof v === 'object' ? v.target.value : v);

export const testColor = v => /^[0-9,a-f]{3}$/.test(v) || /^[0-9,a-f]{6}$/.test(v);

export const splitOnce = (str, dt, last = false) => {
  let pos = last ? str.lastIndexOf(dt) : str.indexOf(dt);
  return pos >= 0 ? [str.substr(0, pos), str.substr(pos + dt.length)] : [str];
};

// eslint-disable-next-line
const specialCharsRegex = /[\/|\&\?<>]/g;

export const removeSpecial = s => s.trim().replace(specialCharsRegex, '');

export const getSlug = s => slugify(removeSpecial(s));

export const splitCategory = category => category.split('/').map(c => removeSpecial(c));

export const slugifyCategory = category =>
  category.split('/').map(c => getSlug(c)).filter(c => Boolean(c)).join('/');

/* =============  operations on local collections  ================== */

export const cmdUpdateLocal = (list, { cmd, payload, response }) => {
  // console.log('utils', cmd, payload);
  switch (cmd) {
    case 'insert':
      return pushItem(list, payload);

    case 'update':
      let { __id } = payload;
      delete payload.__id;
      return updateItemById(list, __id, payload);

    case 'remove':
      // return deleteItemById(list, payload);
      return deleteItemsByIds(list, payload);

    case 'purge':
      return deleteItemsByIndexes(list, payload);

    case 'replace':
      return response;

    default:
      return list;
  }
};

/* =============  check data helpers  ================== */

export const checkData = (list, model) => {
  /* prettier-ignore */
  let fields = convToArray(model).filter(item => item.hasOwnProperty('vd')).map(item => item.fn).concat('id'),
    damage = item => fields.find(fn => !item.hasOwnProperty(fn)),
    data = [],
    ids = {},
    error,
    print = (i, e) => {
      e = `[${i}]: ${e}`;
      error = error || { indexes: [], info: [] };
      error.indexes.push(i);
      error.info.push(e);
      console.info(`Data damaged ${e}!`);
    };
  // console.log('fields', list, fields);
  /* prettier-ignore */
  list.forEach((item, i) => {
    if (!item || damage(item)) {
      print(i, `fields ${JSON.stringify(fields)} expected, but ${JSON.stringify(item)} found`);
    } else {
      var { id } = item;
      if (ids[id]) {
        print(i, `duplicate id - ${id}`);
      } else {
        ids[id] = true;
        data.push(item);
      }
    }
  });
  return { data, error, list };
};

/* =============  sort helpers  ================== */
const sortByAlpha = (a, b) => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
};

export const sortListByMode = (list, sortMode) => {
  // sortModes = ['alpha', 'asc', 'desc'];
  /* eslint-disable */
  switch (sortMode) {
    case 'alpha':
      return list.slice(0).sort(sortByAlpha);
    case 'desc':
      // descendant, newest at the top
      return list.slice(0).reverse();
    // default: 'sort-asc', ascendant,  oldest at the top
  }
  /* eslint-enable */
  return list;
};
