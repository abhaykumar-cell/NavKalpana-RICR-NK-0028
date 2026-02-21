package com.navkalpana.dto.request;

import lombok.Data;

import java.time.LocalDate;


import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BatchRequest {

    @NotBlank(message = "Batch name is required")
    @Size(min = 3, max = 100, message = "Batch name must be between 3 and 100 characters")
    private String name;

    @NotBlank(message = "Batch type is required")
    private String type;

    @NotNull(message = "Total students is required")
    @Min(value = 1, message = "Total students must be at least 1")
    @Max(value = 1000, message = "Total students cannot exceed 1000")
    private Integer totalStudents;

    @NotNull(message = "Progress percentage is required")
    @DecimalMin(value = "0.0", message = "Progress cannot be negative")
    @DecimalMax(value = "100.0", message = "Progress cannot exceed 100")
    private Double progressPercentage;

    @NotBlank(message = "Status is required")
    private String status;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;
}