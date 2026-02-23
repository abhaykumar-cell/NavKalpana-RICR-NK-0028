package com.navkalpana.dto.respose;



import com.navkalpana.entity.Attendance.AttendanceStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class AttendanceResponse {

    private Long id;
    private Long studentId;
    private Long batchId;
    private LocalDate date;
    private AttendanceStatus status;
    private String remark;
}