package com.navkalpana.repo;

import com.navkalpana.entity.SupportRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface SupportRequestRepository
        extends JpaRepository<SupportRequest, Long>,
        JpaSpecificationExecutor<SupportRequest> {

    List<SupportRequest> findByStatus(SupportRequest.SupportStatus status);

    List<SupportRequest> findByCourse_Id(Long courseId);

    List<SupportRequest> findByStudent_Id(Long studentId);
}
