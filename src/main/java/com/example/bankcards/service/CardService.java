package com.example.bankcards.service;

import com.example.bankcards.dto.CardCreateRequest;
import com.example.bankcards.exception.CardNotFoundException;
import com.example.bankcards.dto.CardResponse;
import com.example.bankcards.dto.CardUpdateStatusRequest;
import com.example.bankcards.entity.AppUser;
import com.example.bankcards.entity.Card;
import com.example.bankcards.repository.CardRepository;
import com.example.bankcards.util.CardNumberUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CardService {
    private final CardRepository cardRepository;
    private final CardCryptoService cryptoService;

    public CardService(CardRepository cardRepository, CardCryptoService cryptoService) {
        this.cardRepository = cardRepository;
        this.cryptoService = cryptoService;
    }

    public CardResponse createCard(AppUser user, CardCreateRequest request) {
        String encrypted = cryptoService.encrypt(request.getCardNumberPlain());
        Card card = Card.builder()
            .user(user)
            .cardNumberEncrypted(encrypted)
            .ownerName(request.getOwnerName())
            .expiry(request.getExpiry())
            .status(request.getStatus())
            .balanceMinor(0)
            .build();
        Card saved = cardRepository.save(card);
        return toResponse(saved);
    }

    public CardResponse updateStatus(Long cardId, CardUpdateStatusRequest request) {
        Card card = cardRepository.findById(cardId).orElseThrow();
        card.setStatus(request.getStatus());
        return toResponse(card);
    }

    @Transactional(readOnly = true)
    public Page<CardResponse> listForUser(AppUser user, Pageable pageable) {
        return cardRepository.findByUser(user, pageable).map(this::toResponse);
    }

    public void deleteCard(Long cardId) {
        if (!cardRepository.existsById(cardId)) {
            throw new CardNotFoundException("Card not found: " + cardId);
        }
        cardRepository.deleteById(cardId);
    }

    private CardResponse toResponse(Card card) {
        String plain = cryptoService.decrypt(card.getCardNumberEncrypted());
        return CardResponse.builder()
            .id(card.getId())
            .maskedCardNumber(CardNumberUtils.maskPan(plain))
            .ownerName(card.getOwnerName())
            .expiry(card.getExpiry())
            .status(card.getStatus())
            .balanceMinor(card.getBalanceMinor())
            .build();
    }
}


