package com.example.bankcards.util;

public final class CardNumberUtils {
    private CardNumberUtils() {}

    public static String maskPan(String plainPan) {
        if (plainPan == null || plainPan.length() < 4) {
            return "****";
        }
        String last4 = plainPan.substring(plainPan.length() - 4);
        return "**** **** **** " + last4;
    }
}


