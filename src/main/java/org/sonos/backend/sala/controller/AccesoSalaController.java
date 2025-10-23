package org.sonos.backend.sala.controller;

import org.sonos.backend.sala.model.AccesoSala;
import org.sonos.backend.sala.service.AccesoSalaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accesos")
@CrossOrigin
public class AccesoSalaController {

    private final AccesoSalaService accesoService;

    public AccesoSalaController(AccesoSalaService accesoService) {
        this.accesoService = accesoService;
    }

    @GetMapping
    public List<AccesoSala> listar() {
        return accesoService.listar();
    }

    @PostMapping
    public AccesoSala crear(@RequestBody AccesoSala acceso) {
        return accesoService.crear(acceso);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        accesoService.eliminar(id);
    }

    // Endpoint para forzar la revocación manual (opcional)
    @PostMapping("/revocar-expirados")
    public void revocarExpirados() {
        accesoService.revocarAccesosExpirados();
    }
}
