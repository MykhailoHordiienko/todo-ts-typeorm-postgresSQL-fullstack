// eslint-disable-next-line
import bcrypt from 'bcrypt';

export const getHash = async (text: string) => {
  const result = await bcrypt.hash(text, 10);
  return result;
};

export const compareToHash = async (text: string, hash: string) => {
  const result = await bcrypt.compare(text, hash);
  return result;
};
