package com.mycompany.myapp.web.rest.vm;

public class HistoryOrderRequest {

    private String merchantKey;

    private Long quantityCaptcha;

    private Integer totalCost;

    public HistoryOrderRequest(String merchantKey, Long quantityCaptcha, Integer totalCost) {
        this.merchantKey = merchantKey;
        this.quantityCaptcha = quantityCaptcha;
        this.totalCost = totalCost;
    }

    public String getMerchantKey() {
        return merchantKey;
    }

    public void setMerchantKey(String merchantKey) {
        this.merchantKey = merchantKey;
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
}
