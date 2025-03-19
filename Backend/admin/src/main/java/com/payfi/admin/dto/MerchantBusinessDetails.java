package com.payfi.admin.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

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
public class MerchantBusinessDetails {
	
    private Long merchantBusinessId;
    
    private String merchantOktaId;
    
    private String companyName;
    
    private String companyType;
    
    private String gstNumber;
    
    private String directorsIdentificationNumber;
    
    private String companyPAN;
    
    private String cin;
    
    private String bankAccountNumber;
    
    private String companyWebsiteLink;
    
    private String emailId;
    
    private String businessContact;
    
    private LocalDateTime createdAt;

	public MerchantBusinessDetails(String merchantOktaId, String companyName, String companyType, String gstNumber,
			String directorsIdentificationNumber, String companyPAN, String cin, String bankAccountNumber,
			String companyWebsiteLink,
			@NotEmpty(message = "Email cannot be empty") @Email(message = "Please enter a valid email format") String email,
			String businessContact) {
		super();
		this.merchantOktaId = merchantOktaId;
		this.companyName = companyName;
		this.companyType = companyType;
		this.gstNumber = gstNumber;
		this.directorsIdentificationNumber = directorsIdentificationNumber;
		this.companyPAN = companyPAN;
		this.cin = cin;
		this.bankAccountNumber = bankAccountNumber;
		this.companyWebsiteLink = companyWebsiteLink;
		this.emailId = email;
		this.businessContact = businessContact;
	}
  
}