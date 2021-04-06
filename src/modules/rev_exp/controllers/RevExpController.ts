import { Request, Response } from "express";
import { container } from 'tsyringe';
import CreateRevExpService from "../services/CreateRevExpService";
import ListRevExpService from "../services/ListRevExpService";

export default class UsersController {

  public async index(request: Request, response: Response): Promise<Response> {
    const listRevexp = container.resolve(ListRevExpService);

    const revexp = await listRevexp.execute();

    return response.json(revexp);
  }

  public async create(request: Request, response: Response): Promise<Response>  {
    const revExp = request.body;

    const createRevExp = container.resolve(CreateRevExpService);
    const revExpCreated = await createRevExp.execute(revExp);

    return response.json(revExpCreated);
  }

}
