package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.UserCaptchaHistory;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCaptchaHistoryResp extends JpaRepository<UserCaptchaHistory, Long> {
    @Cacheable(cacheNames = "userCaptchaHistory")
    List<UserCaptchaHistory> findAllByCreatedDateAfter(Instant instant);

    List<UserCaptchaHistory> findAllByCreatedDateAfterAndUserId(Instant instant, Long userId);
}
