package com.navkalpana.repo;

import com.navkalpana.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {
}