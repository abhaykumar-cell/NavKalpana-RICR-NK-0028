package com.navkalpana.services.implementation;

import com.navkalpana.dto.respose.StudentDetailResponse;
import com.navkalpana.dto.respose.StudentListResponse;
import com.navkalpana.dto.respose.StudentSummaryResponse;
import com.navkalpana.entity.AssignmentSubmission;
import com.navkalpana.entity.Attendance;
import com.navkalpana.entity.Batch;
import com.navkalpana.entity.Student;
import com.navkalpana.exceptions.ResourceNotFoundException;
import com.navkalpana.repo.BatchRepository;
import com.navkalpana.repo.StudentRepository;
import com.navkalpana.services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository repo;
    private final BatchRepository batchRepo;

    @Override
    public Student saveRaw(Student s) {
        return repo.save(s);
    }

    @Override
    public List<StudentListResponse> getAll() {
        return repo.findAll()
                .stream()
                .map(this::mapList)
                .toList();
    }

    @Override
    public List<StudentListResponse> search(String q) {
        return repo.search(q)
                .stream()
                .map(this::mapList)
                .toList();
    }



    // 🔥 Batch filter instead of course
    @Override
    public List<StudentListResponse> filterByBatch(Long batchId) {
        return repo.findByBatch_Id(batchId)
                .stream()
                .map(this::mapList)
                .toList();
    }

    @Override
    public StudentSummaryResponse summary() {

        long total = repo.count();
        long ongoing = repo.countByStatus(Student.StudentStatus.ONGOING);
        long completed = repo.countByStatus(Student.StudentStatus.COMPLETED);

        return StudentSummaryResponse.builder()
                .total(total)
                .ongoing(ongoing)
                .completed(completed)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public StudentDetailResponse detail(Long id) {

        Student s = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // ===== Attendance Count =====
        long present = s.getAttendanceRecords().stream()
                .filter(a -> a.getStatus() == Attendance.AttendanceStatus.PRESENT)
                .count();

        long absent = s.getAttendanceRecords().stream()
                .filter(a -> a.getStatus() == Attendance.AttendanceStatus.ABSENT)
                .count();

        long late = s.getAttendanceRecords().stream()
                .filter(a -> a.getStatus() == Attendance.AttendanceStatus.LATE)
                .count();

        // ===== Assignment Submitted Count =====
        long submittedAssignments = s.getSubmissions().stream()
                .filter(sub -> sub.getStatus() == AssignmentSubmission.SubmissionStatus.SUBMITTED)
                .count();

        // ===== Quiz Passed Count (Score >= 40 Pass Logic) =====
        long passedQuizzes = s.getQuizAttempts().stream()
                .filter(q -> q.getScore() != null && q.getScore() >= 40)
                .count();

        return StudentDetailResponse.builder()
                .id(s.getId())
                .name(s.getName())
                .batch(s.getBatch().getName())
                .course(s.getBatch().getCourse().getName())
                .enrollmentId(s.getEnrollmentId())
                .status(s.getStatus())
                .attendancePercentage(s.getAttendancePercentage())
                .modules(List.of())
                .skills(List.of())
                .weeklyActivity(List.of())
                .learningStreak(0)

                .overallProgress(
                        s.getOverallGrowthIndex() != null
                                ? s.getOverallGrowthIndex().intValue()
                                : 0
                )

                .assignmentTotal(s.getSubmissions().size())
                .assignmentSubmitted((int) submittedAssignments)
                .quizTotal(s.getQuizAttempts().size())
                .quizPassed((int) passedQuizzes)

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
                .course(s.getBatch().getCourse().getName()) // indirect
                .batch(s.getBatch().getName()) // 🔥 add this in DTO also
                .modules(List.of())
                .attendancePercentage(s.getAttendancePercentage())
                .email(s.getEmail())
                .phone(s.getPhone())
                .github(s.getGithub())
                .linkedin(s.getLinkedin())
                .status(s.getStatus())
                .build();
    }

    @Override
    @Transactional
    public List<Student> saveAllStudents(List<Student> students) {

        for (Student student : students) {
            Batch batchtemp =batchRepo.findById(student.getBatch().getId()).orElseThrow(()->new ResourceNotFoundException("Batch not found with id " + student.getBatch().getId()));
            batchtemp.setTotalStudents(batchtemp.getTotalStudents() + 1);
            if (student.getBatch() == null || student.getBatch().getId() == null) {
                throw new RuntimeException("Batch ID is required for student: " + student.getName());
            }

            Batch batch = batchRepo.findById(student.getBatch().getId())
                    .orElseThrow(() ->
                            new RuntimeException("Batch not found with id: " + student.getBatch().getId())
                    );

            // attach managed batch entity
            student.setBatch(batch);
        }

        return repo.saveAll(students);
    }
}