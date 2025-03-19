package com.payfi.transaction.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="transaction_log")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Transaction {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long transactionId;
	private String merchantOktaId;
    private Long merchantId;
    private String adminEmailId;
    private Long sourceAccountId;
    private Long targetAccountId;
    private String targetOwnerName;
    private Double amount;
    private String currency;
    private String message;
    private Long cardNumber;
    private String cardHolderName;
    private LocalDateTime initiationDate;
    private LocalDateTime completionDate;
    private String transactionType;
    private Double latitude;
    private Double longitude;
    private Long partnerReferenceNumber;
    private String customerVpa;
    
    private String status;

    //constructor for card transaction
	public Transaction(String merchantOktaId, Long merchantId, String adminEmailId, Long targetAccountId,
			String targetOwnerName, Double amount, String currency, String message, Long cardNumber,
			String cardHolderName, LocalDateTime initiationDate, LocalDateTime completionDate, String transactionType,
			Double latitude, Double longitude, Long partnerReferenceNumber, String status) {
		super();
		this.merchantOktaId = merchantOktaId;
		this.merchantId = merchantId;
		this.adminEmailId = adminEmailId;
		this.targetAccountId = targetAccountId;
		this.targetOwnerName = targetOwnerName;
		this.amount = amount;
		this.currency = currency;
		this.message = message;
		this.cardNumber = cardNumber;
		this.cardHolderName = cardHolderName;
		this.initiationDate = initiationDate;
		this.completionDate = completionDate;
		this.transactionType = transactionType;
		this.latitude = latitude;
		this.longitude = longitude;
		this.partnerReferenceNumber = partnerReferenceNumber;
		this.status = status;
	}

	//constructor for upi transaction
	public Transaction(String merchantOktaId, Long merchantId, String adminEmailId, Long targetAccountId,
			String targetOwnerName, Double amount, String currency, String message, LocalDateTime initiationDate,
			LocalDateTime completionDate, String transactionType, Double latitude, Double longitude,
			Long partnerReferenceNumber, String customerVpa, String status) {
		super();
		this.merchantOktaId = merchantOktaId;
		this.merchantId = merchantId;
		this.adminEmailId = adminEmailId;
		this.targetAccountId = targetAccountId;
		this.targetOwnerName = targetOwnerName;
		this.amount = amount;
		this.currency = currency;
		this.message = message;
		this.initiationDate = initiationDate;
		this.completionDate = completionDate;
		this.transactionType = transactionType;
		this.latitude = latitude;
		this.longitude = longitude;
		this.partnerReferenceNumber = partnerReferenceNumber;
		this.customerVpa = customerVpa;
		this.status = status;
	}

	//constructor for settlement
	public Transaction(String merchantOktaId, Long merchantId, String adminEmailId, Long sourceAccountId,
			Long targetAccountId, String targetOwnerName, Double amount, String currency, String message,
			LocalDateTime initiationDate, LocalDateTime completionDate, String transactionType, Double latitude,
			Double longitude, Long partnerReferenceNumber, String status) {
		super();
		this.merchantOktaId = merchantOktaId;
		this.merchantId = merchantId;
		this.adminEmailId = adminEmailId;
		this.sourceAccountId = sourceAccountId;
		this.targetAccountId = targetAccountId;
		this.targetOwnerName = targetOwnerName;
		this.amount = amount;
		this.currency = currency;
		this.message = message;
		this.initiationDate = initiationDate;
		this.completionDate = completionDate;
		this.transactionType = transactionType;
		this.latitude = latitude;
		this.longitude = longitude;
		this.partnerReferenceNumber = partnerReferenceNumber;
		this.status = status;
	}
	
}
