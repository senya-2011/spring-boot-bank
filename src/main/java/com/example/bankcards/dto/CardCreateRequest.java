package com.example.bankcards.dto;

import com.example.bankcards.entity.CardStatus;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardCreateRequest {
    @NotBlank
    @Size(min = 12, max = 32)
    private String cardNumberPlain;

    @NotBlank
    @Size(max = 150)
    private String ownerName;

    @NotNull
    private LocalDate expiry;

    @NotNull
    private CardStatus status;
}


