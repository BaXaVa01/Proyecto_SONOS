package org.sonos.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
public class RootController {
    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
                "app", "SONOS API",
                "status", "OK",
                "time", Instant.now().toString()
        );
    }
}
