package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.HistoryOrder;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryOrderRespository extends JpaRepository<HistoryOrder, Long> {
    List<HistoryOrder> findByUserId(Long userId);
}
