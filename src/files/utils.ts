
export const getBuffer = async (file: File) => {
  const fr = new FileReader();

  const buffer: ArrayBuffer = await new Promise((resolve) => {
    fr.onload = () => resolve(fr.result as ArrayBuffer);
    fr.readAsArrayBuffer(file);
  });

  return buffer;
};

export const getText = async (file: File) => {
  const fr = new FileReader();

  const text: string = await new Promise((resolve) => {
    fr.onload = () => resolve(fr.result as string);
    fr.readAsDataURL(file);
  });

  return text;
};
