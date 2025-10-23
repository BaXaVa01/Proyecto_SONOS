package org.sonos.backend.sala.controller;

import org.sonos.backend.sala.model.Sala;
import org.sonos.backend.sala.service.SalaService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/salas")
@CrossOrigin
public class SalaController {

    private final SalaService salaService;
    public SalaController(SalaService salaService) { this.salaService = salaService; }

    @GetMapping
    public List<Sala> listar() { return salaService.listar(); }

    @PostMapping
    public Sala crear(@RequestBody Sala sala) { return salaService.crear(sala); }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) { salaService.eliminar(id); }
}
