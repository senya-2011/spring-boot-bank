package com.example.bankcards.dto;

import com.example.bankcards.entity.CardStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardUpdateStatusRequest {
    @NotNull
    private CardStatus status;
}


