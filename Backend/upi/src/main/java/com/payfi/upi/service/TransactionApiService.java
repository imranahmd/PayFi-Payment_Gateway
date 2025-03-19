package com.payfi.upi.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import com.payfi.upi.requestdto.ValidateVirtualAddressRequestDto;
import com.payfi.upi.responsedto.UpiResponseDto;

@Service
public interface TransactionApiService {
	
  public UpiResponseDto validateVirtualAddress(ValidateVirtualAddressRequestDto validateVirtualAddressRequestDto) throws RestClientException;
	

}
