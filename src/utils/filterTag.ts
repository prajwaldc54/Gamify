import { TagType } from 'Schema/Schema';

//it filters the tag from selected tag to remove deleted tags and duplicacy
export const filterTag = (items: TagType[], tags: string) => {
  let tagsArr = tags.replace(/\s/g, '').replaceAll('#', ' ').trim().split(' ');
  let filteredArr = items.filter((item) => {
    return tagsArr.includes(`${item.tagName}`);
  });
  const uniqueArr = [...new Set(filteredArr.map((item) => item.tagId))];
  return uniqueArr;
};
