package org.sonos.backend.sala.service;

import org.sonos.backend.sala.model.Sala;
import org.sonos.backend.sala.repository.SalaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SalaService {
    private final SalaRepository salaRepo;
    public SalaService(SalaRepository salaRepo) { this.salaRepo = salaRepo; }

    public List<Sala> listar() { return salaRepo.findAll(); }
    public Sala crear(Sala sala) { return salaRepo.save(sala); }
    public void eliminar(Long id) { salaRepo.deleteById(id); }
}
