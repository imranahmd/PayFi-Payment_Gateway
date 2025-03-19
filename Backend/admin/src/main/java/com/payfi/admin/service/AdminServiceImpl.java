package com.payfi.admin.service;

import java.util.List;
import java.util.Map;
//import java.util.stream.Collectors;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.http.ResponseEntity;
//import org.springframework.core.ParameterizedTypeReference;
//import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;

import com.payfi.admin.dto.MerchantBasicDetails;
import com.payfi.admin.dto.MerchantDocumentDetails;
import com.payfi.admin.dto.RequestWithOneParam;
import com.payfi.admin.dto.UpdateDocumentStatusRequest;
import com.payfi.admin.dto.UpdateProfileStatusRequest;
import com.payfi.admin.entity.Admin;
//import com.payfi.admin.entity.Transaction;
import com.payfi.admin.repository.AdminRepository;

//import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

import com.payfi.admin.exception.ResourceNotFoundException;
import com.payfi.admin.externalservices.FeignMerchantService;
import com.payfi.admin.externalservices.FeignTransactionService;

@Service
public class AdminServiceImpl implements AdminService {

	
	@Autowired
	private AdminRepository adminRepository;

	//@Autowired
	//private RestTemplate restTemplate;

	@Autowired
	private FeignMerchantService feignMerchantService;
	
	@Autowired
	private FeignTransactionService feignTransactionService;

	private Logger logger = LoggerFactory.getLogger(AdminServiceImpl.class);

	@Override
	public Admin saveAdmin(Admin admin) {
		return adminRepository.save(admin);
	}

	@Override
	public List<Admin> getAllAdmin() {
		return adminRepository.findAll();
	}

	@Override
	public Admin getAdminByAID(Long aid) throws ResourceNotFoundException {
		Admin admin = adminRepository.findById(aid)
				.orElseThrow(() -> new ResourceNotFoundException("Admin id incorrect, please enter correct admin id "));
		/*
		 * //fetch merchants registered with particular admin id
		 * //http://localhost:8081/merchants/ List<Merchant> merchantList =
		 * restTemplate.exchange("http://MERCHANT/merchants/aid/" + aid, HttpMethod.GET,
		 * null, new ParameterizedTypeReference<List<Merchant>>() {}).getBody();
		 * 
		 * admin.setMerchants(merchantList);
		 * 
		 * logger.info("{}", merchantList);
		 */
	//	ResponseEntity<List<MerchantBasicDetails>> merchantList = feignMerchantService.getMerchnatByAID(aid);
		//admin.setMerchants(merchantList.getBody());
		//logger.info("{}", merchantList);

		return admin;
	}
	
	public Admin getAdminByAID(Long aid, Exception ex) {
		logger.info("Fallback is executed because service is down", ex.getMessage());
	    return new Admin();
	}

	@Override
	public Admin findByEmail(String email) throws ResourceNotFoundException {
		Optional<Admin> a = adminRepository.findByEmail(email);
        if(a.isEmpty()) {
    		throw new ResourceNotFoundException("admin does not exist with given email id");
        }
		return a.get();
	}

	@Override
	public ResponseEntity<MerchantBasicDetails> updateMerchantProfileStatus(String token,
			UpdateProfileStatusRequest updateProfileStatusRequest) {
		
		return feignMerchantService.updateMerchantProfileStatus(token, updateProfileStatusRequest);
	}

	@Override
	public ResponseEntity<MerchantDocumentDetails> updateMerchantDocumentStatus(String token,
			UpdateDocumentStatusRequest updateDocumentStatusRequest) {
		return feignMerchantService.updateMerchantDocumentStatus(token,updateDocumentStatusRequest);
	}

	@Override
	public ResponseEntity<Map<String, Object>> getAllDetailsOfMerchantForAdmin(String token,
			String merchantOktaId) {
		return feignMerchantService.getAllDetailsOfMerchantForAdmin(token, merchantOktaId);
	}

	@Override
	public ResponseEntity<List<MerchantBasicDetails>> getAllMerchantsForAdmin(String token) {
		return feignMerchantService.getAllMerchantsForAdmin(token);
	}
	
}
