package org.sonos.backend.sala.service;

import org.sonos.backend.sala.model.AccesoSala;
import org.sonos.backend.sala.repository.AccesoSalaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AccesoSalaService {
    private final AccesoSalaRepository accesoRepo;

    public AccesoSalaService(AccesoSalaRepository accesoRepo) {
        this.accesoRepo = accesoRepo;
    }

    public List<AccesoSala> listar() {
        return accesoRepo.findAll();
    }

    public AccesoSala crear(AccesoSala acceso) {
        acceso.setActivo(true);
        if (acceso.getHoraInicio() == null)
            acceso.setHoraInicio(LocalDateTime.now());
        return accesoRepo.save(acceso);
    }

    public void eliminar(Long id) {
        accesoRepo.deleteById(id);
    }

    public void revocarAccesosExpirados() {
        List<AccesoSala> accesos = accesoRepo.findAll();
        LocalDateTime ahora = LocalDateTime.now();
        for (AccesoSala a : accesos) {
            if (a.getHoraFin() != null && a.getHoraFin().isBefore(ahora) && a.getActivo()) {
                a.setActivo(false);
                accesoRepo.save(a);
            }
        }
    }
}
