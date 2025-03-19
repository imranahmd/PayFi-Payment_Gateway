package com.payfi.transaction.responsedto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class PartnerAdditionResponseDto {

	private Long partnerReferenceNumber;
	private String partnerName;
	private String legalName;
	private String emailId;
	private String address;
	private String gstin;
	private String pan;
	private String status;
	
	private Long escrowAccountNumber;

}
