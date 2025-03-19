package com.example.bank.models;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "account", schema = "online_bank")
public class Account {

    @Id
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
    private transient List<Transaction> transactions;
	
}

