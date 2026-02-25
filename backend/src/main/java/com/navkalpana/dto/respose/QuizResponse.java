package com.navkalpana.dto.respose;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class QuizResponse {

    private Long id;
    private String title;
    private Integer duration;
    private Integer totalMarks;
    private Integer attemptLimit;
    private List<QuizQuestionResponse> questions;
}