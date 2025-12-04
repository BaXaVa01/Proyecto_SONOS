package org.sonos.backend.config;

import org.sonos.backend.model.Zone;
import org.sonos.backend.repository.ZoneRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class ZoneSeeder {

    @Bean
    CommandLineRunner initZones(ZoneRepository repository) {
        return args -> {
            // Solo insertamos si la base de datos está vacía
            if (repository.count() == 0) {
                List<Zone> zonas = List.of(
                        crearZona("Sala de Juntas A", "DISPONIBLE"),
                        crearZona("Sala de Juntas B", "OCUPADA"),
                        crearZona("Cabina Telefónica 1", "DISPONIBLE"),
                        crearZona("Cabina Telefónica 2", "MANTENIMIENTO"),
                        crearZona("Auditorio Principal", "OCUPADA")
                );
                repository.saveAll(zonas);
                System.out.println("--- DATOS DE PRUEBA DE ZONAS CARGADOS ---");
            }
        };
    }

    private Zone crearZona(String name, String status) {
        Zone zone = new Zone();
        zone.setName(name);
        zone.setStatus(status);
        zone.setStartTime(LocalDateTime.now());
        // zone.setEndTime(...) opcional
        return zone;
    }
}