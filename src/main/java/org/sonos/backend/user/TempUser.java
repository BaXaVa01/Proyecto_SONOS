package org.sonos.backend.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "temp_users")
public class TempUser {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String username; // Agregamos esto para poder hacer login

    @NotBlank
    private String passwordHash;

    @NotNull
    private LocalDateTime validFrom;

    @NotNull
    private LocalDateTime validTo;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> rooms;

    private boolean active = true;

    // --- Getters y Setters ---
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
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