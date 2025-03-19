package com.payfi.reports.service;

import com.payfi.reports.entity.Report;
import com.payfi.reports.repo.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public BigDecimal calculateTotalAmountBetweenDatesForAdmin(Date startDateParam, Date endDateParam) {
        return reportRepository.calculateTotalAmountBetweenDatesForAdmin(startDateParam, endDateParam);

    }

    public BigDecimal calculateTotalAmountForYearForAdmin(int selectedYearParam) {
       return reportRepository.calculateTotalAmountForYearForAdmin(selectedYearParam);
    }

    public int calculateTotalTransactionByDateDailyForAdmin(Date selectedDateParam) {
        return reportRepository.calculateTotalTransactionByDateDailyForAdmin(selectedDateParam);

    }

    public BigDecimal calculateTotalTransactionBetweenDatesForAdmin(Date startDateParam, Date endDateParam) {
        return reportRepository.calculateTotalTransactionBetweenDatesForAdmin(startDateParam, endDateParam);

    }

    public BigDecimal calculateTotalTransactionForYearForAdmin(int selectedYearParam) {
      return   reportRepository.calculateTotalTransactionForYearForAdmin(selectedYearParam);
    }

    public BigDecimal calculateTotalAmountByMerchantIdAndDateDaily(long merchantIdParam, Date selectedDateParam) {
        return reportRepository.calculateTotalAmountByMerchantIdAndDateDaily(merchantIdParam, selectedDateParam);

    }

    public BigDecimal calculateTotalAmountByDateDailyForAdmin(Date selectedDateParam) {
       return reportRepository.calculateTotalAmountByDateDailyForAdmin(selectedDateParam);
    }

    public BigDecimal calculateTotalAmountByMerchantIdAndDateBetweenDates(Long merchantId, Date startDate, Date endDate) {
        return  reportRepository.calculateTotalAmountByMerchantIdAndDateBetweenDates(merchantId, startDate, endDate);
    }

    public BigDecimal calculateTotalAmountByMerchantIdAndYear(Long merchantId, int selectedYear) {
        return  reportRepository.calculateTotalAmountByMerchantIdAndYear(merchantId, selectedYear);
    }

    public int calculateTotalTransactionsByMerchantIdAndDateDaily(Long merchantId, Date selectedDateParam) {
       return reportRepository.calculateTotalTransactionsByMerchantIdAndDateDaily(merchantId, selectedDateParam);
    }

    public BigDecimal calculateTotalTransactionsByMerchantIdAndDateBetweenDates(Long merchantId, Date startDate, Date endDate) {
        return  reportRepository.calculateTotalTransactionsByMerchantIdAndDateBetweenDates(merchantId, startDate, endDate);
    }

    public int calculateTotalTransactionsByMerchantIdAndYear(Long merchantId, int selectedYear) {
       return reportRepository.calculateTotalTransactionsByMerchantIdAndYear(merchantId, selectedYear);
    }



    //1234567890-
    public List<Report> fetchTransactionsByDateForAdmin(Date transactionDate) {
        return reportRepository.fetchTransactionsByDateForAdmin(transactionDate);
    }

    public List<Report> fetchTransactionsBetweenTwoDatesForMonthForAdmin(Date startDate, Date endDate) {
        return reportRepository.fetchTransactionsBetweenTwoDatesForMonthForAdmin(startDate, endDate);
    }

    public List<Report> fetchTransactionsForYearForAdmin(int year) {
        return reportRepository.fetchTransactionsForYearForAdmin(year);
    }

    public List<Report> fetchTransactionsByDateAndMerchantIdForAdmin(Date selectedDate, int merchantId) {
        return reportRepository.fetchTransactionsByDateAndMerchantIdForAdmin(selectedDate, merchantId);
    }

    public List<Report> fetchTransactionsBetweenTwoDatesAndMerchantIdForAdmin(Date startDate, Date endDate, int merchantId) {
        return reportRepository.fetchTransactionsBetweenTwoDatesAndMerchantIdForAdmin(startDate, endDate, merchantId);
    }

    public List<Report> fetchTransactionsForYearAndMerchantIdForAdmin(int merchantId, int year) {
        return reportRepository.fetchTransactionsForYearAndMerchantIdForAdmin(merchantId, year);
    }

}

