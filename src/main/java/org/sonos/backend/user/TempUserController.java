package org.sonos.backend.user;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/temp-users")
public class TempUserController {
    private final TempUserService service;

    public TempUserController(TempUserService service) { this.service = service; }

    @GetMapping
    public List<TempUserDTO> list() { return service.list(); }

    @PostMapping
    public TempUserDTO create(@Valid @RequestBody TempUserDTO in) { return service.create(in); }

    @PatchMapping("/{id}")
    public TempUserDTO update(@PathVariable UUID id, @RequestBody TempUserDTO in) {
        return service.update(id, in);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) { service.delete(id); }
}