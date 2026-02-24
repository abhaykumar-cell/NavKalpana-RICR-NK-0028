package com.navkalpana.dto.request;


import lombok.Data;

@Data
public class EvaluationRequest {

    private Integer obtainedMarks;
    private String feedback;
}