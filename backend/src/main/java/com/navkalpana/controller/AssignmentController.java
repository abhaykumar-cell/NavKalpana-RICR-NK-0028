package com.navkalpana.controller;

import com.navkalpana.dto.request.AssignmentRequest;
import com.navkalpana.entity.Assignment;
import com.navkalpana.services.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;

    @PostMapping
    public Assignment create(@RequestBody AssignmentRequest request) {
        return assignmentService.createAssignment(request);
    }

    @PutMapping("/{id}")
    public Assignment update(@PathVariable Long id,
                             @RequestBody AssignmentRequest request) {
        return assignmentService.updateAssignment(id, request);
    }

    @GetMapping("/lesson/{lessonId}")
    public List<Assignment> getByLesson(@PathVariable Long lessonId) {
        return assignmentService.getAssignmentsByLesson(lessonId);
    }
    @GetMapping("/course/{courseId}/lesson/{lessonId}")
    public ResponseEntity<?> getByCourseAndLesson(
            @PathVariable Long courseId,
            @PathVariable Long lessonId
    ) {
        return ResponseEntity.ok(
                assignmentService.getByCourseAndLesson(courseId, lessonId)
        );
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        assignmentService.deleteAssignment(id);
    }
}