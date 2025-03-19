package com.payfi.transaction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.payfi.transaction.entity.SellerStatus;

@Repository
public interface SellerStatusRepository extends JpaRepository<SellerStatus, Long> {

	SellerStatus findByMerchantOktaId(String merchantOktaId);

}
