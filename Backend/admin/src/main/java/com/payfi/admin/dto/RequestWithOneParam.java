package com.payfi.admin.dto;


import javax.validation.Valid;
import javax.validation.constraints.Email;

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
public class RequestWithOneParam {
	
	@Email(message = "must be email")
	private String param;

}
