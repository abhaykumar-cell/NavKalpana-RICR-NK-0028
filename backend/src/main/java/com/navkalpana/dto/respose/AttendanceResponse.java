package com.navkalpana.dto.respose;

import com.navkalpana.entity.Attendance.AttendanceStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class AttendanceResponse {

    private Long id;

    // Student Info
    private Long studentId;
    private String studentName;
    private String enrollmentId;

    // Batch Info
    private Long batchId;

    private LocalDate date;
    private AttendanceStatus status;
    private String remark;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private boolean editable;
}