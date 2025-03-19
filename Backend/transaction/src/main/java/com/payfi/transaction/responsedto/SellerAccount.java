package com.payfi.transaction.responsedto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class SellerAccount {

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

    private transient List<TransactionResponse> transactions;
}
