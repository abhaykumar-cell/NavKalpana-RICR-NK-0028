package com.navkalpana.services.implementation;


import com.navkalpana.dto.request.QuizRequest;
import com.navkalpana.dto.request.QuizQuestionRequest;

import com.navkalpana.dto.respose.QuizQuestionResponse;
import com.navkalpana.dto.respose.QuizResponse;
import com.navkalpana.entity.Lesson;
import com.navkalpana.entity.Quiz;
import com.navkalpana.entity.QuizQuestion;
import com.navkalpana.repo.LessonRepository;
import com.navkalpana.repo.QuizRepository;
import com.navkalpana.services.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final LessonRepository lessonRepository;

    @Override
    public QuizResponse createQuiz(QuizRequest request) {

        Lesson lesson = lessonRepository.findById(request.getLessonId())
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        Quiz quiz = Quiz.builder()
                .title(request.getTitle())
                .duration(request.getDuration())
                .attemptLimit(request.getAttemptLimit())
                .lesson(lesson)
                .build();

        int totalMarks = 0;

        for (QuizQuestionRequest q : request.getQuestions()) {

            QuizQuestion question = QuizQuestion.builder()
                    .question(q.getQuestion())
                    .optionA(q.getOptionA())
                    .optionB(q.getOptionB())
                    .optionC(q.getOptionC())
                    .optionD(q.getOptionD())
                    .correctAnswer(q.getCorrectAnswer())
                    .explanation(q.getExplanation())
                    .marks(q.getMarks())
                    .quiz(quiz)
                    .build();

            quiz.getQuestions().add(question);
            totalMarks += q.getMarks();
        }

        quiz.setTotalMarks(totalMarks);

        return mapToResponse(quizRepository.save(quiz));
    }

    @Override
    public List<QuizResponse> getQuizzesByLesson(Long lessonId) {

        return quizRepository.findByLessonId(lessonId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }

    private QuizResponse mapToResponse(Quiz quiz) {

        return QuizResponse.builder()
                .id(quiz.getId())
                .title(quiz.getTitle())
                .duration(quiz.getDuration())
                .totalMarks(quiz.getTotalMarks())
                .attemptLimit(quiz.getAttemptLimit())
                .questions(
                        quiz.getQuestions().stream()
                                .map(q -> QuizQuestionResponse.builder()
                                        .id(q.getId())
                                        .question(q.getQuestion())
                                        .optionA(q.getOptionA())
                                        .optionB(q.getOptionB())
                                        .optionC(q.getOptionC())
                                        .optionD(q.getOptionD())
                                        .explanation(q.getExplanation())
                                        .marks(q.getMarks())
                                        .build()
                                ).collect(Collectors.toList())
                )
                .build();
    }
}