package com.payfi.recurring.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payfi.recurring.entity.Subscription;
import com.payfi.recurring.externalservice.FeignTransactionService;
import com.payfi.recurring.repository.SubscriptionRepository;
import com.payfi.recurring.requestdto.PaymentRequestDto;
import com.payfi.recurring.requestdto.UpiPaymentRequestDto;

import com.payfi.recurring.responsedto.PaymentResponseDto;
import com.payfi.recurring.responsedto.UpiPaymentResponseDto;


@Service
public class SubscriptionServiceImpl implements SubscriptionService {

	@Autowired
	private FeignTransactionService feignTransactionService;

	@Autowired
	private SubscriptionRepository subscriptionRepository;

	@Override
	public Subscription saveSubscription(Subscription subscription) {
		Subscription savedSubscription = subscriptionRepository.save(subscription);
		return savedSubscription;
	}

	@Override
	public List<Subscription> findSubscriptions(String merchantOktaId) {
		return subscriptionRepository.findByMerchantOktaId(merchantOktaId);
	}

	@Override
	public Subscription findBySubscriptionId(String merchantOktaId, Long subscriptionId) {
		return subscriptionRepository.findByMerchantOktaIdAndSubscriptionId(merchantOktaId, subscriptionId);
	}

	public Subscription getSubscriptionUpiPayment(String token, Long subscriptionId,
			UpiPaymentRequestDto upiPaymentRequestDto) {

		Subscription subscription = subscriptionRepository.findByMerchantOktaIdAndSubscriptionId(upiPaymentRequestDto.getMerchantOktaId(),
				subscriptionId);

		UpiPaymentResponseDto upiPaymentResponseDto = feignTransactionService
				.getUpiPayment(token, upiPaymentRequestDto).getBody();

		subscription.setTransactionId(upiPaymentResponseDto.getTransactionId());
		subscription.setPaymentStatus("PAID");
		subscription.setInstallmentAmount(upiPaymentResponseDto.getAmount());
		subscription.setSubscriptionStatus("ACTIVE");
		subscription.setSubscriptionStartDate(LocalDateTime.now());
		subscription.setSubscriptionExpireDate(
				subscription.getSubscriptionStartDate().plusMonths(subscription.getFrequency()));

		return subscriptionRepository.save(subscription);
	}

	@Override
	public Subscription getSubscriptionPayment(String token, Long subscriptionId,
			PaymentRequestDto paymentRequestDto) {

		Subscription subscription = subscriptionRepository.findByMerchantOktaIdAndSubscriptionId(paymentRequestDto.getMerchantOktaId(),
				subscriptionId);
		PaymentResponseDto paymentResponseDto = feignTransactionService.getPayment(token, paymentRequestDto)
				.getBody();

		subscription.setTransactionId(paymentResponseDto.getTransactionId());
		subscription.setPaymentStatus("PAID");
		subscription.setInstallmentAmount(paymentResponseDto.getAmount());
		subscription.setSubscriptionStatus("ACTIVE");
		subscription.setSubscriptionStartDate(LocalDateTime.now());
		subscription.setSubscriptionExpireDate(
				subscription.getSubscriptionStartDate().plusMonths(subscription.getFrequency()));

		return subscriptionRepository.save(subscription);
	}

	@Override
	public String deleteSubscription(String merchantOktaId, Long subscriptionId) {
		Subscription subscription = subscriptionRepository.findByMerchantOktaIdAndSubscriptionId(merchantOktaId,
				subscriptionId);
		subscriptionRepository.delete(subscription);
		
		return "Subscription Succesfully deleted";
	}
	
}
