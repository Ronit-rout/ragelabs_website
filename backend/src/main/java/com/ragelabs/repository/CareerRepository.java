package com.ragelabs.repository;

import com.ragelabs.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CareerRepository extends JpaRepository<JobApplication, Long> {
}
