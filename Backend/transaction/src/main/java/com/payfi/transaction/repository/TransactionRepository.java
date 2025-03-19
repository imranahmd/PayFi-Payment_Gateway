package com.payfi.transaction.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.payfi.transaction.entity.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Long> {

	//custom abtract methods
	Transaction getByTransactionId(Long tid);

	Transaction findByTransactionId(Long transactionId);
		
}
