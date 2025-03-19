package com.payfi.reports.controller;

import com.payfi.reports.entity.Report;
import com.payfi.reports.service.ReportMerchantService;
import com.payfi.reports.util.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/merchant")
public class ReportMerchantController {

    private final ReportMerchantService reportMerchantService;

    @Autowired
    public ReportMerchantController(ReportMerchantService reportMerchantService) {
        this.reportMerchantService = reportMerchantService;
    }

    @GetMapping("/total-amount-by-date-daily/{selectedDate}")
    public BigDecimal calculateTotalAmountByDateDailyForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable String selectedDate) throws ParseException {

        String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
        String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (merchantEmail.isEmpty() ) {
            throw new ResourceNotFoundException("User empty exception");
        }
       
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date utilDate = sdf.parse(selectedDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());
        return reportMerchantService.calculateTotalAmountByDateDailyForMerchant(sqlStartDate);
    }

    @GetMapping("/total-amount-between-dates/{startDate}/{endDate}")
    public BigDecimal calculateTotalAmountBetweenDatesForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable String startDate,
                                                                   @PathVariable String endDate) throws ParseException {
        String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
        String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (merchantEmail.isEmpty() ) {
            throw new ResourceNotFoundException("User empty exception");
        }
      
      
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date utilDate = sdf.parse(startDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());

        Date utilDate2 = sdf.parse(endDate);
        java.sql.Date sqlEndDate = new java.sql.Date(utilDate2.getTime());
        return reportMerchantService.calculateTotalAmountBetweenDatesForMerchant(sqlStartDate, sqlEndDate);
    }

    @GetMapping("/total-amount-for-year/{selectedYear}")
    public BigDecimal calculateTotalAmountForYearForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable int selectedYear) {
        String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
        String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (merchantEmail.isEmpty() ) {
            throw new ResourceNotFoundException("User empty exception");
        }
      
        return reportMerchantService.calculateTotalAmountForYearForMerchant(selectedYear);
    }

    @GetMapping("/total-transaction-by-date-daily/{selectedDate}")
    public int calculateTotalTransactionByDateDailyForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable String selectedDate) throws ParseException {

        String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
        String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (merchantEmail.isEmpty() ) {
            throw new ResourceNotFoundException("User empty exception");
        }
       
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date utilDate = sdf.parse(selectedDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());
        return reportMerchantService.calculateTotalTransactionByDateDailyForMerchant(sqlStartDate);
    }

    @GetMapping("/total-transaction-between-dates/{startDate}/{endDate}")
    public int calculateTotalTransactionBetweenDatesForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable String startDate,
                                                                @PathVariable String endDate) throws ParseException {


        String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
        String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (merchantEmail.isEmpty() ) {
            throw new ResourceNotFoundException("User empty exception");
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date utilDate = sdf.parse(startDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());

        Date utilDate2 = sdf.parse(endDate);
        java.sql.Date sqlEndDate = new java.sql.Date(utilDate2.getTime());
        return reportMerchantService.calculateTotalTransactionBetweenDatesForMerchant(sqlStartDate, sqlEndDate);
    }

    @GetMapping("/total-transaction-for-year/{selectedYear}")
    public int calculateTotalTransactionForYearForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable int selectedYear) {
        String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
        String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (merchantEmail.isEmpty() ) {
            throw new ResourceNotFoundException("User empty exception");
        }
      
        return reportMerchantService.calculateTotalTransactionForYearForMerchant(selectedYear);
    }

    @GetMapping("/transactions-by-date/{transactionDate}")
    public List<Report> fetchTransactionsByDateForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable String transactionDate) throws ParseException {

        String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
        String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (merchantEmail.isEmpty() ) {
            throw new ResourceNotFoundException("User empty exception");
        }
    
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date utilDate = sdf.parse(transactionDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());
        return reportMerchantService.fetchTransactionsByDateForMerchant(sqlStartDate);
    }

    @GetMapping("/transactions-between-dates/{startDate}/{endDate}")
    public List<Report> fetchTransactionsBetweenTwoDatesForMonthForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable String startDate,
                                                                             @PathVariable String endDate) throws ParseException {

        String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
        String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (merchantEmail.isEmpty() ) {
            throw new ResourceNotFoundException("User empty exception");
        }
      
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date utilDate = sdf.parse(startDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());

        Date utilDate2 = sdf.parse(endDate);
        java.sql.Date sqlEndDate = new java.sql.Date(utilDate2.getTime());
        return reportMerchantService.fetchTransactionsBetweenTwoDatesForMonthForMerchant(sqlStartDate, sqlEndDate);
    }

    @GetMapping("/transactions-for-year/{yearParam}")
    public List<Report> fetchTransactionsForYearForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable int yearParam) {
        String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
        String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (merchantEmail.isEmpty() ) {
            throw new ResourceNotFoundException("User empty exception");
        }
       
        return reportMerchantService.fetchTransactionsForYearForMerchant(yearParam);
    }
}
