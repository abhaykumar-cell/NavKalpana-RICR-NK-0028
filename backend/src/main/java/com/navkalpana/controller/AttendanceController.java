package com.navkalpana.controller;

import com.navkalpana.dto.request.BulkAttendanceRequest;
import com.navkalpana.dto.respose.ApiResponse;
import com.navkalpana.dto.respose.AttendanceResponse;
import com.navkalpana.dto.respose.StudentSimpleResponse;
import com.navkalpana.entity.Attendance;
import com.navkalpana.services.implementation.AttendanceService;

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    // =====================================================
    // 1️⃣ LOAD REGISTER (All Students of Batch)
    // =====================================================
    @GetMapping("/register/{batchId}")
    public ResponseEntity<ApiResponse<List<StudentSimpleResponse>>> loadRegister(
            @PathVariable Long batchId) {

        List<StudentSimpleResponse> students =
                attendanceService.loadRegister(batchId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        "Students fetched successfully",
                        students
                )
        );
    }

    // =====================================================
    // 2️⃣ MARK BULK ATTENDANCE (Register Style)
    // =====================================================
    @PostMapping("/mark-bulk")
    public ResponseEntity<ApiResponse<List<AttendanceResponse>>> markBulkAttendance(
            @RequestBody BulkAttendanceRequest request) {

        List<AttendanceResponse> savedAttendance =
                attendanceService.markBulkAttendance(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.success(
                        HttpStatus.CREATED.value(),
                        "Attendance marked successfully",
                        savedAttendance
                )
        );
    }

    // =====================================================
    // 3️⃣ EDIT ATTENDANCE (10 Min Rule, Remark Optional)
    // =====================================================
    @PutMapping("/edit/{attendanceId}")
    public ResponseEntity<ApiResponse<AttendanceResponse>> editAttendance(
            @PathVariable Long attendanceId,
            @RequestParam Attendance.AttendanceStatus status,
            @RequestParam(required = false) String remark) {

        AttendanceResponse updated =
                attendanceService.editAttendance(attendanceId, status, remark);

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        "Attendance updated successfully",
                        updated
                )
        );
    }

    // =====================================================
    // 4️⃣ VIEW ATTENDANCE BY BATCH
    // =====================================================
    @GetMapping("/batch/{batchId}")
    public ResponseEntity<ApiResponse<List<AttendanceResponse>>> getByBatch(
            @PathVariable Long batchId) {

        List<AttendanceResponse> attendanceList =
                attendanceService.getAttendanceByBatch(batchId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        "Attendance list fetched successfully",
                        attendanceList
                )
        );
    }

    // =====================================================
    // 5️⃣ VIEW ATTENDANCE BY STUDENT
    // =====================================================
    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<List<AttendanceResponse>>> getByStudent(
            @PathVariable Long studentId) {

        List<AttendanceResponse> attendanceList =
                attendanceService.getAttendanceByStudent(studentId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        "Student attendance fetched successfully",
                        attendanceList
                )
        );
    }

    // =====================================================
    // 6️⃣ VIEW REGISTER FOR SPECIFIC DATE
    // =====================================================
    @GetMapping("/batch/{batchId}/date")
    public ResponseEntity<ApiResponse<List<AttendanceResponse>>> getByBatchAndDate(
            @PathVariable Long batchId,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {

        List<AttendanceResponse> attendanceList =
                attendanceService.getAttendanceByBatchAndDate(batchId, date);

        String message = attendanceList.isEmpty()
                ? "No attendance found for selected date"
                : "Attendance fetched successfully";

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        message,
                        attendanceList
                )
        );
    }
}