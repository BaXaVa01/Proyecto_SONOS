import './Colores.css';
import { useRef, useState } from 'react';

function Card({ title, children, id, delay = 0, imageSrc, imageAlt, align = 'left' }) {
  const cardRef = useRef(null);
  const leaveTimer = useRef(null);

  const handleImageEnter = () => {
    
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    if (cardRef.current) cardRef.current.classList.add('image-expanded');
  };

  const handleImageLeave = () => {
    
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      if (cardRef.current) cardRef.current.classList.remove('image-expanded');
      leaveTimer.current = null;
    }, 60);
  };

  return (
    <div ref={cardRef} className={`card card-${align}`} id={id} data-aos="fade-up" data-aos-delay={delay}>
      <div className="card-content">
        <div className="card-text">
          <h3>{title}</h3>
          <div>{children}</div>
        </div>
        {imageSrc && (
          <div
            className="card-image"
            onMouseEnter={handleImageEnter}
            onMouseLeave={handleImageLeave}
            onFocus={handleImageEnter}
            onBlur={handleImageLeave}
          >
            <img src={imageSrc} alt={imageAlt} tabIndex={0} />
          </div>
        )}
      </div>
    </div>
  );
}

function Landing() {
  const handleCTAClick = (e) => {
    e.preventDefault();
    
    window.open('/contact.html', '_blank', 'noopener');
  };
  return (
    <div className="App">
      <header className="header" data-aos="fade-down" data-aos-duration="800">
        <h1 data-aos="fade-up" data-aos-delay="300">SoundZone</h1>
      </header>

      <section className="hero" data-aos="fade-up" data-aos-duration="1000">
        {}
        <div className="floating-solids">
          <div className="solid solid-1"></div>
          <div className="solid solid-2"></div>
          <div className="solid solid-3"></div>
          <div className="solid solid-4"></div>
          <div className="solid solid-5"></div>
          <div className="solid solid-6"></div>
        </div>
        
        <h2 data-aos="fade-up" data-aos-delay="200">Revoluciona el sonido en tu casa de eventos</h2>
        <p data-aos="fade-up" data-aos-delay="400">Controla, sincroniza y transmite audio en múltiples zonas con tecnología accesible</p>
        <div className="social-icons" data-aos="fade-up" data-aos-delay="600">
          <a href="#" className="social-link instagram" aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" className="social-link x" aria-label="X (Twitter)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#" className="social-link facebook" aria-label="Facebook">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </section>

      <section className="content">
        <Card 
          title="Introducción" 
          id="intro"
          align="left"
          imageSrc="/src/assets/images/raspberry-pi-4-top.jpg"
          imageAlt="Raspberry Pi 4 vista superior"
        >
          <p>
            En SoundZone ofrecemos una solución moderna y asequible para la gestión de sonido en casas de eventos. Nuestro sistema permite distribuir audio en múltiples zonas sin necesidad de licencias costosas ni configuraciones complejas. Usamos tecnología abierta y hardware accesible como Raspberry Pi para que tu recinto suene como nunca antes.
          </p>
        </Card>

        <Card 
          title="Objetivos del Proyecto" 
          id="objetivos" 
          align="right"
          delay={100}
          imageSrc="https://i.imgur.com/GGcV13f.jpeg"
          imageAlt="Control de audio multizona (hosted)"
        >
          <ul>
            <li>Centraliza el control de altavoces en una sola plataforma web</li>
            <li>Personaliza qué zonas reciben audio y quién puede controlarlas</li>
            <li>Transmite desde cualquier dispositivo sin cables ni instalaciones complejas</li>
            <li>Escala tu sistema fácilmente con Raspberry Pi</li>
            <li>Actualizaciones continuas y soporte ágil</li>
          </ul>
        </Card>

        <Card 
          title="Componentes del Sistema" 
          id="componentes" 
          align="left"
          delay={200}
          imageSrc="https://i.imgur.com/jDSLcVN.jpeg"
          imageAlt="Arquitectura del sistema SoundZone (hosted)"
        >
          <ul>
            <li><strong>Frontend:</strong> Interfaz web intuitiva para cada usuario</li>
            <li><strong>Backend:</strong> Gestión de zonas, usuarios y sincronización de audio</li>
            <li><strong>Extensión:</strong> Transmisión directa desde navegador o sistema operativo</li>
            <li><strong>Raspberry Pi:</strong> Receptores de audio por zona, económicos y confiables</li>
          </ul>
        </Card>

        <Card 
          title="Casos de Negocio" 
          id="negocio" 
          align="right"
          delay={300}
          imageSrc="https://i.imgur.com/wko3UuN.jpeg"
          imageAlt="Casa de eventos con sistema de audio (hosted)"
        >
          <p>
            SoundZone es ideal para casas de eventos, centros comunitarios, escuelas, oficinas y espacios que requieren sonido distribuido. Nuestra solución reduce costos, mejora la experiencia sonora y se adapta a cualquier tipo de evento, desde conferencias hasta fiestas privadas.
          </p>
        </Card>

        <Card 
          title="Proyección Financiera" 
          id="finanzas" 
          align="left"
          delay={400}
          imageSrc="https://i.imgur.com/VCDJD43.png"
          imageAlt="Gráfico de proyección financiera (hosted)"
        >
          <ul>
            <li>Implementación completa desde $23,100 USD</li>
            <li>Ahorro frente a sistemas comerciales: hasta $9,200 USD</li>
            <li>Costos operativos mínimos: $150 USD/año</li>
            <li>Sin licencias propietarias ni pagos recurrentes</li>
          </ul>
        </Card>

        <Card 
          title="Recomendaciones" 
          id="recomendaciones" 
          align="right"
          delay={500}
          imageSrc="https://i.imgur.com/nNzRtUb.jpeg"
          imageAlt="Implementación y pruebas del sistema (hosted)"
        >
          <ul>
            <li>Realiza pruebas piloto en tus eventos reales</li>
            <li>Automatiza la instalación con imágenes preconfiguradas</li>
            <li>Accede a documentación clara para tu equipo técnico</li>
            <li>Monitorea remotamente tus dispositivos Raspberry Pi</li>
          </ul>
        </Card>

        <Card 
          title="Conclusiones" 
          id="conclusiones" 
          align="left"
          delay={600}
          imageSrc="https://i.imgur.com/YD9Dux3.jpeg"
          imageAlt="Sistema SoundZone implementado exitosamente (hosted)"
        >
          <p>
            SoundZone es más que un proyecto: es una solución lista para transformar tu recinto. Con tecnología abierta, bajo costo y una arquitectura escalable, ofrecemos una experiencia sonora moderna, confiable y personalizada. Estamos listos para ayudarte a sonar mejor.
          </p>
        </Card>
      </section>

      <section className="cta-section" data-aos="fade-up" data-aos-delay="200">
        <button className="cta-button" onClick={handleCTAClick}>Conoce más de nosotros</button>
      </section>

      {}

      
    </div>
  );
}

export default Landing;

