package com.navkalpana.dto.request;


import lombok.Data;

@Data
public class SubmissionRequest {

    private Long assignmentId;
    private Long studentId;
    private String fileUrl;
}