package com.payfi.transaction.responsedto;

import lombok.*;


import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Account {

	private Long partnerReferenceNumber;

    private String partnerName;
    private String legalName;
    private String mobileNumber;
    private String emailId;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String gstin;
    private String pan;

    private String status;
    private Long escrowAccountNumber;
    private Double balance;
    private transient List<TransactionResponse> transactions;
	
}

