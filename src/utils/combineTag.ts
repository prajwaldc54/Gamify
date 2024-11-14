import { TagType } from 'Schema/Schema';

//combine tags from api to single string to place in edit post
export const combineTag = (tagEntered: TagType[]) => {
  let combinedTag = '';
  tagEntered.forEach((item) => {
    combinedTag = combinedTag + `#${item?.tagName} `;
  });
  return combinedTag;
};
