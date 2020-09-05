
export interface SelectOption {
  value: string | number;
  text: string;
}

export const capitalize = (s: string) => {
  return s
    .replace(/[\W-_]+/g, '-')
    .split('-')
    .map(split => split[0].toUpperCase() + split.substring(1).toLowerCase())
    .join(' ');
};

export const toOption = (value: string): SelectOption => ({ value, text: capitalize(value) });
