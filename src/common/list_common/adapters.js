export const toPresident = item => ({
  id: item.key,
  name: item.president,
  badge: item.party,
  aux: 'Took office - left office',
  extra: `${item.took_office} - ${item.left_office}`,
});

export const toLocation = item => ({
  id: item.id,
  name: item.name,
  badge: item.address,
  aux: 'Coordinates',
  extra: item.coords,
});
