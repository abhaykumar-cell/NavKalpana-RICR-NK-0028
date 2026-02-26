package com.navkalpana.services;

import com.navkalpana.dto.request.AssignmentRequest;
import com.navkalpana.entity.Assignment;

import java.util.List;

public interface AssignmentService {

    Assignment createAssignment(AssignmentRequest request);

    Assignment updateAssignment(Long id, AssignmentRequest request);

    Assignment getAssignmentById(Long id);

    List<Assignment> getAssignmentsByLesson(Long lessonId);

    void deleteAssignment(Long id);
}