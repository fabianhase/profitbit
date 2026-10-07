# ProfitBid – Landingpage

Statische Website (HTML, CSS, JavaScript) – ohne Build-Schritt, direkt für GitHub Pages geeignet.

## Struktur

```
index.html            Landingpage
preise.html           Preisseite mit Laufzeit-Umschalter (monatlich, 6, 12 Monate)
impressum.html        Impressum (Platzhalter – ausfüllen!)
datenschutz.html      Datenschutzerklärung (Platzhalter – ausfüllen!)
agb.html              AGB (Platzhalter – ausfüllen!)
404.html              Fehlerseite
assets/css/styles.css Styles
assets/js/main.js     Animationen, Menü, FAQ, Formular
assets/img/           Bilder mit SEO-Dateinamen (z. B. google-ads-fallbeispiel-…, ga-academy-google-ads-coaching-…, referenz-logo-…)
robots.txt, sitemap.xml
.nojekyll             verhindert Jekyll-Verarbeitung auf GitHub Pages
```

## Veröffentlichen mit GitHub Pages

1. Neues Repository auf GitHub anlegen, z. B. `profitbid-website`.
2. Den kompletten Inhalt dieses Ordners hochladen (per „Add file → Upload files“ oder `git push`).
3. Im Repository: **Settings → Pages → Build and deployment → Source: „Deploy from a branch“**, Branch `main`, Ordner `/ (root)` wählen und speichern.
4. Nach 1–2 Minuten ist die Seite unter `https://<dein-github-name>.github.io/profitbid-website/` erreichbar.

### Eigene Domain (z. B. profitbid.de)

1. Unter **Settings → Pages → Custom domain** die Domain eintragen (GitHub legt die Datei `CNAME` automatisch an).
2. Beim Domain-Anbieter DNS setzen:
   - `www` als CNAME auf `<dein-github-name>.github.io`
   - Apex-Domain (`@`) als A-Records auf `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. „Enforce HTTPS“ aktivieren, sobald verfügbar.
4. Falls die Domain nicht `www.profitbid.de` ist: in `index.html` (canonical, og:image), `robots.txt` und `sitemap.xml` anpassen.

## Vor dem Livegang ausfüllen

- **Formular:** Kostenlos bei [formspree.io](https://formspree.io) ein Formular anlegen und in `index.html` `DEINE-FORM-ID` ersetzen. Bis dahin zeigt das Formular einen Hinweis statt zu senden.
- **Impressum, Datenschutz, AGB** mit echten Inhalten füllen.
- **Platzhalter in `index.html`** (Suche nach `[`): Vimeo-ID für das Intro-Video, Enterprise-Budgetschwelle, FAQ zu Laufzeit/Budgetlimit und Ergebniszeitraum.
- **Videos (Vimeo):** Bei jedem Video-Platzhalter in `index.html` die Vimeo-ID in `data-vimeo-id=""` eintragen (die Zahl aus `vimeo.com/123456789`). Optional ein eigenes Vorschaubild über `data-poster="assets/img/…"` angeben. Die Videos werden erst beim Klick geladen (schnelle Ladezeit, „Do not track“). In Vimeo pro Video „Von Vimeo ausblenden“ und als Einbettung nur die eigene Domain erlauben.
- **Neue Bilder:** Dateinamen klein, mit Bindestrichen und beschreibend wählen (z. B. `google-ads-fallbeispiel-kundenname-website.webp`) und im `<img>` immer ein aussagekräftiges `alt` setzen.
- **Bilder einfügen:** Dateien nach `assets/img/` (bzw. `assets/video/`) legen und den jeweiligen Platzhalter-`<div>` durch `<img>` bzw. `<video>` ersetzen.
- **Datenschutz-Tipp:** Google Fonts lassen sich lokal einbinden (z. B. mit google-webfonts-helper), dann entfällt die Datenübertragung an Google.

## Stripe-Zahlungslinks (preise.html)

Jeder Plan-Button auf `preise.html` hat drei Felder: `data-link-1` (monatlich), `data-link-6` (6 Monate) und `data-link-12` (12 Monate). Dort die jeweiligen Stripe-Payment-Links eintragen. Solange ein Feld leer ist, führt der Button zum Kontaktformular auf der Startseite.

## Lokal ansehen

`index.html` im Browser öffnen – oder im Ordner `python3 -m http.server` ausführen und `http://localhost:8000` aufrufen.
