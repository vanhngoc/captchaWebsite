package com.mycompany.myapp.web.rest.vm;

public class UpdateCaptchaReq {

    private String username;
    private Long captcha;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getCaptcha() {
        return captcha;
    }

    public void setCaptcha(Long captcha) {
        this.captcha = captcha;
    }
}
