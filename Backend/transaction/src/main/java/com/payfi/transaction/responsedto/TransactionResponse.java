package com.payfi.transaction.responsedto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

// TODO Add support for Bank charges, currency conversion, setup repeat payment/ standing order

//@SequenceGenerator(name = "transaction_seq", sequenceName = "transaction_sequence", schema = "online_bank", initialValue = 5)
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
public class TransactionResponse {
    
	
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
}
