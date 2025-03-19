package com.payfi.reports.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "seller_settlement")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Valid
public class SellerSettlement {

    @Id
    private Long transactionId;

    private String merchantOktaId;

    private Long merchantId;

    private String adminEmailId;

    private Long sourceAccountId;

    private Long targetAccountId;

    private String targetOwnerName;

    private BigDecimal amount;

    private BigDecimal totalInterest;

    private String currency;

    private String message;

    private Date initiationDate;

    private Date completionDate;

    private String transactionType;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private Long partnerReferenceNumber;

    private String status;


}

