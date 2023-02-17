package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.HistoryOrder;
import com.mycompany.myapp.domain.User;
import java.time.Instant;
import java.util.Date;

public class HistoryOrderDTO {

    private Long orderId;

    private String orderNumber;

    private Long quantityCaptcha;

    private Integer totalCost;

    private String orderStatus;

    private User user;

    private Instant createdDate;

    private String createdBy;

    public HistoryOrderDTO() {}

    public HistoryOrderDTO(HistoryOrder order) {
        this.orderId = order.getOrderId();
        this.orderNumber = order.getOrderNumber();
        this.quantityCaptcha = order.getQuantityCaptcha();
        this.totalCost = order.getTotalCost();
        this.orderStatus = order.getOrderStatus();
        this.user = order.getUser();
        this.createdDate = order.getCreatedDate();
        this.createdBy = order.getCreatedBy();
    }

    public HistoryOrderDTO(
        Long orderId,
        String orderNumber,
        Long quantityCaptcha,
        Integer totalCost,
        String orderStatus,
        User user,
        Instant createdDate,
        String createdBy
    ) {
        this.orderId = orderId;
        this.orderNumber = orderNumber;
        this.quantityCaptcha = quantityCaptcha;
        this.totalCost = totalCost;
        this.orderStatus = orderStatus;
        this.user = user;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
    }

    public static HistoryOrderDTO toHistoryOrderDTOs(HistoryOrder order) {
        return new HistoryOrderDTO(
            order.getOrderId(),
            order.getOrderNumber(),
            order.getQuantityCaptcha(),
            order.getTotalCost(),
            order.getOrderStatus(),
            order.getUser(),
            order.getCreatedDate(),
            order.getCreatedBy()
        );
    }

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

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}
