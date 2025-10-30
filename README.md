# Tres en Raya - Juego Interactivo

## Descripción del Proyecto

Aplicación web interactiva de Tres en Raya (Tic-Tac-Toe) desarrollada con tecnologías modernas, que ofrece una experiencia de juego fluida y atractiva tanto para modo multijugador local como contra una inteligencia artificial.

El proyecto implementa una interfaz minimalista y responsive, optimizada para dispositivos táctiles, con animaciones suaves y un sistema completo de puntuación persistente.

## Características Principales

### Modos de Juego
- **Dos Jugadores (PvP)**: Modo clásico para jugar contra otro jugador en el mismo dispositivo
- **Contra IA (PvC)**: Enfrenta una inteligencia artificial con estrategia defensiva y ofensiva

### Funcionalidades
- ✅ Cuadrícula 3x3 interactiva con botones grandes y táctiles
- ✅ Sistema de turnos automático con indicador visual
- ✅ Detección de victorias y empates en tiempo real
- ✅ Línea ganadora animada que resalta la combinación victoriosa
- ✅ Tablero de puntuación que registra victorias de X, O y empates
- ✅ Persistencia de datos mediante localStorage
- ✅ Modal de victoria con mensajes personalizados
- ✅ Controles para reiniciar partida y resetear puntuación
- ✅ Animaciones y transiciones fluidas
- ✅ Diseño completamente responsive para todos los dispositivos

### Inteligencia Artificial
La IA implementa una estrategia inteligente que:
- Prioriza movimientos ganadores
- Bloquea jugadas ganadoras del oponente
- Ocupa el centro cuando está disponible
- Prefiere esquinas estratégicas
- Toma decisiones aleatorias balanceadas cuando no hay amenazas

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con gradientes, animaciones y diseño responsive
- **JavaScript (ES6+)**: Lógica del juego y manejo del DOM
- **Vite**: Herramienta de construcción y servidor de desarrollo
- **LocalStorage API**: Persistencia de puntuación entre sesiones

## Diseño y UI/UX

### Principios de Diseño
- Interfaz minimalista y limpia
- Esquema de colores moderno (gradientes azul/púrpura)
- Contraste óptimo para legibilidad
- Feedback visual inmediato en todas las interacciones
- Animaciones sutiles que mejoran la experiencia sin distraer

### Características de Accesibilidad
- Botones grandes optimizados para dispositivos táctiles
- Estados hover e interacciones claras
- Mensajes informativos durante el juego
- Diseño responsive con breakpoints adaptativos

## Estructura del Proyecto

```
project/
├── src/
│   ├── main.js          # Lógica del juego y controladores
│   └── style.css        # Estilos y animaciones
├── index.html           # Estructura HTML principal
├── package.json         # Configuración y dependencias
└── README.md           # Documentación del proyecto
```

## Instalación y Uso

### Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install
```

### Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview
```

## Lógica del Juego

### Mecánica de Victoria
El juego verifica las siguientes combinaciones ganadoras:
- Tres filas horizontales (0-1-2, 3-4-5, 6-7-8)
- Tres columnas verticales (0-3-6, 1-4-7, 2-5-8)
- Dos diagonales (0-4-8, 2-4-6)

### Sistema de Puntuación
- Las victorias y empates se registran automáticamente
- Los datos persisten entre sesiones mediante localStorage
- Opción de resetear puntuación en cualquier momento

### Algoritmo de IA
La inteligencia artificial utiliza un sistema de prioridades:
1. Buscar jugadas ganadoras inmediatas
2. Bloquear jugadas ganadoras del oponente
3. Ocupar posición central si está disponible
4. Priorizar esquinas estratégicas
5. Selección aleatoria de movimientos restantes

## Optimización y Rendimiento

- Código JavaScript modular y eficiente
- Uso de event delegation para mejor rendimiento
- Animaciones CSS3 aceleradas por hardware
- Assets optimizados para carga rápida
- Build de producción minificada

## Compatibilidad

### Navegadores Soportados
- Chrome/Edge (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Opera (últimas 2 versiones)

### Dispositivos
- Desktop (Windows, macOS, Linux)
- Tablets (iOS, Android)
- Smartphones (iOS, Android)

## Información del Desarrollador

-**Profesional**: César Eduardo González
-**Cargo**: Analista en Sistemas
-**Email**: gonzalezeduardo_31@hotmail.com
-**Teléfono**: (+54) 3884 858-907

## Licencia

Este proyecto ha sido desarrollado con fines educativos y demostrativos.

---

© 2025 César Eduardo González. Todos los derechos reservados.
