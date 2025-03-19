package com.example.bank.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "seller_account", schema = "online_bank")
public class SellerAccount {

    @Id
    private String merchantOktaId;
    
    private Long partnerReferenceNumber;
    private String partnerName;
    private Long merchantId;
    private String emailId;
    private String merchantName;
    private String gstNumber;
    private String companyPan;
    private Long bankAccountNumber;
    private String profileStatus;
    private Long cardNumber;
    private Double balance;

    private transient List<Transaction> transactions;

	public SellerAccount(String merchantOktaId, Long partnerReferenceNumber, String partnerName, Long merchantId,
			String emailId, String merchantName, String gstNumber, String companyPan, Long bankAccountNumber,
			String profileStatus, Long cardNumber, Double balance) {
		super();
		this.merchantOktaId = merchantOktaId;
		this.partnerReferenceNumber = partnerReferenceNumber;
		this.partnerName = partnerName;
		this.merchantId = merchantId;
		this.emailId = emailId;
		this.merchantName = merchantName;
		this.gstNumber = gstNumber;
		this.companyPan = companyPan;
		this.bankAccountNumber = bankAccountNumber;
		this.profileStatus = profileStatus;
		this.cardNumber = cardNumber;
		this.balance = balance;
	}
    
}
