import healthchecksService from "app/services/healthchecks";
import wrapperService from "app/services/wrapper";
import { Controller, Status } from 'types';


const healthchecks: Controller<Status> = async (req, res) => {

  let result = await healthchecksService.healthchecks();
  return res.json(result);
};


export default {
  healthchecks: wrapperService.wrap(healthchecks)
}

