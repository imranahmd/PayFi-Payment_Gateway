package com.payfi.merchant.service;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payfi.merchant.entity.MerchantBusinessDetails;
import com.payfi.merchant.exception.MerchantRegisteredException;
import com.payfi.merchant.exception.ResourceMismatchException;
import com.payfi.merchant.exception.ResourceNotFoundException;
import com.payfi.merchant.repository.MerchantBusinessDetailsRepository;

@Service
public class MerchantBusinessDetailsServiceImpl implements MerchantBusinessDetailsService {
	
	@Autowired
	private MerchantBusinessDetailsRepository merchantBusinessDetailsRepository;

	@Override
	public MerchantBusinessDetails saveMerchantBusinessDetails(String merchantOktaId,MerchantBusinessDetails merchantBusinessDetails) {
		
		Optional<MerchantBusinessDetails> m1 = merchantBusinessDetailsRepository.findByMerchantOktaId(merchantOktaId);
        if(!m1.isEmpty()) {
    		throw new MerchantRegisteredException("user already registered");
        }
		
        return merchantBusinessDetailsRepository.save(merchantBusinessDetails);
	}

	@Override
	public MerchantBusinessDetails registerMerchantBusinessDetails(String merchantOktaId,
			@Valid MerchantBusinessDetails merchantBusinessDetails)
			throws ResourceNotFoundException, ResourceMismatchException {
		
		MerchantBusinessDetails existingMerchant = merchantBusinessDetailsRepository.findByMerchantOktaId(merchantOktaId).orElseThrow( () -> new ResourceNotFoundException("Merchant id incorrect, please enter correct merchant id "+merchantOktaId) );
	    if(!(existingMerchant.getMerchantOktaId()).equals(merchantOktaId)) {
	    	throw new ResourceMismatchException("User mismatch for merchant with id " + merchantOktaId);
	    }

	    MerchantBusinessDetails registerMerchantBusinessDetails = merchantBusinessDetailsRepository.save(existingMerchant);
		return registerMerchantBusinessDetails;
	}

	@Override
	public MerchantBusinessDetails findByMerchantOktaId(String merchantOktaId)throws ResourceNotFoundException {
		Optional<MerchantBusinessDetails> existingMerchantBusinessDetails = merchantBusinessDetailsRepository.findByMerchantOktaId(merchantOktaId);
		
		if(existingMerchantBusinessDetails.isEmpty()) {
			throw new ResourceNotFoundException("merchant not exist with given email id");
		}
		
		return existingMerchantBusinessDetails.get();
	}

}
