let tokenGetter: () => string | null = () => null;

export const setTokenGetter = (getter: () => string | null) => {
  tokenGetter = getter;
};

export const getToken = () => {
  return tokenGetter();
};
