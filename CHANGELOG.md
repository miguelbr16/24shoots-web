# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## [Unreleased]

_Nada pendiente en working tree tras `1ce4bef`._

## [2026-07-24] — Producción 24Shoots

### Added

- Rueda de clientes en arco (`ClientLogoArcWheel`) con animación CSS, pausa en hover y copy centrado.
- Filtros de portfolio desplegables (`filterToggle` en `pages.json`).
- 10 líneas de servicio/portfolio unificadas en JSON.
- Script `scripts/gen-client-placeholders.mjs` para logos SVG de prueba.
- Documentación: `docs/AVANCES-2026-07-24.md`.

### Changed

- Orden del home orientado a conversión (10 pasos).
- Espaciado vertical reducido en secciones principales.
- Subtítulo sección clientes (marcas, instituciones y particulares).
- CTAs de presupuesto en fichas de servicio.
- Lazy loading de bloques pesados en home.

### Removed

- Componentes sin uso: `PortfolioGrid`, `ReelBand`, `MediaFilmstrip`, etc.

### Fixed

- Visibilidad y solapamiento de la rueda de logos (posición, máscara, diámetro).

---

Commits desde `e2d5983` hasta `1ce4bef`. Detalle en `docs/AVANCES-2026-07-24.md`.
