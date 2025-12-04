package org.sonos.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Registro base para todas las APIs
        CorsRegistration reg = registry.addMapping("/api/**")
                .allowedMethods("GET", "POST", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*");

        // Normalizamos y separamos los orígenes configurados
        String[] origins = Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toArray(String[]::new);

        // Si es solo "*" ⇒ usamos allowedOriginPatterns("*")
        if (origins.length == 1 && "*".equals(origins[0])) {
            reg.allowedOriginPatterns("*");
        } else {
            // Si son URLs concretas ⇒ usamos allowedOrigins(...)
            reg.allowedOrigins(origins);
        }

        // Permitimos credenciales (cookies, auth headers, etc.)
        reg.allowCredentials(true);
    }
}
