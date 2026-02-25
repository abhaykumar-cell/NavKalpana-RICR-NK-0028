package com.navkalpana.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "assignments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private LocalDate deadline;

    @Column(nullable = false)
    private Integer maxMarks;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SubmissionType submissionType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public enum SubmissionType {
        PDF,
        IMAGE,
        ZIP,
        DOC,
        LINK
    }
}