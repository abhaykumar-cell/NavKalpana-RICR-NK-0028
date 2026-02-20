package com.navkalpana.auth.repo.auth.service;

import com.navkalpana.auth.JwtUtil;
import com.navkalpana.auth.repo.TeacherRepository;
import com.navkalpana.dto.request.RegisterTeacher;
import com.navkalpana.entity.Teacher;
import io.jsonwebtoken.JwtParser;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.PasswordAuthentication;

@Service
public class AuthService {
    private final ModelMapper modelMapper;
    private TeacherRepository teacherRepository;
    private PasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;

    public AuthService(TeacherRepository teacherRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, ModelMapper modelMapper) {
        this.teacherRepository = teacherRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.modelMapper = modelMapper;
    }

    public void registerTeacher(RegisterTeacher registerTeacher) {
        if (teacherRepository.findByEmail(registerTeacher.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email Already Exists");
        }
        Teacher teacher =modelMapper.map(registerTeacher, Teacher.class);
        teacher.setPassword(passwordEncoder.encode(registerTeacher.getPassword()));
        teacherRepository.save(teacher);
    }
    public String generateJwtToken(String email) {
        return jwtUtil.generateToken(email);
    }
    public RegisterTeacher getTeacherDetails(String email) {
        Teacher teacher =teacherRepository.findByEmail(email).orElseThrow(()-> new IllegalArgumentException("Teacher Not Found"));
        return modelMapper.map(teacher, RegisterTeacher.class);
    }
}
