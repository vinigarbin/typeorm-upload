import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
    let income = 0;
    let outcome = 0;
    const balanceTotal = transactions.reduce(function (total, t) {
      if (t.type === 'income') {
        income += t.value;
        return total + t.value;
      }
      outcome += t.value;
      return total - t.value;
    }, 0);
    const data = {
      income,
      outcome,
      total: balanceTotal,
    };

    return data;
  }
}

export default TransactionsRepository;
