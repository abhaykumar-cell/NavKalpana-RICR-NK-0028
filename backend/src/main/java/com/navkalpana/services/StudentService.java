package com.navkalpana.services;

import com.navkalpana.dto.respose.StudentDetailResponse;
import com.navkalpana.dto.respose.StudentListResponse;
import com.navkalpana.dto.respose.StudentSummaryResponse;
import com.navkalpana.entity.Student;

import java.util.List;

public interface StudentService {

    // 🔹 Add single student (admin use)
    Student saveRaw(Student s);

    // 🔹 Bulk insert
    List<Student> saveAllStudents(List<Student> students);

    // 🔹 Get all students
    List<StudentListResponse> getAll();

    // 🔹 Search by name / email / enrollment / batch
    List<StudentListResponse> search(String q);

    // 🔹 Filter by Batch
    List<StudentListResponse> filterByBatch(Long batchId);

    // 🔹 Dashboard Summary
    StudentSummaryResponse summary();

    // 🔹 Student Detail View
    StudentDetailResponse detail(Long id);
}