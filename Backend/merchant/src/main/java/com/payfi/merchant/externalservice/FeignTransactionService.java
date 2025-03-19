package com.payfi.merchant.externalservice;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.payfi.merchant.exception.ResourceNotFoundException;
import com.payfi.merchant.requestdto.PaymentRequestDto;
import com.payfi.merchant.requestdto.SettlementRequestDto;
import com.payfi.merchant.responsedto.PaymentResponseDto;
import com.payfi.merchant.responsedto.SettlementResponseDto;

@FeignClient(name="TRANSACTION")
public interface FeignTransactionService {
	
	@PostMapping("/transactions/getpayment")
	public ResponseEntity<PaymentResponseDto> getPayment(
			@RequestHeader(value = "Authorization") String token,
			@RequestBody PaymentRequestDto paymentRequestDto) throws ResourceNotFoundException;
	
	
	@PostMapping("/settlementrequest")
	public ResponseEntity<SettlementResponseDto> settlementRequest(
			@RequestHeader(value = "Authorization") String token,
			@RequestBody SettlementRequestDto settlementRequestDto ) throws ResourceNotFoundException;
	
	

}
