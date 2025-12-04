package org.sonos.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface TempUserRepository extends JpaRepository<TempUser, UUID> {
    Optional<TempUser> findByUsername(String username);
}