package com.navkalpana.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,name = "batch_name")
    private String name;

    private String type; // WEB / DSA

    private Integer totalStudents;
    @Column(name = "progress_percentage")
    private Double progressPercentage;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDate startDate;
    private LocalDate endDate;

    
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    public enum Status {
        ONGOING,
        COMPLETED,
        UPCOMING
    }
}