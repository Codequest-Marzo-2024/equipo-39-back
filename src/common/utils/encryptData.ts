import { hashSync, compareSync } from 'bcrypt';

const encryptData = (data: string) => {
  return hashSync(data, 10);
};

const compareData = (data: string, hash: string) => {
  return compareSync(data, hash);
};

export { encryptData, compareData };
