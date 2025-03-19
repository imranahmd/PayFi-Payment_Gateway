package com.payfi.admin.externalservices;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.payfi.admin.exception.ResourceNotFoundException;
import com.payfi.admin.requestdto.PartnerAdditionRequestDto;
import com.payfi.admin.requestdto.SellerAdditionRequestDto;
import com.payfi.admin.responsedto.PartnerAdditionResponseDto;
import com.payfi.admin.responsedto.SellerAdditionResponseDto;


@FeignClient(name="TRANSACTION")
public interface FeignTransactionService {
	
	@PostMapping("/transactions/partneraddition")
	public ResponseEntity<PartnerAdditionResponseDto> partnerAddition(
			@RequestHeader(value = "Authorization") String token,
			@RequestBody PartnerAdditionRequestDto partnerAdditionRequestDto) throws ResourceNotFoundException;
	
	@PostMapping("/selleraddition")
	public ResponseEntity<SellerAdditionResponseDto> sellerAddition(
			@RequestHeader(value = "Authorization") String token,
			@RequestBody SellerAdditionRequestDto sellerAdditionRequestDto) throws ResourceNotFoundException;
	
	
}
