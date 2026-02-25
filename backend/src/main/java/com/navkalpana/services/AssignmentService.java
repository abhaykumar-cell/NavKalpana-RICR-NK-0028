package com.navkalpana.services;

import com.navkalpana.dto.request.AssignmentRequest;
import com.navkalpana.dto.respose.AssignmentResponse;
import com.navkalpana.entity.Assignment;

import java.util.List;

public interface AssignmentService {

    Assignment createAssignment(AssignmentRequest request);

    Assignment updateAssignment(Long id, AssignmentRequest request);

    List<Assignment> getAssignmentsByLesson(Long lessonId);

    void deleteAssignment(Long id);

    List<AssignmentResponse> getByCourseAndLesson(Long courseId, Long lessonId);
}