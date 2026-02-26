package com.navkalpana.dto.respose;

import com.navkalpana.entity.Student;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StudentDetailResponse {

    private Long id;
    private String name;

    // 🔥 Batch & Course Info
    private String batch;
    private String course;

    private String enrollmentId;
    private Student.StudentStatus status;
    private Double attendancePercentage;

    // ================= COURSE TAB =================
    private List<String> modules;
    private List<String> skills;
    private List<Integer> weeklyActivity;
    private Integer learningStreak;

    // ================= PROGRESS TAB =================
    private Integer overallProgress;
    private Integer assignmentTotal;
    private Integer assignmentSubmitted;
    private Integer quizTotal;
    private Integer quizPassed;

    // ================= ATTENDANCE TAB =================
    private Integer present;
    private Integer absent;
    private Integer late;
}