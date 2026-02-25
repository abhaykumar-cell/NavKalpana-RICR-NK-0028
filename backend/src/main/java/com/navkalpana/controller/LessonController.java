package com.navkalpana.controller;


import com.navkalpana.dto.request.LessonRequest;
import com.navkalpana.dto.respose.ApiResponse;
import com.navkalpana.dto.respose.LessonResponse;
import com.navkalpana.services.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    @PostMapping
    public ApiResponse<LessonResponse> createLesson(
            @RequestBody LessonRequest request) {

        return ApiResponse.success(
                HttpStatus.CREATED.value(),
                "Lesson created successfully",
                lessonService.createLesson(request)
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<LessonResponse> updateLesson(
            @PathVariable Long id,
            @RequestBody LessonRequest request) {

        return ApiResponse.success(
                HttpStatus.OK.value(),
                "Lesson updated successfully",
                lessonService.updateLesson(id, request)
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<LessonResponse> getLesson(
            @PathVariable Long id) {

        return ApiResponse.success(
                HttpStatus.OK.value(),
                "Lesson fetched successfully",
                lessonService.getLessonById(id)
        );
    }

    @GetMapping("/course/{courseId}")
    public ApiResponse<List<LessonResponse>> getLessonsByCourse(
            @PathVariable Long courseId) {

        return ApiResponse.success(
                HttpStatus.OK.value(),
                "Lessons fetched successfully",
                lessonService.getLessonsByCourse(courseId)
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteLesson(@PathVariable Long id) {

        lessonService.deleteLesson(id);

        return ApiResponse.success(
                HttpStatus.OK.value(),
                "Lesson deleted successfully",
                null
        );
    }
}