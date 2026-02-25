package com.navkalpana.services;



import com.navkalpana.dto.request.QuizRequest;
import com.navkalpana.dto.respose.QuizResponse;

import java.util.List;

public interface QuizService {

    QuizResponse createQuiz(QuizRequest request);

    List<QuizResponse> getQuizzesByLesson(Long lessonId);

    void deleteQuiz(Long id);
}