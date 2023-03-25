package com.mycompany.myapp.web.rest.vm;

public class UserCaptchaHisReq {

    private String merchantKey;

    private String userIp;

    private String captcha;

    public UserCaptchaHisReq(String merchantKey, String userIp, String captcha) {
        this.merchantKey = merchantKey;
        this.userIp = userIp;
        this.captcha = captcha;
    }

    public UserCaptchaHisReq() {}

    public String getMerchantKey() {
        return merchantKey;
    }

    public void setMerchantKey(String merchantKey) {
        this.merchantKey = merchantKey;
    }

    public String getUserIp() {
        return userIp;
    }

    public void setUserIp(String userIp) {
        this.userIp = userIp;
    }

    public String getCaptcha() {
        return captcha;
    }

    public void setCaptcha(String captcha) {
        this.captcha = captcha;
    }
}
