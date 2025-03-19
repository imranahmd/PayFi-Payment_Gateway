package com.payfi.upi.requestdto.accountmanagementapi;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Valid
public class RegisterMobileNumberRequestDto {

	@NotBlank
	@Size(max = 255)
	@JsonProperty("device-id")
	private String deviceId;
	
	@NotBlank
	@Size(max = 10)
	@Pattern(regexp = "^\\+91[6-9][0-9]{9}$")
	@JsonProperty("mobile")
	private String mobile;
	
	@NotBlank
	@Size(max = 35)
	@JsonProperty("seq-no")
	private String seqNo;
	
	@NotBlank
	@Size(max = 15)
	@JsonProperty("channel-code")
	private String channelCode;
	
	@NotBlank
	@Size(max=20)
	@JsonProperty("account-provider")
	private int accountProvider;
	
	@NotBlank
	@JsonProperty("Otp")
	private String Otp;
	
	@NotBlank
	@Size(max=20)
	@JsonProperty("account-number")
	private String accountNumber;
	
	@NotBlank
	@Size(max=1024)
	@JsonProperty("mpin")
	private String mpin;
	
	@Size(max=1024)
	@JsonProperty("atmpin")
	private String atmpin;
	
	@NotBlank
	@Size(max=6)
	@JsonProperty("card-digits")
	private int cardDigits;
	
	@NotBlank
	@Size(max=4)
	@JsonProperty("expiry-date")
	private int expiryDate;
	
	@Size(max=10)
	@JsonProperty("profile-id")
	private int profileId;
	
	@NotBlank
	@Size(max=255)
	@JsonProperty("virtual-address")
	private String virtualAddress;
	
	@NotBlank
	@Size(max=11)
	@JsonProperty("ifsc")
	private String ifsc;
	
	@Size(max=7)
	@JsonProperty("mmid")
	private int mmid;
	
	@NotBlank
	@Size(max=20)
	@JsonProperty("account-type")
	private String accountType;
	
	@Size(max=100)
	@JsonProperty("name")
	private String name;
	
	@NotBlank
	@Size(max=1)
	@JsonProperty("default-debit")
	private String defaultDebit;
	
	@NotBlank
	@Size(max=1)
	@JsonProperty("default-credit")
	private String defaultCredit;
	
	@NotBlank
	@Size(max=1)
	@JsonProperty()
	private String actionFlag;
	
	@NotBlank
	@Size(max=255)
	@JsonProperty("hashed-virtual-address")
	private String hashedVirtualAddress;
}
