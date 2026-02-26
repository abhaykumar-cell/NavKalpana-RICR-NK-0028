package com.navkalpana.services.implementation;



import com.navkalpana.dto.request.LessonRequest;
import com.navkalpana.entity.Course;
import com.navkalpana.entity.Lesson;
import com.navkalpana.repo.CourseRepository;
import com.navkalpana.repo.LessonRepository;
import com.navkalpana.services.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;

    @Override
    public Lesson createLesson(LessonRequest request) {

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // prevent duplicate sequence number inside same course
        lessonRepository.findByCourseIdAndSequenceNumber(
                request.getCourseId(),
                request.getSequenceNumber()
        ).ifPresent(l -> {
            throw new RuntimeException("Sequence number already exists in this course");
        });

        Lesson lesson = Lesson.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .sequenceNumber(request.getSequenceNumber())
                .active(request.getActive() != null ? request.getActive() : true)
                .course(course)
                .build();

        return lessonRepository.save(lesson);
    }

    @Override
    public Lesson updateLesson(Long id, LessonRequest request) {

        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        lesson.setTitle(request.getTitle());
        lesson.setDescription(request.getDescription());
        lesson.setSequenceNumber(request.getSequenceNumber());
        lesson.setActive(request.getActive());

        return lessonRepository.save(lesson);
    }

    @Override
    public Lesson getLessonById(Long id) {
        return lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
    }

    @Override
    public List<Lesson> getLessonsByCourse(Long courseId) {
        return lessonRepository.findByCourseIdOrderBySequenceNumberAsc(courseId);
    }

    @Override
    public void deleteLesson(Long id) {
        lessonRepository.deleteById(id);
    }
}