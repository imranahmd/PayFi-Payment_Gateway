package com.payfi.upi.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import com.payfi.upi.requestdto.utilityapi.UtilityApiRequestDto;
import com.payfi.upi.responsedto.UpiResponseDto;

@Service
public interface UtilityApiService {

	UpiResponseDto listKeys(UtilityApiRequestDto utilityApiRequestDto,String purpose) throws RestClientException;

}
