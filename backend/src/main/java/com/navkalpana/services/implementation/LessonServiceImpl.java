package com.navkalpana.services.implementation;


import com.navkalpana.dto.request.LessonRequest;
import com.navkalpana.dto.respose.LessonResponse;
import com.navkalpana.entity.Course;
import com.navkalpana.entity.Lesson;
import com.navkalpana.repo.CourseRepository;
import com.navkalpana.repo.LessonRepository;
import com.navkalpana.services.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;

    @Override
    public LessonResponse createLesson(LessonRequest request) {

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

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

        return mapToResponse(lessonRepository.save(lesson));
    }

    @Override
    public LessonResponse updateLesson(Long id, LessonRequest request) {

        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        lesson.setTitle(request.getTitle());
        lesson.setDescription(request.getDescription());
        lesson.setSequenceNumber(request.getSequenceNumber());
        lesson.setActive(request.getActive());

        return mapToResponse(lessonRepository.save(lesson));
    }

    @Override
    public LessonResponse getLessonById(Long id) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        return mapToResponse(lesson);
    }

    @Override
    public List<LessonResponse> getLessonsByCourse(Long courseId) {

        List<Lesson> lessons =
                lessonRepository.findByCourseIdOrderBySequenceNumberAsc(courseId);

        return lessons.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteLesson(Long id) {
        lessonRepository.deleteById(id);
    }

    private LessonResponse mapToResponse(Lesson lesson) {
        return LessonResponse.builder()
                .id(lesson.getId())
                .title(lesson.getTitle())
                .description(lesson.getDescription())
                .sequenceNumber(lesson.getSequenceNumber())
                .active(lesson.getActive())
                .build();
    }
}