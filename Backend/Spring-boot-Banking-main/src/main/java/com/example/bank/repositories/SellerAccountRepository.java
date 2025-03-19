package com.example.bank.repositories;

import com.example.bank.models.SellerAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellerAccountRepository extends JpaRepository<SellerAccount, String> {
    Optional<SellerAccount> findByMerchantOktaId(String merchantOktaId);
    SellerAccount findByPartnerReferenceNumberAndMerchantOktaId(Long partnerReferenceNumber, String merchantOktaId);
	Optional<SellerAccount> findByPartnerReferenceNumber(long partnerReferenceNumber);
}
