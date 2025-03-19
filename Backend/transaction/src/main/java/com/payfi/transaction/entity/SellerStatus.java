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
@Table(name="seller_status")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class SellerStatus {
	
	@Id
	private Long merchantId;
	private String merchantOktaId;
	private Long partnerReferenceNumber;
	private String partnerName;
	
	private String emailId;
	private String merchantName;
	private String gstNumber;
	private String companyPAN;
	private Long bankAccountNumber;
	
	private String profileStatus;
	
}
