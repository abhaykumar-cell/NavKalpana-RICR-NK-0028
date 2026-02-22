package com.navkalpana.services;

import com.navkalpana.dto.respose.StudentDetailResponse;
import com.navkalpana.dto.respose.StudentListResponse;
import com.navkalpana.dto.respose.StudentSummaryResponse;
import com.navkalpana.entity.Student;

import java.util.List;

public interface StudentService {

    Student saveRaw(Student s);
    List<StudentListResponse> getAll();

    List<StudentListResponse> search(String q);

    List<StudentListResponse> filterByCourse(Long id);

    StudentSummaryResponse summary();

    StudentDetailResponse detail(Long id);
}
