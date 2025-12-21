package com.schemebridge.schemebridge.dto;

import com.schemebridge.schemebridge.model.Scheme;

public class SchemeRecommendationDto {
    private Scheme scheme;
    private String reason;

    public SchemeRecommendationDto(Scheme scheme, String reason) {
        this.scheme = scheme;
        this.reason = reason;
    }

    public Scheme getScheme() {
        return scheme;
    }

    public void setScheme(Scheme scheme) {
        this.scheme = scheme;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
