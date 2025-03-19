package com.payfi.transaction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.payfi.transaction.entity.SellerSettlement;

@Repository
public interface SellerSettlementRepository extends JpaRepository<SellerSettlement, Long> {

}
