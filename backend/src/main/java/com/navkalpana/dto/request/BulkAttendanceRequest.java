package com.navkalpana.dto.request;

import com.navkalpana.entity.Attendance;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class  BulkAttendanceRequest {

    private Long batchId;
    private LocalDate date;

    private List<StudentAttendanceData> attendanceList;

    @Data
    public static class StudentAttendanceData {
        private Long studentId;
        private Attendance.AttendanceStatus status;
        private String remark;
    }
}