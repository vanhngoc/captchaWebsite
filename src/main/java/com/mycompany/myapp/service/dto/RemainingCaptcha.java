package com.mycompany.myapp.service.dto;

public class RemainingCaptcha {

    private Long remainingCaptcha;

    public Long getRemainingCaptcha() {
        return remainingCaptcha;
    }

    public void setRemainingCaptcha(Long remainingCaptcha) {
        this.remainingCaptcha = remainingCaptcha;
    }

    public RemainingCaptcha(Long remainingCaptcha) {
        this.remainingCaptcha = remainingCaptcha;
    }
}
