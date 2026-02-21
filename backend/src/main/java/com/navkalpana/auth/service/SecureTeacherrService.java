package com.navkalpana.auth.service;

import com.navkalpana.auth.repo.TeacherRepository;
import com.navkalpana.entity.Teacher;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SecureTeacherrService implements UserDetailsService {
    private TeacherRepository teacherRepository;
    public SecureTeacherrService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

    Teacher teacher = teacherRepository.findByEmail(email).orElseThrow(()->new  UsernameNotFoundException("User with not found with email : "+ email));

     List< GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(teacher.getRole()));
     return new User(teacher.getEmail(), teacher.getPassword(), authorities);

    }
}