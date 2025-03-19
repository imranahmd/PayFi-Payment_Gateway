package com.payfi.reports.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.Valid;
import java.math.BigDecimal;
import java.sql.Date;

@Entity
@Table(name = "transaction_log")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Valid
public class Report {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(name = "merchantId")
    private Long merchantId;

    @Column(name = "adminEmailId")
    private String adminEmailId;

    @Column(name = "sourceAccountId")
    private Long sourceAccountId;

    @Column(name = "targetAccountId")
    private Long targetAccountId;

    @Column(name = "targetOwnerName")
    private String targetOwnerName;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "currency")
    private String currency;

    @Column(name = "message")
    private String message;

    @Column(name = "cardNumber")
    private String cardNumber;

    @Column(name = "cardHolderName")
    private String cardHolderName;

    @Column(name = "initiationDate")
    private Date initiationDate;

    @Column(name = "completionDate")
    private Date completionDate;

    @Column(name = "transactiontype")
    private String transactionType;

    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
    private BigDecimal longitude;

    @Column(name = "partnerreferenceNumber")
    private Long partnerReferenceNumber;

    @Column(name = "customerVPA")
    private String customerVPA;

    @Column(name = "status")
    private String status;


}
