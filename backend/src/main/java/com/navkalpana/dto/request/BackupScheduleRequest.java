package com.navkalpana.dto.request;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BackupScheduleRequest {
    private LocalDateTime scheduledDateTime;
}