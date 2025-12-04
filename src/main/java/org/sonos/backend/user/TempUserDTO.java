package org.sonos.backend.user;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record TempUserDTO(
        UUID id,
        String username, // Nuevo campo
        String password,
        LocalDateTime validFrom,
        LocalDateTime validTo,
        List<String> rooms,
        Boolean active
) {}