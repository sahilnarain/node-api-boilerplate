import healthchecksService from "app/services/healthchecks";
import wrapperService from "app/services/wrapper";
import { Controller } from 'types';


const healthchecks: Controller = async (req, res) => {

  let result = await healthchecksService.healthchecks();
  return res.json(result);
};


export default {
  healthchecks: wrapperService.wrap(healthchecks)
}

