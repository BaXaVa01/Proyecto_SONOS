package org.sonos.backend.sala.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import org.sonos.backend.user.TempUser;

@Data
@Entity
@Table(name = "acceso_sala")
public class AccesoSala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAcceso;

    @ManyToOne
    @JoinColumn(name = "id_usuario_temporal")
    private TempUser usuarioTemporal;

    @ManyToOne
    @JoinColumn(name = "id_sala")
    private Sala sala;

    private LocalDateTime horaInicio;
    private LocalDateTime horaFin;
    private Boolean activo;
}
