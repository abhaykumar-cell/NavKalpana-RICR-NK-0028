package com.navkalpana.services.implementation;

import com.navkalpana.dto.respose.StudentDetailResponse;
import com.navkalpana.dto.respose.StudentListResponse;
import com.navkalpana.dto.respose.StudentSummaryResponse;
import com.navkalpana.entity.Student;
import com.navkalpana.repo.StudentRepository;
import com.navkalpana.services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.navkalpana.entity.Attendance;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository repo;

    public Student saveRaw(Student s) {
        return repo.save(s);
    }

    public List<StudentListResponse> getAll() {
        return repo.findAll().stream()
                .map(this::mapList)
                .toList();
    }


    public List<StudentListResponse> search(String q) {
        return repo.search(q).stream()
                .map(this::mapList)
                .toList();
    }


    public List<StudentListResponse> filterByCourse(Long id) {
        return repo.findByCourse_Id(id).stream()
                .map(this::mapList)
                .toList();
    }


    public StudentSummaryResponse summary() {

        List<Student> all = repo.findAll();

        long ongoing = all.stream()
                .filter(s -> s.getStatus() == Student.StudentStatus.ONGOING)
                .count();

        long completed = all.stream()
                .filter(s -> s.getStatus() == Student.StudentStatus.COMPLETED)
                .count();

        return StudentSummaryResponse.builder()
                .total(all.size())
                .ongoing(ongoing)
                .completed(completed)
                .build();
    }


    public StudentDetailResponse detail(Long id) {

        Student s = repo.findById(id).orElseThrow();

        long present = s.getAttendanceRecords().stream()
                .filter(a -> a.getStatus() == Attendance.AttendanceStatus.PRESENT)
                .count();

        long absent = s.getAttendanceRecords().stream()
                .filter(a -> a.getStatus() == Attendance.AttendanceStatus.ABSENT)
                .count();

        long late = s.getAttendanceRecords().stream()
                .filter(a -> a.getStatus() == Attendance.AttendanceStatus.LATE)
                .count();

        return StudentDetailResponse.builder()
                .id(s.getId())
                .name(s.getName())
                .course(s.getCourse().getName())
                .enrollmentId(s.getEnrollmentId())
                .status(s.getStatus())
                .attendancePercentage(s.getAttendancePercentage())
                .modules(List.of("HTML","CSS","JS")) // dummy
                .skills(List.of("React","Node"))
                .weeklyActivity(List.of(4,6,3,7))
                .learningStreak(7)
                .overallProgress(70)
                .assignmentTotal(10)
                .assignmentSubmitted(8)
                .quizTotal(5)
                .quizPassed(4)
                .present((int) present)
                .absent((int) absent)
                .late((int) late)
                .build();
    }

    private StudentListResponse mapList(Student s) {
        return StudentListResponse.builder()
                .id(s.getId())
                .name(s.getName())
                .enrollmentId(s.getEnrollmentId())
                .course(s.getCourse().getName())
                .modules(List.of("HTML","CSS"))
                .attendancePercentage(s.getAttendancePercentage())
                .email(s.getEmail())
                .phone(s.getPhone())
                .github(s.getGithub())
                .linkedin(s.getLinkedin())
                .status(s.getStatus())
                .build();
    }
}
