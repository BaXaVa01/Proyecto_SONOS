package org.sonos.backend.sala.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "salas")
public class Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSala;

    private String nombre;
    private Integer capacidad;
    private String disponibilidadHoraria;

    @OneToMany(mappedBy = "sala", cascade = CascadeType.ALL)
    private List<Equipo> equipos;
}
