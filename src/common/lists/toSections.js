export default data => {
  let sections = [],
    indexes = {};
  data.forEach(item => {
    let { party, ...rest } = item,
      index = indexes[party];
    if (index === undefined) {
      index =
        sections.push({
          key: party,
          data: [],
        }) - 1;
      indexes[party] = index;
    }
    sections[index].data.push({ ...rest });
  });
  return sections;
};
