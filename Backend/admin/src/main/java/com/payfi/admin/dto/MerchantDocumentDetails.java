package com.payfi.admin.dto;

import java.time.LocalDateTime;

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
public class MerchantDocumentDetails {

	private Long merchantDocumentId;
	
	private String merchantOktaId;
	
	private String emailId;
	
	private byte[] partnerShipDeed;
	
	private boolean partnerShipDeedDocStatus;
	
	private byte[] pancard_doc;
	
	private boolean panDocStatus;
	
	private byte[] moadoc;
	
	private boolean moaDocStatus;
	
	private byte[] aoadoc;
	
	private boolean aoaDocStatus;
	
	private byte[] bankCredentialsCheque;
	
	private boolean cancelledChequeDocStatus;
	
	private LocalDateTime createdAt;

	public MerchantDocumentDetails(String merchantOktaId, String email, byte[] partnerShipDeed, byte[] pancard_doc,
			byte[] moadoc, byte[] aoadoc, byte[] bankCredentialsCheque) {
		super();
		this.merchantOktaId = merchantOktaId;
		this.emailId = email;
		this.partnerShipDeed = partnerShipDeed;
		this.pancard_doc = pancard_doc;
		this.moadoc = moadoc;
		this.aoadoc = aoadoc;
		this.bankCredentialsCheque = bankCredentialsCheque;
	}
	
}
