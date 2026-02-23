package com.navkalpana.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
@Entity
@Table(name = "refresh_tokens")
@Data
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String token;
    private Date expiryDate;
}
