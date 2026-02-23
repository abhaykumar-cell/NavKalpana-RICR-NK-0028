package com.navkalpana.repo;

import com.navkalpana.entity.Student;
import com.navkalpana.entity.Student.StudentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // 🔥 Filter by Batch
    List<Student> findByBatch_Id(Long batchId);

    // 🔥 Filter by Status
    List<Student> findByStatus(StudentStatus status);

    // 🔥 Optimized summary
    long countByStatus(StudentStatus status);

    // 🔥 Search by name, email, enrollmentId, batch
    @Query("""
        SELECT s FROM Student s
        WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :q, '%'))
        OR LOWER(s.email) LIKE LOWER(CONCAT('%', :q, '%'))
        OR LOWER(s.enrollmentId) LIKE LOWER(CONCAT('%', :q, '%'))
        OR LOWER(s.batch.name) LIKE LOWER(CONCAT('%', :q, '%'))
    """)
    List<Student> search(@Param("q") String q);

    // 🔥 Duplicate checks
    boolean existsByEnrollmentId(String enrollmentId);

    boolean existsByEmail(String email);
}