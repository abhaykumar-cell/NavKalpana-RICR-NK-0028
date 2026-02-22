package com.navkalpana.dto.respose;

import com.navkalpana.entity.Student;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StudentListResponse {
    private Long id;
    private String name;
    private String enrollmentId;
    private String course;

    private List<String> modules;

    private Double attendancePercentage;

    private String email;
    private String phone;
    private String github;
    private String linkedin;

    private Student.StudentStatus status;
}
