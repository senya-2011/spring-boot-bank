package com.example.bankcards.controller;

import com.example.bankcards.entity.AppUser;
import com.example.bankcards.entity.Card;
import com.example.bankcards.entity.CardStatus;
import com.example.bankcards.repository.AppUserRepository;
import com.example.bankcards.repository.CardRepository;
import com.example.bankcards.exception.CardNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/card-requests")
public class CardRequestController {
    private final CardRepository cardRepository;
    private final AppUserRepository userRepository;

    public CardRequestController(CardRepository cardRepository, AppUserRepository userRepository) {
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/block/{cardId}")
    public ResponseEntity<?> requestCardBlock(@PathVariable Long cardId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        AppUser user = userRepository.findByUsername(username).orElseThrow();
        
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new CardNotFoundException("Card not found: " + cardId));
        
        if (!card.getUser().getId().equals(user.getId())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Card does not belong to user"));
        }
        
        return ResponseEntity.ok(Map.of(
            "message", "Block request submitted successfully",
            "cardId", cardId,
            "status", "PENDING_ADMIN_APPROVAL"
        ));
    }
}
