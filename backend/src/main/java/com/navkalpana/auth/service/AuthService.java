package com.navkalpana.auth.service;

import com.navkalpana.auth.JwtUtil;
import com.navkalpana.auth.repo.RefreshTokenRepository;
import com.navkalpana.auth.repo.RefreshTokenService;
import com.navkalpana.auth.repo.TeacherRepository;
import com.navkalpana.dto.request.RegisterTeacher;
import com.navkalpana.dto.respose.RegisterResponse;
import com.navkalpana.entity.RefreshToken;
import com.navkalpana.entity.Teacher;
import io.jsonwebtoken.JwtParser;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.PasswordAuthentication;
import java.util.List;

@Service
public class AuthService {
    private final ModelMapper modelMapper;
    private TeacherRepository teacherRepository;
    private PasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;
    private RefreshTokenService refreshTokenService;


    public AuthService(ModelMapper modelMapper, TeacherRepository teacherRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, RefreshTokenService refreshTokenService) {
        this.modelMapper = modelMapper;
        this.teacherRepository = teacherRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
    }

    public RegisterResponse registerTeacher(RegisterTeacher registerTeacher) {
        if (teacherRepository.findByEmail(registerTeacher.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email Already Exists");
        }
        if (!registerTeacher.getRole().equals("ROLE_ADMIN") && !registerTeacher.getRole().equalsIgnoreCase("ROLE_TEACHER")) {
            throw new IllegalArgumentException("Invalid Role");
        }
        Teacher teacher =modelMapper.map(registerTeacher, Teacher.class);
        teacher.setPassword(passwordEncoder.encode(registerTeacher.getPassword()));
        Teacher res = teacherRepository.save(teacher);
        return modelMapper.map(res, RegisterResponse.class);
    }
    public String generateJwtToken(String email) {
        Teacher teacher = teacherRepository.findByEmail(email).orElseThrow(()-> new IllegalArgumentException("User not found"));
        return jwtUtil.generateToken(email, List.of(teacher.getRole()));
    }
    public RegisterTeacher getTeacherDetails(String email) {
        Teacher teacher =teacherRepository.findByEmail(email).orElseThrow(()-> new IllegalArgumentException("Teacher Not Found"));
        return modelMapper.map(teacher, RegisterTeacher.class);
    }
    public List<RegisterResponse> getAllTeachers() {
        List<Teacher> teachers = teacherRepository.findAll();
        return modelMapper.map(teachers, List.class);
    }
    public String generateRefreshToken(String email) {
        return refreshTokenService.createRefreshToken(email);
    }

    public String refreshJwtToken(String refreshToken) {
        RefreshToken token = refreshTokenService.validateRefreshToken(refreshToken);
        return generateJwtToken(token.getEmail());
    }
}

