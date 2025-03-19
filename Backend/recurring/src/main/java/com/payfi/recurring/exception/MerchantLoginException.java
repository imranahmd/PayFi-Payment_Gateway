package com.payfi.recurring.exception;

public class MerchantLoginException extends RuntimeException {

	
	private static final long serialVersionUID = 1L;

	public MerchantLoginException() {
		super("Merchant Not login Exception");
	}
	
	public MerchantLoginException(String message) {
		super(message);
	}
	
}
