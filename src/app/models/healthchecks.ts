import config from "app/configs/config";
import utilsService from "app/services/utils";
import wrapperService from "app/services/wrapper";
import { JSONValue } from 'types';


const check = async (): Promise<JSONValue> => {
  const checkQuery = config.knex.select(config.knex.raw('now()'));

  let result = await checkQuery;

  return utilsService.sanitizeSqlResult(result[0]);
};

export default {
  check: wrapperService.wrap(check)
}