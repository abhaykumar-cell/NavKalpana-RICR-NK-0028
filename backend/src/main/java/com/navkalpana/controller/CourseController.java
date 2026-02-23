package com.navkalpana.controller;



import com.navkalpana.dto.request.CourseRequest;

import com.navkalpana.dto.respose.ApiResponse;

import com.navkalpana.dto.respose.CourseResponse;
import com.navkalpana.services.implementation.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    // CREATE
    @PostMapping
    public ApiResponse<CourseResponse> createCourse(
            @Valid @RequestBody CourseRequest request) {

        return ApiResponse.success(
                HttpStatus.CREATED.value(),
                "Course created successfully",
                courseService.createCourse(request)
        );
    }

    // GET ALL
    @GetMapping
    public ApiResponse<List<CourseResponse>> getAllCourses() {

        return ApiResponse.success(
                HttpStatus.OK.value(),
                "Courses fetched successfully",
                courseService.getAllCourses()
        );
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ApiResponse<CourseResponse> getCourseById(@PathVariable Long id) {

        return ApiResponse.success(
                HttpStatus.OK.value(),
                "Course fetched successfully",
                courseService.getCourseById(id)
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ApiResponse<CourseResponse> updateCourse(
            @PathVariable Long id,
            @Valid @RequestBody CourseRequest request) {

        return ApiResponse.success(
                HttpStatus.OK.value(),
                "Course updated successfully",
                courseService.updateCourse(id, request)
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteCourse(@PathVariable Long id) {

        courseService.deleteCourse(id);

        return ApiResponse.success(
                HttpStatus.OK.value(),
                "Course deleted successfully",
                null
        );
    }
}