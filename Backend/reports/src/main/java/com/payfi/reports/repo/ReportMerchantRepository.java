package com.payfi.reports.repo;

import com.payfi.reports.entity.Report;
import com.payfi.reports.entity.SellerSettlement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


public interface ReportMerchantRepository extends JpaRepository<Report, Long> {

    @Procedure("Calculate_Total_Amount_By_Date_daily_for_merchant")
    BigDecimal calculateTotalAmountByDateDailyForMerchant(Date selectedDate);

    @Procedure("Calculate_Total_Amount_Between_Dates_for_Merchant")
    BigDecimal calculateTotalAmountBetweenDatesForMerchant(Date startDate, Date endDate);

    @Procedure("Calculate_Total_Amount_For_Year_for_Merchant")
    BigDecimal calculateTotalAmountForYearForMerchant(int selectedYear);

    @Procedure("Calculate_Total_Transaction_By_Date_daily_for_Merchant")
    int calculateTotalTransactionByDateDailyForMerchant(Date selectedDate);

    @Procedure("Calculate_Total_Transaction_Between_Dates_for_Merchant")
    int calculateTotalTransactionBetweenDatesForMerchant(Date startDate, Date endDate);

    @Procedure("Calculate_Total_Transaction_For_Year_for_Merchant")
    int calculateTotalTransactionForYearForMerchant(int selectedYear);

    @Procedure("fetch_transactions_by_date_for_Merchant")
    List<Report> fetchTransactionsByDateForMerchant(Date transactionDate);

    @Procedure("fetch_transactions_between_two_dates_for_month_for_Merchant")
    List<Report> fetchTransactionsBetweenTwoDatesForMonthForMerchant(Date startDate, Date endDate);

    @Procedure("fetch_transactions_for_year_for_Merchant")
    List<Report> fetchTransactionsForYearForMerchant(int yearParam);
    
    
    
    
    //setllemt
    @Procedure("Calculate_Total_Settlement_Amount_By_Date_daily_for_merchant")
    BigDecimal calculateTotalSettlementAmountByDateDailyForMerchant(Date selectedDate);

    @Procedure("Calculate_Total_Settlement_Amount_Between_Dates_for_Merchant")
    BigDecimal calculateTotalSettlementAmountBetweenDatesForMerchant(Date startDate, Date endDate);

    @Procedure("Calculate_Total_Settlement_Amount_For_Year_for_Merchant")
    BigDecimal calculateTotalSettlementAmountForYearForMerchant(int selectedYear);

    @Procedure("Calculate_Total_Settlement_By_Date_daily_for_Merchant")
    int calculateTotalSettlementByDateDailyForMerchant(Date selectedDate);

    @Procedure("Calculate_Total_Settlement_Between_Dates_for_Merchant")
    int calculateTotalSettlementBetweenDatesForMerchant(Date startDate, Date endDate);

    @Procedure("Calculate_Total_Settlement_For_Year_for_Merchant")
    int calculateTotalSettlementForYearForMerchant(int selectedYear);

    @Procedure("fetch_settlement_by_date_for_Merchant")
    List<SellerSettlement> fetchSettlementByDateForMerchant(Date ProcedureDate);

    @Procedure("fetch_settlement_between_two_dates_for_month_for_Merchant")
    List<SellerSettlement> fetchSettlementBetweenTwoDatesForMonthForMerchant(Date startDate, Date endDate);

    @Procedure("fetch_settlement_by_year_for_Merchant")
    List<SellerSettlement> fetchSettlementByYearForMerchant(int ProcedureYear);
}

    
    
    
