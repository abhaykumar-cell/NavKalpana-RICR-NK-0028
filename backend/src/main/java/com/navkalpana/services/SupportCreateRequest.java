package com.navkalpana.services;


import lombok.Data;

@Data
public class SupportCreateRequest {

    private String topic;
    private String description;
    private String attachmentUrl;
    private Long studentId;
    private Long courseId;
}