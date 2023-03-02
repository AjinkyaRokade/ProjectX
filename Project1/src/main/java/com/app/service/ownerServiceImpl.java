package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.DTO.OwnerDTO;
import com.app.DTO.propertyDTO;
import com.app.Entities.Owner;
import com.app.Entities.Property;
import com.app.Repository.ownerRepository;
import com.app.Repository.propertyRepository;
import com.app.exception.resourceNotFoundException;

@Service
@Transactional
public class ownerServiceImpl implements ownerServiceInterface {

	@Autowired
	private ownerRepository ownerRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private propertyRepository propRepo;
	
	@Override
	public ResponseEntity<Owner> registerOwner(OwnerDTO owner) {
		
		Owner owner2 = mapper.map(owner, Owner.class);
		ownerRepo.save(owner2);
		return new ResponseEntity<Owner>(owner2, HttpStatus.OK);
	}
	
	@Override
	public Property addPropertyToOwner(propertyDTO property, Long ownerid) throws resourceNotFoundException {

		Owner owner = ownerRepo.findById(ownerid).orElseThrow(()->new resourceNotFoundException("Owner's not registered"));
		Property property2 = mapper.map(property, Property.class);
		owner.addProperty(property2);
		property2.setOwner(owner);
		return property2;

	}
	@Override
	public Property deletePropertyFromOwner(Long propertyid, Long ownerid) throws resourceNotFoundException {
		
			Owner owner = ownerRepo.findById(ownerid).orElseThrow(()->new resourceNotFoundException("Owner's not registered"));
			Property property = propRepo.findById(propertyid).orElseThrow(()->new resourceNotFoundException("Propert's not available"));
			owner.getProperties().remove(property);
		return property;
	}
	@Override
	public List<Owner> getAllOwners() {
		return ownerRepo.getAllOwners();
	}
	
	@Override
	public ResponseEntity<String> deleteOwner(Long ownerId) {
		ownerRepo.deleteById(ownerId);
		
		return new ResponseEntity<String>("Owner deleted Successfully", HttpStatus.OK);
	}
	
}
