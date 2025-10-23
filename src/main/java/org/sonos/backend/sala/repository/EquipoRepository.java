package org.sonos.backend.sala.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.sonos.backend.sala.model.Equipo;
import java.util.List;

public interface EquipoRepository extends JpaRepository<Equipo, Long> {
    List<Equipo> findBySalaIdSala(Long idSala);
}
