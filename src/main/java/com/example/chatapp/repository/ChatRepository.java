package com.example.chatapp.repository;

import com.example.chatapp.domain.Chat;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

/**
 * Flux: 비동기적으로 하나의 스레드로 구분하는 것이 아닌 Flux 흐름(=Stream) <br>
 * response 를 유지하면서 데이터는 흐름
 *
 * @author jongminChung
 */
public interface ChatRepository extends ReactiveMongoRepository<Chat, String> {

    /**
     * @Tailable: flux 응답을 cursor를 안 닫고 listening
     */
    @Tailable
    @Query("{sender: ?0, receiver: ?1}")
    Flux<Chat> findBySender(String sender, String receiver);

}
