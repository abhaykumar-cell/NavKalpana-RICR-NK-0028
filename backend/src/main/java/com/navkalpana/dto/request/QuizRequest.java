package com.navkalpana.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class QuizRequest {

    private String title;
    private Integer duration;
    private Integer attemptLimit;
    private Long lessonId;

    private List<QuizQuestionRequest> questions;
}