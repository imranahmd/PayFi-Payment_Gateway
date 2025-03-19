package com.payfi.merchant.exception;

public class UserExistException extends RuntimeException {

	
	private static final long serialVersionUID = 1L;

	public UserExistException() {
		super("User not Exist exception");
	}
	
	public UserExistException(String message) {
		super(message);
	}
	
}
