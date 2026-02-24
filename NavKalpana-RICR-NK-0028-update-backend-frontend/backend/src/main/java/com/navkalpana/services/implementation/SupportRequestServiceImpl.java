package com.navkalpana.services.implementation;

import com.navkalpana.dto.request.BackupScheduleRequest;
import com.navkalpana.dto.request.ReplyRequest;
import com.navkalpana.dto.request.SupportCreateRequest;
import com.navkalpana.dto.respose.SupportRequestResponse;
import com.navkalpana.entity.Course;
import com.navkalpana.entity.Student;
import com.navkalpana.entity.SupportRequest;
import com.navkalpana.entity.SupportRequest.SupportStatus;
import com.navkalpana.repo.CourseRepository;
import com.navkalpana.repo.StudentRepository;
import com.navkalpana.repo.SupportRequestRepository;
import com.navkalpana.services.SupportRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupportRequestServiceImpl implements SupportRequestService {

    private final SupportRequestRepository repository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    @Override
    public List<SupportRequestResponse> createMultiple(
            List<SupportCreateRequest> requests) {

        List<SupportRequest> supportList = requests.stream().map(req -> {

            Student student = studentRepository.findById(req.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            Course course = courseRepository.findById(req.getCourseId())
                    .orElseThrow(() -> new RuntimeException("Course not found"));

            return SupportRequest.builder()
                    .topic(req.getTopic())
                    .description(req.getDescription())
                    .attachmentUrl(req.getAttachmentUrl())
                    .status(SupportRequest.SupportStatus.PENDING)
                    .student(student)
                    .course(course)
                    .backupClassScheduled(false)
                    .build();

        }).toList();

        repository.saveAll(supportList);

        return supportList.stream()
                .map(this::mapToResponse)
                .toList();
    }
    @Override
    public List<SupportRequestResponse> getAll(Long courseId, String status) {

        List<SupportRequest> list = repository.findAll();

        if (courseId != null) {
            list = list.stream()
                    .filter(s -> s.getCourse().getId().equals(courseId))
                    .collect(Collectors.toList());
        }

        if (status != null) {
            list = list.stream()
                    .filter(s -> s.getStatus().name().equalsIgnoreCase(status))
                    .collect(Collectors.toList());
        }

        return list.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }



    @Override
    public SupportRequestResponse reply(Long id, ReplyRequest request) {
        SupportRequest support = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Support not found"));

        support.setTeacherResponse(request.getTeacherResponse());
        support.setStatus(SupportStatus.IN_PROGRESS);

        repository.save(support);

        return mapToResponse(support);
    }

    @Override
    public SupportRequestResponse markResolved(Long id) {
        SupportRequest support = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Support not found"));

        support.setStatus(SupportStatus.RESOLVED);
        support.setResolvedAt(LocalDateTime.now());

        repository.save(support);

        return mapToResponse(support);
    }

    @Override
    public SupportRequestResponse scheduleBackup(Long id, BackupScheduleRequest request) {
        SupportRequest support = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Support not found"));

        support.setBackupClassScheduled(true);
        repository.save(support);

        return mapToResponse(support);
    }

    private SupportRequestResponse mapToResponse(SupportRequest support) {
        return SupportRequestResponse.builder()
                .id(support.getId())
                .topic(support.getTopic())
                .description(support.getDescription())
                .attachmentUrl(support.getAttachmentUrl())
                .status(support.getStatus().name())
                .teacherResponse(support.getTeacherResponse())
                .solutionAttachmentUrl(support.getSolutionAttachmentUrl())
                .backupClassScheduled(support.getBackupClassScheduled())
                .studentName(support.getStudent().getName())
                .courseName(support.getCourse().getName())
                .createdAt(support.getCreatedAt())
                .resolvedAt(support.getResolvedAt())
                .build();
    }

    @Override
    public void delete(Long id) {

        SupportRequest support = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Support not found with ID: " + id));

        repository.delete(support);
    }
}
