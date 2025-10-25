package com.example.bankcards.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransferRequest {
    @NotNull
    private Long fromCardId;
    @NotNull
    private Long toCardId;
    @Min(1)
    private long amountMinor;
}


