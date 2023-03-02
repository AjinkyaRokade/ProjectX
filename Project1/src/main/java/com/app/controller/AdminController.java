package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.Entities.Property;
import com.app.exception.resourceNotFoundException;
import com.app.service.adminServiceImpl;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private adminServiceImpl adminServ;
	
	@GetMapping("/pending")
	public List<Property> getAllPendingProperties(){
		
		return adminServ.getAllPendingProperties();
	}
	
	@GetMapping("/onhold")
	public List<Property> getAllOnholdProperties(){
		
		return adminServ.getAllOnholdProperties();
	}
	
	@GetMapping("/approve/{propid}")
	
	public ResponseEntity<String> approveProperty(@PathVariable Long propid) throws resourceNotFoundException{
		
		return adminServ.approveProperty(propid);
	}
	

}
