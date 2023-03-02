package com.app.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.Entities.Buyer;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer, Long> {

}
