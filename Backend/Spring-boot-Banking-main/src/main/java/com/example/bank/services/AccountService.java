package com.example.bank.services;

import com.example.bank.dto.*;
import com.example.bank.models.Account;
import com.example.bank.repositories.AccountRepository;
import com.example.bank.utils.CodeGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.validation.Valid;

@Service
public class AccountService {
	
	@Value("${my.partnerreferencenumber}")
	private Long partnerReferenceNumber;
	
	@Value("${my.escrowAccountNumber}")
	private Long escrowAccountNumber;

    @Autowired
    private  AccountRepository accountRepository;


    public PartnerAdditionResponseDto partnerAddition(@Valid PartnerAdditionRequestDto partnerAdditionRequestDto){
    	CodeGenerator codeGenerator = new CodeGenerator();
    	
    	Account account = new Account(
    			   partnerReferenceNumber,
                   partnerAdditionRequestDto.getPartnerName(),
		           partnerAdditionRequestDto.getLegalName(), 
		           partnerAdditionRequestDto.getMobileNumber(), 
		           partnerAdditionRequestDto.getEmailId(), 
		           partnerAdditionRequestDto.getAddress(),
		           partnerAdditionRequestDto.getCity(), 
		           partnerAdditionRequestDto.getState(), 
		           partnerAdditionRequestDto.getPincode(), 
		           partnerAdditionRequestDto.getGstin(), 
		           partnerAdditionRequestDto.getPan(), 
		           "Active", 
		           escrowAccountNumber, 
		           0.0,
		           null);
        
       Account responseAccount = accountRepository.save(account);
        
       PartnerAdditionResponseDto partnerAdditionResponseDto =	new PartnerAdditionResponseDto(
    		   responseAccount.getPartnerReferenceNumber(),
    		   responseAccount.getPartnerName(),
    		   responseAccount.getLegalName(),
    		   responseAccount.getEmailId(),
    		   responseAccount.getAddress(),
    		   responseAccount.getGstin(),
    		   responseAccount.getPan(),
    		   responseAccount.getStatus(),
    		   responseAccount.getEscrowAccountNumber() );
        		
        return partnerAdditionResponseDto;
    }

	public Account getPartnerAccount(Long partnerReferenceNumber) {
		return accountRepository.findByPartnerReferenceNumber(partnerReferenceNumber);
	}
    
}
