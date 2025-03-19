package com.example.bank.services;


import com.example.bank.dto.PaymentResponseDto;
import com.example.bank.dto.SettlementRequestDto;
import com.example.bank.dto.SettlementResponseDto;
import com.example.bank.dto.UpiPaymentRequestDto;
import com.example.bank.dto.UpiPaymentResponseDto;
import com.example.bank.dto.PaymentRequestDto;
import com.example.bank.models.*;
import com.example.bank.repositories.AccountRepository;
import com.example.bank.repositories.SellerAccountRepository;
import com.example.bank.repositories.TransactionRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

@Service
public class TransactionService {
	
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
    private AccountRepository accountRepository;

	@Autowired
    private TransactionRepository transactionRepository;

	@Autowired
    private SellerAccountRepository sellerAccountRepository;

    public PaymentResponseDto getPayment(PaymentRequestDto paymentRequestDto) {
        Long partnerReferenceNumber = paymentRequestDto.getPartnerReferenceNumber();
        
        Transaction transaction = new Transaction();
        modelMapper.map(paymentRequestDto,transaction);
        
        Transaction responseTransaction = transactionRepository.save(transaction);

        // Find the partner account using partnerReferenceNumber and cardNumber
        SellerAccount sellerAccount = sellerAccountRepository.findByMerchantOktaId( paymentRequestDto.getMerchantOktaId() ).get();
        
        Account escrowAccount = accountRepository.findByPartnerReferenceNumber(partnerReferenceNumber);
        
        sellerAccount.setBalance( sellerAccount.getBalance() + paymentRequestDto.getAmount()  );
        
        escrowAccount.setBalance(escrowAccount.getBalance()+ paymentRequestDto.getAmount() );
        
        sellerAccountRepository.save(sellerAccount);
        accountRepository.save(escrowAccount);
        
        PaymentResponseDto paymentResponseDto = new PaymentResponseDto();
        
        modelMapper.map(responseTransaction, paymentResponseDto);

        paymentResponseDto.setStatus("Success");
     
        return paymentResponseDto;        
    }
    
    public SettlementResponseDto settleMerchant(SettlementRequestDto settlementRequestDto) {
        Account escrowAccount = accountRepository.findByPartnerReferenceNumber(settlementRequestDto.getPartnerReferenceNumber() );
        SellerAccount sellerAccount = sellerAccountRepository.findByMerchantOktaId( settlementRequestDto.getMerchantOktaId() ).get();
        Transaction transaction = new Transaction();
        modelMapper.map(settlementRequestDto,transaction);
        
        //processing logic of the transaction
        
        transaction.setStatus("Completed");
        
        Transaction responseTransaction = transactionRepository.save(transaction);

        sellerAccount.setBalance( sellerAccount.getBalance() - settlementRequestDto.getAmount()  );
        
        Double commision =  settlementRequestDto.getAmount()*0.02;
        escrowAccount.setBalance(escrowAccount.getBalance()- (settlementRequestDto.getAmount() - commision ) );
        
        sellerAccountRepository.save(sellerAccount);
        accountRepository.save(escrowAccount);
        
        SettlementResponseDto settlementResponseDto = new SettlementResponseDto();
        modelMapper.map(responseTransaction ,settlementResponseDto);

        return settlementResponseDto;
    }

	public List<Transaction> getTransactionOfMerchant(String merchantOktaId) {
		return transactionRepository.findByMerchantOktaId(merchantOktaId);
	}

	public List<Transaction> getPartnerTransaction(Long partnerReferenceNumber) {
		return transactionRepository.findByPartnerReferenceNumber( partnerReferenceNumber );
	}

	public UpiPaymentResponseDto getUpiPayment(@Valid UpiPaymentRequestDto upiPaymentRequestDto) {
		System.out.println(upiPaymentRequestDto);
        Long partnerReferenceNumber = upiPaymentRequestDto.getPartnerReferenceNumber();
        
        Transaction transaction = new Transaction();
        modelMapper.map(upiPaymentRequestDto,transaction);
        
        Transaction responseTransaction = transactionRepository.save(transaction);
        
        // Find the partner account using partnerReferenceNumber and cardNumber
        SellerAccount sellerAccount = sellerAccountRepository.findByMerchantOktaId( upiPaymentRequestDto.getMerchantOktaId() ).get();
        
        Account escrowAccount = accountRepository.findByPartnerReferenceNumber(partnerReferenceNumber);
        
        sellerAccount.setBalance( sellerAccount.getBalance() + upiPaymentRequestDto.getAmount()  );
        
        escrowAccount.setBalance(escrowAccount.getBalance()+ upiPaymentRequestDto.getAmount() );
        
        sellerAccountRepository.save(sellerAccount);
        accountRepository.save(escrowAccount);
        
        UpiPaymentResponseDto upiPaymentResponseDto = new UpiPaymentResponseDto();
        modelMapper.map(responseTransaction,upiPaymentResponseDto);

        upiPaymentResponseDto.setStatus("Success");
     
        return upiPaymentResponseDto;        
	}
	
}
