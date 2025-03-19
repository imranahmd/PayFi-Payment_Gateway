package com.payfi.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateDocumentStatusRequest {
	
	private String emailId;
	private String merchantOktaId;
	
	//in merchant_basic_details table
	private String merchantId;
	private boolean panDocStatus;
	private boolean partnershipDeedDocStatus;
	private boolean cancelledChequeDocStatus;
	private boolean moaDocStatus;
	private boolean aoaDocStatus;

}
