package com.payfi.merchant.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payfi.merchant.entity.MerchantBankDetails;
import com.payfi.merchant.exception.MerchantRegisteredException;
import com.payfi.merchant.exception.ResourceNotFoundException;
import com.payfi.merchant.repository.MerchantBankDetailsRepository;

@Service
public class MerchantBankDetailsServiceImpl implements MerchantBankDetailsService {
	
	@Autowired
	private MerchantBankDetailsRepository merchantBankDetailsRepository;

	@Override
	public MerchantBankDetails saveMerchantBankDetails(String merchantOktaId,MerchantBankDetails merchantBankDetails) {
		
		Optional<MerchantBankDetails> m1 = merchantBankDetailsRepository.findByMerchantOktaId(merchantOktaId);
        if(!m1.isEmpty()) {
    		throw new MerchantRegisteredException("user already registered");
        }
		
		return merchantBankDetailsRepository.save(merchantBankDetails);
	}

	@Override
	public MerchantBankDetails findByMerchantOktaId(String merchantOktaId)throws ResourceNotFoundException {
		Optional<MerchantBankDetails> existingMerchantBankDetails = merchantBankDetailsRepository.findByMerchantOktaId(merchantOktaId);
		
		if(existingMerchantBankDetails.isEmpty()) {
			throw new ResourceNotFoundException("merchant not exist with given email id");
		}
		
		return existingMerchantBankDetails.get();
	}

}
