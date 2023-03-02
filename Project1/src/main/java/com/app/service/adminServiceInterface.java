package com.app.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.app.Entities.Property;
import com.app.exception.resourceNotFoundException;

public interface adminServiceInterface {

	List<Property> getAllPendingProperties();

	List<Property> getAllOnholdProperties();

	ResponseEntity<String> approveProperty(Long propid) throws resourceNotFoundException;

	
}
