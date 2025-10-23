package org.sonos.backend.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

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

    @Transactional
    public TempUserDTO create(TempUserDTO in) {
        var u = new TempUser();
        u.setPasswordHash(encoder.encode(in.password()));
        u.setValidFrom(in.validFrom());
        u.setValidTo(in.validTo());
        u.setRooms(in.rooms());
        u.setActive(in.active() == null ? true : in.active());
        return toDto(repo.save(u));
    }

    @Transactional
    public TempUserDTO update(String id, TempUserDTO in) {
        var u = repo.findById(id).orElseThrow();
        if (in.password() != null && !in.password().isBlank())
            u.setPasswordHash(encoder.encode(in.password()));
        if (in.validFrom() != null) u.setValidFrom(in.validFrom());
        if (in.validTo() != null) u.setValidTo(in.validTo());
        if (in.rooms() != null) u.setRooms(in.rooms());
        if (in.active() != null) u.setActive(in.active());
        return toDto(repo.save(u));
    }

    public void delete(String id) { repo.deleteById(id); }

    private TempUserDTO toDto(TempUser u) {
        return new TempUserDTO(
                u.getId(),
                null, // nunca devolvemos la contraseña
                u.getValidFrom(),
                u.getValidTo(),
                u.getRooms(),
                u.isActive()
        );
    }
}
