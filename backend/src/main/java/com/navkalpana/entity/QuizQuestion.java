package com.navkalpana.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "quiz_questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;

    private String correctAnswer;

    private String explanation;

    private Integer marks;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;
}