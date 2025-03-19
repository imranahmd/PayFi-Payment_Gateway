package com.payfi.recurring.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.Valid;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="subscription_details")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Valid
public class Subscription {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="subscription_id")
	private Long subscriptionId;
	
	@Column(name="merchant_okta_id")
    private String merchantOktaId;
	
	@Column(name="merchant_id")
    private Integer merchantId;
	
	//It would be the when subsription will start, and balance is deducted
	@Column(name="subscription_start_date")
    private LocalDateTime subscriptionStartDate;
	
	@Column(name="subscription_expire_date")
    private LocalDateTime subscriptionExpireDate;
	
	@Column(name="frequency")
    private Integer frequency; // Frequency of payment (e.g., monthly, yearly)
	
	@Column(name="installment_amount")
    private Double installmentAmount; // Amount of the subscription
	
	//product like Netflix, Electricity, Mobile recharge etc
	@Column(name="subscription_product")
	private String subscriptionProduct;
	
	//Active, deactive, suspended etc.
	@Column(name="subscription_status")
	private String subscriptionStatus;
	
	//Due, paid etc
	@Column(name="payment_status")
	private String paymentStatus;
	
	//true or false
	@Column(name="is_auto_debit")
	private boolean isAutoDebit;
	
	@Column(name="transaction_id")
	private Long transactionId;
	
//	@Column(name="total_amount")
//  private Double totalAmount;
	
}
