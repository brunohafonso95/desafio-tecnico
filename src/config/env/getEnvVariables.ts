import SchemasEnum from '@src/interfaces/enums/Schemas';
import * as schemas from '@src/schemas';
import JoiAdapter from '@src/utils/JoiAdapter';

const getEnvVariables = <T = any>(schemaName: SchemasEnum): T => {
  return JoiAdapter.validateSchema(
    schemas[schemaName],
    process.env,
    'please check the env variables',
  );
};

export default getEnvVariables;
