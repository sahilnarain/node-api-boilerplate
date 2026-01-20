'use strict';

const swaggerParser = require('@apidevtools/swagger-parser');

const OPENAPI_SPEC_FILE = './docs/api/API_Reference.yaml';

const validate = async () => {
  console.log('Validating OpenAPI Spec...');
  try {
    await swaggerParser.validate(OPENAPI_SPEC_FILE);
    console.log('No errors found.');
    process.exit(0);
  } catch (e) {
    console.log(e.message);
    console.log('Error: Validation failed.');
    process.exit(1);
  }
};

validate();
