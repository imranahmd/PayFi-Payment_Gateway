package com.payfi.merchant.requestdto;

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
public class SettlementRequestDto {
	
	private Long partnerReferenceNumber;
	private String merchantOktaId;
	private String amountSettled;
	private String bankAccountNumber;
}
