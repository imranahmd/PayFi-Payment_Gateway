package com.payfi.admin.externalservices;


import java.util.List;
import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.payfi.admin.dto.MerchantBasicDetails;
import com.payfi.admin.dto.MerchantDocumentDetails;
import com.payfi.admin.dto.UpdateDocumentStatusRequest;
import com.payfi.admin.dto.UpdateProfileStatusRequest;



@FeignClient(name="MERCHANT")
public interface FeignMerchantService {
	//basic merchant api
	
	/*
	@GetMapping("/merchants/aid/{aid}")
	public ResponseEntity<List<Merchant>> getMerchnatByAID(@PathVariable("aid") Long aid);
	
	@PostMapping("/merchants/create/mid/{mid}")
	public ResponseEntity<Merchant> updateStatusMerchant(@PathVariable Long mid, Merchant merchant);
	
	@PutMapping("/merchants/updatestatus/mid/{mid}")
	public ResponseEntity<Merchant> updateStatusMerchant(@PathVariable Long mid);

	@DeleteMapping("/merchants/deletemerchant/mid/{mid}")
	public ResponseEntity<String> deleteMerchnat(@PathVariable Long mid);
*/
	
	@PutMapping("/merchants/admin/updatemerchantprofilestatus")
	public ResponseEntity<MerchantBasicDetails> updateMerchantProfileStatus( 
			@RequestHeader(value="Authorization") String token,
			@RequestBody UpdateProfileStatusRequest updateProfileStatusRequest
			);
	
	@PutMapping("/merchants/admin/updatemerchantdocumentstatus")
	public ResponseEntity<MerchantDocumentDetails> updateMerchantDocumentStatus(
			@RequestHeader(value="Authorization") String token,
			@RequestBody UpdateDocumentStatusRequest updateDocumentStatusRequest
			);
	
	@GetMapping("/merchants/admin/getalldetailsofmerchant/{merchantOktaId}")
	public ResponseEntity<Map<String,Object>> getAllDetailsOfMerchantForAdmin(
			@RequestHeader(value="Authorization") String token,
			@PathVariable String merchantOktaId);
	
	@GetMapping("/merchants/admin/getallmerchants")
	public ResponseEntity< List<MerchantBasicDetails> > getAllMerchantsForAdmin(@RequestHeader(value="Authorization") String token);
	
}


