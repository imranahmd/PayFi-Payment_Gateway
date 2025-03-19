package com.payfi.upi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payfi.upi.requestdto.utilityapi.UtilityApiRequestDto;
import com.payfi.upi.responsedto.UpiResponseDto;
import com.payfi.upi.service.UtilityApiService;

@RestController
@RequestMapping("/upi/utilityapi")
public class UtilityApiController {

	@Autowired
	private UtilityApiService utilityApiService;

	@PostMapping("/{purpose}")
	public ResponseEntity<UpiResponseDto> listKeys(
			// @RequestHeader(value="Authorization") String token,
			@PathVariable(value="purpose") String purpose,
			@RequestBody UtilityApiRequestDto utilityApiRequestDto) {

//		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
//
//		if (adminEmailId == null || !adminEmailId.equals("payfiadmin@payfi.co.in")) {
//			throw new AdminNotAuthorizedException("admin not authorized for this request");
//		}

		UpiResponseDto upiResponseDto = utilityApiService.listKeys(utilityApiRequestDto,purpose);

		return ResponseEntity.status(HttpStatus.OK).body(upiResponseDto);

	}

}
