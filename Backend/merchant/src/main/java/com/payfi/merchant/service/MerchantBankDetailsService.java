package com.payfi.merchant.service;


import com.payfi.merchant.entity.MerchantBankDetails;

public interface MerchantBankDetailsService {

	//create a 
    public MerchantBankDetails  saveMerchantBankDetails(String merchantOktaId, MerchantBankDetails merchantBankDetails) ;
    
    public MerchantBankDetails findByMerchantOktaId(String merchantOktaId);

}
