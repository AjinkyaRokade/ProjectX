package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.DTO.BuyerDTO;
import com.app.Entities.Buyer;
import com.app.Entities.Property;
import com.app.Entities.Wishlist;
import com.app.Repository.BuyerRepository;
import com.app.Repository.propertyRepository;
import com.app.exception.PropertyPolicyException;
import com.app.exception.resourceNotFoundException;

@Service
@Transactional
public class BuyerServiceImpl implements BuyerServiceInterface {

	@Autowired
	private BuyerRepository buyerRepo;
	
	@Autowired
	private propertyRepository propRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public ResponseEntity<String> registerBuyer(BuyerDTO buyer) {
		Buyer buyer2 = mapper.map(buyer, Buyer.class);
		buyerRepo.save(buyer2);
		return new ResponseEntity<String>("Registered successfully" , HttpStatus.OK);
	}
	
	@Override
	public List<Buyer> getAllBuyers() {
		return buyerRepo.findAll();
	}

	@Override
	public ResponseEntity<String> updateBuyer(BuyerDTO buyer) throws resourceNotFoundException {
		Buyer buyer2 = buyerRepo.findById(buyer.getId()).orElseThrow(()->new resourceNotFoundException("Buyer's not registered"));
		
		buyer2.setAddress(buyer.getAddress());
		buyer2.setEmail(buyer.getEmail());
		buyer2.setFirstName(buyer.getFirstName());
		buyer2.setLastName(buyer.getLastName());
		buyer2.setMobNo(buyer.getMobNo());
		buyerRepo.save(buyer2);
		return new ResponseEntity<String>("Updated Successfully", HttpStatus.OK);
	}
	
	
	@Override
	public ResponseEntity<String> deleteBuyer(Long buyerId) {
		buyerRepo.deleteById(buyerId);
		return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
	}
	
	
	@Override
	public ResponseEntity<Property> addPropertyToWishlist(Long buyerId, Long propertyId) throws resourceNotFoundException, PropertyPolicyException {
		Buyer buyer = buyerRepo.findById(buyerId).orElseThrow(()->new resourceNotFoundException("Buyer Not found"));
		Property property = propRepo.findById(propertyId).orElseThrow(()->new resourceNotFoundException("Property Not found"));
		Wishlist wishlist2 = buyer.getWishlist();
		if(wishlist2!=null) {
			if(wishlist2.getProperties().contains(property)) {
				throw new PropertyPolicyException("Property Already added to wishlist");
			}
			else {
			wishlist2.getProperties().add(property);
			wishlist2.setBuyer(buyer);
			}
		}
		else {
			Wishlist wishlist=new Wishlist();
			wishlist.setBuyer(buyer);
			wishlist.getProperties().add(property);
			buyer.setWishlist(wishlist);
		}
		return new ResponseEntity<Property>(property, HttpStatus.OK);
	}

	
	
}
