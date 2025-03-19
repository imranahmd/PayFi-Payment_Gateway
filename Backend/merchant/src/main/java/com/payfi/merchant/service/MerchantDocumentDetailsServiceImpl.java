package com.payfi.merchant.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payfi.merchant.dto.UpdateDocumentStatusRequest;
import com.payfi.merchant.entity.MerchantDocumentDetails;
import com.payfi.merchant.exception.MerchantRegisteredException;
import com.payfi.merchant.exception.ResourceMismatchException;
import com.payfi.merchant.exception.ResourceNotFoundException;
import com.payfi.merchant.repository.MerchantDocumentDetailsRepository;

@Service
public class MerchantDocumentDetailsServiceImpl implements MerchantDocumentDetailsService {
	
	@Autowired
	private MerchantDocumentDetailsRepository merchantDocumentDetailsRepository;

	@Override
	public MerchantDocumentDetails saveMerchantDocumentDetails(String merchantOktaId, MerchantDocumentDetails merchantDocumentDetails) {
		Optional<MerchantDocumentDetails> m1 = merchantDocumentDetailsRepository.findByMerchantOktaId(merchantOktaId);
        if(!m1.isEmpty()) {
    		throw new MerchantRegisteredException("user already registered");
        }
		
        return merchantDocumentDetailsRepository.save(merchantDocumentDetails);
	}

	@Override
	public MerchantDocumentDetails registerMerchantDocumentsDetails(String merchantOktaId,
			MerchantDocumentDetails merchantDocumentDetails)
			throws ResourceNotFoundException, ResourceMismatchException {
		MerchantDocumentDetails existingMerchant = merchantDocumentDetailsRepository.findByMerchantOktaId(merchantOktaId).orElseThrow( () -> new ResourceNotFoundException("Merchant id incorrect, please enter correct merchant id "+merchantOktaId) );
	    if(!(existingMerchant.getMerchantOktaId()).equals(merchantOktaId)) {
	    	throw new ResourceMismatchException("User mismatch for merchant with id " + merchantOktaId);
	    }

	    MerchantDocumentDetails registerMerchantDocumentDetails = merchantDocumentDetailsRepository.save(existingMerchant);
		return registerMerchantDocumentDetails;
	}

	@Override
	public MerchantDocumentDetails findByMerchantOktaId(String merchantOktaId)throws ResourceNotFoundException {
		Optional<MerchantDocumentDetails> existingMerchantDocumentDetails = merchantDocumentDetailsRepository.findByMerchantOktaId(merchantOktaId);
		
		if(existingMerchantDocumentDetails.isEmpty()) {
			throw new ResourceNotFoundException("merchant not exist with given email id");
		}
		
		return existingMerchantDocumentDetails.get();
	}

	//for admin use
	public MerchantDocumentDetails updateMerchantDocumentStatus(
			UpdateDocumentStatusRequest updateDocumentStatusRequest) throws ResourceNotFoundException {
		
		Optional<MerchantDocumentDetails> unverifiedMerchantDocumentDetails = merchantDocumentDetailsRepository.findByMerchantOktaId(updateDocumentStatusRequest.getMerchantOktaId());
		
		if(unverifiedMerchantDocumentDetails.isEmpty()) {
			throw new ResourceNotFoundException("Documents for given merchant does not exist");
		}
		
		
		unverifiedMerchantDocumentDetails.get().setPartnerShipDeedDocStatus(updateDocumentStatusRequest.isPartnershipDeedDocStatus());
		unverifiedMerchantDocumentDetails.get().setPanDocStatus(updateDocumentStatusRequest.isPanDocStatus());
		unverifiedMerchantDocumentDetails.get().setAoaDocStatus(updateDocumentStatusRequest.isAoaDocStatus());
		unverifiedMerchantDocumentDetails.get().setCancelledChequeDocStatus(updateDocumentStatusRequest.isCancelledChequeDocStatus());
		unverifiedMerchantDocumentDetails.get().setMoaDocStatus(updateDocumentStatusRequest.isMoaDocStatus());
		
		MerchantDocumentDetails verifiedMerchantDocumentDetails = merchantDocumentDetailsRepository.save(unverifiedMerchantDocumentDetails.get());
		
		return verifiedMerchantDocumentDetails;
	}
	
}
