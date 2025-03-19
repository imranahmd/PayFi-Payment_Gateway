package com.payfi.merchant.service;

import com.payfi.merchant.dto.UpdateProfileStatusRequest;
import com.payfi.merchant.entity.MerchantBasicDetails;
import com.payfi.merchant.exception.ResourceMismatchException;
import com.payfi.merchant.exception.ResourceNotFoundException;


public interface MerchantBasicDetailsService {
	
	
    public MerchantBasicDetails  saveMerchantBasicDetails(String merchantOktaId,MerchantBasicDetails merchantBasicDetails);
    
    public MerchantBasicDetails findByMerchantOktaId(String merchantOktaId) throws ResourceNotFoundException;

	public MerchantBasicDetails registerMerchantBasicDetails(String merchantOktaId,
			MerchantBasicDetails merchantBasicDetails) throws ResourceNotFoundException,ResourceMismatchException;


	public MerchantBasicDetails updateMerchantProfileStatus( UpdateProfileStatusRequest updateProfileStatusRequest ) 
			throws ResourceNotFoundException,ResourceMismatchException; 


}
