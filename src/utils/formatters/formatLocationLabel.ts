const formatLocationLabel = (value: string) =>
  value.replace(/-/g, " ").replace(/\b\w/g, (match) => match.toUpperCase());

export default formatLocationLabel;
