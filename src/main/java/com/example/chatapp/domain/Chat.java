package com.example.chatapp.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Document(collection = "chat")
public class Chat {
    @Id
    private String id;
    private String message;
    private String sender;
    private String receiver;

    @Setter
    private LocalDateTime sendAt;
}
