package com.payfi.transaction.requestdto;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class UpiPaymentRequestDto implements Serializable {
	
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
    private Long transactionId;
    private String merchantOktaId;
    private Long merchantId;
    
    private String adminEmailId;
    private Long targetAccountId;
    private String targetOwnerName;
    private Double amount;
    private String currency;
    private String message;  

    private LocalDateTime initiationDate;
    private LocalDateTime completionDate;
    private String transactionType;
    private Double latitude;
    private Double longitude;
    private Long partnerReferenceNumber;
    
    private String customerVpa;
    private String status;
    
 // Method to convert the object to byte array
    public byte[] getBytes() {
        byte[] byteArray = null;
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
             ObjectOutputStream oos = new ObjectOutputStream(baos)) {
            oos.writeObject(this);
            byteArray = baos.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
            // Handle IOException as needed
        }
        return byteArray;
    }
    
}
