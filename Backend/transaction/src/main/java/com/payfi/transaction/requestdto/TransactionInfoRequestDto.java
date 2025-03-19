package com.payfi.transaction.requestdto;

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
public class TransactionInfoRequestDto {
	
	private Long partnerReferenceNumber;
	private String merchantOktaId;

}