package org.sonos.backend.user;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

public record TempUserDTO(
        String id,
        @Size(min=6, max=40) String password, // solo se usa al crear/actualizar
        @NotNull LocalDateTime validFrom,
        @NotNull LocalDateTime validTo,
        @NotNull List<@NotBlank String> rooms,
        Boolean active
) {}
