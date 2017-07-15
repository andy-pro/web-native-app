export const findDuplicate = (list, val, key = 'name') => {
  val = val.toLowerCase();
  return list ? list.find(item => item[key].toLowerCase() === val) : false;
};

export const findDuplicateByObj = (list, obj) => {
  // console.log('findDuplicate', obj);
  let keys = Object.keys(obj),
    cases = keys.reduce(
      (p, k) => Object.defineProperty(p, k, { value: obj[k].toLowerCase() }),
      {}
    );
  return list
    ? list.find(item => keys.find(key => item[key].toLowerCase() === cases[key]))
    : false;
};

export const findItemById = (list, id) => list.find(item => item.id === id);

export const findNameByUrl = (urlParts, state) => {
  urlParts = urlParts.slice(1);
  if (urlParts.length < 2) return '';
  let crumbs = { map: 'locations', locations: 'categories' },
    [path, id] = urlParts;
  path = crumbs[path];
  let list = state[path];
  if (!list) return '';
  let c = findItemById(list, id);
  return c ? c.name : '';
};
