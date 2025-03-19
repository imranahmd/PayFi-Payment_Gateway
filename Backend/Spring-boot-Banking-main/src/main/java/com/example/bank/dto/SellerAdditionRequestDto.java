package com.example.bank.dto;

import lombok.*;

import javax.validation.Valid;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Valid
public class SellerAdditionRequestDto {

    private String merchantOktaId;
    private Long partnerReferenceNumber;
    private String partnerName;

    private Long merchantId;
    private String emailId;
    private String merchantName;
    private String gstNumber;
    private String companyPAN;
    private Long bankAccountNumber;

}
