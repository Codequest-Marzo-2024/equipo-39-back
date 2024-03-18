import { v4 as uuidv4, validate } from 'uuid';

const generateUUID = () => uuidv4();

const isUUID = (uuid: string) => validate(uuid);

export { generateUUID, isUUID };
