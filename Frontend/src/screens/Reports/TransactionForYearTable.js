import React from 'react';

const TransactionTable = ({ transactions }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Message</th>
            <th>Transaction Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.transactionId}>
              <td>{transaction.transactionId}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.currency}</td>
              <td>{transaction.message}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  export default TransactionTable