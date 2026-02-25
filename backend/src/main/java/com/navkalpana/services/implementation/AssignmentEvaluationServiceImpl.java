package com.navkalpana.services.implementation;

import com.navkalpana.entity.Assignment;
import com.navkalpana.entity.AssignmentSubmission;
import com.navkalpana.entity.Student;
import com.navkalpana.repo.AssignmentRepository;
import com.navkalpana.repo.AssignmentSubmissionRepository;
import com.navkalpana.repo.StudentRepository;
import com.navkalpana.services.AssignmentEvaluationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentEvaluationServiceImpl implements AssignmentEvaluationService {

    private final AssignmentSubmissionRepository submissionRepository;
    private final AssignmentRepository assignmentRepository;
    private final StudentRepository studentRepository;

    @Override
    public void submitAssignment(Long studentId, Long assignmentId, String fileUrl) {

        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        AssignmentSubmission submission = new AssignmentSubmission();
        submission.setAssignment(assignment);
        submission.setStudent(student);
        submission.setFileUrl(fileUrl);

        if (assignment.getDeadline().isBefore(LocalDate.now())) {
            submission.setStatus(AssignmentSubmission.SubmissionStatus.LATE_SUBMITTED);
        } else {
            submission.setStatus(AssignmentSubmission.SubmissionStatus.SUBMITTED);
        }

        submissionRepository.save(submission);
    }

    @Override
    public void evaluateAssignment(Long submissionId, Integer marks, String feedback) {

        AssignmentSubmission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submission not found"));

        submission.setMarks(marks);
        submission.setFeedback(feedback);
        submission.setStatus(AssignmentSubmission.SubmissionStatus.EVALUATED);

        submissionRepository.save(submission);

        // 🔥 UPDATE STUDENT PROGRESS TRACKER
        // call StudentProgressService.updateAssignmentScore(...)
        // 🔥 UPDATE OGI
        // call OGIService.recalculate(studentId)
    }

    @Override
    public List<AssignmentSubmission> getSubmissions(Long assignmentId) {
        return submissionRepository.findByAssignmentId(assignmentId);
    }
}