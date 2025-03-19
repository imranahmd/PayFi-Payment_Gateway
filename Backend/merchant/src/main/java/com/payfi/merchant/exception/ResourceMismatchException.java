package com.payfi.merchant.exception;

public class ResourceMismatchException extends RuntimeException {

	
	private static final long serialVersionUID = 1L;

	public ResourceMismatchException() {
		super("Resource mismatch Exception");
	}
	
	public ResourceMismatchException(String message) {
		super(message);
	}
	
}
