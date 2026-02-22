package com.navkalpana.repo;

import com.navkalpana.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student,Long> {
    List<Student> findByCourse_Id(Long courseId);

    List<Student> findByStatus(Student.StudentStatus status);

    @Query("""
        SELECT s FROM Student s
        WHERE LOWER(s.name) LIKE LOWER(CONCAT('%',:q,'%'))
        OR LOWER(s.email) LIKE LOWER(CONCAT('%',:q,'%'))
        OR LOWER(s.enrollmentId) LIKE LOWER(CONCAT('%',:q,'%'))
    """)
    List<Student> search(String q);

}
