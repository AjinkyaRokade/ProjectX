package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.Entities.Appointment;
import com.app.exception.PropertyPolicyException;
import com.app.exception.resourceNotFoundException;
import com.app.service.AppointmentServiceImpl;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

	@Autowired
	private AppointmentServiceImpl appServ;
	
	@GetMapping("/book/{propId}/{buyerId}")
	public ResponseEntity<String> bookAppointment(@PathVariable Long propId, @PathVariable Long buyerId, @RequestParam String dates) throws resourceNotFoundException, PropertyPolicyException{
		return appServ.bookAppointment(propId, buyerId, dates);
	}
	
	@DeleteMapping("/cancel/{apptId}")
	public ResponseEntity<String> cancelAppointment(@PathVariable Long apptId){
		return appServ.cancelAppointment(apptId);
	}
	
	@GetMapping("/showbuyer/{buyerId}")
	public List<Appointment> showAllAppointmentsOfBuyer(@PathVariable Long buyerId) throws resourceNotFoundException{
		return  appServ.showAllAppointmentsOfBuyer(buyerId);
		
	}
}
