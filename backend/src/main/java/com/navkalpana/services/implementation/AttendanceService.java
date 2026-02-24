package com.navkalpana.services.implementation;

import com.navkalpana.dto.request.BulkAttendanceRequest;
import com.navkalpana.dto.respose.AttendanceResponse;
import com.navkalpana.dto.respose.StudentSimpleResponse;
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
    // 1️⃣ LOAD REGISTER
    // =====================================================
    public List<StudentSimpleResponse> loadRegister(Long batchId) {

        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        List<Student> students =
                studentRepository.findByBatch_Id(batch.getId());

        return students.stream()
                .map(student -> StudentSimpleResponse.builder()
                        .id(student.getId())
                        .name(student.getName())
                        .enrollmentId(student.getEnrollmentId())
                        .build())
                .toList();
    }

    // =====================================================
    // 2️⃣ BULK MARK ATTENDANCE
    // =====================================================
    @Transactional
    public List<AttendanceResponse> markBulkAttendance(BulkAttendanceRequest request) {

        Batch batch = batchRepository.findById(request.getBatchId())
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        if (attendanceRepository.existsByBatchAndDate(batch, request.getDate())) {
            throw new RuntimeException("Attendance already marked for this date");
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

        List<Attendance> savedList = attendanceRepository.saveAll(attendanceList);

        return savedList.stream()
                .map(this::toResponse)
                .toList();
    }

    // =====================================================
    // 3️⃣ EDIT ATTENDANCE
    // =====================================================
    @Transactional
    public AttendanceResponse editAttendance(Long attendanceId,
                                             Attendance.AttendanceStatus status,
                                             String remark) {

        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));

        if (!attendance.isEditable()) {
            throw new RuntimeException("Edit window expired (10 minutes rule)");
        }



        attendance.setStatus(status);
        attendance.setRemark(remark);

        return toResponse(attendanceRepository.save(attendance));
    }

    // =====================================================
    // 4️⃣ VIEW BY BATCH
    // =====================================================
    @Transactional
    public List<AttendanceResponse> getAttendanceByBatch(Long batchId) {

        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        List<Attendance> attendanceList = attendanceRepository.findByBatch(batch);

        return attendanceList.stream()
                .map(this::toResponse)
                .toList();
    }

    // =====================================================
    // 5️⃣ VIEW BY STUDENT
    // =====================================================
    @Transactional
    public List<AttendanceResponse> getAttendanceByStudent(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        List<Attendance> attendanceList = attendanceRepository.findByStudent(student);

        return attendanceList.stream()
                .map(this::toResponse)
                .toList();
    }

    // =====================================================
    // 6️⃣ VIEW REGISTER BY DATE
    // =====================================================
    @Transactional
    public List<AttendanceResponse> getAttendanceByBatchAndDate(Long batchId, LocalDate date) {

        List<Attendance> attendanceList =
                attendanceRepository.findByBatch_IdAndDate(batchId, date);

        return attendanceList.stream()
                .map(this::toResponse)
                .toList();
    }

    // =====================================================
    // 🔥 ENTITY → DTO CONVERTER
    // =====================================================
    private AttendanceResponse toResponse(Attendance attendance) {

        return AttendanceResponse.builder()
                .id(attendance.getId())

                // Student Info
                .studentId(attendance.getStudent().getId())
                .studentName(attendance.getStudent().getName())
                .enrollmentId(attendance.getStudent().getEnrollmentId())

                // Batch Info
                .batchId(attendance.getBatch().getId())

                .date(attendance.getDate())
                .status(attendance.getStatus())
                .remark(attendance.getRemark())
                .createdAt(attendance.getCreatedAt())
                .updatedAt(attendance.getUpdatedAt())
                .editable(attendance.isEditable())
                .build();
    }
}