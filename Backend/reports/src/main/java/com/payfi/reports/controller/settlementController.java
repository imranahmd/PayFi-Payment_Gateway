package com.payfi.reports.controller;

import com.payfi.reports.entity.SellerSettlement;

import com.payfi.reports.service.SettlementStatementService;
import com.payfi.reports.util.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@RestController
@RequestMapping("/seller-statement")
public class settlementController {

    private final SettlementStatementService sellerStatementService;

    @Autowired
    public settlementController(SettlementStatementService sellerStatementService) {
        this.sellerStatementService = sellerStatementService;
    }

    @PostMapping("/calculate-total-settlement-amount-by-date-daily")
    public BigDecimal calculateTotalSettlementAmountByDateDaily(@RequestHeader(value="Authorization") String token,@RequestParam String selectedDate) throws ParseException {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(selectedDate);
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
       return sellerStatementService.calculateTotalSettlementAmountByDateDaily(sqlDate);
    }

    @PostMapping("/calculate-total-settlement-amount-between-dates")
    public BigDecimal calculateTotalSettlementAmountBetweenDates(@RequestHeader(value="Authorization") String token,
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
      return   sellerStatementService.calculateTotalSettlementAmountBetweenDates(sqlStartDate, sqlEndDate);
    }

    @PostMapping("/calculate-total-settlement-amount-for-year")
    public BigDecimal calculateTotalSettlementAmountForYear(@RequestHeader(value="Authorization") String token,
                                                            @RequestParam int selectedYear) {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }
        return   sellerStatementService.calculateTotalSettlementAmountForYear(selectedYear);
    }

    @PostMapping("/calculate-total-settlement-by-date-daily")
    public int calculateTotalSettlementByDateDaily(@RequestHeader(value="Authorization") String token,@RequestParam String selectedDate) throws ParseException {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(selectedDate);
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
       return sellerStatementService.calculateTotalSettlementByDateDaily(sqlDate);
    }

    @PostMapping("/calculate-total-settlement-between-dates")
    public int calculateTotalSettlementBetweenDates(@RequestHeader(value="Authorization") String token,@RequestParam String startDate,
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
      return   sellerStatementService.calculateTotalSettlementBetweenDates(sqlStartDate, sqlEndDate);
    }

    @PostMapping("/calculate-total-settlement-for-year")
    public int calculateTotalSettlementForYear(@RequestHeader(value="Authorization") String token,@RequestParam int selectedYear) {

        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }
        return   sellerStatementService.calculateTotalSettlementForYear(selectedYear);
    }

    @PostMapping("/calculate-total-settlement-amount-by-merchant-id-and-date-daily")
    public BigDecimal calculateTotalSettlementAmountByMerchantIdAndDateDaily(@RequestHeader(value="Authorization") String token,@RequestParam long merchantId,
                                                                       @RequestParam String selectedDate) throws ParseException {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(selectedDate);
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());


     return    sellerStatementService.calculateTotalSettlementAmountByMerchantIdAndDateDaily(merchantId, sqlDate);
    }

    @PostMapping("/calculate-total-settlement-amount-by-merchant-id-and-date-between-dates")
    public BigDecimal calculateTotalSettlementAmountByMerchantIdAndDateBetweenDates(@RequestHeader(value="Authorization") String token,@RequestParam Long merchantId,
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
        return sellerStatementService.calculateTotalSettlementAmountByMerchantIdAndDateBetweenDates(merchantId, sqlStartDate, sqlEndDate);
    }
    @PostMapping("/calculate-total-settlement-amount-by-merchant-id-and-year")
    public BigDecimal calculateTotalSettlementAmountByMerchantIdAndYear(@RequestHeader(value="Authorization") String token,@RequestParam long merchantId,
                                                                  @RequestParam int selectedYear) {

        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }
        return   sellerStatementService.calculateTotalSettlementAmountByMerchantIdAndYear(merchantId, selectedYear);
    }

    //fetch table

    @GetMapping("/fetchSettlement-by-date")
    public List<SellerSettlement> fetchSettlementByDateForAdmin(@RequestHeader(value="Authorization") String token,@RequestParam String queryDate) throws ParseException {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(queryDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());


        return sellerStatementService.fetchSettlementByDateForAdmin(sqlStartDate);
    }

    @GetMapping("/fetchSettlement-between-dates")
    public List<SellerSettlement> fetchSettlementBetweenTwoDatesForMonthForAdmin(@RequestHeader(value="Authorization") String token,@RequestParam String startDate,
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
        return sellerStatementService.fetchSettlementBetweenTwoDatesForMonthForAdmin(sqlStartDate, sqlEndDate);
    }

    @GetMapping("/fetchSettlement-for-year")
    public List<SellerSettlement> fetchSettlementForYearForAdmin(@RequestHeader(value="Authorization") String token,@RequestParam int queryYear) {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }
      
        return sellerStatementService.fetchSettlementForYearForAdmin(queryYear);
    }

    @GetMapping("/fetchSettlement-by-date-and-merchantId")
    public List<SellerSettlement> fetchSettlementByDateAndMerchantIdForAdmin(@RequestHeader(value="Authorization") String token,@RequestParam String queryDate,
                                                                             @RequestParam long queryMerchantId) throws ParseException {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(queryDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());

        return sellerStatementService.fetchSettlementByDateAndMerchantIdForAdmin(sqlStartDate, queryMerchantId);
    }

    @GetMapping("/fetchSettlement-by-date-range-and-merchantId")
    public List<SellerSettlement> fetchSettlementByDateRangeAndMerchantIdForAdmin(@RequestHeader(value="Authorization") String token,@RequestParam String startDate,
                                                                                     @RequestParam String endDate,
                                                                                     @RequestParam long queryMerchantId) throws ParseException {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date utilDate = sdf.parse(startDate);
        java.sql.Date sqlStartDate = new java.sql.Date(utilDate.getTime());

        java.util.Date utilDate2 = sdf.parse(endDate);
        java.sql.Date sqlEndDate = new java.sql.Date(utilDate2.getTime());
        
        return sellerStatementService.fetchSettlementByDateRangeAndMerchantIdForAdmin(sqlStartDate, sqlEndDate, queryMerchantId);
    }

    @GetMapping("/fetchSettlement-by-year-and-merchantId")
    public List<SellerSettlement> fetchSettlementByYearAndMerchantIdForAdmin(@RequestHeader(value="Authorization") String token,@RequestParam int queryYear,
                                                                                @RequestParam long queryMerchantId) {
        String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(adminEmailId==null || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
            throw new AuthorizationServiceException("admin not authorized for this request");
        }
      
        return sellerStatementService.fetchSettlementByYearAndMerchantIdForAdmin(queryYear, queryMerchantId);
    }

}
