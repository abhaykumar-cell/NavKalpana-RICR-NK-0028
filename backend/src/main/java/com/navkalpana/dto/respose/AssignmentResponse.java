package com.navkalpana.dto.respose;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentResponse {

    private Long id;
    private String title;
    private String description;
    private LocalDate deadline;
    private Integer maxMarks;
    private String submissionType;
}