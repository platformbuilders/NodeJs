import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Transaction from '../typeorm/entities/Transaction';
import PaymentStatus from '../typeorm/enums/TransactionPaymentStatusEnum';
import PaymentType from '../typeorm/enums/TransactionPaymentTypeEnum';
import TransactionsRepository from '../typeorm/repositories/TransactionsRepository';


interface IRequest {
  description?: string;
  rev_exp_id: string;
  user_id: string;
  forma_pagamento: string;
  status_pagamento: string;
}

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: TransactionsRepository
    ) {};

  public async execute(transaction: IRequest): Promise<Transaction> {

    return await this.transactionsRepository.create(transaction as Transaction);

  }
}

export default CreateTransactionService;
