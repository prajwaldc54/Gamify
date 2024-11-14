//method to validate tags with max 25 tags

export const tagValidator = (tags: string) => {
  let tagsArr = tags.replace(/\s/g, '').replaceAll('#', ' ').trim().split(' ');
  if (tagsArr.length > 25) {
    return true;
  }
  return false;
};
