package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.Entities.Property;
import com.app.Entities.Status;
import com.app.Repository.AdminRepository;
import com.app.Repository.propertyRepository;
import com.app.exception.resourceNotFoundException;

@Service
@Transactional
public class adminServiceImpl implements adminServiceInterface {

	@Autowired
	private AdminRepository adminRepo;
	@Autowired
	private propertyRepository propRepo;
	@Override
	public List<Property> getAllPendingProperties() {
		
		return propRepo.findByStatus(Status.PENDING);
	}
	
	@Override
	public List<Property> getAllOnholdProperties() {
		
		return propRepo.findByStatus(Status.ONHOLD);
	}

	@Override
	public ResponseEntity<String> approveProperty(Long propid) throws resourceNotFoundException {
		
		Property property = propRepo.findById(propid).orElseThrow(()->new resourceNotFoundException("Property's not available"));
		property.setStatus(Status.APPROVED);
		return new ResponseEntity<String>("Property has been approved", HttpStatus.OK);
		
	}

	
}
