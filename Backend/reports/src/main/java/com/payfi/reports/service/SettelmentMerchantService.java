package com.payfi.reports.service;




 import com.payfi.reports.entity.SellerSettlement;
 import com.payfi.reports.repo.ReportMerchantRepository;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.stereotype.Service;

 import javax.transaction.Transactional;
 import java.math.BigDecimal;
 import java.util.Date;
 import java.util.List;

@Service
@Transactional
public class SettelmentMerchantService {

    private final ReportMerchantRepository reportMerchantRepo;

    @Autowired
    public SettelmentMerchantService(ReportMerchantRepository reportMerchantRepo) {
        this.reportMerchantRepo = reportMerchantRepo;
    }

    public BigDecimal calculateTotalSettlementAmountByDateDailyForMerchant(Date selectedDate) {
        return reportMerchantRepo.calculateTotalSettlementAmountByDateDailyForMerchant(selectedDate);
    }

    public BigDecimal calculateTotalSettlementAmountBetweenDatesForMerchant(Date startDate, Date endDate) {
        return reportMerchantRepo.calculateTotalSettlementAmountBetweenDatesForMerchant(startDate, endDate);
    }

    public BigDecimal calculateTotalSettlementAmountForYearForMerchant(int selectedYear) {
        return reportMerchantRepo.calculateTotalSettlementAmountForYearForMerchant(selectedYear);
    }

    public int calculateTotalSettlementByDateDailyForMerchant(Date selectedDate) {
        return reportMerchantRepo.calculateTotalSettlementByDateDailyForMerchant(selectedDate);
    }

    public int calculateTotalSettlementBetweenDatesForMerchant(Date startDate, Date endDate) {
        return reportMerchantRepo.calculateTotalSettlementBetweenDatesForMerchant(startDate, endDate);
    }

    public int calculateTotalSettlementForYearForMerchant(int selectedYear) {
        return reportMerchantRepo.calculateTotalSettlementForYearForMerchant(selectedYear);
    }

    public List<SellerSettlement> fetchSettlementByDateForMerchant(Date queryDate) {
        return reportMerchantRepo.fetchSettlementByDateForMerchant(queryDate);
    }

    public List<SellerSettlement> fetchSettlementBetweenTwoDatesForMonthForMerchant(Date startDate, Date endDate) {
        return reportMerchantRepo.fetchSettlementBetweenTwoDatesForMonthForMerchant(startDate, endDate);
    }

    public List<SellerSettlement> fetchSettlementByYearForMerchant(int queryYear) {
        return reportMerchantRepo.fetchSettlementByYearForMerchant(queryYear);
    }
}

