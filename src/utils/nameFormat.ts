//it split the first char from team name each word like: My Team => MT
export const nameFormat = (name: any) => {
  let arr = name.split(' ');
  const structuredName = arr.reduce(
    (previousValue: string, currentValue: string) =>
      previousValue + currentValue.substring(0, 1),
    ''
  );
  return structuredName;
};
