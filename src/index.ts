import { BFLogger } from './bf-logger';

const logger = new BFLogger({ saveToFile: true });
const user = {
  name: 'bruno',
  idade: 28,
  endereco: {
    rua: 'virtoria',
    numero: 184,
  },
};
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');
logger.debug('This is a debug message');
logger.debug(user);
