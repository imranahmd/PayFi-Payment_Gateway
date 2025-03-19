package com.payfi.recurring.service;

import java.util.List;

import com.payfi.recurring.entity.Subscription;
import com.payfi.recurring.requestdto.PaymentRequestDto;
import com.payfi.recurring.requestdto.UpiPaymentRequestDto;

public interface SubscriptionService {

	//create a subscription
    public Subscription  saveSubscription(Subscription subscription) ;
    
    //find subscription by merchantOktaId
    public List<Subscription> findSubscriptions(String merchantOktaId);
    
    public Subscription findBySubscriptionId(String merchantOktaId,Long subscriptionId);
    
    public Subscription getSubscriptionUpiPayment(String merchantOktaId, Long subscriptionId,
    		UpiPaymentRequestDto upiPaymentRequestDto);
    
    public Subscription getSubscriptionPayment(String merchantOktaId, Long subscriptionId,
    		PaymentRequestDto PaymentRequestDto);

	public String deleteSubscription(String merchantOktaId, Long subscriptionId);

}
