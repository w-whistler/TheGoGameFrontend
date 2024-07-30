export const upsertToArray = <T>(items: T[], newItem: T, key: keyof T): T[] => {
  const index = items.findIndex(obj => obj[key] === newItem[key]);

  if (index !== -1) {
    items[index] = { ...items[index], ...newItem };
  } else {
    items.push(newItem);
  }

  return items;
};
