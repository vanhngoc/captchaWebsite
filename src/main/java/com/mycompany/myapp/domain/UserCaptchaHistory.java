package com.mycompany.myapp.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Table(name = "jhi_user_captcha_history")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UserCaptchaHistory extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "transaction_amount")
    private int transactionAmount;

    @Column(name = "transaction_date")
    private LocalDateTime transactionDate;

    @Column(name = "user_ip")
    private String userIp;

    @Column(name = "captcha")
    private String captcha;

    public UserCaptchaHistory(
        User user,
        Long transactionId,
        int transactionAmount,
        LocalDateTime transactionDate,
        String userIp,
        String captcha
    ) {
        this.user = user;
        this.transactionId = transactionId;
        this.transactionAmount = transactionAmount;
        this.transactionDate = transactionDate;
        this.userIp = userIp;
        this.captcha = captcha;
    }

    public UserCaptchaHistory() {}

    public String getUserIp() {
        return userIp;
    }

    public void setUserIp(String userIp) {
        this.userIp = userIp;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public int getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(int transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getCaptcha() {
        return captcha;
    }

    public void setCaptcha(String captcha) {
        this.captcha = captcha;
    }

    @Override
    public String toString() {
        return (
            "UserCaptchaHistory{" +
            "userId=" +
            user +
            ", transactionId='" +
            transactionId +
            '\'' +
            ", transactionAmount=" +
            transactionAmount +
            ", transactionDate=" +
            transactionDate +
            '}'
        );
    }
}
