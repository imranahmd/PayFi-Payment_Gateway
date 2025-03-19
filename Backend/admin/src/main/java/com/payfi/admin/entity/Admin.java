package com.payfi.admin.entity;

import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
//import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="admin")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Admin {
	
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="aid")
	private Long aid;
	
	@Column(name="name")
	private String name;
	
	//@Email(message = "Invalid email address")
	@Column(name="email")
	private String email;

	@Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
 
    @Column(name = "status")
    private String status;
    
    //@Transient
    //private List<Merchant> merchants = new ArrayList<>();

	public Admin(String name, String email, String phone, String address, LocalDateTime createdAt, String status) {
		super();
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.createdAt = createdAt;
		this.status = status;
	}
	
}
