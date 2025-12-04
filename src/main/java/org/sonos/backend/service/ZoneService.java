package org.sonos.backend.service;

import org.sonos.backend.model.Zone;
import org.sonos.backend.repository.ZoneRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ZoneService {

    private final ZoneRepository zoneRepository;

    public ZoneService(ZoneRepository zoneRepository) {
        this.zoneRepository = zoneRepository;
    }

    public Page<Zone> getZones(String status, String q, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        // Si no hay filtros, devolvemos todo paginado
        if ((status == null || status.isBlank()) && (q == null || q.isBlank())) {
            return zoneRepository.findAll(pageable);
        }

        String statusFilter = (status == null) ? "" : status;
        String nameFilter   = (q == null) ? "" : q;

        return zoneRepository
                .findByStatusIgnoreCaseContainingAndNameIgnoreCaseContaining(
                        statusFilter,
                        nameFilter,
                        pageable
                );
    }
}