package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.DTO.propertyDTO;
import com.app.Entities.Property;
import com.app.Entities.PropertyFor;
import com.app.Entities.Status;
import com.app.Entities.Type;
import com.app.Repository.propertyRepository;

@Service
@Transactional
public class propertyServiceImpl implements propertyServiceInterface {

	@Autowired
	private propertyRepository propRepo;
	@Autowired
	private ModelMapper mapper;
	@Override
	public ResponseEntity<String> addNewProperty(propertyDTO property) {
		String msg="new Property has been added";
		Property prop = mapper.map(property, Property.class);
		propRepo.save(prop);
		return new ResponseEntity<String>(msg, HttpStatus.OK);
	}
	
	
	@Override
	public List<Property> getAllProperties() {
		return propRepo.findAll();
	}
	
	@Override
	public ResponseEntity<String> deleteProperty(Long propid) {
		
		 propRepo.deleteById(propid);
		 return new ResponseEntity<String>("Property deleted successfully", HttpStatus.OK);
	}
	
	@Override
	public ResponseEntity<String> updateProperty(propertyDTO property) {
		String msg="Property details have been updated";
		Property prop=  mapper.map(property, Property.class);
		propRepo.save(prop);
		return new ResponseEntity<String>(msg, HttpStatus.OK);
	}
	
	@Override
	public List<Property> getAllPropertiesInCity(String city) {
		
		return propRepo.findByAddressCity(city);
	}
	
	@Override
	public List<Property> getAllPropertiesByType(String type) {
		return propRepo.findByPropType(Type.valueOf(type.toUpperCase()));
	}
	
	@Override
	public List<Property> getAllPropertiesByPropertyFor(String propfor) {
		return propRepo.findByPropertyFor(PropertyFor.valueOf(propfor.toUpperCase()));
	}
	
	@Override
	public Property getPropertyById(Long propId) {
		Property property = propRepo.findById(propId).get();
		property.getImages().size();
		return property;	
	}
	
	@Override
	public List<Property> getAllApprovedProperties() {
		return propRepo.findByStatus(Status.APPROVED);
	}

	
	
}
