package com.navkalpana.entity;

import com.navkalpana.entity.Quiz;
import com.navkalpana.entity.Student;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_attempts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer score;

    private Integer attemptNumber;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Quiz quiz;

    @CreationTimestamp
    private LocalDateTime attemptedAt;
}