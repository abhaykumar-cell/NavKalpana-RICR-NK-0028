package com.navkalpana.dto.respose;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class BatchResponse {

    private Long id;
    private String name;
    private String type;
    private Integer totalStudents;
    private Double progressPercentage;
    private String status;
    private LocalDate startDate;
    private LocalDate endDate;
}