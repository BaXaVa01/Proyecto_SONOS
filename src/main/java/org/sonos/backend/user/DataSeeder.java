package org.sonos.backend.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seed(TempUserService svc){
        return args -> {
            if (svc.list().isEmpty()) {
                svc.create(new TempUserDTO(
                        null, "abc123",
                        LocalDateTime.now().minusHours(1),
                        LocalDateTime.now().plusHours(4),
                        List.of("sala-1","sala-2"),
                        true
                ));
            }
        };
    }
}
