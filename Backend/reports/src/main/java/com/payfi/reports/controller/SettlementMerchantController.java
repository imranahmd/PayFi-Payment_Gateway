package com.payfi.reports.controller;

import com.payfi.reports.entity.SellerSettlement;
import com.payfi.reports.service.SettelmentMerchantService;
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
@RequestMapping("/merchant/settlement")
public class SettlementMerchantController {

    private final SettelmentMerchantService settelmentMerchantService;

    @Autowired
    public SettlementMerchantController(SettelmentMerchantService settelmentMerchantService) {
        this.settelmentMerchantService = settelmentMerchantService;
    }

    @GetMapping("/total-settlement-amount-by-date-daily/{selectedDate}")
    public BigDecimal calculateTotalSettlementAmountByDateDailyForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable String selectedDate) throws ParseException {

        String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
        String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (merchantEmail.isEmpty() ) {
            throw new ResourceNotFoundException("User empty exception");
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date utilDate = sdf.parse(selectedDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());
        return settelmentMerchantService.calculateTotalSettlementAmountByDateDailyForMerchant(sqlStartDate);
    }

    @GetMapping("/total-settlement-amount-between-dates/{startDate}/{endDate}")
    public BigDecimal calculateTotalSettlementAmountBetweenDatesForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable String startDate,
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
        return settelmentMerchantService.calculateTotalSettlementAmountBetweenDatesForMerchant(sqlStartDate, sqlEndDate);
    }

    @GetMapping("/total-settlement-amount-for-year/{selectedYear}")
    public BigDecimal calculateTotalSettlementAmountForYearForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable int selectedYear) {
        String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
        String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (merchantEmail.isEmpty() ) {
            throw new ResourceNotFoundException("User empty exception");
        }

        return settelmentMerchantService.calculateTotalSettlementAmountForYearForMerchant(selectedYear);
    }

    @GetMapping("/total-settlement-by-date-daily/{selectedDate}")
    public int calculateTotalSettlementByDateDailyForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable String selectedDate) throws ParseException {

        String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
        String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (merchantEmail.isEmpty() ) {
            throw new ResourceNotFoundException("User empty exception");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date utilDate = sdf.parse(selectedDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());
        return settelmentMerchantService.calculateTotalSettlementByDateDailyForMerchant(sqlStartDate);
    }

    @GetMapping("/total-settlement-between-dates/{startDate}/{endDate}")
    public int calculateTotalSettlementBetweenDatesForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable String startDate,
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
        return settelmentMerchantService.calculateTotalSettlementBetweenDatesForMerchant(sqlStartDate, sqlEndDate);
    }

    @GetMapping("/total-settlement-for-year/{selectedYear}")
    public int calculateTotalSettlementForYearForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable int selectedYear) {

        String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
        String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (merchantEmail.isEmpty() ) {
            throw new ResourceNotFoundException("User empty exception");
        }

        return settelmentMerchantService.calculateTotalSettlementForYearForMerchant(selectedYear);
    }

    @GetMapping("/settlement-by-date/{queryDate}")
    public List<SellerSettlement> fetchSettlementByDateForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable String queryDate) throws ParseException {
        String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
        String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (merchantEmail.isEmpty() ) {
            throw new ResourceNotFoundException("User empty exception");
        }


        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date utilDate = sdf.parse(queryDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());
        return settelmentMerchantService.fetchSettlementByDateForMerchant(sqlStartDate);
    }

    @GetMapping("/settlement-between-dates/{startDate}/{endDate}")
    public List<SellerSettlement> fetchSettlementBetweenTwoDatesForMonthForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable String startDate,
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
        return settelmentMerchantService.fetchSettlementBetweenTwoDatesForMonthForMerchant(sqlStartDate, sqlEndDate);
    }

    @GetMapping("/settlement-for-year/{queryYear}")
    public List<SellerSettlement> fetchSettlementForYearForMerchant(@RequestHeader(value="Authorization") String token, @PathVariable int queryYear) {
        String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
        String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (merchantEmail.isEmpty() ) {
            throw new ResourceNotFoundException("User empty exception");
        }


       return settelmentMerchantService.fetchSettlementByYearForMerchant(queryYear);
    }
}
