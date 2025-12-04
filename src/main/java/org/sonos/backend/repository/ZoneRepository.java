package org.sonos.backend.repository;

import org.sonos.backend.model.Zone;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ZoneRepository extends JpaRepository<Zone, Long> {

    // Busca por status y nombre, usando "contiene" e ignorando mayúsculas/minúsculas
    Page<Zone> findByStatusIgnoreCaseContainingAndNameIgnoreCaseContaining(
            String status,
            String name,
            Pageable pageable
    );
}