// demo plugin. all plugins accept context as parameter, and return true if condition match, false if not.
/* eslint-disable @typescript-eslint/no-unused-vars */
export const testPlugin = (
  context: Record<
    string,
    string | number | boolean | object | number[] | string[] | object[] | null | undefined
  >
) => {
  return true;
};
