package com.navkalpana.dto.request;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterTeacher {




    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password; // Will store BCrypt hashed password

    @NotBlank(message = "Designation is required")
    private String designation;

    @NotBlank(message = "Role is required")
    @Pattern(regexp = "ROLE_TEACHER|ROLE_ADMIN",
            message = "Role must be ROLE_TEACHER or ROLE_ADMIN")
    private String role;


}
