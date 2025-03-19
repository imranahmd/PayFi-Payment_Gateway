package com.payfi.transaction.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="partner_status")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class PartnerStatus {

	@Id
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
