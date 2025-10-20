package com.example.bankcards.controller;

import com.example.bankcards.dto.CardCreateRequest;
import com.example.bankcards.dto.CardResponse;
import com.example.bankcards.dto.CardUpdateStatusRequest;
import com.example.bankcards.entity.AppUser;
import com.example.bankcards.repository.AppUserRepository;
import com.example.bankcards.service.CardService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cards")
public class CardController {
    private final CardService cardService;
    private final AppUserRepository userRepository;

    public CardController(CardService cardService, AppUserRepository userRepository) {
        this.cardService = cardService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<CardResponse> create(@RequestParam Long userId,
                                               @Valid @RequestBody CardCreateRequest request) {
        AppUser user = userRepository.findById(userId).orElseThrow();
        return ResponseEntity.ok(cardService.createCard(user, request));
    }

    @PatchMapping("/{cardId}/status")
    public ResponseEntity<CardResponse> updateStatus(@PathVariable Long cardId,
                                                     @Valid @RequestBody CardUpdateStatusRequest request) {
        return ResponseEntity.ok(cardService.updateStatus(cardId, request));
    }

    @GetMapping
    public ResponseEntity<Page<CardResponse>> list(@RequestParam Long userId, Pageable pageable) {
        AppUser user = userRepository.findById(userId).orElseThrow();
        return ResponseEntity.ok(cardService.listForUser(user, pageable));
    }

    @DeleteMapping("/{cardId}")
    public ResponseEntity<Void> delete(@PathVariable Long cardId) {
        return ResponseEntity.noContent().build();
    }
}


