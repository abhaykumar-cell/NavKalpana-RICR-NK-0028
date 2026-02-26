package com.navkalpana.repo;


import com.navkalpana.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findByCourseIdOrderBySequenceNumberAsc(Long courseId);

    Optional<Lesson> findByCourseIdAndSequenceNumber(Long courseId, Integer sequenceNumber);
}