package com.payfi.recurring.externalservice;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.payfi.recurring.exception.ResourceNotFoundException;
import com.payfi.recurring.requestdto.PaymentRequestDto;
import com.payfi.recurring.requestdto.UpiPaymentRequestDto;
import com.payfi.recurring.responsedto.PaymentResponseDto;
import com.payfi.recurring.responsedto.UpiPaymentResponseDto;

@FeignClient(name="TRANSACTION")
public interface FeignTransactionService {
	
	@PostMapping("/transactions/getpayment")
	public ResponseEntity<PaymentResponseDto> getPayment(
			@RequestHeader(value = "Authorization") String token,
			@RequestBody PaymentRequestDto paymentRequestDto) throws ResourceNotFoundException;
	
	@PostMapping("/transactions/getupipayment")
	public ResponseEntity<UpiPaymentResponseDto> getUpiPayment(
			@RequestHeader(value = "Authorization") String token,
			@RequestBody UpiPaymentRequestDto upiPaymentRequestDto) throws ResourceNotFoundException;
	
}
