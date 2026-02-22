package com.navkalpana.controller;

import com.navkalpana.dto.respose.StudentDetailResponse;
import com.navkalpana.dto.respose.StudentListResponse;
import com.navkalpana.dto.respose.StudentSummaryResponse;
import com.navkalpana.entity.Student;
import com.navkalpana.services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService service;

    @PostMapping("/seed")
    public Student seed(@RequestBody Student s) {
        return service.saveRaw(s);
    }

    @GetMapping
    public List<StudentListResponse> all() {
        return service.getAll();
    }

    @GetMapping("/search")
    public List<StudentListResponse> search(@RequestParam String q) {
        return service.search(q);
    }

    @GetMapping("/course/{id}")
    public List<StudentListResponse> byCourse(@PathVariable Long id) {
        return service.filterByCourse(id);
    }

    @GetMapping("/summary")
    public StudentSummaryResponse summary() {
        return service.summary();
    }

    @GetMapping("/{id}/detail")
    public StudentDetailResponse detail(@PathVariable Long id) {
        return service.detail(id);
    }
}
