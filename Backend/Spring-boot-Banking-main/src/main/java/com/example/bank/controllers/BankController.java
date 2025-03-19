package com.example.bank.controllers;

import com.example.bank.dto.*;
import com.example.bank.models.Account;
import com.example.bank.models.SellerAccount;
import com.example.bank.models.Transaction;
import com.example.bank.services.AccountService;
import com.example.bank.services.SellerAccountService;
import com.example.bank.services.TransactionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.validation.Valid;

@RestController
@RequestMapping("/bank/transaction")
public class BankController {
	
	
	
    private static final Logger LOGGER = LoggerFactory.getLogger(BankController.class);

    @Autowired
    private AccountService accountService;
    
    @Autowired
    private SellerAccountService sellerAccountService;

    @Autowired
    private TransactionService transactionService;
    
    @PostMapping(value = "/partneraddition",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PartnerAdditionResponseDto> partnerAddition(
            @Valid @RequestBody PartnerAdditionRequestDto partnerAdditionRequestDto) {	
        PartnerAdditionResponseDto partnerAdditionResponseDto = accountService.partnerAddition( partnerAdditionRequestDto );
        return new ResponseEntity<>( partnerAdditionResponseDto , HttpStatus.OK);
    }
    
    @PostMapping(value = "/selleraddition",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SellerAdditionResponseDto> sellerAddition(
            @Valid @RequestBody SellerAdditionRequestDto sellerAdditionRequestDto) {

        SellerAdditionResponseDto sellerAdditionResponseDto = sellerAccountService.sellerAddition(sellerAdditionRequestDto);

        return new ResponseEntity<SellerAdditionResponseDto>( sellerAdditionResponseDto , HttpStatus.OK);
    }

    
    @PostMapping(value = "/getpayment",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PaymentResponseDto> getPayment(
            @Valid @RequestBody PaymentRequestDto paymentRequestDto) {
        LOGGER.debug("Triggered AccountRestController.withdrawInput");
        
       PaymentResponseDto paymentResponseDto = transactionService.getPayment(paymentRequestDto);
  
       return new ResponseEntity<>(paymentResponseDto, HttpStatus.OK);

    }
    
    @PostMapping(value = "/getupipayment",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UpiPaymentResponseDto> getUpiPayment(
            @Valid @RequestBody UpiPaymentRequestDto upiPaymentRequestDto) {
        LOGGER.debug("Triggered AccountRestController.withdrawInput");
        
       UpiPaymentResponseDto upiPaymentResponseDto = transactionService.getUpiPayment(upiPaymentRequestDto);
  
       return new ResponseEntity<>(upiPaymentResponseDto, HttpStatus.OK);

    }
    

    @PostMapping(value = "/settlemerchant",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SettlementResponseDto> settleMerchant(
            @RequestBody SettlementRequestDto settlementRequestDto) {

    	SettlementResponseDto settlementResponseDto = transactionService.settleMerchant( settlementRequestDto  );

        return new ResponseEntity<>( settlementResponseDto, HttpStatus.OK);

    }


    @GetMapping("/partnerinfo/{partnerReferenceNumber}")
    public ResponseEntity<Account> getPartnerAccount( 
    		@PathVariable Long partnerReferenceNumber ) {
        Account account = accountService.getPartnerAccount( partnerReferenceNumber  );
        return  new ResponseEntity<>(account, HttpStatus.OK);
    }
    
    @PostMapping("/merchantinfo")
    public ResponseEntity<SellerAccount> getSellerAccount( 
    		@RequestBody MerchantInfoRequestDto merchantInfoRequestDto  ) {
    	
        SellerAccount sellerAccount = sellerAccountService.getSellerAccount( merchantInfoRequestDto );
        return  new ResponseEntity<>( sellerAccount , HttpStatus.OK);
    }
    
    @GetMapping("/gettransactionofpartner/{partnerReferenceNumber}")
    public List<Transaction> getTransactionOfPartner( 
    		@PathVariable Long partnerReferenceNumber ) {
    	List<Transaction> transactions = transactionService.getPartnerTransaction( partnerReferenceNumber  );
        return  transactions;
    }
    
    @GetMapping("/gettransactionofmerchant/{merchantOktaId}")
    public List<Transaction> getTransactionOfMerchnat( 
    		@PathVariable String merchantOktaId
    		){
    	List<Transaction> merchantTransactionList = transactionService.getTransactionOfMerchant( merchantOktaId );
    	return merchantTransactionList;
    }
    
}
