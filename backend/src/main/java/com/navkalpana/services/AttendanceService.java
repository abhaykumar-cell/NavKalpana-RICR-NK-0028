package com.navkalpana.services;


import com.navkalpana.dto.request.AttendanceRequest;
import com.navkalpana.dto.respose.AttendanceResponse;

import java.util.List;

public interface AttendanceService {

    AttendanceResponse markAttendance(AttendanceRequest request);

    AttendanceResponse updateAttendance(Long id, AttendanceRequest request);

    List<AttendanceResponse> getBatchAttendance(Long batchId);

    List<AttendanceResponse> getStudentAttendance(Long studentId);

    void deleteAttendance(Long id);
}