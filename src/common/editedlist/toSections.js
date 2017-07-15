import { sortListByMode } from '../__lib/utils';

export default ({
  categories,
  locations,
  match = { params: {} },
  sortMode = { name: 'asc' },
}) => {
  // sortModes = ['alpha', 'asc', 'desc'];
  // console.log('locations to sections vars', categories, locations, match);
  let ids = {},
    noCategoryIndex,
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
      if (noCategoryIndex === undefined) {
        noCategoryIndex =
          sections.push({
            name: 'No category',
            id: 'No-category',
            key: 'No-category',
            data: [],
          }) - 1;
      }
      index = noCategoryIndex;
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
  return sections;
};
