# 🎨 Vibe Coding Guidelines — Siti Web Animati 2D/3D (Awwwards-level)

> File base da fornire come contesto/system prompt all'AI ogni volta che si crea un nuovo sito in vibe coding. Obiettivo dichiarato: siti al livello di **Awwwards.com** (Site of the Day / Nominee), fortemente animati (motion graphic 2D/3D + elementi 3D interattivi).

---

## 1. Stack Tecnico di Riferimento

- **Linguaggio base:** Vanilla JavaScript (ES6+), no framework a meno che il progetto lo richieda esplicitamente.
- **Animazioni 2D / timeline / scroll:** [GSAP](https://gsap.com/) (+ ScrollTrigger, ScrollSmoother per lo smooth scroll, SplitText per animazioni testuali, CustomEase per easing su misura). GSAP è lo standard de facto tra i vincitori Awwwards.
- **Grafica 3D / WebGL:** [Three.js](https://threejs.org/) (ultima versione stabile).
- **Bundler:** Vite (default per dev veloce e HMR), a meno di indicazioni diverse.
- **CSS:** CSS puro / custom properties per theming; niente framework CSS pesanti (Bootstrap ecc.) salvo richiesta esplicita.
- Se il progetto richiede altro stack (React, Next.js...), l'AI deve chiederlo esplicitamente prima di partire, non assumerlo.

---

## 2. Filosofia di Design — Livello Awwwards

I giudici Awwwards valutano su **4 assi**: Design, Usabilità, Creatività, Contenuto (+ punteggio Mobile separato). Punteggio medio dei Site of the Day: ~7.5–8.6/10. Serve eccellenza su ogni asse, non solo impatto visivo:

- **Design:** direzione artistica coerente, tipografia da protagonista (spesso oversized, editoriale), palette con carattere, griglia curata.
- **Usabilità:** per quanto un sito sia "wow", deve restare navigabile e leggibile. Un sito che scora alto in creatività ma basso in usabilità NON vince.
- **Creatività:** un elemento distintivo forte per progetto (hero 3D, shader custom, transizione di pagina originale, interazione inedita) — mai template generico.
- **Contenuto:** le animazioni devono servire lo storytelling, non essere fine a se stesse.

Principi operativi:
- **L'impatto visivo viene prima**, ma va sempre bilanciato con leggibilità e usabilità: non sacrificare mai la comprensione del contenuto per l'effetto speciale.
- **"L'interazione deve premiare la curiosità, non urlare."** I siti migliori non renderizzano tutto a piena complessità sempre: gli effetti più ricchi si attivano su hover/scroll/click mirati, non sono "always-on" ovunque.
- Motion con personalità: easing custom (mai linear), timing variabili, micro-interazioni diffuse ma mai invadenti.
- Il 3D deve essere **interattivo** quando ha senso: parallax camera, hover/click su oggetti, drag, camera che reagisce allo scroll — mai puramente decorativo se può essere partecipativo.
- Ogni sezione importante ha un momento "wow" dedicato, ma alternato a momenti di respiro (whitespace, pause nel motion) per non affaticare l'utente.

---

## 3. Pattern Ricorrenti nei Vincitori Awwwards (da usare come libreria di riferimento)

- **Preloader come momento di brand**, non semplice spinner: progress reale, micro-copy, animazione che anticipa il mood del sito.
- **Hero cinematico**: tipografia oversized full-screen, spesso video/3D di sfondo, entrance animation con stagger.
- **Custom cursor** che reagisce al contesto (magnetico su CTA, cambia forma su hover elementi interattivi).
- **Scroll-driven storytelling**: la scena (2D o 3D) evolve con lo scroll invece di limitarsi a un fade-in statico; a volte scroll orizzontale/sideways all'interno di sezioni verticali.
- **Transizioni di pagina custom** (mai un semplice fade di default) quando il sito è multi-pagina/SPA-like.
- **Motion sulla brand identity**: il logo/navigazione si trasforma in modo animato invece di apparire staticamente.
- **Footer interattivo** curato quanto l'hero, spesso ultimo "momento wow" della pagina.
- **Palette ridotta + un colore accento** usato in modo coerente per CTA e punti di attenzione (schema tipico: base neutra/monocromatica + 1 accento).

---

## 4. Regole di Animazione (GSAP)

- Usare **ScrollTrigger** per animazioni legate allo scroll; **timeline GSAP** per sequenze complesse invece di animazioni isolate.
- Ogni animazione ha un **easing esplicito** (es. `power3.out`, `expo.inOut`, easing custom via CustomEase) — mai default senza motivo.
- Durate indicative:
  - Micro-interazioni (hover, click): 0.2–0.4s
  - Transizioni UI: 0.4–0.8s
  - Animazioni hero/scene complesse: 0.8–2s
- Entrance animation con **stagger** su gruppi di elementi (testo, card, griglie).
- Transizioni di pagina gestite con timeline dedicata.
- Mai bloccare l'interazione utente per troppo tempo (>2.5s senza possibilità di skip).

---

## 5. Regole per il 3D (Three.js)

- Struttura base: `Scene → Camera → Renderer → Loop (requestAnimationFrame)`, con classi/moduli separati per scena, oggetti, luci, controlli.
- Ottimizzazione geometrie: `InstancedMesh` per elementi ripetuti, `BufferGeometry` sempre, texture/geometrie leggere quanto basta.
- Illuminazione curata e coerente col mood (ambient + directional/point, ombre soft se serve cinematismo).
- Post-processing (bloom, DOF, grain, chromatic aberration) incoraggiato per il look "wow", valutando sempre l'impatto su performance.
- Interattività 3D da prevedere quando ha senso:
  - Parallax camera su mouse/gyroscope
  - Oggetti cliccabili/hoverabili con feedback (raycaster)
  - Drag/rotate su modelli
  - Reazione della scena allo scroll (camera path, morph, cambi di stato)
- **Gestione mobile/touch per scene 3D pesanti: da valutare progetto per progetto** — l'AI propone la soluzione migliore tra versione semplificata, fallback 2D/statico, o qualità adattiva (in base a device/GPU/`navigator.hardwareConcurrency`), chiedendo conferma se non ovvio dal contesto.
- Sempre un **loader/preloader** per asset 3D pesanti, con progress reale se possibile.
- Dispose corretto di geometrie/materiali/texture su cambio scena o navigazione, per evitare memory leak.

---

## 6. Performance

- Lazy load di scene 3D e asset pesanti non above-the-fold.
- Comprimere/ottimizzare modelli 3D (Draco/gltf-transform per i .glb) e texture (formati moderni, risoluzione adeguata al contesto d'uso).
- Limitare il pixel ratio del renderer su device meno performanti (`Math.min(window.devicePixelRatio, 2)`).
- Fermare/rallentare i render loop quando la tab non è visibile (`document.visibilitychange`) o la sezione 3D non è in viewport.
- Monitorare FPS in dev (stats.js o simili) su scene complesse.
- Ricorda: nei punteggi Awwwards l'usabilità/performance pesa quanto la creatività — un sito bellissimo ma che rema (jank, lag) perde punti.

---

## 7. Accessibilità (sempre da includere)

- **`prefers-reduced-motion`**: rilevare la preferenza utente e fornire sempre una versione ridotta/statica delle animazioni principali (niente parallax estremi, durate ridotte, no autoplay continuo).
- Contrasto colori conforme a WCAG AA come minimo su testo e CTA, anche su sfondi animati/3D.
- Elementi interattivi (anche nel canvas 3D, se possibile) con equivalente accessibile via tastiera o che comunque non blocchi la navigazione per chi non interagisce col 3D.
- Alt text / label descrittive per contenuti veicolati solo tramite animazione o scena 3D.
- Evitare flash/strobo o animazioni ad altissima frequenza (rischio fotosensibilità).
- Sempre un modo per saltare/skippare intro animate lunghe.

---

## 8. Landing Page vs Sito Multi-pagina

Regole comuni (sezioni 1-7) sempre valide. Qui le differenze strutturali da applicare in base al tipo di progetto. **L'AI deve sempre chiedere all'inizio quale dei due tipi si sta costruendo**, se non specificato.

### 8.1 Landing Page (one-page / single scroll)

- **Struttura:** un unico `index.html`, contenuto diviso in sezioni sequenziali (`<section id="hero">`, `#about`, `#work`, `#contact`...) navigabili via scroll o anchor link.
- **Narrazione:** pensata come un'unica timeline continua — la scena 3D/2D può evolvere in modo coerente lungo tutta la pagina (es. un unico canvas persistente con camera/oggetti che cambiano stato in base alla % di scroll totale, invece di scene scollegate per sezione).
- **GSAP:** un master timeline pilotato da un unico `ScrollTrigger` con `scrub`, mappato sull'intera altezza della pagina; le sotto-animazioni di sezione si agganciano a questa timeline principale.
- **Navigazione:** nav sticky minimale (spesso solo dot-indicator o menu a scomparsa) con smooth scroll agli anchor; niente cambi di pagina/reload.
- **Preloader:** carica tutti gli asset necessari all'intera esperienza fin dall'inizio, perché non ci sono altri caricamenti dopo.
- **CTA:** unico obiettivo di conversione, ripetuto in punti strategici (hero, metà pagina, footer) invece che disperso in più pagine.
- **SEO:** una sola pagina indicizzabile: concentrare title/meta/structured data sul contenuto core; headings (`h1`-`h3`) strutturati per sezione anche se visivamente non sembrano "titoli" classici.
- **Cartelle:** `src/sections/` con un modulo JS per sezione, orchestrati da un unico `src/js/core/App.js` che costruisce la master timeline.

### 8.2 Sito Multi-pagina

- **Struttura:** più pagine reali (più `.html` in MPA classica, oppure "SPA-like" con `history.pushState` + fetch del contenuto e sostituzione del DOM, mantenendo l'URL reale per SEO). **L'AI deve chiedere quale approccio usare** se non specificato: MPA classica (più semplice, migliore SEO di default) o SPA-like (transizioni più fluide, richiede più attenzione a SEO/prerendering).
- **Navigazione persistente:** header/nav e footer condivisi tra le pagine, riutilizzati come componenti/partial, non duplicati "a mano" pagina per pagina.
- **Transizioni tra pagine:** mai un semplice reload/flash bianco. Costruire un sistema di **page transition** (overlay/curtain, wipe, morph, o fade curato) con GSAP, coerente con l'identità del sito. Se SPA-like: gestire il transition system via fetch + swap del contenuto; se MPA classica: usare una overlay animata "in uscita" prima della navigazione reale e "in entrata" al load della nuova pagina.
- **Canvas 3D persistente (quando ha senso):** se più pagine condividono un elemento 3D di continuità (es. sfondo particellare, oggetto guida), valutare se mantenere un **unico contesto WebGL persistente** tra le pagine (richiede approccio SPA-like) invece di reinizializzare la scena ad ogni cambio pagina — reinizializzare è più semplice ma introduce un micro-freeze percepibile.
- **Preloader:** solo al primo ingresso sul sito; i cambi pagina successivi usano la sola page transition (più leggera), non un preloader completo, per non rallentare la navigazione interna.
- **Coerenza cross-page:** stessa libreria di componenti/animazioni (bottoni, hover, cursor custom) applicata identicamente su tutte le pagine, per non rompere la sensazione di sito unico e curato.
- **Cartelle:** aggiungere `src/pages/` (o `pages/*.html` in root se MPA) per il markup specifico di ogni pagina, mantenendo `src/js/core/`, `src/three/`, `src/animations/` condivisi e riutilizzati da tutte le pagine.

---

## 9. Struttura di File e Naming (riferimento generale)

```
project-root/
├── index.html
├── pages/                     # solo se sito multi-pagina (MPA)
│   ├── about.html
│   └── work.html
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── assets/
│       ├── models/          # file .glb/.gltf
│       ├── textures/        # texture, HDR/env maps
│       └── fonts/
├── src/
│   ├── main.js               # entry point
│   ├── styles/
│   │   ├── main.css
│   │   ├── variables.css     # custom properties (colori, spacing, easing)
│   │   └── components/       # css per sezione/componente
│   ├── js/
│   │   ├── core/
│   │   │   ├── App.js
│   │   │   ├── Loader.js       # preloader asset
│   │   │   └── PageTransition.js  # solo siti multi-pagina
│   │   ├── three/
│   │   │   ├── Scene.js
│   │   │   ├── Camera.js
│   │   │   ├── Renderer.js
│   │   │   ├── Lights.js
│   │   │   ├── objects/       # un file per oggetto/gruppo 3D
│   │   │   └── shaders/       # .glsl o template string dei materiali custom
│   │   ├── animations/
│   │   │   ├── gsapTimelines.js
│   │   │   └── scrollAnimations.js
│   │   └── utils/
│   │       ├── device.js      # detection performance/mobile
│   │       └── a11y.js        # gestione reduced-motion ecc.
│   └── sections/               # moduli per sezione — landing page monopagina
└── README.md
```

**Convenzioni di naming:**
- File e cartelle: `kebab-case` (es. `hero-scene.js`), classi JS: `PascalCase` (es. `HeroScene`), variabili/funzioni: `camelCase`.
- Componenti 3D: prefisso per tipo quando utile (`meshHero`, `lightMain`, `matGlass`).
- Timeline GSAP nominate per sezione/pagina: `tlHero`, `tlAbout`, `tlTransitionPage`.
- Classi CSS: `BEM` semplificato (`.hero`, `.hero__title`, `.hero--dark`) per mantenere leggibilità in progetti con molte animazioni.

---

## 10. Checklist Rapida Pre-consegna (livello Awwwards)

- [ ] Il sito ha almeno un elemento distintivo/originale (non un template riconoscibile)
- [ ] Chiarito fin da subito: landing page o sito multi-pagina
- [ ] Ogni animazione ha easing e durata intenzionali (no default)
- [ ] Preloader curato per asset 3D pesanti
- [ ] Scroll-storytelling: le scene evolvono con lo scroll, non solo fade-in statici
- [ ] Se multi-pagina: sistema di page transition custom, mai reload/flash bianco
- [ ] Custom cursor / micro-interazioni dove ha senso
- [ ] `prefers-reduced-motion` gestito
- [ ] Contrasto testo/CTA verificato anche su sfondi animati
- [ ] Strategia mobile/touch per il 3D decisa e implementata
- [ ] Dispose di risorse Three.js su cambio scena/pagina
- [ ] Render loop in pausa quando tab non visibile
- [ ] Skip disponibile per intro animate lunghe
- [ ] Nessuna sezione "urla" tutti gli effetti insieme: alternanza tra momenti wow e momenti di respiro
- [ ] Struttura cartelle rispettata

---

## 11. Note per l'AI in fase di generazione

Quando generi codice per un nuovo sito partendo da questo file, obiettivo dichiarato: qualità da Awwwards Site of the Day/Nominee.

1. **Prima domanda sempre:** landing page (one-page) o sito multi-pagina? Da questo dipendono struttura, routing e gestione delle transizioni (vedi sezione 8).
2. Chiedi anche, se non specificato: tema/mood del sito, palette colori, tipo di contenuto (portfolio, prodotto, evento, brand...).
3. Se il progetto ha scene 3D pesanti, proponi tu la strategia mobile più adatta (semplificata / fallback 2D / qualità adattiva) motivandola, invece di assumerla in automatico.
4. Se multi-pagina, chiedi/valuta anche: MPA classica vs SPA-like con canvas 3D persistente (vedi 8.2), in base a complessità del progetto e esigenze SEO.
5. Rispetta sempre struttura cartelle e naming definiti sopra, salvo indicazioni diverse dell'utente.
6. Non rinunciare mai alla gestione di `prefers-reduced-motion`, anche se non esplicitamente richiesta nel singolo progetto.
7. Cura sempre almeno: preloader, un momento hero cinematico, transizioni intenzionali (di sezione o di pagina), un elemento interattivo 3D con feedback reale. Sono gli ingredienti minimi ricorrenti nei siti premiati.
8. Non riempire ogni pixel di effetti: alterna momenti ad alta intensità visiva a momenti di respiro, per non affaticare l'utente e restare comunque leggibile/usabile.
