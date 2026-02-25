package com.navkalpana.repo;

import com.navkalpana.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    List<Assignment> findByLessonId(Long lessonId);
    // By Course + Lesson
    @Query("""
        SELECT a FROM Assignment a
        WHERE a.lesson.id = :lessonId
        AND a.lesson.course.id = :courseId
    """)
    List<Assignment> findByCourseAndLesson(
            @Param("courseId") Long courseId,
            @Param("lessonId") Long lessonId
    );
}