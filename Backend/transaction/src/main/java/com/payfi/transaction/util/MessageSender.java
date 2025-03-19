package com.payfi.transaction.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
//import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.payfi.transaction.responsedto.MessageResponseDto;

@Component
public class MessageSender {
	
	@Autowired
	private RestTemplate restTemplate;
	
	String apiUrlTesting = "https://api.telsp.in/pushapi/sendmsg?username=cashFriendAPI&dest=7566328738&apikey=1RcJH2LbDUkRmii72u7ZK1GKRp7VG8Hs&signature=CFFPYF&msgtype=PM&msgtxt=5468 is your verifiction code for login. Regards- Team PayFi&entityid=1401590770000017381&templateid=1707171688851262754";
	
	@Value("${telspiel.username}")
	String username;
	
	@Value("${telspiel.apiKey}")
	String apiKey;
	
	@Value("${telspiel.signature}")
	String signature;
	
	String msgtype="PM";
	
	String messageText = "5468 is your verifiction code for login. Regards- Team PayFi";
	
	@Value("${telspiel.entityid}")
	String entityid;
	
	@Value("${telspiel.templateid}")
	String templateid;
	
	public MessageResponseDto sendMessage(String dest, String messageText, String link) {
		
		ResponseEntity<MessageResponseDto> messageResponseDto = null;
		try {
			// Make GET request
			//String apiUrl = "https://api.telsp.in/pushapi/sendmsg?username="+username+"+&dest="+dest+"&apikey="+apiKey+"&signature="+signature+"&msgtype=PM&msgtxt="+messageText+"&entityid="+entityid+"&templateid="+templateid;
			
			messageResponseDto = restTemplate.exchange(apiUrlTesting, HttpMethod.GET, null,
					MessageResponseDto.class);
		} catch (RestClientException ex) {
			// Handle RestClientException here
			System.err.println("Error in the REST client: " + ex.getMessage());
		}	
		return messageResponseDto.getBody();
	}

}
