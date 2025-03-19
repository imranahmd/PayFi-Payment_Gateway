package com.payfi.recurring.requestdto;

import java.time.LocalDateTime;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class PaymentRequestDto {

    private Long transactionId;
    private String merchantOktaId;
    private Long merchantId;
    private String adminEmailId;
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
    private String status;
    
    private String expiryDate;
    private Integer CVV; 
}
