package com.payfi.recurring.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.payfi.recurring.entity.Subscription;
import com.payfi.recurring.exception.AdminLoginException;
import com.payfi.recurring.exception.MerchantLoginException;
import com.payfi.recurring.requestdto.PaymentRequestDto;
import com.payfi.recurring.requestdto.UpiPaymentRequestDto;
import com.payfi.recurring.service.SubscriptionService;
import com.payfi.recurring.service.SubscriptionServiceImpl;
import com.payfi.recurring.util.ExtractJWT;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;


@RestController
@RequestMapping()
@Validated
public class RecurringController{
	
	@Autowired
	private SubscriptionService subscriptionService;
	
    //@PostConstruct
	public void populateTestSubscription(){
    	
	}
	
	@GetMapping("/testwithouttoken")
	public ResponseEntity<String> testwithouttoken() {
		return ResponseEntity.status(HttpStatus.CREATED).body("test without token");
	}

	@GetMapping("/testwithtoken")
	public ResponseEntity<String> testwithtoken(@RequestHeader(value = "Authorization") String token) throws AdminLoginException {
		
		String adminOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
			
		if(!adminOktaId.equals("00udz7kbuwFVIjyQU5d7") || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
			throw new AdminLoginException("admin not login");
		}

		return ResponseEntity.status(HttpStatus.CREATED).body("test with token");
	}
    
	//create subscription
	@Operation(summary = "Add Subscription", description = "Adds a new subscription for the authenticated merchant.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "201", description = "Subscription added successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Subscription.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") )
	})
	@PostMapping("/addsubscription")
	public ResponseEntity<Subscription> addSubscription(
			@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value="Authorization") String token,
			@RequestBody Subscription subscription){
		
		String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String merchnatEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		
        if(merchantOktaId==null || merchnatEmailId==null) {
        	throw new MerchantLoginException("merchant not login");
		}
		
		subscription.setSubscriptionStartDate(LocalDateTime.now());
		subscription.setSubscriptionExpireDate(LocalDateTime.now().plusMonths(subscription.getFrequency()));
		subscription.setSubscriptionStatus( "INACTIVE" );
		subscription.setPaymentStatus("due");
		subscription.setAutoDebit(false);
		Subscription createdSubscription = subscriptionService.saveSubscription(subscription);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdSubscription);
		
	}
	
	@Operation(summary = "Get All Subscriptions", description = "Retrieve all subscriptions of the authenticated merchant.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "200", description = "Subscriptions retrieved successfully", content = @Content( mediaType = "application/json", schema = @Schema(implementation = List.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") )
	})
	@GetMapping("/getallsubscriptions")
	public ResponseEntity<List<Subscription>> getSubscription(
			@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value="Authorization") String token){
		
		String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String merchnatEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if(merchantOktaId==null || merchnatEmailId==null) {
        	throw new MerchantLoginException("merchant not login");
		}
        List<Subscription> subscriptions = subscriptionService.findSubscriptions(merchantOktaId);
		return ResponseEntity.status(HttpStatus.OK).body(subscriptions);
	}
	
	@Operation(summary = "Get Subscription by ID", description = "Retrieve a specific subscription of the authenticated merchant by its ID.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "200", description = "Subscription retrieved successfully", content = @Content(mediaType = "application/json",  schema = @Schema(implementation = Subscription.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") )
	})
	@GetMapping("/getsubscription/{subscriptionId}")
	public ResponseEntity<Subscription> getSubscription(
			@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value="Authorization") String token,
			@PathVariable Long subscriptionId
			){
		
		String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String merchnatEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if(merchantOktaId==null || merchnatEmailId==null) {
        	throw new MerchantLoginException("merchant not login");
		}
        Subscription subscription = subscriptionService.findBySubscriptionId(merchantOktaId,subscriptionId);
		return ResponseEntity.status(HttpStatus.OK).body(subscription);
	}
	
	@Operation(summary = "Process UPI Payment for Subscription", description = "Process UPI payment for a specific subscription of the authenticated merchant.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "202", description = "Payment accepted", content = @Content(mediaType = "application/json",schema = @Schema(implementation = Subscription.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") )
	})
	@PostMapping("/getsubscriptionupipayment/{subscriptionId}")
	public ResponseEntity<Subscription> getSubscriptionUpiPayment(
			@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value="Authorization") String token,
			@RequestBody UpiPaymentRequestDto upiPaymentRequestDto,
			@PathVariable Long subscriptionId
			){
		
		String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String merchnatEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if(merchantOktaId==null || merchnatEmailId==null) {
        	throw new MerchantLoginException("merchant not login");
		}
        //match if user have the subscription
        Subscription subscription = subscriptionService.getSubscriptionUpiPayment(token,subscriptionId,upiPaymentRequestDto );
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(subscription);
	}
	
	@Operation(summary = "Get Subscription Payment Details", description = "Retrieve payment details for a specific subscription of the authenticated merchant.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "202", description = "Payment details retrieved", content = @Content( mediaType = "application/json", schema = @Schema(implementation = Subscription.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "404", description = "Subscription not found", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") )
	})
	@PostMapping("/getsubscriptionpayment/{subscriptionId}")
	public ResponseEntity<Subscription> getSubscriptionPayment(
			@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value="Authorization") String token,
			@RequestBody PaymentRequestDto PaymentRequestDto,
			@PathVariable Long subscriptionId
			){
		
		String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String merchnatEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if(merchantOktaId==null || merchnatEmailId==null) {
        	throw new MerchantLoginException("merchant not login");
		}
        //match if user have the subscription
        Subscription subscription = subscriptionService.getSubscriptionPayment(token,subscriptionId,PaymentRequestDto );
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(subscription);
	}
	
	@Operation(summary = "Delete Subscription", description = "Delete a specific subscription of the authenticated merchant.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "200", description = "Subscription deleted", content = @Content(mediaType = "application/json",schema = @Schema(implementation = String.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "404", description = "Subscription not found", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") )
	})
	@DeleteMapping("/deletesubscription/{subscriptionId}")
	public ResponseEntity<String> deleteSubscription(
			@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value="Authorization") String token,
			@PathVariable Long subscriptionId
			){
		String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String merchnatEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if(merchantOktaId==null || merchnatEmailId==null) {
        	throw new MerchantLoginException("merchant not login");
		}
        
        String message = subscriptionService.deleteSubscription(merchantOktaId,subscriptionId);
        
		return ResponseEntity.ok().body(message);
	}
	
}
