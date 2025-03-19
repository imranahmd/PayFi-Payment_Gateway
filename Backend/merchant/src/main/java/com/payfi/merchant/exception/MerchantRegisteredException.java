package com.payfi.merchant.exception;

public class MerchantRegisteredException extends RuntimeException {

	
	private static final long serialVersionUID = 1L;

	public MerchantRegisteredException() {
		super("Merchant Registration Exception");
	}
	
	public MerchantRegisteredException(String message) {
		super(message);
	}
	
}
