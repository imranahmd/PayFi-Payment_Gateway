package com.payfi.transaction.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="payment_link")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class PaymentLink {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	@Column(name="payment_link_id")
	private Long paymentLinkId;
	
	private Long transactionid;
	
	@Column(name="created_at")
    private LocalDateTime createdAt;
	
    private Double amount;
    private Long receiptNumber;
    
    @Email(message = "Please enter a valid email format")
    @Column(name = "customer_email")
    private String customerEmail;
    
    @Column(name="customer_mobile")
    private String customerMobile;
    
    @Column(name="unique_key")
    private String uniqueKey;
    
    @Column(name="original_link", columnDefinition = "TEXT")
    private String originalLink;
    
    @Column(name="jwt_token")
    private String jwt;
    
    @Column(name="status")
    private String status;
}
