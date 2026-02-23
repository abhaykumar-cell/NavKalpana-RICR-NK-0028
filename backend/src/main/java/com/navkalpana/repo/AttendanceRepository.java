package com.navkalpana.repo;



import com.navkalpana.entity.Attendance;
import com.navkalpana.entity.Batch;
import com.navkalpana.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByStudentAndBatchAndDate(
            Student student,
            Batch batch,
            LocalDate date
    );

    List<Attendance> findByBatch(Batch batch);

    List<Attendance> findByStudent(Student student);

    List<Attendance> findByBatchAndDate(
            Batch batch,
            LocalDate date
    );

    boolean existsByBatchAndDate(Batch batch, LocalDate date);
}