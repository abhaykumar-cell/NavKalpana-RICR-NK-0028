package com.navkalpana.dto.respose;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentSummaryResponse {

        private long total;
        private long ongoing;
        private long completed;
    }

