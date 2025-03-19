package com.payfi.transaction.exception;

public class DeclinePaymentException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public DeclinePaymentException() {
		super("payment declined");
	}
	
	public DeclinePaymentException(String message) {
		super(message);
	}

}
