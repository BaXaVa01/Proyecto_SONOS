package org.sonos.backend.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class TempUser {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    private String passwordHash; // guardamos hash, no texto plano

    @NotNull private LocalDateTime validFrom;
    @NotNull private LocalDateTime validTo;

    @ElementCollection
    private List<@NotBlank String> rooms;

    private boolean active = true;

    // getters/setters
    public String getId() { return id; }
    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public LocalDateTime getValidFrom() { return validFrom; }
    public void setValidFrom(LocalDateTime validFrom) { this.validFrom = validFrom; }
    public LocalDateTime getValidTo() { return validTo; }
    public void setValidTo(LocalDateTime validTo) { this.validTo = validTo; }
    public List<String> getRooms() { return rooms; }
    public void setRooms(List<String> rooms) { this.rooms = rooms; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
