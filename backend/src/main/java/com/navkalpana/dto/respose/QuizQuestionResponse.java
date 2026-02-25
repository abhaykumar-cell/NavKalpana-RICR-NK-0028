package com.navkalpana.dto.respose;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuizQuestionResponse {

    private Long id;
    private String question;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String explanation;
    private Integer marks;
}