package com.navkalpana.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;
    private SecretKey getSigningKey() {
        SecretKey sKey= Keys.hmacShaKeyFor(secret.getBytes());
        return sKey;
    }
    public String generateToken(String email, List<String> roles) {
        return Jwts.builder()
                .setSubject(email)
                .claim("roles", roles)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour
                .signWith(getSigningKey())
                .compact();
    }
    public Claims extractClaims(String token) {
        JwtParser jParser = Jwts.parserBuilder().setSigningKey(getSigningKey()).build();
        Jws<Claims> jwsClaims = jParser.parseClaimsJws(token);
        return jwsClaims.getBody();
    }
    public List<String> extractRoles(String token) {
        return (List<String>) extractClaims(token).get("roles");
    }

    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }
    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }
    public boolean validateToken(String token, String email) {
        return (extractEmail(token).equals(email) && !isTokenExpired(token));
    }


}
