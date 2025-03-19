package com.example.bank.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

// TODO Add support for Bank charges, currency conversion, setup repeat payment/ standing order

//@SequenceGenerator(name = "transaction_seq", sequenceName = "transaction_sequence", schema = "online_bank", initialValue = 5)
@NoArgsConstructor
@ToString
@Setter
@Getter
@Entity
@Table(name = "transaction_log", schema = "online_bank")
public class Transaction {
    
	@Id
    private Long transactionId;
    private String merchantOktaId;
    private Long merchantId;
    private String adminEmailId;
    //customer/issuer account/card number or account number
    private Long sourceAccountId;
    //aquirer account/escrow
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
    
    public Transaction(Long transactionId, String merchantOktaId, Long merchantId, String adminEmailId, Long targetAccountId,
			String targetOwnerName, Double amount, String currency, String message, Long cardNumber,
			String cardHolderName, LocalDateTime initiationDate, LocalDateTime completionDate, String transactionType,
			Double latitude, Double longitude, Long partnerReferenceNumber, String status) {
		super();
		this.transactionId = transactionId;
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

	public Transaction(Long transactionId,String merchantOktaId, Long merchantId, String adminEmailId, Long targetAccountId,
			String targetOwnerName, Double amount, String currency, String message, LocalDateTime initiationDate,
			LocalDateTime completionDate, String transactionType, Double latitude, Double longitude,
			Long partnerReferenceNumber, String customerVpa, String status) {
		super();
		this.transactionId = transactionId;
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
    
    

    
    
    
}
