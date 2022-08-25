package com.example.chatapp.service;

import com.example.chatapp.domain.Chat;
import com.example.chatapp.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class ChatService {
    private final ChatRepository chatRepository;

    public Flux<Chat> getMessage(String sender, String receiver) {
        return chatRepository.findBySender(sender, receiver)
                .subscribeOn(Schedulers.boundedElastic());
    }

    public Mono<Chat> setMessage(Chat chat) {
        chat.setSendAt(LocalDateTime.now());
        return chatRepository.save(chat);
    }

}
