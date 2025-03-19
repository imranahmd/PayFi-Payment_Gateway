package com.payfi.reports.repo;

import com.payfi.reports.entity.Report;
import com.payfi.reports.entity.SellerSettlement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


public interface ReportRepository extends JpaRepository<Report, Long> {
    @Procedure("Calculate_Total_Amount_Between_Dates_for_Admin")
    BigDecimal calculateTotalAmountBetweenDatesForAdmin(@Param("start_date_param") Date startDateParam, @Param("end_date_param") Date endDateParam);


    @Procedure("Calculate_Total_Amount_For_Year_for_Admin")
    BigDecimal calculateTotalAmountForYearForAdmin(@Param("selected_year_param") int selectedYearParam);

    @Procedure("Calculate_Total_Transaction_By_Date_daily_for_Admin")
    int calculateTotalTransactionByDateDailyForAdmin(@Param("selected_date_param") Date selectedDateParam);

    @Procedure("Calculate_Total_Transaction_Between_Dates_for_Admin")
    BigDecimal calculateTotalTransactionBetweenDatesForAdmin(@Param("start_date_param") Date startDateParam, @Param("end_date_param") Date endDateParam);

    @Procedure("Calculate_Total_Transaction_For_Year_for_Admin")
    BigDecimal calculateTotalTransactionForYearForAdmin(@Param("selected_year_param") int selectedYearParam);

    @Procedure("Calculate_Total_Amount_By_MerchantId_And_Date_daily")
    BigDecimal calculateTotalAmountByMerchantIdAndDateDaily(@Param("merchant_id_param") long merchantIdParam, @Param("selected_date_param") Date selectedDateParam);


    @Procedure("Calculate_Total_Amount_By_Date_daily_for_Admin")
    BigDecimal calculateTotalAmountByDateDailyForAdmin(@Param("selected_date_param") Date selectedDateParam);


    @Procedure("Calculate_Total_Amount_By_MerchantId_And_Between_Dates")
    BigDecimal calculateTotalAmountByMerchantIdAndDateBetweenDates(@Param("merchant_id_param") Long merchantId,
                                                             @Param("start_date_param") Date startDate,
                                                             @Param("end_date_param") Date endDate);

    @Procedure("Calculate_Total_Amount_By_MerchantId_And_Date_for_Year")
    BigDecimal calculateTotalAmountByMerchantIdAndYear(@Param("merchant_id_param") Long merchantId,
                                                 @Param("selected_year_param") int selectedYear);


    @Procedure("Calculate_Total_Transaction_By_MerchantId_And_Date_daily")
    int calculateTotalTransactionsByMerchantIdAndDateDaily(@Param("merchant_id_param") Long merchantId,
                                                            @Param("selected_date_param") Date selectedDateParam);

    @Procedure("Calculate_Total_Transaction_By_MerchantId_And_Between_Dates")
    BigDecimal calculateTotalTransactionsByMerchantIdAndDateBetweenDates(@Param("merchant_id_param") Long merchantId,
                                                                   @Param("start_date_param") Date startDate,
                                                                   @Param("end_date_param") Date endDate);

    @Procedure("Calculate_Total_Transactions_By_MerchantId_And_Year")
    int calculateTotalTransactionsByMerchantIdAndYear(@Param("merchant_id_param") Long merchantId,
                                                       @Param("selected_year_param") int selectedYear);



    //seller settlement

    @Procedure("Calculate_Total_Settlement_Amount_By_Date_daily_for_Admin")
    BigDecimal calculateTotalSettlementAmountByDateDaily(@Param("selected_date_param") Date selectedDate);

    @Procedure("Calculate_Total_Settlement_Amount_Between_Dates_for_Admin")
    BigDecimal calculateTotalSettlementAmountBetweenDates(@Param("start_date_param") Date startDate,
                                                    @Param("end_date_param") Date endDate);

    @Procedure("Calculate_Total_Settlement_Amount_For_Year_for_Admin")
    BigDecimal calculateTotalSettlementAmountForYear(@Param("selected_year_param") Integer selectedYear);

    @Procedure("Calculate_Total_Settlement_By_Date_daily_for_Admin")
    Integer calculateTotalSettlementByDateDaily(@Param("selected_date_param") Date selectedDate);

    @Procedure("Calculate_Total_Settlement_Between_Dates_for_Admin")
    Integer calculateTotalSettlementBetweenDates(@Param("start_date_param") Date startDate,
                                              @Param("end_date_param") Date endDate);

    @Procedure("Calculate_Total_Settlement_For_Year_for_Admin")
    Integer calculateTotalSettlementForYear(@Param("selected_year_param") Integer selectedYear);

    @Procedure("Calculate_Total_Settlement_Amount_By_MerchantId_And_Date_daily")
    BigDecimal calculateTotalSettlementAmountByMerchantIdAndDateDaily(@Param("merchant_id_param") Long merchantId,
                                                                @Param("selected_date_param") Date selectedDate
    );

    @Procedure("Calculate_Total_Settlement_Amount_By_MerchantId_And_BetweenDates")
    BigDecimal calculateTotalSettlementAmountByMerchantIdAndDateBetweenDates(@Param("merchant_id_param") Long merchantId,
                                                                       @Param("start_date_param") Date startDate,
                                                                       @Param("end_date_param") Date endDate);

    @Procedure("Calculate_Total_Settlement_Amount_By_MerchantId_And_Year")
    BigDecimal calculateTotalSettlementAmountByMerchantIdAndYear(@Param("merchant_id_param") Long merchantId,
                                                           @Param("selected_year_param") Integer selectedYear);

    @Procedure("Calculate_Total_Settlement_By_MerchantId_And_Date_daily")
    Integer calculateTotalSettlementTransactionsByMerchantIdAndDateDaily(@Param("merchant_id_param") Long merchantId,
                                                                      @Param("selected_date_param") Date selectedDate);

    @Procedure("Calculate_Total_Settlement_By_MerchantId_And_Between_Dates")
    BigDecimal calculateTotalSettlementTransactionsByMerchantIdAndDateBetweenDates(@Param("merchant_id_param") Long merchantId,
                                                                             @Param("start_date_param") Date startDate,
                                                                             @Param("end_date_param") Date endDate);

    @Procedure("Calculate_Total_Settlement_Transactions_By_MerchantId_And_Year")
    Integer calculateTotalSettlementTransactionsByMerchantIdAndYear(@Param("merchant_id_param") Long merchantId,
                                                                 @Param("selected_year_param") Integer selectedYear);


//table ones
@Query(value = "CALL fetch_transactions_by_date_for_Admin(?1)", nativeQuery = true)
List<Report> fetchTransactionsByDateForAdmin(Date transactionDate);

    @Query(value = "CALL fetch_transactions_between_two_dates_for_month_for_Admin(?1, ?2)", nativeQuery = true)
    List<Report> fetchTransactionsBetweenTwoDatesForMonthForAdmin(Date startDate, Date endDate);

    @Query(value = "CALL fetch_transactions_for_year_for_Admin(?1)", nativeQuery = true)
    List<Report> fetchTransactionsForYearForAdmin(int year);

    @Query(value = "CALL fetch_transactions_by_date_and_merchantId_for_Admin(?1, ?2)", nativeQuery = true)
    List<Report> fetchTransactionsByDateAndMerchantIdForAdmin(Date selectedDate, int merchantId);

    @Query(value = "CALL fetch_transactions_between_two_dates_and_merchantId_for_Admin(?1, ?2, ?3)", nativeQuery = true)
    List<Report> fetchTransactionsBetweenTwoDatesAndMerchantIdForAdmin(Date startDate, Date endDate, int merchantId);

    @Query(value = "CALL FetchTransactionsByMerchantAndYear(?1, ?2)", nativeQuery = true)
    List<Report> fetchTransactionsForYearAndMerchantIdForAdmin(int merchantId, int year);



    //table settlement
    @Procedure("fetch_settlement_by_date_for_Admin")
    List<SellerSettlement> fetchSettlementByDateForAdmin(@Param("query_date") Date queryDate);

    @Procedure("fetch_settlement_between_two_dates_for_month_for_Admin")
    List<SellerSettlement> fetchSettlementBetweenTwoDatesForMonthForAdmin(@Param("start_date") Date startDate,
                                                                             @Param("end_date") Date endDate);

    @Procedure("fetch_settlement_for_year_for_Admin")
    List<SellerSettlement> fetchSettlementForYearForAdmin(@Param("query_year") int queryYear);

    @Procedure("fetch_settlement_by_date_and_merchantId_for_Admin")
    List<SellerSettlement> fetchSettlementByDateAndMerchantIdForAdmin(@Param("query_date") Date queryDate,
                                                                         @Param("query_merchant_id") long queryMerchantId);

    @Procedure("fetch_settlement_by_date_range_and_merchantId_for_Admin")
    List<SellerSettlement> fetchSettlementByDateRangeAndMerchantIdForAdmin(@Param("start_date") Date startDate,
                                                                              @Param("end_date") Date endDate,
                                                                              @Param("query_merchant_id") long queryMerchantId);

    @Procedure("fetch_settlement_by_year_and_merchantId_for_Admin")
    List<SellerSettlement> fetchSettlementByYearAndMerchantIdForAdmin(@Param("query_year") int queryYear,
                                                                         @Param("query_merchant_id") long queryMerchantId);

}


