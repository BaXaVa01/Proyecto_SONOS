package org.sonos.backend.sala.repository;

import org.sonos.backend.sala.model.Sala;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalaRepository extends JpaRepository<Sala, Long> {}