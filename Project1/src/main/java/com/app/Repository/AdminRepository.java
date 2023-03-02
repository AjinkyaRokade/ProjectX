package com.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.Entities.Admin;
import com.app.Entities.Property;
import com.app.Entities.Status;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {


}
