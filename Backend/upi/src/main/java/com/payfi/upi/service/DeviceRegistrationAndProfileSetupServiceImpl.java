package com.payfi.upi.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.payfi.upi.requestdto.deviceregistrationandprofilesetup.GetTokenRequestDto;
import com.payfi.upi.requestdto.deviceregistrationandprofilesetup.ListPSPKeysRequestDto;
import com.payfi.upi.responsedto.UpiResponseDto;

@Service
public class DeviceRegistrationAndProfileSetupServiceImpl implements DeviceRegistrationAndProfileSetupService {

	@Value("${icici.apikey}")
	private String apiKey;

	@Autowired
	private RestTemplate restTemplate;

	@Override
	public UpiResponseDto getToken(GetTokenRequestDto getTokenRequestDto) {

		// encryption of data like header, requestbody etc

		String apiUrl = "https://apibankingonesandbox.icicibank.com/api/v1/upi2/GetToken";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("API key", apiKey);
		// headers.set("Authorization", "Bearer YOUR_JWT_TOKEN");

		// Set request body if needed
		// String requestBody = "{ \"key\": \"value\" }";
		HttpEntity<GetTokenRequestDto> requestEntity = new HttpEntity<>(getTokenRequestDto, headers);

		ResponseEntity<UpiResponseDto> upiResponseDto = null;
		try {
			// Make GET request
			upiResponseDto = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, UpiResponseDto.class);
		} catch (RestClientException ex) {
			// Handle RestClientException here
			System.err.println("Error in the REST client: " + ex.getMessage());
		}

		System.out.println(upiResponseDto);

		return upiResponseDto.getBody();
	}

	@Override
	public UpiResponseDto getListPSPKeys(ListPSPKeysRequestDto listPSPKeysRequestDto) {

		// encryption of data like header, requestbody etc

		String apiUrl = "https://apibankingonesandbox.icicibank.com/api/v1/upi2/ListPSP";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("API key", apiKey);
		// headers.set("Authorization", "Bearer YOUR_JWT_TOKEN");

		// Set request body if needed
		// String requestBody = "{ \"key\": \"value\" }";
		HttpEntity<ListPSPKeysRequestDto> requestEntity = new HttpEntity<>(listPSPKeysRequestDto, headers);

		ResponseEntity<UpiResponseDto> upiResponseDto = null;
		try {
			// Make GET request
			upiResponseDto = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, UpiResponseDto.class);
		} catch (RestClientException ex) {
			// Handle RestClientException here
			System.err.println("Error in the REST client: " + ex.getMessage());
		}

		System.out.println(upiResponseDto);

		return upiResponseDto.getBody();

	}
}
