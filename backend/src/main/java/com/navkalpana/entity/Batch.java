package com.navkalpana.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    @OneToMany(
            mappedBy = "batch",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<Student> students = new ArrayList<>();

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