package com.payfi.recurring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payfi.recurring.entity.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

	List<Subscription> findByMerchantOktaId(String merchantOktaId);

	Subscription findByMerchantOktaIdAndSubscriptionId(String merchantOktaId, Long subscriptionId);

//
//	Subscription save(Subscription subscription);

}
