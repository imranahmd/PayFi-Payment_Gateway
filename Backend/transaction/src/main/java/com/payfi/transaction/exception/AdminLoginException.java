package com.payfi.transaction.exception;

public class AdminLoginException extends RuntimeException {

	
	private static final long serialVersionUID = 1L;

	public AdminLoginException() {
		super("Merchant Not login Exception");
	}
	
	public AdminLoginException(String message) {
		super(message);
	}
	
}
