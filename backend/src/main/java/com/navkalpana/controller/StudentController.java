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
@RequiredArgsConstructor
@CrossOrigin
public class StudentController {

    private final StudentService service;

    // ✅ Add single student (admin purpose)
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return service.saveRaw(student);
    }

    // ✅ Bulk insert
    @PostMapping("/bulk")
    public List<Student> addAllStudents(@RequestBody List<Student> students) {
        return service.saveAllStudents(students);
    }

    // ✅ Get all students
    @GetMapping
    public List<StudentListResponse> getAll() {
        return service.getAll();
    }

    // ✅ Search students
    @GetMapping("/search")
    public List<StudentListResponse> search(@RequestParam String q) {
        return service.search(q);
    }

    // ✅ Filter by Batch (updated)
    @GetMapping("/batch/{batchId}")
    public List<StudentListResponse> byBatch(@PathVariable Long batchId) {
        return service.filterByBatch(batchId);
    }

    // ✅ Summary cards
    @GetMapping("/summary")
    public StudentSummaryResponse summary() {
        return service.summary();
    }

    // ✅ Detail modal
    @GetMapping("/{id}")
    public StudentDetailResponse detail(@PathVariable Long id) {
        return service.detail(id);
    }
}