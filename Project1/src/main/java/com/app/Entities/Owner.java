package com.app.Entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Pattern;

import org.springframework.validation.annotation.Validated;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Validated
public class Owner extends BaseEntity{

	@Column(name = "First_name",length = 50)
	private String firstName;
	@Column(name = "Last_name",length = 50)
	private String lastName;
	@Email(message = "Invalid email enter")
	@Column(length = 50, unique = true)
	private String email;
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", message = "Invalid Password")
	@Column(length = 50)
	private String password;
	@Column(name = "Mobile_no")
	private Long contactNumber;
	@Embedded
	private Address address;
	@OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Property> properties = new ArrayList<Property>();
	
	//helper method to add property
	public void addProperty(Property property2) {
		this.properties.add(property2);
		
	}
	
	
}
