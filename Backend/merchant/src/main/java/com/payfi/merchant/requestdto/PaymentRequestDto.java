package com.payfi.merchant.requestdto;

import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class PaymentRequestDto {
	
	@Id
	private Long transactionId;
	
    private Long merchantId;
    private Long merchantOktaId;
    private String emailId;
    private String merchantName;
    
    
    private Long cardNumber;
    private String expiryDate;
    private String cardHolderName;
    private int CVV;
    private double amount;
    private String referenceNo;
    
    private Long partnerReferenceNumber;
    private String escrowAccountNumber;

}
