package com.payfi.merchant.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.payfi.merchant.dto.UpdateDocumentStatusRequest;
import com.payfi.merchant.dto.UpdateProfileStatusRequest;
import com.payfi.merchant.entity.MerchantBankDetails;
import com.payfi.merchant.entity.MerchantBasicDetails;
import com.payfi.merchant.entity.MerchantBusinessDetails;
import com.payfi.merchant.entity.MerchantDocumentDetails;
import com.payfi.merchant.entity.TableUser;
import com.payfi.merchant.exception.AdminNotAuthorizedException;
import com.payfi.merchant.exception.MerchantLoginException;
import com.payfi.merchant.exception.MerchantRegisteredException;
import com.payfi.merchant.service.MerchantBankDetailsServiceImpl;
import com.payfi.merchant.service.MerchantBasicDetailsServiceImpl;
import com.payfi.merchant.service.MerchantBusinessDetailsServiceImpl;
import com.payfi.merchant.service.MerchantDocumentDetailsServiceImpl;
import com.payfi.merchant.service.TableUserServiceImpl;
import com.payfi.merchant.util.ExtractJWT;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping()
@Validated
public class MerchantController {

	@Autowired
	private TableUserServiceImpl tableUserService;

	@Autowired
	private MerchantBankDetailsServiceImpl merchantBankDetailsService;

	@Autowired
	private MerchantBusinessDetailsServiceImpl merchantBusinessDetailsService;

	@Autowired
	private MerchantBasicDetailsServiceImpl merchantBasicDetailsService;

	@Autowired
	private MerchantDocumentDetailsServiceImpl merchantDocumentsDetailsService;

	// @PostConstruct
	public void populateTestMerchant() {

		TableUser tableUser = new TableUser();
		MerchantBasicDetails merchantBasicDetails = new MerchantBasicDetails();
		MerchantBusinessDetails merchantBusinessDetails = new MerchantBusinessDetails();
		MerchantBankDetails merchantBankDetails = new MerchantBankDetails();
		MerchantDocumentDetails merchantDocumentDetails = new MerchantDocumentDetails();

		tableUserService.saveTableUser("", tableUser);
		merchantBasicDetailsService.saveMerchantBasicDetails("", merchantBasicDetails);
		merchantBusinessDetailsService.saveMerchantBusinessDetails("", merchantBusinessDetails);
		merchantBankDetailsService.saveMerchantBankDetails("", merchantBankDetails);
		merchantDocumentsDetailsService.saveMerchantDocumentDetails("", merchantDocumentDetails);
	}

	// sign up merchant
	@Operation(summary = "Sign Up Merchant", description = "Registers a new merchant with basic details.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "201", description = "Merchant registered successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = TableUser.class))),
			@ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") ) })
	@PostMapping("/signup")
	public ResponseEntity<TableUser> signupMerchant(@Valid @RequestBody TableUser tableUser) {
		tableUser.setCreatedAt(LocalDateTime.now());
		tableUser.setUsername(tableUser.getEmail());
		TableUser createdUser = tableUserService.saveTableUser(tableUser.getMerchantOktaId(), tableUser);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
	}

	// registration of merchant basic and business details
	@Operation(summary = "Register Merchant Details", description = "Registers basic and business details of a merchant.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Merchant details registered successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = Map.class))),
			@ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") ) })
	@PostMapping("/registermerchantdetails")
	public ResponseEntity<Map<String, Object>> registerMerchantDetails(
			@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value = "Authorization") String token, 
			@RequestBody Map<String, Object> payload)
			throws IOException, MerchantRegisteredException, MerchantLoginException {
		String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String merchnatEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

		Map<String, Object> res = new HashMap<String, Object>();
		if (merchantOktaId == null || merchnatEmailId == null) {
			throw new MerchantLoginException("merchant not login");
		}

		Map<String, Object> merchantBasicDetailsMap = (Map<String, Object>) payload.get("merchantBasicDetails");
		Map<String, Object> merchantBusinessDetailsMap = (Map<String, Object>) payload.get("merchantBusinessDetails");

		MerchantBasicDetails merchantBasicDetails = mapToMerchantBasicDetails(merchantBasicDetailsMap);
		MerchantBusinessDetails merchantBusinessDetails = mapToMerchantBusinessDetails(merchantBusinessDetailsMap);

		// setting creation time
		LocalDateTime localDateTime = LocalDateTime.now();
		merchantBasicDetails.setCreatedAt(localDateTime);
		merchantBasicDetails.setEmailId(merchnatEmailId);
		merchantBasicDetails.setMerchantOktaId(merchantOktaId);
		merchantBasicDetails.setProfileStatus("Not verified");

		merchantBusinessDetails.setCreatedAt(localDateTime);
		merchantBusinessDetails.setEmailId(merchnatEmailId);
		merchantBusinessDetails.setMerchantOktaId(merchantOktaId);

		MerchantBasicDetails savedMerchantBasicDetails = merchantBasicDetailsService
				.saveMerchantBasicDetails(merchantOktaId, merchantBasicDetails);
		MerchantBusinessDetails savedMerchantBusinessDetails = merchantBusinessDetailsService
				.saveMerchantBusinessDetails(merchantOktaId, merchantBusinessDetails);

		res.put("merchantBasicDetails", savedMerchantBasicDetails);
		res.put("merchantBusinessDetails", savedMerchantBusinessDetails);

		return ResponseEntity.status(HttpStatus.OK).body(res);

	}

	private MerchantBasicDetails mapToMerchantBasicDetails(Map<String, Object> map) {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.convertValue(map, MerchantBasicDetails.class);
	}

	private MerchantBusinessDetails mapToMerchantBusinessDetails(Map<String, Object> map) {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.convertValue(map, MerchantBusinessDetails.class);
	}

	// registration of merchant documents
	@Operation(summary = "Register Merchant Document Details", description = "Registers various documents for a merchant.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Merchant document details registered successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = MerchantDocumentDetails.class))),
			@ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") ) })
	@PostMapping("/registermerchantdetailsdocs")
	public ResponseEntity<MerchantDocumentDetails> registerMerchantDetailsDocs(
			@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
			@RequestParam("partnerShipDeed") MultipartFile partnerShipDeed,
			@RequestParam("pancardDoc") MultipartFile pancardDoc, @RequestParam("moaDoc") MultipartFile moaDoc,
			@RequestParam("aoaDoc") MultipartFile aoaDoc,
			@RequestParam("bankCredentialsCheque") MultipartFile bankCredentialsCheque)
			throws IOException, MerchantRegisteredException, MerchantLoginException {
		String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String merchnatEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		if (merchantOktaId == null || merchnatEmailId == null) {
			throw new MerchantLoginException("merchant not login");
		}
		// Check if any of the byte arrays is empty
		if (partnerShipDeed.isEmpty() || pancardDoc.isEmpty() || moaDoc.isEmpty() || aoaDoc.isEmpty()
				|| bankCredentialsCheque.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MerchantDocumentDetails());
		}
		MerchantDocumentDetails merchantDocumentDetails = new MerchantDocumentDetails(merchantOktaId, merchnatEmailId,
				partnerShipDeed.getBytes(), pancardDoc.getBytes(), moaDoc.getBytes(), aoaDoc.getBytes(),
				bankCredentialsCheque.getBytes());
		// setting creation time
		LocalDateTime localDateTime = LocalDateTime.now();
		merchantDocumentDetails.setCreatedAt(localDateTime);
		MerchantDocumentDetails savedMerchantDocumentDetails = merchantDocumentsDetailsService
				.saveMerchantDocumentDetails(merchantOktaId, merchantDocumentDetails);
		return ResponseEntity.status(HttpStatus.OK).body(savedMerchantDocumentDetails);
	}

	// to update profile status by admin
	@Operation(summary = "Update Merchant Profile Status", description = "Updates the profile status of a merchant by an authorized admin.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Merchant profile status updated successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = MerchantBasicDetails.class))),
			@ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") ) })
	@PutMapping("/admin/updatemerchantprofilestatus")
	public ResponseEntity<MerchantBasicDetails> updateMerchantProfileStatus(
			@Parameter(description = "Admin Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
			@RequestBody UpdateProfileStatusRequest updateProfileStatusRequest) throws AdminNotAuthorizedException {
		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

		if (adminEmailId == null || !adminEmailId.equals("payfiadmin@payfi.co.in")) {
			throw new AdminNotAuthorizedException("admin not authorized for this request");
		}

		MerchantBasicDetails updatedMerchant = merchantBasicDetailsService
				.updateMerchantProfileStatus(updateProfileStatusRequest);

		return ResponseEntity.status(HttpStatus.OK).body(updatedMerchant);
	}

	// to verify document status by admin
	@Operation(summary = "Update Merchant Document Status", description = "Updates the document status of a merchant by an authorized admin.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Merchant document status updated successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = MerchantDocumentDetails.class))),
			@ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(mediaType = "application/json")  ),
			@ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") ) })
	@PutMapping("/admin/updatemerchantdocumentstatus")
	public ResponseEntity<MerchantDocumentDetails> updateMerchantDocumentStatus(
			@Parameter(description = "Admin Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
			@RequestBody UpdateDocumentStatusRequest updateDocumentStatusRequest) {
		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

		if (adminEmailId == null || !adminEmailId.equals("payfiadmin@payfi.co.in")) {
			throw new AdminNotAuthorizedException("admin not authorized for this request");
		}

		MerchantDocumentDetails updatedMerchantDocumentDetails = merchantDocumentsDetailsService
				.updateMerchantDocumentStatus(updateDocumentStatusRequest);

		return ResponseEntity.status(HttpStatus.OK).body(updatedMerchantDocumentDetails);
	}

	// reading every details of a merchant to view on frontend for verification
	// Used by admin
	@Operation(summary = "Get All Details of Merchant", description = "Retrieve all details of a merchant for an authorized admin.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Details of merchant retrieved successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = Map.class))),
			@ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "404", description = "Merchant not found", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") ) })
	@GetMapping("/admin/getalldetailsofmerchant/{merchantOktaId}")
	public ResponseEntity<Map<String, Object>> getAllDetailsOfMerchantForAdmin(
			@Parameter(description = "Admin Authorization token", required = true) @RequestHeader(value = "Authorization") String token, 
			@PathVariable String merchantOktaId) {

		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

		if (adminEmailId == null || !adminEmailId.equals("payfiadmin@payfi.co.in")) {
			throw new AdminNotAuthorizedException("admin not authorized for this request");
		}

		TableUser tableUser = tableUserService.findByMerchantOktaId(merchantOktaId);
		MerchantBasicDetails merchantBasicDetails = merchantBasicDetailsService.findByMerchantOktaId(merchantOktaId);
		MerchantBusinessDetails merchantBusinessDetails = merchantBusinessDetailsService
				.findByMerchantOktaId(merchantOktaId);
		MerchantDocumentDetails merchantDocumentDetails = merchantDocumentsDetailsService
				.findByMerchantOktaId(merchantOktaId);
		// MerchantBankDetails merchantBankDetails =
		// merchantBankDetailsService.findByMerchantOktaId(merchantOktaId.getParam());

		Map<String, Object> response = new HashMap<String, Object>();
		response.put("tableUser", tableUser);
		response.put("merchantBasicDetails", merchantBasicDetails);
		response.put("merchantBusinessDetails", merchantBusinessDetails);
		response.put("merchantDocumentDetails", merchantDocumentDetails);
		// response.put("merchantBankDetails",merchantBankDetails);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	// get all merchants for admin
	// for admin use
	@Operation(summary = "Get All Merchants", description = "Retrieve details of all merchants for an authorized admin.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Merchants retrieved successfully", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = MerchantBasicDetails.class)))),
			@ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") ) })
	@GetMapping("/admin/getallmerchants")
	public ResponseEntity<List<MerchantBasicDetails>> getAllMerchantsForAdmin(
			@Parameter(description = "Admin Authorization token", required = true) @RequestHeader(value = "Authorization") String token) {
		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		if (adminEmailId == null || !adminEmailId.equals("payfiadmin@payfi.co.in")) {
			throw new AdminNotAuthorizedException("admin not authorized for this request");
		}
		List<MerchantBasicDetails> merchantBasicDetailsList = merchantBasicDetailsService.getAllMerchantForAdmin();
		return ResponseEntity.status(HttpStatus.OK).body(merchantBasicDetailsList);
	}

	// Used by merchant
	@Operation(summary = "Get All Details of Merchant", description = "Retrieve all details of the authenticated merchant.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Details of merchant retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class))),
			@ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") ) })
	@GetMapping("/getalldetailsofmerchant")
	public ResponseEntity<Map<String, Object>> getAllDetailsOfMerchantForMerchant(
			@Parameter(description = "Merchant Authorization token", required = true) @RequestHeader(value = "Authorization") String token) {

		String merchantOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String merchnatEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

		if (merchantOktaId == null || merchnatEmailId == null) {
			throw new MerchantLoginException("merchant not login");
		}

		TableUser tableUser = tableUserService.findByMerchantOktaId(merchantOktaId);
		MerchantBasicDetails merchantBasicDetails = merchantBasicDetailsService.findByMerchantOktaId(merchantOktaId);
		MerchantBusinessDetails merchantBusinessDetails = merchantBusinessDetailsService
				.findByMerchantOktaId(merchantOktaId);
		MerchantDocumentDetails merchantDocumentDetails = merchantDocumentsDetailsService
				.findByMerchantOktaId(merchantOktaId);
		// MerchantBankDetails merchantBankDetails =
		// merchantBankDetailsService.findByMerchantOktaId(merchantOktaId);

		Map<String, Object> response = new HashMap<String, Object>();
		response.put("tableUser", tableUser);
		response.put("merchantBasicDetails", merchantBasicDetails);
		response.put("merchantBusinessDetails", merchantBusinessDetails);
		response.put("merchantDocumentDetails", merchantDocumentDetails);
		// response.put("merchantBankDetails",merchantBankDetails);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	/*
	 * //create a Merchant
	 * 
	 * @PostMapping("/create/mid/{mid}") public ResponseEntity<Merchant>
	 * createMerchant(@PathVariable Long mid, @RequestBody Merchant merchant){
	 * //merchant.setStatus("pending");
	 * //merchant.setCreatedAt(LocalDateTime.now()); Merchant createdMerchant =
	 * merchantService.saveMerchant(merchant); return
	 * ResponseEntity.status(HttpStatus.CREATED).body(createdMerchant); }
	 * 
	 * //get Merchant with MID
	 * 
	 * @GetMapping("/mid/{mid}") public ResponseEntity<Merchant>
	 * getMerchantByMID(@PathVariable Long mid){ Merchant merchant =
	 * merchantService.getMerchantByMID(mid); return ResponseEntity.ok(merchant); }
	 * 
	 * //get all Merchants
	 * 
	 * @GetMapping("/") public ResponseEntity<List<Merchant>> getAllMerchant(){
	 * List<Merchant> merchants = merchantService.getAllMerchant(); return
	 * ResponseEntity.ok(merchants); }
	 * 
	 * //Update Merchant with Mid
	 * 
	 * @PutMapping("/update/{mid}") public ResponseEntity<Merchant>
	 * updateMerchantByMID(@PathVariable Long mid,@Valid @RequestBody Merchant
	 * updatedMerchant){ Merchant merchant =
	 * merchantService.updateMerchant(mid,updatedMerchant); return
	 * ResponseEntity.ok(merchant); }
	 * 
	 * //delete Merchant with mid
	 * 
	 * @DeleteMapping("/delete/{mid}") public ResponseEntity<String>
	 * deleteMerchant(@PathVariable Long mid){ Merchant merchant = (Merchant)
	 * merchantService.getMerchantByMID(mid);
	 * merchantService.deleteMerchant(merchant); return
	 * ResponseEntity.ok("Merchant with ID " + mid +
	 * " has been deleted successfully."); }
	 * 
	 * //get Merchant with AID
	 * 
	 * @GetMapping("/aid/{aid}") public ResponseEntity<List<Merchant>>
	 * getMerchantByAID(@PathVariable Long aid){ List<Merchant> merchantList =
	 * merchantService.getMerchantByAID(aid); return
	 * ResponseEntity.ok(merchantList); }
	 */

}
