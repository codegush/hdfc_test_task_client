export const getQueryParam = (param, search) => {
  return (
    search
      .slice(1)
      .split('&')
      .reduce((acc, p) => {
        const pair = p.split('=');
        acc[pair[0]] = pair[1];
        return acc;
      }, {})[param] || null
  );
};
