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
public class TableUser{
	
	private Long userId;
	
	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String username;
   
	private String password;
	
	private String merchantOktaId;
	
	private LocalDateTime createdAt;
	
}
