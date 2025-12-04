package org.sonos.backend.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seedUsers(TempUserService svc){
        return args -> {
            if (svc.list().isEmpty()) {
                // Creamos un usuario de prueba llamado "invitado1"
                svc.create(new TempUserDTO(
                        null,
                        "invitado1",   // Username
                        "password123", // Password
                        LocalDateTime.now().minusHours(1),
                        LocalDateTime.now().plusHours(4),
                        List.of("Sala de Juntas A","Cabina 1"),
                        true
                ));
                System.out.println("--- USUARIO TEMPORAL DE PRUEBA CREADO (invitado1) ---");
            }
        };
    }
}