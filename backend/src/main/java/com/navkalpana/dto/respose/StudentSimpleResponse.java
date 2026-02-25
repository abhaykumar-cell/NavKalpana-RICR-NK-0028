package com.navkalpana.dto.respose;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentSimpleResponse {

    private Long id;
    private String name;
    private String enrollmentId;
}