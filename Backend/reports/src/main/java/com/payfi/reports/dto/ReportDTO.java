package com.payfi.reports.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReportDTO {

    private Date startDate;

    private Date endDate;

    private int year;

    private BigDecimal totalAmount;

    private int totalTransactions;

    private long merchantId;


}

