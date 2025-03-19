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
public class ListAccountsRequestDto {
	
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
	
	@Size(max=50)
	@JsonProperty("payer-name")
	private String payerName;
	
	@Size(max=10)
	@JsonProperty("link-type")
	private String linkType;
	
	@Size(max=1)
	@JsonProperty("aadhaar-consent")
	private String aadhaarConsent;

}
