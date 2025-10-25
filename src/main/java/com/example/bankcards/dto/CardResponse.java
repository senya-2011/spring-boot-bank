package com.example.bankcards.dto;

import com.example.bankcards.entity.CardStatus;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardResponse {
    private Long id;
    private String maskedCardNumber;
    private String ownerName;
    private LocalDate expiry;
    private CardStatus status;
    private long balanceMinor;
}


