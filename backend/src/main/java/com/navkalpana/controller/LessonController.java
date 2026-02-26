package com.navkalpana.controller;



import com.navkalpana.dto.request.LessonRequest;
import com.navkalpana.entity.Lesson;
import com.navkalpana.services.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    @PostMapping
    public Lesson createLesson(@RequestBody LessonRequest request) {
        return lessonService.createLesson(request);
    }

    @PutMapping("/{id}")
    public Lesson updateLesson(@PathVariable Long id,
                               @RequestBody LessonRequest request) {
        return lessonService.updateLesson(id, request);
    }

    @GetMapping("/{id}")
    public Lesson getLesson(@PathVariable Long id) {
        return lessonService.getLessonById(id);
    }

    @GetMapping("/course/{courseId}")
    public List<Lesson> getLessonsByCourse(@PathVariable Long courseId) {
        return lessonService.getLessonsByCourse(courseId);
    }

    @DeleteMapping("/{id}")
    public void deleteLesson(@PathVariable Long id) {
        lessonService.deleteLesson(id);
    }
}