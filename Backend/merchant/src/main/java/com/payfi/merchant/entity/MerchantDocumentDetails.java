package com.payfi.merchant.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.Valid;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tbl_merchant_documents_details")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Valid
public class MerchantDocumentDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="merchant_document_id")
	private Long merchantDocumentId;
	
	@Column(name="merchant_okta_id",unique = true)
	private String merchantOktaId;
	
	@Column(name="email_id",unique = true)
	private String emailId;
	
	@Lob
	@Column(name="partnership_deed")
	private byte[] partnerShipDeed;
	
	@Column(name="partnership_deed_doc_status")
	private boolean partnerShipDeedDocStatus;
	
	@Lob
	@Column(name="pancard_doc")
	private byte[] pancard_doc;
	
	@Column(name="pan_doc_status")
	private boolean panDocStatus;
	
	@Lob
	@Column(name="moa_doc")
	private byte[] moadoc;
	
	@Column(name="moa_doc_status")
	private boolean moaDocStatus;
	
	@Lob
	@Column(name="aoa_doc")
	private byte[] aoadoc;
	
	@Column(name="aoa_doc_status")
	private boolean aoaDocStatus;
	
	@Lob
	@Column(name="bank_credentials_cheque")
	private byte[] bankCredentialsCheque;
	
	@Column(name="cancelled_cheque_doc_status")
	private boolean cancelledChequeDocStatus;
	
	@Column(name="created_at")
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
