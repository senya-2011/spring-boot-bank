package com.example.bankcards.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "card")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @NotNull
    private AppUser user;

    @Column(name = "card_number_encrypted", nullable = false, length = 512)
    @NotBlank
    @Size(max = 512)
    private String cardNumberEncrypted;

    @Column(name = "owner_name", nullable = false, length = 150)
    @NotBlank
    @Size(max = 150)
    private String ownerName;

    @Column(name = "expiry", nullable = false)
    @NotNull
    private LocalDate expiry;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @NotNull
    private CardStatus status;

    @Column(name = "balance_minor", nullable = false)
    @Min(0)
    private long balanceMinor;
}


