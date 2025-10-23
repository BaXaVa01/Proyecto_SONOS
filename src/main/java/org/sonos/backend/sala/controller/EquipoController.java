package org.sonos.backend.sala.controller;

import org.sonos.backend.sala.model.Equipo;
import org.sonos.backend.sala.repository.EquipoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/equipos")
@CrossOrigin
public class EquipoController {

    private final EquipoRepository repo;

    public EquipoController(EquipoRepository repo) {
        this.repo = repo;
    }

    // ✅ listar todos los equipos
    @GetMapping
    public List<Equipo> listar() {
        return repo.findAll();
    }

    // ✅ listar equipos por sala
    @GetMapping("/por-sala/{idSala}")
    public List<Equipo> listarPorSala(@PathVariable Long idSala) {
        return repo.findBySalaIdSala(idSala);
    }

    // ✅ CLI simulado (SSH)
    @GetMapping("/{id}/ssh")
    public Map<String, String> simularSSH(@PathVariable Long id) {
        return Map.of("cli", "🔧 Conectado a equipo " + id + " por SSH (simulado)");
    }
}
