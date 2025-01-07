# Ulmiversität - Der Link-Manager für die Uni Ulm

### Content update

#### 1. Schnellzugriff

Unter `content/quick-select.ts` einfach anpassbar. Es wird benötigt:

| Keyword           | Bedeutung                     |                                                                                                           |
| ----------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| `name`            | Name                          |                                                                                                           |
| `href`            | Link                          | Absoluter Link zu einer externen Webseite                                                                 |
| `description`     | Beschreibung                  | Genauere Beschreibung oder Keywords. Wird nur für große Bildschirme angezeigt                             |
| `image`           | Link zum Bild                 | nicht required; Bilder am besten unter `public/img/` speichern                                            |
| `darkImageInvert` | im dark-mode Bild invertieren | nicht required; default: `false`. Für sehr helle/weiße logos, welche im dark-mode komisch aussehen würden |
