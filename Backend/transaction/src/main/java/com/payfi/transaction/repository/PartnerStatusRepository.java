package com.payfi.transaction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.payfi.transaction.entity.PartnerStatus;


@Repository
public interface PartnerStatusRepository extends JpaRepository<PartnerStatus, Long> {

	
}
