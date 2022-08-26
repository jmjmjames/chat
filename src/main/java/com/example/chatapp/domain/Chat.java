package com.example.chatapp.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "chat")
public class Chat {
    @Id
    private String id;
    private String message;
    private String sender;
    private String receiver;
    private Long roomId;

    @Setter
    private LocalDateTime sendAt;
}
