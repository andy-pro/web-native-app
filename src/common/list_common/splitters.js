import { sortListByMode } from '../__lib/utils';

export const presidentSplitter = data => {
  let sections = [],
    indexes = {};
  data.forEach(item => {
    let { party, ...rest } = item,
      index = indexes[party];
    if (index === undefined) {
      index =
        sections.push({
          key: party,
          name: party,
          data: [],
        }) - 1;
      indexes[party] = index;
    }
    sections[index].data.push({ ...rest });
  });
  return sections;
};

export const locationSplitter = ({
  categories,
  locations,
  match = { params: {} },
  sortMode = { name: 'asc' },
}) => {
  // sortModes = ['alpha', 'asc', 'desc'];
  // console.log('locations to sections vars', categories, locations, match);
  let ids = {},
    { category } = match.params;
  if (category) {
    categories = categories.filter(item => item.id === category);
  } else {
    categories = sortListByMode(categories, sortMode.name);
  }
  let sections = categories.map((item, i) => {
    let { id } = item;
    ids[id] = i;
    return {
      ...item,
      key: id,
      data: [],
    };
  });

  locations.forEach(item => {
    let index = ids[item.category];
    if (index === undefined) {
      if (category) return;
      index = 0;
    }
    if (item.coords) {
      item.coords = item.coords.toString().replace(/,\s*/, ', ');
    }
    sections[index].data.push(item);
  });
  sections = sections.filter(item => item.data.length);
  sections.forEach(section => {
    section.data = sortListByMode(section.data, sortMode.name);
  });
  if (sections.length > 1) {
    // 'no category' move to end
    sections.push(sections.shift());
  }
  return sections;
};
