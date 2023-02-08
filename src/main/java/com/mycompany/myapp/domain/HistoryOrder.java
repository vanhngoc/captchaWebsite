package com.mycompany.myapp.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Table(name = "jhi_history_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HistoryOrder extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(name = "order_number")
    private String orderNumber;

    @Column(name = "quantity_captcha")
    private Long quantityCaptcha;

    @Column(name = "total_cost")
    private Integer totalCost;

    @Column(name = "order_status")
    private String orderStatus;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Long getQuantityCaptcha() {
        return quantityCaptcha;
    }

    public void setQuantityCaptcha(Long quantityCaptcha) {
        this.quantityCaptcha = quantityCaptcha;
    }

    public Integer getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Integer totalCost) {
        this.totalCost = totalCost;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return (
            "HistoryOrder{" +
            "orderId=" +
            orderId +
            ", orderNumber='" +
            orderNumber +
            '\'' +
            ", quantityCaptcha=" +
            quantityCaptcha +
            ", totalCost=" +
            totalCost +
            ", orderStatus='" +
            orderStatus +
            '\'' +
            '}'
        );
    }
}
