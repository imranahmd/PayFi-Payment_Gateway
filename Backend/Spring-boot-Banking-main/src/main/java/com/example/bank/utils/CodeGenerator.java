package com.example.bank.utils;

import com.mifmif.common.regex.Generex;

import static com.example.bank.constants.constants.*;


public class CodeGenerator {
	
	Generex accountNumberGenerex = new Generex(ACCOUNT_NUMBER_PATTERN_STRING);

    Generex sortCodeGenerex = new Generex(SORT_CODE_PATTERN_STRING);
    Generex cardNumberGenerex = new Generex(CARD_NUMBER_PATTERN_STRING);
    Generex partnerReferenceNumberGenerex = new Generex(PARTNER_PATTERN_STRING);
    
    public CodeGenerator(){}

    public String generateSortCode() {
        return sortCodeGenerex.random();
    }
    public Long generateCardNumber() {
        return Long.parseLong(cardNumberGenerex.random());
    }

    public Long genratePartnerReferenceNumber() {
    	return Long.parseLong(partnerReferenceNumberGenerex.random());
    }
    
    public Long generateAccountNumber() {
        return Long.parseLong(accountNumberGenerex.random());
    }
}
