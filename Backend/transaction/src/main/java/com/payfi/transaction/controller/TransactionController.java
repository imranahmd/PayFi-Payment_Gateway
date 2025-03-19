package com.payfi.transaction.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.payfi.transaction.entity.PaymentLink;
import com.payfi.transaction.exception.AdminLoginException;
import com.payfi.transaction.exception.ResourceNotFoundException;
import com.payfi.transaction.requestdto.MerchantInfoRequestDto;
import com.payfi.transaction.requestdto.PartnerAdditionRequestDto;
import com.payfi.transaction.requestdto.PaymentRequestDto;
import com.payfi.transaction.requestdto.SellerAdditionRequestDto;
import com.payfi.transaction.requestdto.SettlementRequestDto;
import com.payfi.transaction.requestdto.UpiPaymentRequestDto;
import com.payfi.transaction.responsedto.Account;
import com.payfi.transaction.responsedto.PartnerAdditionResponseDto;
import com.payfi.transaction.responsedto.PaymentResponseDto;
import com.payfi.transaction.responsedto.SellerAccount;
import com.payfi.transaction.responsedto.SellerAdditionResponseDto;
import com.payfi.transaction.responsedto.SettlementResponseDto;
import com.payfi.transaction.responsedto.TransactionResponse;
import com.payfi.transaction.responsedto.UpiPaymentResponseDto;
import com.payfi.transaction.service.TransactionService;
import com.payfi.transaction.util.ExtractJWT;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping()
@Validated
public class TransactionController {

	
	@Value("${my.partnerreferencenumber}")
	private Long partnerReferenceNumber;
	
	@Value("${my.escrowAccountNumber}")
	private Long escrowAccountNumber;
	
	@Value("${my.partnername}")
	private String partnerName;
	
	@Autowired
	private TransactionService transactionService;
	
	@GetMapping("/testwithouttoken")
	public ResponseEntity<String> testwithouttoken() {
		return ResponseEntity.status(HttpStatus.CREATED).body("test without token");
	}

	@PostConstruct
	public void escrowCreate() {
		PartnerAdditionRequestDto partnerAdditionRequestDto = new PartnerAdditionRequestDto(
				"Payfi",
				"Cash Friend Fintech",
				"9728429718",
				"payfiadmin@payfi.co.in",
				"Bhutani Aplphathum", 
				"Noida", 
				"Uttar Pradesh", 
				"201305", 
				"GST123456", 
				"PAYFI1234P");
		
		PartnerAdditionResponseDto response = transactionService.partnerAddition( partnerAdditionRequestDto );
		System.out.println(response);
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
	
	@Operation(summary = "Add Partner", description = "Add a new partner.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "200", description = "Partner added successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = PartnerAdditionResponseDto.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "404", description = "Resource not found", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") )
	})
	@PostMapping("/partneraddition")
	public ResponseEntity<PartnerAdditionResponseDto> partnerAddition(
			@Parameter(description = "Admin Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
			@RequestBody PartnerAdditionRequestDto partnerAdditionRequestDto) throws ResourceNotFoundException {
		
		String adminOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
			
		if(!adminOktaId.equals("00udz7kbuwFVIjyQU5d7") || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
			throw new AdminLoginException("admin not login");
		}
		
		PartnerAdditionResponseDto response = transactionService.partnerAddition( partnerAdditionRequestDto );
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	@Operation(summary = "Add Seller", description = "Add a new seller associated with a specific partner.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "200", description = "Seller added successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = SellerAdditionResponseDto.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "404", description = "Resource not found", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") )
	})
	@PostMapping("/selleraddition")
	public ResponseEntity<SellerAdditionResponseDto> sellerAddition(
			@Parameter(description = "Admin Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
			@RequestBody SellerAdditionRequestDto sellerAdditionRequestDto) throws ResourceNotFoundException {
		
		String adminOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
			
		if(!adminOktaId.equals("00udz7kbuwFVIjyQU5d7") || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
			throw new AdminLoginException("admin not login");
		}
		sellerAdditionRequestDto.setPartnerReferenceNumber(partnerReferenceNumber);
		sellerAdditionRequestDto.setPartnerName(partnerName);
		SellerAdditionResponseDto response = transactionService.sellerAddition( sellerAdditionRequestDto );
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	@Operation(summary = "Get Payment Details", description = "Retrieve payment details for a transaction.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "200", description = "Payment details retrieved successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = PaymentResponseDto.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "404", description = "Resource not found", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") )
	})
	@PostMapping("/getpayment")
	public ResponseEntity<PaymentResponseDto> getPayment(
			@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
			@RequestBody PaymentRequestDto paymentRequestDto) throws ResourceNotFoundException {
		String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		if (merchantEmail.isEmpty() ) {
			throw new ResourceNotFoundException("User empty exception");
		}
		paymentRequestDto.setMerchantOktaId(merchantOktaId);
		paymentRequestDto.setTargetAccountId(escrowAccountNumber);
		paymentRequestDto.setPartnerReferenceNumber(partnerReferenceNumber);
		
		PaymentResponseDto response = transactionService.getPayment(paymentRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	@Operation(summary = "Get UPI Payment Details", description = "Retrieve UPI payment details for a transaction.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "200", description = "UPI payment details retrieved successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = UpiPaymentResponseDto.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "404", description = "Resource not found", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") )
	})
	@PostMapping("/getupipayment")
	public ResponseEntity<UpiPaymentResponseDto> getUpiPayment(
			@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
			@RequestBody UpiPaymentRequestDto upiPaymentRequestDto) throws ResourceNotFoundException {
		String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		if (merchantEmail.isEmpty() ) {
			throw new ResourceNotFoundException("User empty exception");
		}
		upiPaymentRequestDto.setMerchantOktaId(merchantOktaId);
		upiPaymentRequestDto.setTargetAccountId(escrowAccountNumber);
		upiPaymentRequestDto.setPartnerReferenceNumber(partnerReferenceNumber);
		
		UpiPaymentResponseDto response = transactionService.getUpiPayment(upiPaymentRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	@Operation(summary = "Initiate Merchant Settlement", description = "Initiate a settlement request for a merchant.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "200", description = "Settlement request initiated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = SettlementResponseDto.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "404", description = "Resource not found", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") )
	})
	@PostMapping("/settlemerchant")
	public ResponseEntity<SettlementResponseDto> settlementRequest(
			@Parameter(description = "Admin Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
			@RequestBody SettlementRequestDto settlementRequestDto ) throws ResourceNotFoundException {
		String adminOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
			
		if(!adminOktaId.equals("00udz7kbuwFVIjyQU5d7") || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
			throw new AdminLoginException("admin not login");
		}
		//settlementRequestDto.setMerchantOktaId(settlementRequestDto.getMerchantOktaId());
		settlementRequestDto.setPartnerReferenceNumber(partnerReferenceNumber);
		SettlementResponseDto response = transactionService.settlementRequest( settlementRequestDto );
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	@Operation(summary = "Get Partner Information", description = "Retrieve information about a partner.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "200", description = "Partner information retrieved successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = Account.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized",  content = @Content(mediaType = "application/json")),
	    @ApiResponse(responseCode = "404", description = "Resource not found", content = @Content(mediaType = "application/json") ),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json"))
	})
	@GetMapping("/partnerinfo")
	public ResponseEntity<Account> getPartnerInfo(
			@Parameter(description = "Admin Authorization token", required = true) @RequestHeader(value = "Authorization") String token
			) throws ResourceNotFoundException {
		
		String adminOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
			
		if(!adminOktaId.equals("00udz7kbuwFVIjyQU5d7") || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
			throw new AdminLoginException("admin not login");
		}
		
		Account response = transactionService.getPartnerInfo( partnerReferenceNumber );
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	@Operation(summary = "Get Merchant Information", description = "Retrieve information about a merchant.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "200", description = "Merchant information retrieved successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = SellerAccount.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized",  content = @Content(mediaType = "application/json")),
	    @ApiResponse(responseCode = "404", description = "Resource not found",  content = @Content(mediaType = "application/json")),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error",  content = @Content(mediaType = "application/json"))
	})
	@PostMapping("/merchantinfo")
	public ResponseEntity<SellerAccount> getMerchantInfo(
			@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
			@RequestBody MerchantInfoRequestDto merchantInfoRequestDto
			) throws ResourceNotFoundException {
		String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		
		if (merchantEmail.isEmpty() ) {
			throw new ResourceNotFoundException("User empty exception");
		}
		//merchantInfoRequestDto.setMerchantOktaId(merchantOktaId);
		//merchantInfoRequestDto.setPartnerReferenceNumber(partnerReferenceNumber);
		SellerAccount response = transactionService.getMerchantInfo( merchantInfoRequestDto );
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	
	@Operation(summary = "Get Transactions of Partner", description = "Retrieve transactions associated with a partner.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "200", description = "Transactions retrieved successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = List.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized",  content = @Content(mediaType = "application/json")),
	    @ApiResponse(responseCode = "404", description = "Resource not found",  content = @Content(mediaType = "application/json")),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error",  content = @Content(mediaType = "application/json"))
	})
	@GetMapping("/gettransactionofpartner/{partnerReferenceNumber}")
	public ResponseEntity<List<TransactionResponse>> getTransactionOfPartner(
			@Parameter(description = "Admin Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
			@PathVariable Long partnerReferenceNumber
			) throws ResourceNotFoundException {
		
		String adminOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
			
		if(!adminOktaId.equals("00udz7kbuwFVIjyQU5d7") || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
			throw new AdminLoginException("admin not login");
		}
		
		List<TransactionResponse> response = transactionService.getTransactionOfPartner( partnerReferenceNumber );
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	
	@Operation(summary = "Get Transactions of Merchant", description = "Retrieve transactions associated with a merchant.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "200", description = "Transactions retrieved successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = List.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized",  content = @Content(mediaType = "application/json")),
	    @ApiResponse(responseCode = "404", description = "Resource not found",  content = @Content(mediaType = "application/json")),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error",  content = @Content(mediaType = "application/json"))
	})
	@GetMapping("/gettransactionofmerchant/{merchantOktaId}")
	public ResponseEntity<List<TransactionResponse>> getTransactionOfMerchant(
			@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
			@PathVariable String merchantOktaId
			) throws ResourceNotFoundException {
		
		//String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		
		if (merchantEmail.isEmpty() ) {
			throw new ResourceNotFoundException("User empty exception");
		}
		
		List<TransactionResponse> response = transactionService.getTransactionOfMerchant( merchantOktaId );
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	@Operation(summary = "Get Merchant Information", description = "Retrieve information about a merchant.")
	@ApiResponses(value = {
	    @ApiResponse(responseCode = "200", description = "Merchant information retrieved successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = SellerAccount.class))),
	    @ApiResponse(responseCode = "401", description = "Unauthorized",  content = @Content(mediaType = "application/json")),
	    @ApiResponse(responseCode = "404", description = "Resource not found",  content = @Content(mediaType = "application/json")),
	    @ApiResponse(responseCode = "500", description = "Internal Server Error",  content = @Content(mediaType = "application/json"))
	})
	@PostMapping("/merchantinfobyadmin")
	public ResponseEntity<SellerAccount> getMerchantInfoByAdmin(
			@Parameter(description = "Admin Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
			@RequestBody MerchantInfoRequestDto merchantInfoRequestDto
			) throws ResourceNotFoundException {
		
		String adminOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
			
		if(!adminOktaId.equals("00udz7kbuwFVIjyQU5d7") || !adminEmailId.equals("payfiadmin@payfi.co.in") ) {
			throw new AdminLoginException("admin not login");
		}
		//merchantInfoRequestDto.setMerchantOktaId(merchantOktaId);
		merchantInfoRequestDto.setPartnerReferenceNumber(partnerReferenceNumber);
		SellerAccount response = transactionService.getMerchantInfo( merchantInfoRequestDto );
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	
	
	
	    @ApiResponses(value = {
		    @ApiResponse(responseCode = "200", description = "Transactions retrieved successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = List.class))),
		    @ApiResponse(responseCode = "401", description = "Unauthorized",  content = @Content(mediaType = "application/json")),
		    @ApiResponse(responseCode = "404", description = "Resource not found",  content = @Content(mediaType = "application/json")),
		    @ApiResponse(responseCode = "500", description = "Internal Server Error",  content = @Content(mediaType = "application/json"))
		})
		@PostMapping("/upilinkgeneration")
		public ResponseEntity<String> upiPaymentLinkGeneration(
				@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
				@RequestBody UpiPaymentRequestDto upiPaymentRequestDto
				) throws ResourceNotFoundException {
			
			String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
			String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
			
			if (merchantEmail.isEmpty() ) {
				throw new ResourceNotFoundException("User empty exception");
			}
			
			upiPaymentRequestDto.setMerchantOktaId(merchantOktaId);
			upiPaymentRequestDto.setTargetAccountId(escrowAccountNumber);
			upiPaymentRequestDto.setPartnerReferenceNumber(partnerReferenceNumber);
			
			String response = transactionService.upiPaymentLinkGeneration(token,upiPaymentRequestDto);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		
		
		@PostMapping("/sendupilink")
		public ResponseEntity<List<String>> upiPaymentLinkSend(
				@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
				@RequestParam(value="files", required=false) MultipartFile[] files,
				@RequestParam String toEmail,
				@RequestParam String[] cc,
				@RequestParam String subject,
				@RequestParam String body,
				@RequestParam String mobile,
				@RequestParam String link,
				@RequestParam String uniqueKey
				) throws ResourceNotFoundException {
			//String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
			String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
			
			if (merchantEmail.isEmpty() ) {
				throw new ResourceNotFoundException("User empty exception");
			}
			List<String> response = new ArrayList<String>();
			String emailResponse = transactionService.upiPaymentLinkSendViaEmail(files,toEmail,cc,subject,body,link);
			response.add(emailResponse);
			
			//body of the message is becoming more lengthy, we should try to short the link
			//we may use tinyUrl or bitly
			//to send sms, we have to buy twilio number, so it will be done later
			String mobileResponse = transactionService.upiPaymentLinkSendViaSMS(mobile,body,link);
			response.add(mobileResponse);
			
			try {
				PaymentLink paymentLink = transactionService.saveEmailAndMobile(uniqueKey,toEmail,mobile);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		
		
		//used by user in his browser
		@GetMapping("/shorturl")
		public ResponseEntity<PaymentLink> getOriginalUrlWithUniqueKey(
				@RequestParam String uniqueKey
				){
			PaymentLink paymentLink = null;
			try {
				paymentLink = transactionService.getOriginalUrlWithUniqueKey(uniqueKey);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return ResponseEntity.status(HttpStatus.OK).body(paymentLink);
		}
		
		@PostMapping("/paythroughlink")
		public ResponseEntity<UpiPaymentResponseDto> payThroughLink(
				@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
				@RequestParam String uniqueKey,
				@RequestParam String encodedPayload,
				@RequestParam String customerVpa
				){
			
			String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
			String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
			if (merchantEmail.isEmpty() ) {
				throw new ResourceNotFoundException("User empty exception");
			}
		
			UpiPaymentResponseDto response = null;
			try {
				response = transactionService.getUpiPaymentWithLink(encodedPayload,customerVpa,uniqueKey);
			} catch (Exception e) {
				e.printStackTrace();
			}
					
			return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		
		/*
		@PostMapping("/paythroughlink")
		public ResponseEntity<UpiPaymentResponseDto> payThroughLink(
				@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
				@RequestParam String encodedPayload,
				@RequestParam String customerVpa
				){
			
			String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
			String merchantEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
			if (merchantEmail.isEmpty() ) {
				throw new ResourceNotFoundException("User empty exception");
			}
			
			UpiPaymentResponseDto response = transactionService.getUpiPaymentWithLink(encodedPayload, customerVpa);
						
			return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		*/
		
		
}
