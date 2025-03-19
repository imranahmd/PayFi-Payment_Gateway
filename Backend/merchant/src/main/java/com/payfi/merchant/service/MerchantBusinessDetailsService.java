package com.payfi.merchant.service;

import javax.validation.Valid;
import com.payfi.merchant.entity.MerchantBusinessDetails;
import com.payfi.merchant.exception.ResourceMismatchException;
import com.payfi.merchant.exception.ResourceNotFoundException;


public interface MerchantBusinessDetailsService {
	
	//create a 
    public MerchantBusinessDetails  saveMerchantBusinessDetails(String merchantOktaId,MerchantBusinessDetails merchantBusinessDetails);
    
    public MerchantBusinessDetails findByMerchantOktaId(String merchantOktaId);

	public MerchantBusinessDetails registerMerchantBusinessDetails(String merchantOktaId,
			@Valid MerchantBusinessDetails merchantBusinessDetails) throws ResourceNotFoundException,ResourceMismatchException;

}
