package com.navkalpana.entity;

import com.navkalpana.entity.Lesson;
import com.navkalpana.entity.QuizQuestion;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quizzes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Integer duration; // minutes

    private Integer totalMarks;

    private Integer attemptLimit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuizQuestion> questions = new ArrayList<>();
}