package com.example.bank.repositories;

import com.example.bank.models.Transaction;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	List<Transaction> findByMerchantOktaId(String merchantOktaId);

	List<Transaction> findByPartnerReferenceNumber(Long partnerReferenceNumber);
	

}
