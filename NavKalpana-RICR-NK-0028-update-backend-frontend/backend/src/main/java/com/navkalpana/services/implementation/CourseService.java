package com.navkalpana.services.implementation;

import com.navkalpana.dto.request.CourseRequest;

import com.navkalpana.dto.respose.CourseResponse;
import com.navkalpana.dto.respose.StudentListResponse;
import com.navkalpana.entity.Course;
import com.navkalpana.repo.CourseRepository;
import com.navkalpana.repo.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final ModelMapper modelMapper;


    public CourseResponse createCourse(CourseRequest request) {
        Course name = courseRepository.findByName(request.getName()).orElse(null);
        if (name != null) {
            System.out.println(name.getName() + " already exists");
            throw new IllegalArgumentException("Course with name " + request.getName() + " already exists" );
        }


        Course course = Course.builder()
                .name(request.getName())
                .type(Course.CourseType.valueOf(request.getType().name()))
                .build();

        Course res = courseRepository.save(course);
        System.out.println(res.getId());

        return modelMapper.map(res, CourseResponse.class) ;
    }

    public List<StudentListResponse> getStudentsByCourse(Long courseId) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return course.getBatches()
                .stream()
                .flatMap(batch -> batch.getStudents().stream())
                .map(student -> modelMapper.map(student, StudentListResponse.class))
                .toList();
    }

    public List<CourseResponse> getAllCourses() {
        return courseRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return mapToResponse(course);
    }


    public CourseResponse updateCourse(Long id, CourseRequest request) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.setName(request.getName());
        course.setType(Course.CourseType.valueOf(request.getType().name()));

        courseRepository.save(course);

        return mapToResponse(course);
    }


    public void deleteCourse(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        courseRepository.delete(course);
    }

    private CourseResponse mapToResponse(Course course) {
        return CourseResponse.builder()
                .id(course.getId())
                .name(course.getName())
                .type(course.getType().name())
                .totalBatches(course.getBatches().size())
                .createdAt(course.getCreatedAt())
                .build();
    }
}