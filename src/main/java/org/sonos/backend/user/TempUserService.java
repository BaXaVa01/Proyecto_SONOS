package org.sonos.backend.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class TempUserService {

    private final TempUserRepository repo;
    private final PasswordEncoder encoder;

    public TempUserService(TempUserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    public List<TempUserDTO> list() {
        return repo.findAll().stream().map(this::toDto).toList();
    }

    public TempUserDTO create(TempUserDTO in) {
        TempUser u = new TempUser();
        u.setUsername(in.username());
        u.setPasswordHash(encoder.encode(in.password()));
        u.setValidFrom(in.validFrom());
        u.setValidTo(in.validTo());
        u.setRooms(in.rooms());
        u.setActive(in.active() == null ? true : in.active());
        return toDto(repo.save(u));
    }

    public TempUserDTO update(UUID id, TempUserDTO in) {
        TempUser u = repo.findById(id).orElseThrow();
        if(in.username() != null) u.setUsername(in.username());
        if (in.password() != null && !in.password().isBlank())
            u.setPasswordHash(encoder.encode(in.password()));
        if (in.validFrom() != null) u.setValidFrom(in.validFrom());
        if (in.validTo() != null) u.setValidTo(in.validTo());
        if (in.rooms() != null) u.setRooms(in.rooms());
        if (in.active() != null) u.setActive(in.active());
        return toDto(repo.save(u));
    }

    public void delete(UUID id) { repo.deleteById(id); }

    private TempUserDTO toDto(TempUser u) {
        return new TempUserDTO(
                u.getId(),
                u.getUsername(),
                null,
                u.getValidFrom(),
                u.getValidTo(),
                u.getRooms(),
                u.isActive()
        );
    }
}