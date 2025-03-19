package com.payfi.admin.requestdto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class PartnerAdditionRequestDto {
	
	private String partnerName;
	private String legalName;
	private String mobileNumber;
	private String emailId;
	private String address;
	private String city;
	private String state;
	private String pincode;
	private String gstin;
	private String pan;
	
	//it should be shared with bank for dev and prod IP
	//private String whitelistIP;
	
	//it should be shared with bank, to get response
	//private String callbackUrl;
	
	//it should be shared with bank
	//private CER publicKey;

}
