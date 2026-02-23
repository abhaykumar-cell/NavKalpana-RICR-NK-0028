package com.navkalpana.dto.request;


import com.navkalpana.entity.Attendance.AttendanceStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AttendanceRequest {

    private Long studentId;
    private Long batchId;
    private LocalDate date;
    private AttendanceStatus status;
    private String remark;
}