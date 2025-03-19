package com.payfi.upi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payfi.upi.requestdto.deviceregistrationandprofilesetup.GetTokenRequestDto;
import com.payfi.upi.requestdto.deviceregistrationandprofilesetup.ListPSPKeysRequestDto;
import com.payfi.upi.responsedto.UpiResponseDto;
import com.payfi.upi.service.DeviceRegistrationAndProfileSetupService;

@RestController
@RequestMapping("/upi/deviceregistrationandprofilesetupapi")
public class DeviceRegistrationAndProfileSetupController {
	
	@Autowired
	private DeviceRegistrationAndProfileSetupService deviceRegistrationAndProfileSetupService;

	@PostMapping("/gettoken")
	public ResponseEntity<UpiResponseDto> getToken(
			//@RequestHeader(value = "Authorization") String token,
			@RequestBody GetTokenRequestDto getTokenRequestDto) {
//		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
//
//		if (adminEmailId == null || !adminEmailId.equals("payfiadmin@payfi.co.in")) {
//			throw new AdminNotAuthorizedException("admin not authorized for this request");
//		}
		
		UpiResponseDto upiResponseDto =  deviceRegistrationAndProfileSetupService.getToken(getTokenRequestDto);
		
		return ResponseEntity.status(HttpStatus.OK).body(upiResponseDto);
	}
	
	@PostMapping("/listpspkeys")
	public ResponseEntity<UpiResponseDto> getListPSPKeys(
			//@RequestHeader(value = "Authorization") String token,
			@RequestBody ListPSPKeysRequestDto listPSPKeysRequestDto) {
//		String adminEmailId = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
//
//		if (adminEmailId == null || !adminEmailId.equals("payfiadmin@payfi.co.in")) {
//			throw new AdminNotAuthorizedException("admin not authorized for this request");
//		}
		
		UpiResponseDto upiResponseDto =  deviceRegistrationAndProfileSetupService.getListPSPKeys(listPSPKeysRequestDto);
		
		return ResponseEntity.status(HttpStatus.OK).body(upiResponseDto);
	}
	
}
