package org.sonos.backend.sala.controller;

import org.sonos.backend.sala.model.Equipo;
import org.sonos.backend.sala.service.EquipoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipos")
@CrossOrigin
public class EquipoController {

    private final EquipoService equipoService;

    public EquipoController(EquipoService equipoService) {
        this.equipoService = equipoService;
    }

    @GetMapping
    public List<Equipo> listar() {
        return equipoService.listar();
    }

    @PostMapping
    public Equipo crear(@RequestBody Equipo equipo) {
        return equipoService.crear(equipo);
    }

    @PutMapping("/{id}")
    public Equipo actualizar(@PathVariable Long id, @RequestBody Equipo equipo) {
        return equipoService.actualizar(id, equipo);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        equipoService.eliminar(id);
    }
}
