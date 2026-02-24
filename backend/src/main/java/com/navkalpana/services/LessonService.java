package com.navkalpana.services;



import com.navkalpana.dto.request.LessonRequest;
import com.navkalpana.entity.Lesson;

import java.util.List;

public interface LessonService {

    Lesson createLesson(LessonRequest request);

    Lesson updateLesson(Long id, LessonRequest request);

    Lesson getLessonById(Long id);

    List<Lesson> getLessonsByCourse(Long courseId);

    void deleteLesson(Long id);
}