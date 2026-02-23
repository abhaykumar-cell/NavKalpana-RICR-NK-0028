package com.navkalpana.auth.controller;

import com.navkalpana.auth.service.AuthService;
import com.navkalpana.dto.request.LoginTeacher;
import com.navkalpana.dto.request.RefreshTokenRequest;
import com.navkalpana.dto.request.RegisterTeacher;
import com.navkalpana.dto.respose.ApiResponse;
import com.navkalpana.dto.respose.LoginResponse;
import com.navkalpana.dto.respose.RegisterResponse;
import com.navkalpana.entity.RefreshToken;
import com.navkalpana.entity.Teacher;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private AuthService authService;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
    }


    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(
            @Valid @RequestBody RegisterTeacher registerTeacher) {

        RegisterResponse res = authService.registerTeacher(registerTeacher);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        HttpStatus.CREATED.value(),
                        "Teacher registered successfully",
                        res
                ));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@RequestBody LoginTeacher loginTeacher){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginTeacher.getEmail(), loginTeacher.getPassword()));
        String token = authService.generateJwtToken(loginTeacher.getEmail());
        String refreshToken = authService.generateRefreshToken(loginTeacher.getEmail());
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setAccessToken(token);
        loginResponse.setRefreshToken(refreshToken);

        return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK.value(),"Login Successful",loginResponse));
    }
    @GetMapping("/account")
    public ResponseEntity<ApiResponse<?>> getTeacher(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        RegisterTeacher teacher = authService.getTeacherDetails(email);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(HttpStatus.CREATED.value(),"Teacher Data Received Successfull",teacher));
    }
    @GetMapping("/admin")
    public ResponseEntity<ApiResponse<?>> getAdmin(){
        List<RegisterResponse> teacherList= authService.getAllTeachers();
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(HttpStatus.OK.value(), "Teacher's Data Fetched Successfull",teacherList));
    }
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<?>> refreshToken(
            @Valid @RequestBody RefreshTokenRequest request) {

        String newAccessToken = authService.refreshJwtToken(request.getRefreshToken());

        LoginResponse tokenResponse = LoginResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(request.getRefreshToken()) // or rotate new one
                .tokenType("Bearer")

                .build();

        return ResponseEntity.ok(
                ApiResponse.success(
                        HttpStatus.OK.value(),
                        "Access token regenerated successfully",
                        tokenResponse
                )
        );
    }

}
