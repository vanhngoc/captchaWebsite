package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.HistoryOrder;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.UserCaptchaHistory;
import com.mycompany.myapp.repository.HistoryOrderRespository;
import com.mycompany.myapp.repository.UserCaptchaHistoryResp;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.dto.HistoryOrderDTO;
import com.mycompany.myapp.web.rest.vm.HistoryOrderRequest;
import com.mycompany.myapp.web.rest.vm.UserCaptchaHisReq;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import javax.cache.Cache;
import javax.cache.Cache.Entry;
import javax.cache.CacheManager;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import javax.validation.constraints.Null;
import liquibase.repackaged.net.sf.jsqlparser.expression.operators.arithmetic.Concat;
import net.logstash.logback.util.ReusableByteBuffer;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserCaptchaHistoryService {

    private final Logger log = LoggerFactory.getLogger(HistoryOrderService.class);

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private final UserCaptchaHistoryResp userCaptchaHistoryResp;

    private final UserRepository userRepository;

    public UserCaptchaHistoryService(UserCaptchaHistoryResp userCaptchaHistoryResp, UserRepository userRepository) {
        this.userCaptchaHistoryResp = userCaptchaHistoryResp;
        this.userRepository = userRepository;
    }

    // @Cacheable(value = "user_captcha_history", key = "#userId + '-' + #date")
    // public int getNumberOfCaptchaUsageForUserInDate(long userId, LocalDate date)
    // {
    // return UserCaptchaHistoryResp.getNumberOfXuUsageForUserInDate(userId, date);
    // }
    // @CachePut(value = "userCaptchaHistory", key =
    // "#userCaptchaHistory.transactionId")

    public void getAllUserCaptchaHisByUserId() {
        LocalDateTime startOfDay = LocalDateTime.now(ZoneId.of("UTC+7")).withHour(0).withMinute(0).withSecond(0).withNano(0);
        ZoneId zone = ZoneId.of("Asia/Ho_Chi_Minh");

        ZonedDateTime zonedDateTime = ZonedDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
        Instant instant = Instant.parse(startOfDay.toString() + ":00Z");
        Instant instant2 = zonedDateTime.toInstant();
        System.out.println("instant: " + instant);
        System.out.println("instan2t: " + instant2);
        Cache<String, UserCaptchaHistory> userCaptchaHistoryCache = cacheManager.getCache("userCaptchaHistory");
        Long userId = 26L;

        List<UserCaptchaHistory> listCaptchaUser = userCaptchaHistoryResp.findAllByCreatedDateAfter(instant2);
        System.out.println("listCaptchaUserSize " + listCaptchaUser.size());

        // }
        for (UserCaptchaHistory userCaptchaHistory : listCaptchaUser) {
            if (
                userCaptchaHistory.getTransactionId() == 44670L ||
                userCaptchaHistory.getTransactionId() == 44681L ||
                userCaptchaHistory.getTransactionId() == 44659L ||
                userCaptchaHistory.getTransactionId() == 44611L
            ) {
                System.out.println("userCaptchaHistory " + userCaptchaHistory.getTransactionId());
            }
            userCaptchaHistoryCache.put(userCaptchaHistory.getTransactionId().toString(), userCaptchaHistory);
        }
    }

    public Integer viewCachedData(String merchantKey) {
        Cache<String, UserCaptchaHistory> userCaptchaHistoryCache = cacheManager.getCache("userCaptchaHistory");

        Set<UserCaptchaHistory> userCaptchaHistorys = new HashSet<>();
        List<UserCaptchaHistory> captchaHistorySameKey = new ArrayList<>();
        ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("UTC+7")).withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime now = zonedDateTime.toLocalDateTime();

        LocalDateTime startTime = zonedDateTime.toLocalDateTime();
        System.out.println("startTime " + startTime);
        Iterator<Entry<String, UserCaptchaHistory>> iter = userCaptchaHistoryCache.iterator();

        Optional<User> user = userRepository.findOneByMerchantKey(merchantKey);

        int count = 0;
        int count2 = 0;
        while (iter.hasNext()) {
            UserCaptchaHistory element = iter.next().getValue();

            if (element.getUser().getId() == user.get().getId()) {
                captchaHistorySameKey.add(element);
                count2++;
            }
            count++;
        }

        System.out.println("count" + count);
        System.out.println("count2" + count2);
        if (captchaHistorySameKey.size() != 0) {
            captchaHistorySameKey.sort((a, b) -> a.getTransactionDate().compareTo(b.getTransactionDate()));
            System.out.println(captchaHistorySameKey.size());
            int left = 0;
            int right = captchaHistorySameKey.size() - 1;
            int index = -1;
            while (left <= right) {
                int mid = (left + right) / 2;
                if (captchaHistorySameKey.get(mid).getTransactionDate().isBefore(now)) {
                    left = mid + 1;
                } else {
                    index = mid;
                    right = mid - 1;
                }
            }

            List<UserCaptchaHistory> filteredList = new ArrayList<>();
            for (int i = 0; i < captchaHistorySameKey.size(); i++) {
                UserCaptchaHistory history = captchaHistorySameKey.get(i);
                if (history.getTransactionDate().isAfter(startTime)) {
                    filteredList.add(history);
                } else {
                    break;
                }
            }

            return filteredList.size();
        }
        return 0;
    }

    public void saveUserCaptchaHis(UserCaptchaHisReq userCaptchaHisReq) {
        Optional<User> user = userRepository.findOneByMerchantKey(userCaptchaHisReq.getMerchantKey());
        UserCaptchaHistory userCaptchaHistory = new UserCaptchaHistory();
        // userCaptchaHistoryReq.setUser(userRepository.getById((long) 17));
        userCaptchaHistory.setTransactionDate(LocalDateTime.now());
        userCaptchaHistory.setUserIp(userCaptchaHisReq.getUserIp());
        userCaptchaHistory.setUser(user.get());
        userCaptchaHistory.setTransactionAmount(1);
        userCaptchaHistory.setCaptcha(userCaptchaHisReq.getCaptcha());
        userCaptchaHistoryResp.save(userCaptchaHistory);

        Cache<String, UserCaptchaHistory> userCaptchaHistoryCache = cacheManager.getCache("userCaptchaHistory");
        userCaptchaHistoryCache.put(userCaptchaHistory.getTransactionId().toString(), userCaptchaHistory);
        // System.out.println("userCaptchaHistoryCache: " + userCaptchaHistoryCache.toString());
    }
}
