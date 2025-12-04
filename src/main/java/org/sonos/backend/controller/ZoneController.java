package org.sonos.backend.controller;

import org.sonos.backend.model.Zone;
import org.sonos.backend.service.ZoneService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/zones")   // <-- aquí va el path
public class ZoneController {

    private final ZoneService zoneService;

    public ZoneController(ZoneService zoneService) {
        this.zoneService = zoneService;
    }

    @GetMapping
    public Page<Zone> getZones(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return zoneService.getZones(status, q, page, size);
    }
}
