# Sección: Servicio de Intermediación de Fichajes

## Contexto del servicio

El cliente es Marcos Sánchez, manager de tenis de mesa en España. Gracias a su experiencia como jugador y sus años gestionando carreras deportivas, tiene relación directa con clubes y ligas de toda España. Ofrece un servicio de intermediación entre jóvenes talentos y equipos federados, conectando a cada jugador con el club que mejor encaja con su nivel y objetivos.

---

## Tarea

Crea una sección web interactiva y visualmente atractiva en HTML/CSS/JS que explique este servicio.

---

## Contenido de la sección

1. **Título hero:** "¿Buscas equipo? Te abro las puertas."

2. **Párrafo de contexto y rol del manager:** Ver texto redactado abajo.

3. **Timeline horizontal animado** con 4 puntos que se revelan progresivamente al hacer scroll:
   - "Acceso a plazas federadas"
   - "Info exclusiva de clubes"
   - "Negociación personalizada"
   - "Red de contactos directos"
   
   Cada punto tiene: icono, título y una línea corta de descripción. La línea del timeline se dibuja de izquierda a derecha conectando los puntos.

4. **Flujo de 3 pasos** (animado o con hover):
   - Paso 1 → "Cuéntanos tu perfil"
   - Paso 2 → "Buscamos el equipo ideal"
   - Paso 3 → "Te conectamos con el club"

5. **CTA final** con botón "Quiero fichar" que abre un formulario de contacto con los campos: nombre, nivel, categoría y mensaje. Al pulsar enviar, **no usar backend ni email** — construir un mensaje de WhatsApp ya armado con los datos del formulario y redirigir al usuario a `https://wa.me/34614448067?text=...` con el texto codificado en URL. El mensaje debe tener este formato:

   ```
   Hola Marcos, me interesa el servicio de fichajes.

   Nombre: [nombre]
   Nivel: [nivel]
   Categoría: [categoría]
   Mensaje: [mensaje]
   ```

---

## Texto ya redactado (listo para usar)

### Título
¿Buscas equipo? Te abro las puertas.

### Cuerpo
Llevo años dentro del tenis de mesa — como jugador y como manager — y eso me ha dado algo que no se compra: confianza y relación directa con clubes y ligas de toda España. Sé cómo funciona el circuito por dentro y sé exactamente dónde encaja cada jugador.

Si quieres dar el salto a un equipo competitivo, no tienes que llamar a puertas a ciegas. Yo ya sé cuáles abrir.

**Cuéntame dónde estás y te digo a dónde puedes llegar.**

---

## Estilo visual

- **Identidad visual:** Seguir exactamente los mismos colores, tipografías, espaciados y estilos de componentes que ya existen en la web (https://marcos-sanchez-manager.netlify.app/). No inventar nada nuevo — esta es una sección más dentro de la misma página.
- **Animaciones:** Suaves al hacer scroll (fade-in). La línea del timeline se dibuja sola de izquierda a derecha.
- **Responsive:** En móvil el timeline horizontal se convierte en vertical automáticamente.
- **Dependencias:** Sin frameworks externos. Solo HTML, CSS y JS puro.
