package com.payfi.upi.responsedto;

import javax.validation.Valid;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Valid
public class UpiResponseDto {

	//Boolean
	private Boolean success;

	//Number
	private Integer response;

	//String
	private String message;

	//Number
	private String UpiTranlogId;

	//Number
	private String BankRRN;

	//AlphaNumeric
	private String seqNo;

	//Number
	private String userProfile;

	//String
	private String MobileAppData;
	
	//Json Object
	private Object ValidationSummary;

}
