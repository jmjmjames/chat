package com.example.chatapp.controller;

import com.example.chatapp.domain.Chat;
import com.example.chatapp.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final ChatService chatService;

    /**
     * 귓속말 용도(sender, receiver 가 필요할 때 <br>
     * SSE protocol
     * Flux: data stream
     * CrossOrigin: CORS Policy inactive
     */
    @CrossOrigin
    @GetMapping(value = "/sender/{sender}/receiver/{receiver}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Chat> getMessage(@PathVariable String sender, @PathVariable String receiver) {
        return chatService.getMessage(sender, receiver);
    }

    // Mono: data 1건 return
    @CrossOrigin
    @PostMapping("/chat")
    public Mono<Chat> setMessage(@RequestBody Chat chat) {
        return chatService.setMessage(chat);
    }

}
