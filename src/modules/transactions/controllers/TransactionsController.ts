import { Request, Response } from "express";
import { container } from 'tsyringe';
import CreateTransactionService from "../services/CreateTransactionService";

export default class TransactionsController {

  public async create(request: Request, response: Response): Promise<Response>  {
    const transaction = request.body;

    const createTransaction = container.resolve(CreateTransactionService);
    const transactionCreated = await createTransaction.execute(transaction);

    return response.json(transactionCreated);
  }

}
