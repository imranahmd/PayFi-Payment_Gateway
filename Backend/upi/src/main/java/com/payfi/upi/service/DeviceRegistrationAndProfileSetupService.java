package com.payfi.upi.service;

import org.springframework.stereotype.Service;

import com.payfi.upi.requestdto.deviceregistrationandprofilesetup.GetTokenRequestDto;
import com.payfi.upi.requestdto.deviceregistrationandprofilesetup.ListPSPKeysRequestDto;
import com.payfi.upi.responsedto.UpiResponseDto;

@Service
public interface DeviceRegistrationAndProfileSetupService {

	UpiResponseDto getToken(GetTokenRequestDto getTokenRequestDto);

	UpiResponseDto getListPSPKeys(ListPSPKeysRequestDto listPSPKeysRequestDto);
	
}
