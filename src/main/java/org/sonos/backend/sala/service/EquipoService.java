package org.sonos.backend.sala.service;

import org.sonos.backend.sala.model.Equipo;
import org.sonos.backend.sala.repository.EquipoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipoService {
    private final EquipoRepository equipoRepo;

    public EquipoService(EquipoRepository equipoRepo) {
        this.equipoRepo = equipoRepo;
    }

    public List<Equipo> listar() {
        return equipoRepo.findAll();
    }

    public Equipo crear(Equipo equipo) {
        return equipoRepo.save(equipo);
    }

    public void eliminar(Long id) {
        equipoRepo.deleteById(id);
    }

    public Equipo actualizar(Long id, Equipo equipoActualizado) {
        return equipoRepo.findById(id).map(equipo -> {
            equipo.setNombre(equipoActualizado.getNombre());
            equipo.setIpLocal(equipoActualizado.getIpLocal());
            equipo.setActivo(equipoActualizado.getActivo());
            equipo.setSala(equipoActualizado.getSala());
            return equipoRepo.save(equipo);
        }).orElseThrow(() -> new RuntimeException("Equipo no encontrado"));
    }
}
