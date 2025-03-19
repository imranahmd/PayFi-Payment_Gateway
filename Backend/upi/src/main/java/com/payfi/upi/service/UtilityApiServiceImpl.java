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

import com.payfi.upi.requestdto.utilityapi.UtilityApiRequestDto;
import com.payfi.upi.responsedto.UpiResponseDto;

@Service
public class UtilityApiServiceImpl implements UtilityApiService {

	@Value("${icici.apikey}")
	private String apiKey;

	@Autowired
	private RestTemplate restTemplate;

	@Override
	public UpiResponseDto listKeys(UtilityApiRequestDto utilityApiRequestDto,String purpose) throws RestClientException {
		// encryption of data like header, requestbody etc
        Map<String,String> apiMap = new HashMap<String, String>();
        
        apiMap.put("listkeys","https://apibankingonesandbox.icicibank.com/api/v1/upi2/ListKeys" );
        apiMap.put("listpsp","https://apibankingonesandbox.icicibank.com/api/v1/upi2/ListPSP" );
        apiMap.put("listaccountprovider","https://apibankingonesandbox.icicibank.com/api/v1/upi2/ListAccountProvider" );
        
		String apiUrl = apiMap.get(purpose);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("API key", apiKey);
		// headers.set("Authorization", "Bearer YOUR_JWT_TOKEN");

		// Set request body if needed
		// String requestBody = "{ \"key\": \"value\" }";
		HttpEntity<UtilityApiRequestDto> requestEntity = new HttpEntity<>(utilityApiRequestDto, headers);

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
