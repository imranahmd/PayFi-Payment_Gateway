package com.payfi.recurring.responsedto;


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
public class SettlementResponseDto {
	
	
    private Long settlementId;
	
	private Long partnerReferenceNumber;
	private String merchantOktaId;
	private String bankAccountNumber;
	private double amountSettled;
	
	private String status;

}
