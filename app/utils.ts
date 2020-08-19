

export const capitalize = (s: string) => {
  return s
    .replace(/[\W-_]+/g, '-')
    .split('-')
    .map(split => split[0].toUpperCase() + split.substring(1).toLowerCase())
    .join(' ');
};

export const toOption = (value: string) => ({ value, text: capitalize(value) });
