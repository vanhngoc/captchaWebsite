package com.mycompany.myapp.web.rest.vm;

public class UpdateCaptchaReq {

    private String merchantKey;
    private Long captcha;

    public String getMerchantKey() {
        return merchantKey;
    }

    public void setUsername(String merchantKey) {
        this.merchantKey = merchantKey;
    }

    public Long getCaptcha() {
        return captcha;
    }

    public void setCaptcha(Long captcha) {
        this.captcha = captcha;
    }
}
