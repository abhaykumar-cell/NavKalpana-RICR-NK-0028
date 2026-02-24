package com.navkalpana.repo;



import com.navkalpana.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByBatchId(Long batchId);

    List<Attendance> findByStudentId(Long studentId);

    List<Attendance> findByBatchIdAndDate(Long batchId, LocalDate date);

    Optional<Attendance> findByStudentIdAndBatchIdAndDate(
            Long studentId,
            Long batchId,
            LocalDate date
    );
}