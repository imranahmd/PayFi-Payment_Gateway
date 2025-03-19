package com.payfi.merchant.exception;

public class AdminNotAuthorizedException extends RuntimeException {

	
	private static final long serialVersionUID = 1L;

	public AdminNotAuthorizedException() {
		super("Admin not authorized!!");
	}
	
	public AdminNotAuthorizedException(String message) {
		super(message);
	}
	
}
