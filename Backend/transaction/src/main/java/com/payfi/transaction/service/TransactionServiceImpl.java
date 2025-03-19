package com.payfi.transaction.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.mail.internet.MimeMessage;
import org.springframework.core.io.ByteArrayResource;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.payfi.transaction.entity.PartnerStatus;
import com.payfi.transaction.entity.PaymentLink;
import com.payfi.transaction.entity.SellerStatus;
import com.payfi.transaction.entity.Transaction;
import com.payfi.transaction.repository.PartnerStatusRepository;
import com.payfi.transaction.repository.PaymentLinkRepository;
import com.payfi.transaction.repository.SellerSettlementRepository;
import com.payfi.transaction.repository.SellerStatusRepository;
import com.payfi.transaction.repository.TransactionRepository;
import com.payfi.transaction.requestdto.MerchantInfoRequestDto;
import com.payfi.transaction.requestdto.PartnerAdditionRequestDto;
import com.payfi.transaction.requestdto.PaymentRequestDto;
import com.payfi.transaction.requestdto.SellerAdditionRequestDto;
import com.payfi.transaction.requestdto.SettlementRequestDto;
import com.payfi.transaction.requestdto.UpiPaymentRequestDto;
import com.payfi.transaction.responsedto.Account;
import com.payfi.transaction.responsedto.MessageResponseDto;
import com.payfi.transaction.responsedto.PartnerAdditionResponseDto;
import com.payfi.transaction.responsedto.PaymentResponseDto;
import com.payfi.transaction.responsedto.SellerAccount;
import com.payfi.transaction.responsedto.SellerAdditionResponseDto;
import com.payfi.transaction.responsedto.SettlementResponseDto;
import com.payfi.transaction.responsedto.UpiPaymentResponseDto;
import com.payfi.transaction.util.MessageSender;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class TransactionServiceImpl implements TransactionService {

	@Value("${online.bank.origin}")
	private String onlineBankOrigin;

	//@Value("${api.gateway.origin}")
	//private String apiGatewayOrigin;
	
	@Value("${client.origin.port}")
	private String clientOriginPort;
	
	

	@Value("${spring.mail.username}")
	private String fromEmail;

	@Autowired
	private JavaMailSender javaMailSender;

//	@Value("${twilio.account.sid}")
//	private String TWILIO_ACCOUNT_SID;
//
//	@Value("${twilio.auth.token}")
//	private String TWILIO_AUTH_TOKEN;

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private MessageSender messageSender;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private TransactionRepository transactionRepository;

	@Autowired
	private PartnerStatusRepository partnerStatusRepository;

	@Autowired
	private SellerStatusRepository sellerStatusRepository;

	//@Autowired
	//private SellerSettlementRepository sellerSettlementRepository;
	
	@Autowired
	private PaymentLinkRepository paymentLinkRepository;

	@Override
	public PartnerAdditionResponseDto partnerAddition(PartnerAdditionRequestDto partnerAdditionRequestDto)
			throws RestClientException {

		// encryption of data like header, requestbody etc

		String apiUrl = "http://" + onlineBankOrigin + "/bank/transaction/partneraddition";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		// headers.set("Authorization", "Bearer YOUR_JWT_TOKEN");

		// Set request body if needed
		// String requestBody = "{ \"key\": \"value\" }";
		HttpEntity<PartnerAdditionRequestDto> requestEntity = new HttpEntity<>(partnerAdditionRequestDto, headers);

		ResponseEntity<PartnerAdditionResponseDto> partnerAdditionResponseDto = null;
		try {
			// Make GET request
			partnerAdditionResponseDto = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity,
					PartnerAdditionResponseDto.class);
		} catch (RestClientException ex) {
			// Handle RestClientException here
			System.err.println("Error in the REST client: " + ex.getMessage());
		}

		PartnerStatus partnerStatus = new PartnerStatus();
		modelMapper.map(partnerAdditionResponseDto.getBody(), partnerStatus);

		PartnerStatus partnerResponse = partnerStatusRepository.save(partnerStatus);

		System.out.println(partnerResponse);

		return partnerAdditionResponseDto.getBody();
	}

	@Override
	public SellerAdditionResponseDto sellerAddition(SellerAdditionRequestDto sellerAdditionRequestDto)
			throws RestClientException {
		// encryption of data like header, requestbody etc

		String apiUrl = "http://" + onlineBankOrigin + "/bank/transaction/selleraddition";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		// headers.set("Authorization", "Bearer YOUR_JWT_TOKEN");

		// Set request body if needed
		// String requestBody = "{ \"key\": \"value\" }";
		HttpEntity<SellerAdditionRequestDto> requestEntity = new HttpEntity<>(sellerAdditionRequestDto, headers);

		SellerAdditionResponseDto sellerAdditionResponseDto = new SellerAdditionResponseDto();
		try {
			// Make GET request
			sellerAdditionResponseDto = restTemplate
					.exchange(apiUrl, HttpMethod.POST, requestEntity, SellerAdditionResponseDto.class).getBody();
			System.out.println(sellerAdditionResponseDto);

		} catch (RestClientException ex) {
			// Handle RestClientException here
			System.err.println("Error in the REST client: " + ex.getMessage());
		}

		SellerStatus sellerStatus = new SellerStatus();
		if (sellerAdditionResponseDto != null) {
			modelMapper.map(sellerAdditionResponseDto, sellerStatus);
		}

		SellerStatus sellerResponse = sellerStatusRepository.save(sellerStatus);

		System.out.println(sellerResponse);

		return sellerAdditionResponseDto;

	}

	@Override
	public PaymentResponseDto getPayment(PaymentRequestDto paymentRequestDto) throws RestClientException {

		SellerStatus sellerStatus = sellerStatusRepository.findByMerchantOktaId(paymentRequestDto.getMerchantOktaId());
		
		System.out.println(sellerStatus);

		/*
		 * // create transaction object Transaction transactionInitiated = new
		 * Transaction(paymentRequestDto.getMerchantOktaId(),
		 * sellerStatus.getMerchantId(), "payfiadmin@payfi.co.in",
		 * paymentRequestDto.getTargetAccountId(), "Payfi",
		 * paymentRequestDto.getAmount(), "INR", "Cutomer card payment",
		 * paymentRequestDto.getCardNumber(), paymentRequestDto.getCardHolderName(),
		 * LocalDateTime.now(), LocalDateTime.now(), "CREDIT", 45.54,
		 * 45.54,paymentRequestDto.getPartnerReferenceNumber(),
		 * "STATUS_TRANSACTION_INITIATED");
		 */
		Transaction transactionInitiated = new Transaction();
		modelMapper.map(paymentRequestDto, transactionInitiated);

		// save transaction object, and set transaction id to request dto
		Transaction t2 = transactionRepository.save(transactionInitiated);
		paymentRequestDto.setTransactionId(t2.getTransactionId());

		// encryption of data like header, requestbody etc

		String apiUrl = "http://" + onlineBankOrigin + "/bank/transaction/getpayment";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		// headers.set("Authorization", "Bearer YOUR_JWT_TOKEN");

		// Set request body if needed
		// String requestBody = "{ \"key\": \"value\" }";
		HttpEntity<PaymentRequestDto> requestEntity = new HttpEntity<>(paymentRequestDto, headers);

		ResponseEntity<PaymentResponseDto> paymentResponseDto = null;
		try {
			// Make GET request
			paymentResponseDto = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity,
					PaymentResponseDto.class);
		} catch (RestClientException ex) {
			// Handle RestClientException here
			System.err.println("Error in the REST client: " + ex.getMessage());
		}
		Transaction t3 = transactionRepository.findByTransactionId(t2.getTransactionId());
		t3.setStatus(paymentResponseDto.getBody().getStatus());
		Transaction transactionCompleted = transactionRepository.save(t3);

		System.out.println(transactionCompleted);

		return paymentResponseDto.getBody();

	}

	@Override
	public SettlementResponseDto settlementRequest(SettlementRequestDto settlementRequestDto)
			throws RestClientException {

		// SellerStatus sellerStatus =
		// sellerStatusRepository.findByMerchantOktaId(settlementRequestDto.getMerchantOktaId());

		// create transaction object
		Transaction transactionInitiated = new Transaction();
		modelMapper.map(settlementRequestDto, transactionInitiated);

		// save transaction object, and set transaction id to request dto
		Transaction t2 = transactionRepository.save(transactionInitiated);
		settlementRequestDto.setTransactionId(t2.getTransactionId());

		// encryption of header, body etc

		// request to bank on certain api
		// encryption of data like header, requestbody etc

		String apiUrl = "http://" + onlineBankOrigin + "/bank/transaction/settlemerchant";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		// headers.set("Authorization", "Bearer YOUR_JWT_TOKEN");

		// Set request body if needed
		// String requestBody = "{ \"key\": \"value\" }";
		HttpEntity<SettlementRequestDto> requestEntity = new HttpEntity<>(settlementRequestDto, headers);

		ResponseEntity<SettlementResponseDto> settlementResponseDto = null;
		try {
			// Make GET request
			settlementResponseDto = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity,
					SettlementResponseDto.class);
		} catch (RestClientException ex) {
			// Handle RestClientException here
			System.err.println("Error in the REST client: " + ex.getMessage());
		}

		Transaction t3 = transactionRepository.findByTransactionId(t2.getTransactionId());
		t3.setStatus(settlementResponseDto.getBody().getStatus());
		Transaction transactionCompleted = transactionRepository.save(t3);

		System.out.println(transactionCompleted);

		return settlementResponseDto.getBody();

	}

	@Override
	public Account getPartnerInfo(Long partnerReferenceNumber) {
		// encryption of header, body etc

		// request to bank on certain api
		// encryption of data like header, requestbody etc
		String apiUrl = UriComponentsBuilder
				.fromUriString("http://" + onlineBankOrigin + "/bank/transaction/partnerinfo/{partnerReferenceNumber}")
				.buildAndExpand(partnerReferenceNumber).toUriString();

		// HttpHeaders headers = new HttpHeaders();
		// headers.setContentType(MediaType.APPLICATION_JSON);
		// headers.set("Authorization", "Bearer YOUR_JWT_TOKEN");

		// Set request body if needed
		// String requestBody = "{ \"key\": \"value\" }";
		// HttpEntity<SettlementRequestDto> requestEntity = new HttpEntity<>(headers);

		ResponseEntity<Account> partnerInfoResponseDto = null;
		try {
			// Make GET request
			partnerInfoResponseDto = restTemplate.exchange(apiUrl, HttpMethod.GET, null, Account.class);
		} catch (RestClientException ex) {
			// Handle RestClientException here
			System.err.println("Error in the REST client: " + ex.getMessage());
		}

		return partnerInfoResponseDto.getBody();

	}

	@Override
	public SellerAccount getMerchantInfo(MerchantInfoRequestDto merchantInfoRequestDto) {

		// encryption of header, body etc

		// request to bank on certain api
		// encryption of data like header, requestbody etc

		String apiUrl = "http://" + onlineBankOrigin + "/bank/transaction/merchantinfo";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		// headers.set("Authorization", "Bearer YOUR_JWT_TOKEN");

		// Set request body if needed
		// String requestBody = "{ \"key\": \"value\" }";
		HttpEntity<MerchantInfoRequestDto> requestEntity = new HttpEntity<>(merchantInfoRequestDto, headers);

		ResponseEntity<SellerAccount> merchantInfoResponseDto = null;
		try {
			// Make GET request
			merchantInfoResponseDto = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity,
					SellerAccount.class);

		} catch (RestClientException ex) {
			// Handle RestClientException here
			System.err.println("Error in the REST client: " + ex.getMessage());
		}

		System.out.println(merchantInfoResponseDto);

		return merchantInfoResponseDto.getBody();

	}

	@Override
	public List<com.payfi.transaction.responsedto.TransactionResponse> getTransactionOfPartner(
			Long partnerReferenceNumber) {

		// encryption of header, body etc

		// request to bank on certain api
		// encryption of data like header, requestbody etc
		String apiUrl = UriComponentsBuilder
				.fromUriString("http://" + onlineBankOrigin
						+ "/bank/transaction/gettransactionofpartner/{partnerReferenceNumber}")
				.buildAndExpand(partnerReferenceNumber).toUriString();

		// HttpHeaders headers = new HttpHeaders();
		// headers.setContentType(MediaType.APPLICATION_JSON);
		// headers.set("Authorization", "Bearer YOUR_JWT_TOKEN");

		// Set request body if needed
		// String requestBody = "{ \"key\": \"value\" }";
		// HttpEntity<SettlementRequestDto> requestEntity = new HttpEntity<>(headers);

		ResponseEntity<List<com.payfi.transaction.responsedto.TransactionResponse>> partnerInfoResponseDto = null;
		try {
			// Make GET request
			partnerInfoResponseDto = restTemplate.exchange(apiUrl, HttpMethod.GET, null,
					new ParameterizedTypeReference<List<com.payfi.transaction.responsedto.TransactionResponse>>() {
					});
		} catch (RestClientException ex) {
			// Handle RestClientException here
			System.err.println("Error in the REST client: " + ex.getMessage());
		}

		return partnerInfoResponseDto.getBody();

	}

	@Override
	public List<com.payfi.transaction.responsedto.TransactionResponse> getTransactionOfMerchant(String merchantOktaId) {
		// encryption of header, body etc

		// request to bank on certain api
		// encryption of data like header, requestbody etc
		String apiUrl = UriComponentsBuilder
				.fromUriString(
						"http://" + onlineBankOrigin + "/bank/transaction/gettransactionofmerchant/{merchantOktaId}")
				.buildAndExpand(merchantOktaId).toUriString();

		// HttpHeaders headers = new HttpHeaders();
		// headers.setContentType(MediaType.APPLICATION_JSON);
		// headers.set("Authorization", "Bearer YOUR_JWT_TOKEN");

		// Set request body if needed
		// String requestBody = "{ \"key\": \"value\" }";
		// HttpEntity<SettlementRequestDto> requestEntity = new HttpEntity<>(headers);

		ResponseEntity<List<com.payfi.transaction.responsedto.TransactionResponse>> partnerInfoResponseDto = null;
		try {
			// Make GET request
			partnerInfoResponseDto = restTemplate.exchange(apiUrl, HttpMethod.GET, null,
					new ParameterizedTypeReference<List<com.payfi.transaction.responsedto.TransactionResponse>>() {
					});
		} catch (RestClientException ex) {
			// Handle RestClientException here
			System.err.println("Error in the REST client: " + ex.getMessage());
		}

		return partnerInfoResponseDto.getBody();

	}

	@Override
	public UpiPaymentResponseDto getUpiPayment(UpiPaymentRequestDto upiPaymentRequestDto) {

		SellerStatus sellerStatus = sellerStatusRepository
				.findByMerchantOktaId(upiPaymentRequestDto.getMerchantOktaId());
		
		System.out.println(sellerStatus);

		// create transaction object
		Transaction transactionInitiated = new Transaction();

		modelMapper.map(upiPaymentRequestDto, transactionInitiated);

		// save transaction object, and set transaction id to request dto
		Transaction t2 = transactionRepository.save(transactionInitiated);
		upiPaymentRequestDto.setTransactionId(t2.getTransactionId());

		// encryption of data like header, requestbody etc

		String apiUrl = "http://" + onlineBankOrigin + "/bank/transaction/getupipayment";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		// headers.set("Authorization", "Bearer YOUR_JWT_TOKEN");

		// Set request body if needed
		// String requestBody = "{ \"key\": \"value\" }";
		HttpEntity<UpiPaymentRequestDto> requestEntity = new HttpEntity<>(upiPaymentRequestDto, headers);

		ResponseEntity<UpiPaymentResponseDto> upiPaymentResponseDto = null;
		try {
			// Make GET request
			upiPaymentResponseDto = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity,
					UpiPaymentResponseDto.class);
		} catch (RestClientException ex) {
			// Handle RestClientException here
			System.err.println("Error in the REST client: " + ex.getMessage());
		}

		System.out.println(upiPaymentResponseDto);

		Transaction t3 = transactionRepository.findByTransactionId(t2.getTransactionId());
		t3.setStatus(upiPaymentResponseDto.getBody().getStatus());
		Transaction transactionCompleted = transactionRepository.save(t3);

		System.out.println(transactionCompleted);

		return upiPaymentResponseDto.getBody();

	}

	//Generating a payment link
	@Override
	public String upiPaymentLinkGeneration(String token, UpiPaymentRequestDto upiPaymentRequestDto) {


		
		String uniqueKey = UUID.randomUUID().toString();
		
		// Generating a payment link
		String encodedUpiPaymentLink = encodePayloadAndJwt(token, upiPaymentRequestDto,uniqueKey);
		
		PaymentLink paymentLink = new PaymentLink();
		paymentLink.setAmount(upiPaymentRequestDto.getAmount());
		paymentLink.setCreatedAt(upiPaymentRequestDto.getInitiationDate());
		paymentLink.setReceiptNumber(null);
		paymentLink.setUniqueKey(uniqueKey);
		paymentLink.setOriginalLink(encodedUpiPaymentLink);
		paymentLink.setStatus("Issued");
	
		paymentLinkRepository.save(paymentLink);
		
		return clientOriginPort + "transactions/shorturl?uniqueKey=" + uniqueKey;
	}

	public String encodePayloadAndJwt(String token, UpiPaymentRequestDto upiPaymentRequestDto, String uniqueKey) {

		try {
			String payloadJsonString = objectMapper.writeValueAsString(upiPaymentRequestDto);

			String encodedPayload = Base64Utils.encodeToString(payloadJsonString.getBytes());
			return clientOriginPort + "transactions/paythroughlink?jwt=" + token.substring(7)
					+ "&encodedPayload=" + encodedPayload+"&uniqueKey="+uniqueKey;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
	}

	@Override
	public String upiPaymentLinkSendViaEmail(MultipartFile[] files, String toEmail, String[] cc, String subject,
			String body, String link) {

		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setFrom(fromEmail);
			mimeMessageHelper.setTo(toEmail);
			mimeMessageHelper.setCc(cc);
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setText(body + " " + link);
			for (MultipartFile file : files) {
				mimeMessageHelper.addAttachment(file.getOriginalFilename(), new ByteArrayResource(file.getBytes()));
			}

			javaMailSender.send(mimeMessage);

		} catch (Exception e) {
			throw new RuntimeException(e);
		}

		return "Payment Link on Email Send Successfully";
	}

	@Override
	public String upiPaymentLinkSendViaSMS(String dest, String body, String link) {
		// body of the message is becoming more lengthy, we should try to short the link
		MessageResponseDto messageResponse=messageSender.sendMessage(dest,body,link);
		return messageResponse.getDesc();
	}
	
	
	@Override
	public PaymentLink getOriginalUrlWithUniqueKey(String uniqueKey) throws Exception {
		Optional<PaymentLink> paymentLink = paymentLinkRepository.findByUniqueKey(uniqueKey);
		if(paymentLink.isEmpty()) {
			throw new Exception("payment Link does not exist");
		}else {
			return paymentLink.get();
		}
	}

	@Override
	public UpiPaymentResponseDto getUpiPaymentWithLink(String encodedPayload, String customerVpa,String uniqueKey) throws Exception {
		
		Optional<PaymentLink> paymentLink = paymentLinkRepository.findByUniqueKey(uniqueKey);
		if(!paymentLink.isPresent()) {
			throw new Exception("Payment Link not found");
		}
		
		//String originalLink = paymentLink.get().getOriginalLink();	
		
		UpiPaymentRequestDto upiPaymentRequestDto = decodePayload(encodedPayload);
		upiPaymentRequestDto.setCustomerVpa(customerVpa);
		
		UpiPaymentResponseDto upiPaymentResponseDto = getUpiPayment(upiPaymentRequestDto);
		paymentLink.get().setTransactionid(upiPaymentResponseDto.getTransactionId());
		paymentLink.get().setStatus(upiPaymentResponseDto.getStatus());
		PaymentLink updatedPaymentLink = paymentLinkRepository.save(paymentLink.get());
		
		System.out.println(updatedPaymentLink);

		return upiPaymentResponseDto;
	}

	public UpiPaymentRequestDto decodePayload(String encodedPayload) {

		try {

			byte[] decodedPayloadBytes = Base64Utils.decodeFromString(encodedPayload);
			String payloadJsonString = new String(decodedPayloadBytes);
			return objectMapper.readValue(payloadJsonString, UpiPaymentRequestDto.class);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

	@Override
	public PaymentLink saveEmailAndMobile(String uniqueKey, String toEmail, String mobile) throws Exception {
		Optional<PaymentLink> paymentLink = paymentLinkRepository.findByUniqueKey(uniqueKey);
		if(paymentLink.isEmpty()) {
			throw new Exception("payment Link does not exist");
		}else {
			paymentLink.get().setCustomerEmail(toEmail);
			paymentLink.get().setCustomerMobile(mobile);
			paymentLinkRepository.save(paymentLink.get());
		}
		
		return paymentLink.get();
	}

	

	// send payment link to customer

	// waiting for the response of payment

	// response

	/*
	 * 
	 * public void makeApiRequest() { // Set API URL String apiUrl =
	 * "https://api.example.com/data";
	 * 
	 * // Set headers HttpHeaders headers = new HttpHeaders();
	 * headers.setContentType(MediaType.APPLICATION_JSON);
	 * headers.set("Authorization", "Bearer YOUR_JWT_TOKEN");
	 * 
	 * // Set request body if needed String requestBody = "{ \"key\": \"value\" }";
	 * HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
	 * 
	 * // Make GET request ResponseEntity<String> response = restTemplate.exchange(
	 * apiUrl, HttpMethod.GET, requestEntity, String.class );
	 * 
	 * // Process the response if (response.getStatusCode().is2xxSuccessful()) {
	 * String responseBody = response.getBody(); System.out.println("API Response: "
	 * + responseBody); } else {
	 * System.err.println("API Request failed with status code: " +
	 * response.getStatusCodeValue()); } }
	 */

}
