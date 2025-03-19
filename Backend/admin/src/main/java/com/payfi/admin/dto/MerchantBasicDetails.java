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
public class MerchantBasicDetails {

	private Long merchantId;
	
	private String merchantOktaId;
	
	private String emailId;
	
	private String merchantName;
	
	private String username;
	
	private String profileStatus;
	
	private String merchantContact;
	
	private String designation;
	
	private String address;
	
	private String city;
	
	private String state;
	
	private String country;
	
	private String postalCode;
	
	private String accountCurrency;
	
	private String imstype;
	
	private String bimstype;
	
	private String description;
	
	private LocalDateTime createdAt;

	public MerchantBasicDetails(String merchantOktaId, String emailId, String merchantName, String username,
			String profileStatus, String merchantContact, String designation, String address, String city, String state,
			String country, String postalCode, String accountCurrency, String iMSType, String bIMSType,
			String description) {
		super();
		this.merchantOktaId = merchantOktaId;
		this.emailId = emailId;
		this.merchantName = merchantName;
		this.username = username;
		this.profileStatus = profileStatus;
		this.merchantContact = merchantContact;
		this.designation = designation;
		this.address = address;
		this.city = city;
		this.state = state;
		this.country = country;
		this.postalCode = postalCode;
		this.accountCurrency = accountCurrency;
		this.imstype = iMSType;
		this.bimstype = bIMSType;
		this.description = description;
	}

}
