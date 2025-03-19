package com.payfi.reports.service;

import com.payfi.reports.entity.SellerSettlement;
import com.payfi.reports.repo.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class SettlementStatementService {

    private final ReportRepository reportRepo;

    @Autowired
    public SettlementStatementService(ReportRepository reportRepo) {
        this.reportRepo = reportRepo;
    }

    public BigDecimal calculateTotalSettlementAmountByDateDaily(Date selectedDate) {
      return   reportRepo.calculateTotalSettlementAmountByDateDaily(selectedDate);
    }

    public BigDecimal calculateTotalSettlementAmountBetweenDates(Date startDate, Date endDate) {
        return   reportRepo.calculateTotalSettlementAmountBetweenDates(startDate, endDate);
    }

    public BigDecimal calculateTotalSettlementAmountForYear(Integer selectedYear) {
        return   reportRepo.calculateTotalSettlementAmountForYear(selectedYear);
    }

    public Integer calculateTotalSettlementByDateDaily(Date selectedDate) {
        return    reportRepo.calculateTotalSettlementByDateDaily(selectedDate);
    }

    public Integer calculateTotalSettlementBetweenDates(Date startDate, Date endDate) {
        return    reportRepo.calculateTotalSettlementBetweenDates(startDate, endDate);
    }

    public Integer calculateTotalSettlementForYear(int selectedYear) {
        return    reportRepo.calculateTotalSettlementForYear(selectedYear);
    }

    public BigDecimal calculateTotalSettlementAmountByMerchantIdAndDateDaily(Long merchantId, Date selectedDate) {
        return    reportRepo.calculateTotalSettlementAmountByMerchantIdAndDateDaily(merchantId, selectedDate);
    }

    public BigDecimal calculateTotalSettlementAmountByMerchantIdAndDateBetweenDates(Long merchantId, Date startDate, Date endDate) {
        return    reportRepo.calculateTotalSettlementAmountByMerchantIdAndDateBetweenDates(merchantId, startDate, endDate);
    }

    public BigDecimal calculateTotalSettlementAmountByMerchantIdAndYear(Long merchantId, int selectedYear) {
        return    reportRepo.calculateTotalSettlementAmountByMerchantIdAndYear(merchantId, selectedYear);
    }

//table 
 public List<SellerSettlement> fetchSettlementByDateForAdmin(Date queryDate) {
        return reportRepo.fetchSettlementByDateForAdmin(queryDate);
    }

    public List<SellerSettlement> fetchSettlementBetweenTwoDatesForMonthForAdmin(Date startDate, Date endDate) {
        return reportRepo.fetchSettlementBetweenTwoDatesForMonthForAdmin(startDate, endDate);
    }

    public List<SellerSettlement> fetchSettlementForYearForAdmin(int queryYear) {
        return reportRepo.fetchSettlementForYearForAdmin(queryYear);
    }

    public List<SellerSettlement> fetchSettlementByDateAndMerchantIdForAdmin(Date queryDate, long queryMerchantId) {
        return reportRepo.fetchSettlementByDateAndMerchantIdForAdmin(queryDate, queryMerchantId);
    }

    public List<SellerSettlement> fetchSettlementByDateRangeAndMerchantIdForAdmin(Date startDate, Date endDate, long queryMerchantId) {
        return reportRepo.fetchSettlementByDateRangeAndMerchantIdForAdmin(startDate, endDate, queryMerchantId);
    }

    public List<SellerSettlement> fetchSettlementByYearAndMerchantIdForAdmin(int queryYear, long queryMerchantId) {
        return reportRepo.fetchSettlementByYearAndMerchantIdForAdmin(queryYear, queryMerchantId);
    }
}

