package com.navkalpana.controller;


import com.navkalpana.dto.request.BulkAttendanceRequest;
import com.navkalpana.entity.Attendance;
import com.navkalpana.entity.Student;
import com.navkalpana.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
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
    public List<Student> loadRegister(@PathVariable Long batchId) {
        return attendanceService.loadRegister(batchId);
    }

    // =====================================================
    // 2️⃣ MARK BULK ATTENDANCE (Register Style)
    // =====================================================
    @PostMapping("/mark-bulk")
    public List<Attendance> markBulkAttendance(
            @RequestBody BulkAttendanceRequest request) {

        return attendanceService.markBulkAttendance(request);
    }

    // =====================================================
    // 3️⃣ EDIT ATTENDANCE (10 Min Rule)
    // =====================================================
    @PutMapping("/edit/{attendanceId}")
    public Attendance editAttendance(
            @PathVariable Long attendanceId,
            @RequestParam Attendance.AttendanceStatus status,
            @RequestParam String remark) {

        return attendanceService.editAttendance(attendanceId, status, remark);
    }

    // =====================================================
    // 4️⃣ VIEW ATTENDANCE BY BATCH
    // =====================================================
    @GetMapping("/batch/{batchId}")
    public List<Attendance> getByBatch(@PathVariable Long batchId) {
        return attendanceService.getAttendanceByBatch(batchId);
    }

    // =====================================================
    // 5️⃣ VIEW ATTENDANCE BY STUDENT
    // =====================================================
    @GetMapping("/student/{studentId}")
    public List<Attendance> getByStudent(@PathVariable Long studentId) {
        return attendanceService.getAttendanceByStudent(studentId);
    }

    // =====================================================
    // 6️⃣ VIEW REGISTER FOR SPECIFIC DATE
    // =====================================================
    @GetMapping("/batch/{batchId}/date")
    public List<Attendance> getByBatchAndDate(
            @PathVariable Long batchId,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {

        return attendanceService.getAttendanceByBatchAndDate(batchId, date);
    }
}