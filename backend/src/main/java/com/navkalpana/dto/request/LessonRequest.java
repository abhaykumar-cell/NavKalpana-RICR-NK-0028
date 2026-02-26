package com.navkalpana.dto.request;


import lombok.Data;

@Data
public class LessonRequest {

    private String title;
    private String description;
    private Integer sequenceNumber;
    private Boolean active;
    private Long courseId;
}