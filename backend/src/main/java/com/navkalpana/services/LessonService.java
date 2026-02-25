package com.navkalpana.services;



import com.navkalpana.dto.request.LessonRequest;
import com.navkalpana.dto.respose.LessonResponse;

import java.util.List;

public interface LessonService {

    LessonResponse createLesson(LessonRequest request);

    LessonResponse updateLesson(Long id, LessonRequest request);

    LessonResponse getLessonById(Long id);

    List<LessonResponse> getLessonsByCourse(Long courseId);

    void deleteLesson(Long id);
}