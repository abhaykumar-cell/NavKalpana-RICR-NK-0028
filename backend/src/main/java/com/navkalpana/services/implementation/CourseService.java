package com.navkalpana.services.implementation;

import com.navkalpana.dto.request.CourseRequest;

import com.navkalpana.dto.respose.CourseResponse;
import com.navkalpana.dto.respose.StudentListResponse;
import com.navkalpana.entity.Batch;
import com.navkalpana.entity.Course;
import com.navkalpana.entity.Student;
import com.navkalpana.repo.CourseRepository;
import com.navkalpana.repo.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final ModelMapper modelMapper;
    private final CourseService courseService;
    private final StudentRepository studentRepository;


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


    public List<CourseResponse> getAllCourses() {
        return courseRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    public List<StudentListResponse> getStudentsByCourse(Long courseId) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        List<StudentListResponse> studentResponses = new ArrayList<>();

        for (Batch batch : course.getBatches()) {
            for (Student student : batch.getStudents()) {

                StudentListResponse dto =
                        modelMapper.map(student, StudentListResponse.class);

                studentResponses.add(dto);
            }
        }

        return studentResponses;
    }


    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return mapToResponse(course);
    }
    @GetMapping("/{id}/students")
    public ResponseEntity<List<StudentListResponse>> getStudentsByCourse(
            @PathVariable Long id) {

        List<StudentListResponse> students =
                courseService.getStudentsByCourse(id).getBody();

        return ResponseEntity.ok(students);
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