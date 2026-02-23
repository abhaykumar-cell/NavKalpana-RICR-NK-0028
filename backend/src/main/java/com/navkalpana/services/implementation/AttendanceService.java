package com.navkalpana.service;


import com.navkalpana.dto.request.BulkAttendanceRequest;
import com.navkalpana.entity.Attendance;
import com.navkalpana.entity.Batch;
import com.navkalpana.entity.Student;
import com.navkalpana.repo.AttendanceRepository;
import com.navkalpana.repo.BatchRepository;
import com.navkalpana.repo.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final BatchRepository batchRepository;

    // =====================================================
    // 1️⃣ LOAD REGISTER (All Students Of Batch)
    // =====================================================
    public List<Student> loadRegister(Long batchId) {

        if (!batchRepository.existsById(batchId)) {
            throw new RuntimeException("Batch not found");
        }

        return studentRepository.findByBatch_Id(batchId);
    }

    // =====================================================
    // 2️⃣ BULK ATTENDANCE MARK (REGISTER STYLE)
    // =====================================================
    @Transactional
    public List<Attendance> markBulkAttendance(BulkAttendanceRequest request) {

        Batch batch = batchRepository.findById(request.getBatchId())
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        // 🔥 Prevent duplicate attendance for same date
        if (attendanceRepository.existsByBatchAndDate(batch, request.getDate())) {
            throw new RuntimeException("Attendance already marked for this batch on this date");
        }

        List<Attendance> attendanceList = new ArrayList<>();

        for (BulkAttendanceRequest.StudentAttendanceData data : request.getAttendanceList()) {



            Student student = studentRepository.findById(data.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            Attendance attendance = Attendance.builder()
                    .student(student)
                    .batch(batch)
                    .date(request.getDate())
                    .status(data.getStatus())
                    .remark(data.getRemark())
                    .build();

            attendanceList.add(attendance);
        }

        return attendanceRepository.saveAll(attendanceList); // 🔥 Optimized bulk save
    }

    // =====================================================
    // 3️⃣ EDIT ATTENDANCE (10 MIN RULE)
    // =====================================================
    public Attendance editAttendance(Long attendanceId,
                                     Attendance.AttendanceStatus status,
                                     String remark) {

        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));

        if (!attendance.isEditable()) {
            throw new RuntimeException("Edit window expired (10 minutes rule)");
        }

        if (remark == null || remark.trim().isEmpty()) {
            throw new RuntimeException("Remark is mandatory");
        }

        attendance.setStatus(status);
        attendance.setRemark(remark);

        return attendanceRepository.save(attendance);
    }

    // =====================================================
    // 4️⃣ VIEW ATTENDANCE BY BATCH
    // =====================================================
    public List<Attendance> getAttendanceByBatch(Long batchId) {

        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        return attendanceRepository.findByBatch(batch);
    }

    // =====================================================
    // 5️⃣ VIEW ATTENDANCE BY STUDENT
    // =====================================================
    public List<Attendance> getAttendanceByStudent(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return attendanceRepository.findByStudent(student);
    }

    // =====================================================
    // 6️⃣ VIEW REGISTER FOR PARTICULAR DATE
    // =====================================================
    public List<Attendance> getAttendanceByBatchAndDate(Long batchId, LocalDate date) {

        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        return attendanceRepository.findByBatchAndDate(batch, date);
    }
}