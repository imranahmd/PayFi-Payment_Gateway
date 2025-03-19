package com.example.bank.dto;

import java.time.LocalDateTime;

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
public class UpiPaymentRequestDto {
	
	private Long transactionId;
    private String merchantOktaId;
    private Long merchantId;
    
    private String adminEmailId;
    private Long targetAccountId;
    private String targetOwnerName;
    private Double amount;
    private String currency;
    private String message;  

    private LocalDateTime initiationDate;
    private LocalDateTime completionDate;
    private String transactionType;
    private Double latitude;
    private Double longitude;
    private Long partnerReferenceNumber;
    
    private String customerVpa;
    private String status;
    
}
