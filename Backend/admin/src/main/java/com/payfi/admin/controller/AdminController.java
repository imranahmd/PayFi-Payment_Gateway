package com.payfi.admin.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import org.springframework.web.bind.annotation.RestController;

import com.payfi.admin.service.AdminService;
import com.payfi.admin.service.AdminServiceImpl;
import com.payfi.admin.util.ExtractJWT;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import com.payfi.admin.dto.MerchantBasicDetails;
import com.payfi.admin.dto.MerchantDocumentDetails;
import com.payfi.admin.dto.RequestWithOneParam;
import com.payfi.admin.dto.UpdateDocumentStatusRequest;
import com.payfi.admin.dto.UpdateProfileStatusRequest;
import com.payfi.admin.entity.Admin;
import com.payfi.admin.exception.AdminLoginException;
import com.payfi.admin.responsedto.PartnerAdditionResponseDto;

@RestController
@RequestMapping()
@Validated
public class AdminController {

	@Autowired
	private AdminService adminService;

	private Logger logger = LoggerFactory.getLogger(AdminServiceImpl.class);

	@PostConstruct
	public void populateTestAdmin() {
		Admin admin = new Admin(1L, "Payfi", "payfiadmin@payfi.co.in", "78945612456", "noida", LocalDateTime.now(),
				"verified");
		adminService.saveAdmin(admin);
	}

	@Operation(summary = "Get All Details of Admin", description = "Retrieve details of the authenticated admin.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Details of admin retrieved successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = Admin.class))),
			@ApiResponse(responseCode = "400", description = "Bad Request",content = @Content(mediaType = "application/json")),
			@ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "404", description = "Admin not found", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") )  })
	@GetMapping("/getalldetailsofadmin")
	public ResponseEntity<Admin> getAllDetailsOfAdmin(
			@Parameter(description = "Admin Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
			@RequestBody @Valid RequestWithOneParam email) throws AdminLoginException {

		String adminOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

		if (!adminOktaId.equals("00udz7kbuwFVIjyQU5d7") || !adminEmailId.equals("payfiadmin@payfi.co.in")) {
			throw new AdminLoginException("admin not login");
		}

		Admin admin = adminService.findByEmail(email.getParam());

		return ResponseEntity.status(HttpStatus.OK).body(admin);
	}

	// to update profile status of merchant by admin
	@Operation(summary = "Update Merchant Profile Status", description = "Update the profile status of the authenticated merchant.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Merchant profile status updated successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = MerchantBasicDetails.class))),
			@ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") ) })
	@PutMapping("/merchant/updatemerchantprofilestatus")
	public ResponseEntity<MerchantBasicDetails> updateMerchantProfileStatus(
			@Parameter(description = "Admin Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
			@RequestBody UpdateProfileStatusRequest updateProfileStatusRequest) throws AdminLoginException {
		String adminOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

		if (!adminOktaId.equals("00udz7kbuwFVIjyQU5d7") || !adminEmailId.equals("payfiadmin@payfi.co.in")) {
			throw new AdminLoginException("admin not login");
		}
		return adminService.updateMerchantProfileStatus(token, updateProfileStatusRequest);
	}

	@Operation(summary = "Update Merchant Document Status", description = "Update the document status of the authenticated merchant.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Merchant document status updated successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = MerchantDocumentDetails.class))),
			@ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") ) })
	@PutMapping("/merchant/updatemerchantdocumentstatus")
	public ResponseEntity<MerchantDocumentDetails> updateMerchantDocumentStatus(
			@Parameter(description = "Admin Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
			@RequestBody UpdateDocumentStatusRequest updateDocumentStatusRequest) throws AdminLoginException {
		String adminOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
		if (!adminOktaId.equals("00udz7kbuwFVIjyQU5d7") || !adminEmailId.equals("payfiadmin@payfi.co.in")) {
			throw new AdminLoginException("admin not login");
		}
		return adminService.updateMerchantDocumentStatus(token, updateDocumentStatusRequest);
	}

	@Operation(summary = "Get All Details of Merchant", description = "Retrieve all details of the specified merchant for an authorized admin.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Details of merchant retrieved successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = Map.class))),
			@ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") ) })
	@GetMapping("/merchant/getalldetailsofmerchant/{merchantOktaId}")
	public ResponseEntity<Map<String, Object>> getAllDetailsOfMerchantForAdmin(
			@Parameter(description = "Admin Authorization token", required = true) @RequestHeader(value = "Authorization") String token, 
			@PathVariable String merchantOktaId) {
		String adminOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

		if (!adminOktaId.equals("00udz7kbuwFVIjyQU5d7") || !adminEmailId.equals("payfiadmin@payfi.co.in")) {
			throw new AdminLoginException("admin not login");
		}
		return adminService.getAllDetailsOfMerchantForAdmin(token, merchantOktaId);
	}

	@Operation(summary = "Get All Merchants", description = "Retrieve details of all merchants for an authorized admin.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Merchants retrieved successfully", content = @Content(mediaType = "application/json",schema = @Schema(implementation = MerchantBasicDetails.class))),
			@ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json") ),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json") ) })
	@GetMapping("/merchant/getallmerchants")
	public ResponseEntity<List<MerchantBasicDetails>> getAllMerchantsForAdmin(
			@Parameter(description = "Admin Authorization token", required = true) @RequestHeader(value = "Authorization") String token) {
		String adminOktaId = ExtractJWT.payloadJWTExtraction(token, "\"uid\"");
		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

		if (!adminOktaId.equals("00udz7kbuwFVIjyQU5d7") || !adminEmailId.equals("payfiadmin@payfi.co.in")) {
			throw new AdminLoginException("admin not login");
		}
		return adminService.getAllMerchantsForAdmin(token);
	}

	/*
	 * 
	 * //create a Admin
	 * 
	 * @PostMapping("/create") public ResponseEntity<Admin> createAdmin(@RequestBody
	 * Admin admin) { admin.setStatus("pending");
	 * admin.setCreatedAt(LocalDateTime.now()); Admin createdAdmin =
	 * adminService.saveAdmin(admin); return
	 * ResponseEntity.status(HttpStatus.CREATED).body(createdAdmin); }
	 * 
	 * int retryCount = 1;
	 * 
	 * //get Admin with AID using merchantFeignClient
	 * 
	 * @GetMapping("/{aid}")
	 * //@CircuitBreaker(name="merchantTransactionBreaker",fallbackMethod=
	 * "merchantTransactionFallback") //@Retry(name="merchantTransactionRetry" ,
	 * fallbackMethod="merchantTransactionFallback")
	 * 
	 * @RateLimiter(name="merchantTransactionRateLimiter",
	 * fallbackMethod="merchantTransactionFallback") public ResponseEntity<Admin>
	 * getAdminByAID(@PathVariable Long aid) {
	 * logger.info("getAdminByAID method calling, which uses merchant feign client"
	 * ); logger.info("retry Count {}", retryCount++); Admin admin =
	 * adminService.getAdminByAID(aid); return ResponseEntity.ok(admin); }
	 * 
	 * //get all Admins
	 * 
	 * @GetMapping("/") public ResponseEntity<List<Admin>> getAllAdmin() {
	 * List<Admin> admins = adminService.getAllAdmin(); return
	 * ResponseEntity.ok(admins); }
	 * 
	 * public ResponseEntity<Admin> merchantTransactionFallback(Long aid, Exception
	 * ex) { logger.info("Fallback is executed because service is down",
	 * ex.getMessage());; Admin admin = Admin.builder() .email("dummy@gmail.com")
	 * .name("dummy")
	 * .address("This dummy admin is created because some service is down")
	 * .build(); return new ResponseEntity<>(admin,HttpStatus.OK); }
	 */

}