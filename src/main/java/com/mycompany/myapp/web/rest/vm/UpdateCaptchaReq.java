package com.mycompany.myapp.web.rest.vm;

public class UpdateCaptchaReq {

    private String merchantKey;

    private Long captcha;

    private Integer totalCost;

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

    public Integer getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Integer totalCost) {
        this.totalCost = totalCost;
    }
}
