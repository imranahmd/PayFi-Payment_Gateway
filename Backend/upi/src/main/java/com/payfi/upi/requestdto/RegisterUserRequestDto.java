package com.payfi.upi.requestdto;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

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
public class RegisterUserRequestDto {

	@NotBlank
	
	private String fullName;
	
	private String email;
	
	private int mobileNumber;
	
	private String password;
	
}
