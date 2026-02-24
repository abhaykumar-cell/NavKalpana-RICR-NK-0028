package com.navkalpana.dto.respose;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class SupportRequestResponse {

    private Long id;
    private String topic;
    private String description;
    private String attachmentUrl;
    private String status;

    private String teacherResponse;
    private String solutionAttachmentUrl;
    private Boolean backupClassScheduled;

    private String studentName;
    private String courseName;

    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;
}