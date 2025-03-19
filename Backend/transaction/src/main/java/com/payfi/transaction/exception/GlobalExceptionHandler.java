package com.payfi.transaction.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.RestClientException;

import com.payfi.transaction.payload.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
		Map<String,String> resp = new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach( (error) ->{
		   String field = ( (FieldError) error).getField();
		   String message = error.getDefaultMessage();
		   resp.put(field, message);
		});		
	    return new ResponseEntity<>(resp,HttpStatus.BAD_REQUEST);
    }

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> ResourceNotFoundExceptionHandler( ResourceNotFoundException ex ){
		String message = ex.getMessage();
		ApiResponse  response = ApiResponse.builder().message(message).success(true).status(HttpStatus.NOT_FOUND).build();
		return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(AdminLoginException.class)
	public ResponseEntity<ApiResponse> AdminLoginExceptionHandler( AdminLoginException ex ){
		String message = ex.getMessage();
		ApiResponse  response = ApiResponse.builder().message(message).success(true).status(HttpStatus.NOT_FOUND).build();
		return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(DeclinePaymentException.class)
	public ResponseEntity<ApiResponse> DeclinePaymentExceptionHandler( DeclinePaymentException ex ){
		String message = ex.getMessage();
		ApiResponse  response = ApiResponse.builder().message(message).success(true).status(HttpStatus.NOT_FOUND).build();
		return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(RestClientException.class)
    public ResponseEntity<String> handleRestClientException(RestClientException ex) {
        return new ResponseEntity<>("Error in the REST client: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
