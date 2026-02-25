package com.navkalpana.services;

import com.navkalpana.entity.AssignmentSubmission;

import java.util.List;

public interface AssignmentEvaluationService {

    void submitAssignment(Long studentId, Long assignmentId, String fileUrl);

    void evaluateAssignment(Long submissionId, Integer marks, String feedback);

    List<AssignmentSubmission> getSubmissions(Long assignmentId);
}