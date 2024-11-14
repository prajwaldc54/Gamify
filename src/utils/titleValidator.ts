//it validates title of post for max length 225 and min 3
export const titleValidator = (title: string) => {
  let text = title.trim();
  if (text.length > 255 || text.length < 3) {
    return true;
  }
  return false;
};
