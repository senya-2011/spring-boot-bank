package com.example.bankcards.service;

import com.example.bankcards.dto.TransferRequest;
import com.example.bankcards.entity.Card;
import com.example.bankcards.exception.CardNotFoundException;
import com.example.bankcards.exception.CardsOwnershipException;
import com.example.bankcards.exception.InsufficientFundsException;
import com.example.bankcards.exception.SameCardTransferException;
import com.example.bankcards.repository.CardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TransferService {
    private final CardRepository cardRepository;

    public TransferService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public void transferBetweenOwnCards(String username, TransferRequest request) {
        if (request.getFromCardId().equals(request.getToCardId())) {
            throw new SameCardTransferException("Source and destination cards must be different");
        }
        Card from = cardRepository.findById(request.getFromCardId())
            .orElseThrow(() -> new CardNotFoundException("Card not found: " + request.getFromCardId()));
        Card to = cardRepository.findById(request.getToCardId())
            .orElseThrow(() -> new CardNotFoundException("Card not found: " + request.getToCardId()));
        if (!from.getUser().getUsername().equals(username) || !to.getUser().getUsername().equals(username)) {
            throw new CardsOwnershipException("Both cards must belong to the same user");
        }
        if (from.getBalanceMinor() < request.getAmountMinor()) {
            throw new InsufficientFundsException("Insufficient funds on source card");
        }
        from.setBalanceMinor(from.getBalanceMinor() - request.getAmountMinor());
        to.setBalanceMinor(to.getBalanceMinor() + request.getAmountMinor());
    }
}


