package com.payfi.transaction.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.payfi.transaction.entity.PaymentLink;

@Repository
public interface PaymentLinkRepository extends JpaRepository<PaymentLink,Long>{

	Optional<PaymentLink> findByUniqueKey(String uniqueKey);
	
}
