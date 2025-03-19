package com.payfi.merchant.service;

import com.payfi.merchant.dto.UpdateDocumentStatusRequest;
import com.payfi.merchant.entity.MerchantDocumentDetails;
import com.payfi.merchant.exception.ResourceMismatchException;
import com.payfi.merchant.exception.ResourceNotFoundException;


public interface MerchantDocumentDetailsService {
	
    public MerchantDocumentDetails  saveMerchantDocumentDetails(String merchantOktaId,MerchantDocumentDetails merchantDocumentDetails);

    public MerchantDocumentDetails findByMerchantOktaId(String merchantOktaId);
    
    public MerchantDocumentDetails registerMerchantDocumentsDetails(String merchantOktaId,
			MerchantDocumentDetails merchantDocumentDetails) throws ResourceNotFoundException,ResourceMismatchException;

    
	public MerchantDocumentDetails updateMerchantDocumentStatus(
			UpdateDocumentStatusRequest updateDocumentStatusRequest) throws ResourceNotFoundException;


}
