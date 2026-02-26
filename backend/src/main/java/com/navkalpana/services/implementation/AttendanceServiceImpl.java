//package com.navkalpana.services.implementation;
//
//
//
//import com.navkalpana.dto.request.AttendanceRequest;
//import com.navkalpana.dto.respose.AttendanceResponse;
//import com.navkalpana.entity.Attendance;
//import com.navkalpana.entity.Batch;
//import com.navkalpana.entity.Student;
//import com.navkalpana.repo.AttendanceRepository;
//import com.navkalpana.repo.BatchRepository;
//import com.navkalpana.repo.StudentRepository;
//import com.navkalpana.services.AttendanceService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class AttendanceServiceImpl implements AttendanceService {
//
//    private final AttendanceRepository attendanceRepository;
//    private final StudentRepository studentRepository;
//    private final BatchRepository batchRepository;
//
//    @Override
//    public AttendanceResponse markAttendance(AttendanceRequest request) {
//
//        if (request.getRemark() == null || request.getRemark().isBlank()) {
//            throw new RuntimeException("Remark is mandatory");
//        }
//
//        studentRepository.findById(request.getStudentId())
//                .orElseThrow(() -> new RuntimeException("Student not found"));
//
//        batchRepository.findById(request.getBatchId())
//                .orElseThrow(() -> new RuntimeException("Batch not found"));
//
//        Attendance attendance = Attendance.builder()
//                .student(Student.builder().id(request.getStudentId()).build())
//                .batch(Batch.builder().id(request.getBatchId()).build())
//                .date(request.getDate())
//                .status(request.getStatus())
//                .remark(request.getRemark())
//                .build();
//
//        attendanceRepository.save(attendance);
//
//        return mapToResponse(attendance);
//    }
//
//    @Override
//    public AttendanceResponse updateAttendance(Long id, AttendanceRequest request) {
//
//        Attendance attendance = attendanceRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Attendance not found"));
//
//        if (!attendance.isEditable()) {
//            throw new RuntimeException("Edit time expired (10 minutes rule)");
//        }
//
//        attendance.setStatus(request.getStatus());
//        attendance.setRemark(request.getRemark());
//
//        attendanceRepository.save(attendance);
//
//        return mapToResponse(attendance);
//    }
//
//    @Override
//    public List<AttendanceResponse> getBatchAttendance(Long batchId) {
//
//        return attendanceRepository.findByBatchId(batchId)
//                .stream()
//                .map(this::mapToResponse)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<AttendanceResponse> getStudentAttendance(Long studentId) {
//
//        return attendanceRepository.findByStudentId(studentId)
//                .stream()
//                .map(this::mapToResponse)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public void deleteAttendance(Long id) {
//        attendanceRepository.deleteById(id);
//    }
//
//    private AttendanceResponse mapToResponse(Attendance attendance) {
//
//        return AttendanceResponse.builder()
//                .id(attendance.getId())
//                .studentId(attendance.getStudent().getId())
//                .batchId(attendance.getBatch().getId())
//                .date(attendance.getDate())
//                .status(attendance.getStatus())
//                .remark(attendance.getRemark())
//                .build();
//    }
//}