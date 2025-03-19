package com.payfi.transaction.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.multipart.MultipartFile;

import com.payfi.transaction.entity.PaymentLink;
import com.payfi.transaction.requestdto.MerchantInfoRequestDto;
import com.payfi.transaction.requestdto.PartnerAdditionRequestDto;
import com.payfi.transaction.requestdto.PaymentRequestDto;
import com.payfi.transaction.requestdto.SellerAdditionRequestDto;
import com.payfi.transaction.requestdto.SettlementRequestDto;
import com.payfi.transaction.requestdto.UpiPaymentRequestDto;
import com.payfi.transaction.responsedto.Account;
import com.payfi.transaction.responsedto.PartnerAdditionResponseDto;
import com.payfi.transaction.responsedto.PaymentResponseDto;
import com.payfi.transaction.responsedto.SellerAccount;
import com.payfi.transaction.responsedto.SellerAdditionResponseDto;
import com.payfi.transaction.responsedto.SettlementResponseDto;
import com.payfi.transaction.responsedto.TransactionResponse;
import com.payfi.transaction.responsedto.UpiPaymentResponseDto;

@Service
public interface TransactionService {
	
	

	PaymentResponseDto getPayment(PaymentRequestDto paymentRequestDto) throws RestClientException;

	PartnerAdditionResponseDto partnerAddition(PartnerAdditionRequestDto partnerAdditionRequestDto) throws RestClientException;

	SellerAdditionResponseDto sellerAddition(SellerAdditionRequestDto sellerAdditionRequestDto) throws RestClientException;

	SettlementResponseDto settlementRequest(SettlementRequestDto settlementRequestDto) throws RestClientException;

	Account getPartnerInfo(Long partnerReferenceNumber);

	SellerAccount getMerchantInfo(MerchantInfoRequestDto merchantInfoRequestDto);

	List<TransactionResponse> getTransactionOfPartner(Long partnerReferenceNumber);

	List<TransactionResponse> getTransactionOfMerchant(String merchantOktaId);

	UpiPaymentResponseDto getUpiPayment(UpiPaymentRequestDto upiPaymentRequestDto);

	String upiPaymentLinkGeneration(String token, UpiPaymentRequestDto upiPaymentRequestDto);

	String upiPaymentLinkSendViaEmail(MultipartFile[] file, String toEmail, String[] cc, String subject,
			String emailBody, String link);

	String upiPaymentLinkSendViaSMS(String dest, String messageText, String link);

	UpiPaymentResponseDto getUpiPaymentWithLink(String encodedPayload, String customerVpa,String uniqueKey) throws Exception;

	PaymentLink getOriginalUrlWithUniqueKey(String uniqueKey) throws Exception;

	PaymentLink saveEmailAndMobile(String uniqueKey, String toEmail, String mobile) throws Exception;

	
}
