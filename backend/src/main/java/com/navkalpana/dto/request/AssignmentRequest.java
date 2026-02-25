package com.navkalpana.dto.request;

import com.navkalpana.entity.Assignment.SubmissionType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AssignmentRequest {

    private String title;
    private String description;
    private LocalDate deadline;
    private Integer maxMarks;
    private SubmissionType submissionType;
    private Long lessonId;
}