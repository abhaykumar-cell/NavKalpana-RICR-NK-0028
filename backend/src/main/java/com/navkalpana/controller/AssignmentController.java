package com.navkalpana.controller;




import com.navkalpana.dto.request.AssignmentRequest;
import com.navkalpana.entity.Assignment;
import com.navkalpana.services.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;

    @PostMapping
    public Assignment createAssignment(@RequestBody AssignmentRequest request) {
        return assignmentService.createAssignment(request);
    }

    @PutMapping("/{id}")
    public Assignment updateAssignment(@PathVariable Long id,
                                       @RequestBody AssignmentRequest request) {
        return assignmentService.updateAssignment(id, request);
    }

    @GetMapping("/{id}")
    public Assignment getAssignment(@PathVariable Long id) {
        return assignmentService.getAssignmentById(id);
    }

    @GetMapping("/lesson/{lessonId}")
    public List<Assignment> getAssignmentsByLesson(@PathVariable Long lessonId) {
        return assignmentService.getAssignmentsByLesson(lessonId);
    }

    @DeleteMapping("/{id}")
    public void deleteAssignment(@PathVariable Long id) {
        assignmentService.deleteAssignment(id);
    }
}