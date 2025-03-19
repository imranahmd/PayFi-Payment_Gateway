package com.payfi.upi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payfi.upi.exception.AdminNotAuthorizedException;
import com.payfi.upi.requestdto.ValidateVirtualAddressRequestDto;
import com.payfi.upi.responsedto.UpiResponseDto;
import com.payfi.upi.service.TransactionApiServiceImpl;
import com.payfi.upi.util.ExtractJWT;

@RestController
@RequestMapping("/upi/transactionapi")
public class TransactionApiController {

	@Autowired
	private TransactionApiServiceImpl transactionApiService;

	@PostMapping("/validatevirtualaddress")
	public ResponseEntity<UpiResponseDto> validateVirtualAddress(
			// @RequestHeader(value = "Authorization") String token,
			@RequestBody ValidateVirtualAddressRequestDto validateVirtualAddressRequestDto) {

//		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
//
//		if (adminEmailId == null || !adminEmailId.equals("payfiadmin@payfi.co.in")) {
//			throw new AdminNotAuthorizedException("admin not authorized for this request");
//		}

		UpiResponseDto upiResponseDto = transactionApiService.validateVirtualAddress(validateVirtualAddressRequestDto);

		return ResponseEntity.status(HttpStatus.OK).body(upiResponseDto);
	}

}
