package com.payfi.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.payfi.admin.dto.MerchantBasicDetails;
import com.payfi.admin.dto.MerchantDocumentDetails;
import com.payfi.admin.dto.RequestWithOneParam;
import com.payfi.admin.dto.UpdateDocumentStatusRequest;
import com.payfi.admin.dto.UpdateProfileStatusRequest;
import com.payfi.admin.entity.Admin;
import com.payfi.admin.exception.ResourceNotFoundException;

public interface AdminService {
	
	
	
	public Admin findByEmail(String email) throws ResourceNotFoundException;
	
	//create
	public Admin saveAdmin(Admin admin);
	
	//getAll
	public List<Admin> getAllAdmin();
	
	//getAdminByAID
	public Admin getAdminByAID(Long aid) throws ResourceNotFoundException;
	
	
	public ResponseEntity<MerchantBasicDetails> updateMerchantProfileStatus(String token, UpdateProfileStatusRequest updateProfileStatusRequest);

	public ResponseEntity<MerchantDocumentDetails> updateMerchantDocumentStatus(String token,
			UpdateDocumentStatusRequest updateDocumentStatusRequest);

	public ResponseEntity<Map<String, Object>> getAllDetailsOfMerchantForAdmin(String token,
			String merchantOktaId);

	public ResponseEntity<List<MerchantBasicDetails>> getAllMerchantsForAdmin(String token);
	
}
