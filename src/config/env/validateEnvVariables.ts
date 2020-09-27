import Schemas from '@src/interfaces/enums/Schemas';

import getEnvVariables from './getEnvVariables';

export default (): void => {
  const schemaItems = [
    Schemas.ApplicationConfigSchema,
    Schemas.AuthConfigSchema,
    Schemas.MongoConfigSchema,
  ];
  schemaItems.forEach(schemaItem => {
    getEnvVariables(schemaItem);
  });
};
