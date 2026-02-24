package com.navkalpana.dto.request;



import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CourseRequest {

    @NotBlank(message = "Course name is required")
    @Size(min = 3, max = 100, message = "Course name must be between 3 and 100 characters")
    private String name;

    @NotNull(message = "Course type is required")
    private CourseType type;

    public enum CourseType {
        WEB,
        DSA,
        AI,
        DATA_SCIENCE,
        PROGRAMMING
    }
}