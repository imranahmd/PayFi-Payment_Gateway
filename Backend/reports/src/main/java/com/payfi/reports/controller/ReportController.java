package com.payfi.reports.controller;


import com.payfi.reports.entity.Report;
import com.payfi.reports.service.ReportService;
import com.payfi.reports.util.ExtractJWT;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;

import java.math.BigDecimal;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping()
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/total-amount-between-dates-admin")
    public BigDecimal calculateTotalAmountBetweenDates( @RequestHeader(value="Authorization") String token,
                                                        @RequestParam String startDate,
                                                       @RequestParam String endDate) throws ParseException {

        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(startDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());

        java.util.Date utilDate2 = sdf.parse(endDate);
        java.sql.Date sqlEndDate = new java.sql.Date(utilDate2.getTime());

       return reportService.calculateTotalAmountBetweenDatesForAdmin(sqlStartDate, sqlEndDate);

    }

    @PostMapping("/total-amount-for-year-admin")
    public BigDecimal calculateTotalAmountForYear(@RequestHeader(value="Authorization") String token,@RequestParam int year) {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }
       return reportService.calculateTotalAmountForYearForAdmin(year);
    }

    @PostMapping("/total-transaction-by-date-daily-admin")
    public int calculateTotalTransactionByDateDaily(@RequestHeader(value="Authorization") String token,
                                                    @RequestParam String date) throws ParseException {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(date);
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

       return reportService.calculateTotalTransactionByDateDailyForAdmin(sqlDate);
    }

    @PostMapping("/total-transaction-between-dates-admin")
    public BigDecimal calculateTotalTransactionBetweenDates(@RequestHeader(value="Authorization") String token,
                                                            @RequestParam String startDate,
                                                            @RequestParam String endDate) throws ParseException {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(startDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());

        java.util.Date utilDate2 = sdf.parse(endDate);
        java.sql.Date sqlEndDate = new java.sql.Date(utilDate2.getTime());


        return reportService.calculateTotalTransactionBetweenDatesForAdmin(sqlStartDate, sqlEndDate);
    }

    @PostMapping("/total-transaction-for-year-admin")
    public BigDecimal calculateTotalTransactionForYear(@RequestHeader(value="Authorization") String token,
                                                       @RequestParam int year) {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }
        return reportService.calculateTotalTransactionForYearForAdmin(year);
    }

    @PostMapping("/total-amount-by-merchantId-and-date-daily")
    public BigDecimal calculateTotalAmountByMerchantIdAndDateDaily(@RequestHeader(value="Authorization") String token,
                                                                   @RequestParam long merchantId,
                                                                   @RequestParam String date) throws ParseException {

        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(date);
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
        return reportService.calculateTotalAmountByMerchantIdAndDateDaily(merchantId, sqlDate);

    }


    @PostMapping("/total-amount-by-date-daily-admin")
    public BigDecimal calculateTotalAmountByDateDaily(@RequestHeader(value="Authorization") String token,
                                                      @RequestParam String selectedDateParam) throws ParseException {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(selectedDateParam);
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
        return reportService.calculateTotalAmountByDateDailyForAdmin(sqlDate);
    }

    @PostMapping("/total-amount-by-merchant-and-date-between-dates")
    public BigDecimal calculateTotalAmountByMerchantAndDateBetweenDates(@RequestHeader(value="Authorization") String token,
                                                                        @RequestParam Long merchantId,
                                                                  String startDate,
                                                                  String endDate) throws ParseException {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(startDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());

        java.util.Date utilDate2 = sdf.parse(endDate);
        java.sql.Date sqlEndDate = new java.sql.Date(utilDate2.getTime());
        return reportService.calculateTotalAmountByMerchantIdAndDateBetweenDates(merchantId, sqlStartDate, sqlEndDate);
    }


    @PostMapping("/total-amount-by-merchant-and-year")
    public BigDecimal calculateTotalAmountByMerchantAndYear(@RequestHeader(value="Authorization") String token,
                                                            @RequestParam Long merchantId,
                                                      @RequestParam int selectedYear) {

        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }
        return reportService.calculateTotalAmountByMerchantIdAndYear(merchantId, selectedYear);
    }

    @PostMapping("/total-transactions-by-merchant-and-date-daily")
    public int calculateTotalTransactionsByMerchantAndDateDaily(@RequestHeader(value="Authorization") String token,
                                                                @RequestParam Long merchantId,
                                                                 @RequestParam String selectedDateParam) throws ParseException {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(selectedDateParam);
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
        return reportService.calculateTotalTransactionsByMerchantIdAndDateDaily(merchantId, sqlDate);
    }

    @PostMapping("/total-transactions-by-merchant-and-date-between-dates")
    public BigDecimal calculateTotalTransactionsByMerchantAndDateBetweenDates(@RequestHeader(value="Authorization") String token,
                                                                              @RequestParam Long merchantId,
                                                                        @RequestParam String startDate,
                                                                        @RequestParam String endDate) throws ParseException {

        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(startDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());

        java.util.Date utilDate2 = sdf.parse(endDate);
        java.sql.Date sqlEndDate = new java.sql.Date(utilDate2.getTime());
      return   reportService.calculateTotalTransactionsByMerchantIdAndDateBetweenDates(merchantId,sqlStartDate, sqlEndDate);
    }

    @PostMapping("/total-transactions-by-merchant-and-year")
    public int calculateTotalTransactionsByMerchantAndYear(@RequestHeader(value="Authorization") String token,
                                                           @RequestParam Long merchantId,
                                                            @RequestParam int selectedYear) {

        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }

        return   reportService.calculateTotalTransactionsByMerchantIdAndYear(merchantId, selectedYear);
    }

//table
@GetMapping("/transactions-by-date")
public List<Report> fetchTransactionsByDateForAdmin(@RequestHeader(value="Authorization") String token,
                                                    @RequestParam String transactionDate) throws ParseException {
    String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

    if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
        throw new AuthorizationServiceException("admin not authorized for this request");
    }

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    java.util.Date utilDate = sdf.parse(transactionDate);
    java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());

    return reportService.fetchTransactionsByDateForAdmin(sqlStartDate);
}

    @GetMapping("/transactions-between-dates")
    public List<Report> fetchTransactionsBetweenTwoDatesForMonthForAdmin(@RequestHeader(value="Authorization") String token,
                                                                         @RequestParam String startDate,
                                                                         @RequestParam String endDate) throws ParseException {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(startDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());

        java.util.Date utilDate2 = sdf.parse(endDate);
        java.sql.Date sqlEndDate = new java.sql.Date(utilDate2.getTime());
        return reportService.fetchTransactionsBetweenTwoDatesForMonthForAdmin(sqlStartDate, sqlEndDate);
    }

    @GetMapping("/transactions-for-year")
    public List<Report> fetchTransactionsForYearForAdmin(@RequestHeader(value="Authorization") String token,
                                                         @RequestParam int year) {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }
        return reportService.fetchTransactionsForYearForAdmin(year);
    }

    @GetMapping("/transactions-by-date-and-merchantId")
    public List<Report> fetchTransactionsByDateAndMerchantIdForAdmin(@RequestHeader(value="Authorization") String token,
                                                                     @RequestParam String selectedDate,
                                                                          @RequestParam int merchantId) throws ParseException {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(selectedDate);
        java.sql.Date sqlSelectedDate = new java.sql.Date(utilDate.getTime());

        return reportService.fetchTransactionsByDateAndMerchantIdForAdmin(sqlSelectedDate, merchantId);
    }

    @GetMapping("/transactions-between-dates-and-merchantId")
    public List<Report> fetchTransactionsBetweenTwoDatesAndMerchantIdForAdmin(@RequestHeader(value="Authorization") String token,
                                                                              @RequestParam String startDate,
                                                                                   @RequestParam String endDate,
                                                                                   @RequestParam int merchantId) throws ParseException {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(startDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());

        java.util.Date utilDate2 = sdf.parse(endDate);
        java.sql.Date sqlEndDate = new java.sql.Date(utilDate2.getTime());

        return reportService.fetchTransactionsBetweenTwoDatesAndMerchantIdForAdmin(sqlStartDate, sqlEndDate, merchantId);
    }

    @GetMapping("/transactions-for-year-and-merchantId")
    public List<Report> fetchTransactionsForYearAndMerchantIdForAdmin(@RequestHeader(value="Authorization") String token,
                                                                      @RequestParam int merchantId,
                                                                           @RequestParam int year) {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }
        return reportService.fetchTransactionsForYearAndMerchantIdForAdmin(merchantId, year);
    }



}



