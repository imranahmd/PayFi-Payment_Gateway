package com.payfi.reports.service;

import com.payfi.reports.entity.Report;
import com.payfi.reports.repo.ReportMerchantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
public class ReportMerchantService  {



    private final ReportMerchantRepository reportMerchantRepo;

    @Autowired
    public ReportMerchantService(ReportMerchantRepository reportMerchantRepo) {
        this.reportMerchantRepo = reportMerchantRepo;
    }

    public BigDecimal calculateTotalAmountByDateDailyForMerchant(Date selectedDate) {
        return reportMerchantRepo.calculateTotalAmountByDateDailyForMerchant(selectedDate);
    }

    public BigDecimal calculateTotalAmountBetweenDatesForMerchant(Date startDate, Date endDate) {
        return reportMerchantRepo.calculateTotalAmountBetweenDatesForMerchant(startDate, endDate);
    }

    public BigDecimal calculateTotalAmountForYearForMerchant(int selectedYear) {
        return reportMerchantRepo.calculateTotalAmountForYearForMerchant(selectedYear);
    }

    public int calculateTotalTransactionByDateDailyForMerchant(Date selectedDate) {
        return reportMerchantRepo.calculateTotalTransactionByDateDailyForMerchant(selectedDate);
    }

    public int calculateTotalTransactionBetweenDatesForMerchant(Date startDate, Date endDate) {
        return reportMerchantRepo.calculateTotalTransactionBetweenDatesForMerchant(startDate, endDate);
    }

    public int calculateTotalTransactionForYearForMerchant(int selectedYear) {
        return reportMerchantRepo.calculateTotalTransactionForYearForMerchant(selectedYear);
    }

    public List<Report> fetchTransactionsByDateForMerchant(Date transactionDate) {
        return reportMerchantRepo.fetchTransactionsByDateForMerchant(transactionDate);
    }

    public List<Report> fetchTransactionsBetweenTwoDatesForMonthForMerchant(Date startDate, Date endDate) {
        return reportMerchantRepo.fetchTransactionsBetweenTwoDatesForMonthForMerchant(startDate, endDate);
    }

    public List<Report> fetchTransactionsForYearForMerchant(int yearParam) {
        return reportMerchantRepo.fetchTransactionsForYearForMerchant(yearParam);
    }
}
