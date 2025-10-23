package org.sonos.backend.sala.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "equipos")
public class Equipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEquipo;

    private String nombre;
    private String ipLocal;
    private Boolean activo;

    @ManyToOne
    @JoinColumn(name = "id_sala")
    private Sala sala;
}
