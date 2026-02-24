package com.navkalpana.services.implementation;

import com.navkalpana.dto.request.AssignmentRequest;
import com.navkalpana.entity.Assignment;
import com.navkalpana.entity.Lesson;
import com.navkalpana.repo.AssignmentRepository;
import com.navkalpana.repo.LessonRepository;
import com.navkalpana.services.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl implements AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final LessonRepository lessonRepository;

    @Override
    public Assignment createAssignment(AssignmentRequest request) {

        Lesson lesson = lessonRepository.findById(request.getLessonId())
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        Assignment assignment = Assignment.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .deadline(request.getDeadline())
                .maxMarks(request.getMaxMarks())
                .submissionType(request.getSubmissionType())
                .lesson(lesson)
                .build();

        return assignmentRepository.save(assignment);
    }

    @Override
    public Assignment updateAssignment(Long id, AssignmentRequest request) {

        Assignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        assignment.setTitle(request.getTitle());
        assignment.setDescription(request.getDescription());
        assignment.setDeadline(request.getDeadline());
        assignment.setMaxMarks(request.getMaxMarks());
        assignment.setSubmissionType(request.getSubmissionType());

        return assignmentRepository.save(assignment);
    }

    @Override
    public Assignment getAssignmentById(Long id) {
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));
    }

    @Override
    public List<Assignment> getAssignmentsByLesson(Long lessonId) {
        return assignmentRepository.findByLessonId(lessonId);
    }

    @Override
    public void deleteAssignment(Long id) {
        assignmentRepository.deleteById(id);
    }
}