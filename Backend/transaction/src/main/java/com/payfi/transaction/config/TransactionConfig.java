package com.payfi.transaction.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Configuration
public class TransactionConfig {
	
	@Bean
	RestTemplate restTemplate() {
		return new RestTemplate();
	}
	
	@Bean
    ModelMapper modelMapper() {
        return new ModelMapper();
    }
	
	@Bean
	ObjectMapper objectMapper() {
		 ObjectMapper objectMapper = new ObjectMapper();
	        objectMapper.registerModule(new JavaTimeModule()); // Register JavaTimeModule for Java 8 date/time types
	        return objectMapper;
	}
	
}
