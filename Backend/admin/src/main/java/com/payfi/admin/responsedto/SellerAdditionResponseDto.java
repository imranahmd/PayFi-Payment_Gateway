package com.payfi.admin.responsedto;


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
public class SellerAdditionResponseDto {
	
	private String merchantOktaId;
	private Long partnerReferenceNumber;
	private String partnerName;
	
	private Long merchantId;
	private String emailId;
	private String merchantName;
	private String gstNumber;
	private String companyPAN;
	private String bankAccountNumber;
	
	private String profileStatus;

}
