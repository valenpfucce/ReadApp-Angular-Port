
<div align="center">
  
  # 📚 ReadApp
  
  **Plataforma integral para la gestión de libros, lectores y bibliotecas**

  [![Build](https://github.com/algo3-unsam/proyecto-base-tp/actions/workflows/build.yml/badge.svg)](https://github.com/algo3-unsam/tp-recetas-2020-gr-xx/actions/workflows/build.yml) 
  ![Coverage](./.github/badges/jacoco.svg)

</div>

---

## 📌 Descripción del Proyecto

**ReadApp** funciona mediante una arquitectura cliente-servidor, donde una *Single Page Application* (SPA) se comunica con una API RESTful robusta. El sistema permite a los usuarios buscar libros, administrar sus listas personales (libros leídos y por leer), conectar con amigos, y crear o valorar recomendaciones literarias.

## 🎯 El Problema que Resuelve

Los lectores frecuentes suelen tener dificultades para centralizar su organización literaria y descubrir nuevas lecturas afines a sus gustos. ReadApp resuelve esto ofreciendo un **ecosistema social e individual** donde un usuario puede:
- Llevar un registro detallado de su actividad lectora.
- Interactuar con otros lectores mediante un sistema de amigos.
- Obtener recomendaciones precisas basadas en valoraciones reales.

---

## 🛠 Tecnologías Usadas

El proyecto está construido con un stack moderno, separando claramente las responsabilidades del cliente y el servidor:

### Frontend
- **Framework:** Angular 18
- **UI & Estilos:** Clarity Design System (`@clr/angular`, `@clr/ui`)
- **Manejo de Fechas:** Day.js y Luxon
- **Testing:** Karma y Jasmine (ChromeHeadless)

### Backend
- **Framework:** Spring Boot (Java)
- **Arquitectura:** API RESTful
- **Persistencia / ORM:** Spring Data JPA / Hibernate
- **Gestión de dependencias:** Maven / Gradle

---

## 🧠 Decisiones Técnicas

### Lado del Servidor (Backend)
* **Diseño de API RESTful:** Se desarrollaron *endpoints* semánticos y estructurados para exponer los recursos del sistema (Usuarios, Libros, Recomendaciones). 
* **Arquitectura en Capas:** El código backend está dividido en *Controllers*, *Services* y *Repositories*, asegurando un bajo acoplamiento y facilitando la cobertura de tests unitarios e integrales.
* **DTOs (Data Transfer Objects):** Se utilizaron patrones DTO para desacoplar el modelo de dominio interno de los contratos JSON enviados a la interfaz web, optimizando la carga de red.
* **Manejo de Excepciones Global:** Implementación de `@ControllerAdvice` para capturar errores de negocio y devolver respuestas HTTP coherentes al frontend.

### Lado del Cliente (Frontend)
* **Arquitectura Modular:** El proyecto está dividido por dominio de responsabilidad (`components`, `pages`, `domain`, `services`).
* **Tipado Estricto:** Entidades de dominio robustas en TypeScript que actúan como espejos de los DTOs del backend, evitando errores de serialización y tiempo de ejecución.
* **Servicios de Estado e Integración:** Creación de servicios inyectables (`@Injectable`) que encapsulan el uso de `HttpClient` para centralizar las llamadas a la API y el manejo de la sesión web del usuario.

---

## 🚀 Cómo Correr el Proyecto

### Pre-requisitos
Contar con lo siguiente en el entorno de desarrollo:
- **Node.js** y **Angular CLI** (para el frontend).
- **Java 17+** y **Maven** (para compilar y ejecutar el backend).

```bash
# Navega a la carpeta del backend y ejecuta:
./mvnw spring-boot:run
