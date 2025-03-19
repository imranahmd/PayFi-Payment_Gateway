package com.example.bank.services;


import com.example.bank.dto.MerchantInfoRequestDto;
import com.example.bank.dto.SellerAdditionRequestDto;
import com.example.bank.dto.SellerAdditionResponseDto;
import com.example.bank.models.SellerAccount;
import com.example.bank.repositories.SellerAccountRepository;
import com.example.bank.utils.CodeGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;

@Service
public class SellerAccountService {

	@Autowired
    private SellerAccountRepository sellerAccountRepository;
	
    public SellerAdditionResponseDto sellerAddition(@Valid SellerAdditionRequestDto sellerAdditionRequestDto) {
        
        CodeGenerator codegenerator = new CodeGenerator();
        
        SellerAccount sellerAccount = new SellerAccount(sellerAdditionRequestDto.getMerchantOktaId(), 
        		                                        sellerAdditionRequestDto.getPartnerReferenceNumber(), 
        		                                        sellerAdditionRequestDto.getPartnerName(), 
        		                                        sellerAdditionRequestDto.getMerchantId(),
        		                                        sellerAdditionRequestDto.getEmailId(), 
        		                                        sellerAdditionRequestDto.getMerchantName(),
        		                                        sellerAdditionRequestDto.getGstNumber(), 
        		                                        sellerAdditionRequestDto.getCompanyPAN(), 
        		                                        sellerAdditionRequestDto.getBankAccountNumber(),
        		                                        "Active",
        		                                        codegenerator.generateCardNumber(),
        		                                        0.0);
        
        SellerAccount sellerAccountResponse = sellerAccountRepository.save(sellerAccount);
    	
        SellerAdditionResponseDto sellerAdditionResponseDto = new SellerAdditionResponseDto(  
        		sellerAccountResponse.getMerchantOktaId(),
        		sellerAdditionRequestDto.getPartnerReferenceNumber(),
                sellerAdditionRequestDto.getPartnerName(),
                sellerAdditionRequestDto.getMerchantId(),
                sellerAdditionRequestDto.getEmailId(),
                sellerAdditionRequestDto.getMerchantName(),
                sellerAdditionRequestDto.getGstNumber(),
                sellerAdditionRequestDto.getCompanyPAN(),
                sellerAccount.getBankAccountNumber() ,
                "Account Created");
        
        System.out.println(sellerAdditionResponseDto);
        
        System.out.println(sellerAccount);

        return sellerAdditionResponseDto;
    }

	public SellerAccount getSellerAccount(MerchantInfoRequestDto merchantInfoRequestDto) {
		return sellerAccountRepository.findByPartnerReferenceNumberAndMerchantOktaId( merchantInfoRequestDto.getPartnerReferenceNumber() , merchantInfoRequestDto.getMerchantOktaId());
	}
}


