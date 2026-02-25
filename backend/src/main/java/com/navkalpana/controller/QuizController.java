package com.navkalpana.controller;



import com.navkalpana.dto.request.QuizRequest;
import com.navkalpana.dto.respose.ApiResponse;
import com.navkalpana.dto.respose.QuizResponse;
import com.navkalpana.services.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @PostMapping
    public ApiResponse<QuizResponse> createQuiz(
            @RequestBody QuizRequest request) {

        return ApiResponse.success(
                HttpStatus.CREATED.value(),
                "Quiz created successfully",
                quizService.createQuiz(request)
        );
    }

    @GetMapping("/lesson/{lessonId}")
    public ApiResponse<List<QuizResponse>> getQuizzesByLesson(
            @PathVariable Long lessonId) {

        return ApiResponse.success(
                HttpStatus.OK.value(),
                "Quizzes fetched successfully",
                quizService.getQuizzesByLesson(lessonId)
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteQuiz(@PathVariable Long id) {

        quizService.deleteQuiz(id);

        return ApiResponse.success(
                HttpStatus.OK.value(),
                "Quiz deleted successfully",
                null
        );
    }
}