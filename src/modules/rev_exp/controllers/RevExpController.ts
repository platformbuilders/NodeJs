import { Request, Response } from "express";
import { container } from 'tsyringe';
import CreateRevExpService from "../services/CreateRevExpService";

export default class UsersController {

  public async create(request: Request, response: Response): Promise<Response>  {
    const revExp = request.body;

    const createRevExp = container.resolve(CreateRevExpService);
    const revExpCreated = await createRevExp.execute(revExp);

    return response.json(revExpCreated);
  }

}
