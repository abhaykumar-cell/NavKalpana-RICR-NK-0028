package com.navkalpana.auth.repo;

import com.navkalpana.entity.RefreshToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.UUID;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    public String createRefreshToken(String email) {

        refreshTokenRepository.deleteByEmail(email);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setEmail(email);
        refreshToken.setToken(UUID.randomUUID().toString());

        long sevenDaysInMillis = 31L * 24 * 60 * 60 * 1000;
        refreshToken.setExpiryDate(
                new Date(System.currentTimeMillis() + sevenDaysInMillis)
        );

        refreshTokenRepository.save(refreshToken);
        return refreshToken.getToken();
    }

    public RefreshToken validateRefreshToken(String token) {

        RefreshToken refreshToken =
                refreshTokenRepository.findByToken(token)
                        .orElseThrow(() ->
                                new IllegalArgumentException("Invalid refresh token"));

        if (refreshToken.getExpiryDate().before(new Date())) {
            refreshTokenRepository.delete(refreshToken);
            throw new IllegalArgumentException("Refresh token expired");
        }

        return refreshToken;
    }
}