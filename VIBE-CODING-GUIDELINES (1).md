# 🎨 Vibe Coding Guidelines — Siti Web Animati 2D/3D (Awwwards-level)

> File base da fornire come contesto/system prompt all'AI ogni volta che si crea un nuovo sito in vibe coding. Obiettivo dichiarato: siti al livello di **Awwwards.com** (Site of the Day / Nominee), fortemente animati (motion graphic 2D/3D + elementi 3D interattivi), costruiti su **React + Next.js**.

---

## 1. Stack Tecnico di Riferimento

- **Framework:** [Next.js](https://nextjs.org/) (App Router, non Pages Router, salvo indicazioni diverse) + React.
- **Linguaggio:** JavaScript (ES6+) di default; TypeScript solo se richiesto esplicitamente.
- **Animazioni 2D / timeline / scroll:** [GSAP](https://gsap.com/) con l'hook ufficiale [`@gsap/react`](https://gsap.com/resources/React/) (`useGSAP`) per gestire correttamente mount/unmount/cleanup in ambiente React. Plugin: ScrollTrigger, ScrollSmoother, SplitText, CustomEase.
- **Grafica 3D / WebGL:** [React Three Fiber](https://r3f.docs.pmnd.rs/) (`@react-three/fiber`) come layer React su Three.js, + [`@react-three/drei`](https://github.com/pmndrs/drei) per helper comuni (controls, loader, environment, ecc.) + [`@react-three/postprocessing`](https://github.com/pmndrs/react-postprocessing) per bloom/DOF/grain.
- **CSS:** CSS Modules o CSS puro con custom properties per il theming; niente framework CSS pesanti (Bootstrap ecc.) salvo richiesta esplicita. Tailwind solo su richiesta esplicita dell'utente.
- **Package manager:** quello già in uso nel progetto (npm/pnpm/yarn); se nuovo progetto, default npm salvo indicazioni.

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
- **Transizioni di pagina custom** (mai un semplice fade di default) quando il sito è multi-pagina.
- **Motion sulla brand identity**: il logo/navigazione si trasforma in modo animato invece di apparire staticamente.
- **Footer interattivo** curato quanto l'hero, spesso ultimo "momento wow" della pagina.
- **Palette ridotta + un colore accento** usato in modo coerente per CTA e punti di attenzione (schema tipico: base neutra/monocromatica + 1 accento).

---

## 4. Regole di Animazione (GSAP in React)

- Usare sempre **`useGSAP`** (da `@gsap/react`) al posto di `useEffect` puro per creare/pulire animazioni: gestisce automaticamente il cleanup su unmount/re-render, fondamentale con App Router e navigazioni client-side.
- **ScrollTrigger** per animazioni legate allo scroll; **timeline GSAP** per sequenze complesse invece di animazioni isolate.
- Ogni animazione ha un **easing esplicito** (es. `power3.out`, `expo.inOut`, easing custom via CustomEase) — mai default senza motivo.
- Durate indicative:
  - Micro-interazioni (hover, click): 0.2–0.4s
  - Transizioni UI: 0.4–0.8s
  - Animazioni hero/scene complesse: 0.8–2s
- Entrance animation con **stagger** su gruppi di elementi (testo, card, griglie).
- Registrare i plugin GSAP una sola volta (es. in un file `gsap.config.js` importato all'avvio), non ripetutamente nei componenti.
- Attenzione a **Strict Mode** di React (doppio mount in dev): le animazioni vanno scritte in modo idempotente, `useGSAP` gestisce già questo correttamente.
- Mai bloccare l'interazione utente per troppo tempo (>2.5s senza possibilità di skip).

---

## 5. Regole per il 3D (React Three Fiber + drei)

- Ogni scena 3D è un componente React dedicato con un `<Canvas>` di R3F; oggetti, luci, controlli come componenti figli/riutilizzabili (`<HeroModel />`, `<Lights />`, `<CameraRig />`).
- Usare `drei` per gli helper comuni invece di reimplementarli a mano: `useGLTF`/`useTexture` per caricare asset con Suspense, `Environment`, `OrbitControls`/`CameraControls`, `Preload`, `PerformanceMonitor`.
- Ottimizzazione geometrie: `instancedMesh` (o `<Instances>` di drei) per elementi ripetuti, geometrie/texture leggere quanto basta.
- Illuminazione curata e coerente col mood (ambient + directional/point, ombre soft se serve cinematismo).
- Post-processing (bloom, DOF, grain, chromatic aberration) via `@react-three/postprocessing`, valutando sempre l'impatto su performance.
- Interattività 3D da prevedere quando ha senso:
  - Parallax camera su mouse/gyroscope (`useFrame` + lerp verso target)
  - Oggetti cliccabili/hoverabili con feedback (`onClick`/`onPointerOver` nativi di R3F, no raycaster manuale)
  - Drag/rotate su modelli
  - Reazione della scena allo scroll (sincronizzare `useFrame` con GSAP ScrollTrigger tramite stato/ref condiviso)
- **Gestione mobile/touch per scene 3D pesanti: da valutare progetto per progetto** — l'AI propone la soluzione migliore tra versione semplificata, fallback 2D/statico, o qualità adattiva (via `<PerformanceMonitor>` di drei o detection `navigator.hardwareConcurrency`), chiedendo conferma se non ovvio dal contesto.
- Sempre un **loader/preloader** per asset 3D pesanti: `useProgress` di drei + `<Suspense>` per una progress bar reale.
- Il `<Canvas>` va reso `client component` (`"use client"`) esplicito, dato che Next.js App Router è server-first di default.
- Non serve dispose manuale come in Three.js puro: R3F gestisce il cleanup automaticamente allo smontaggio del componente, ma evitare comunque di ricreare geometrie/texture ad ogni render (memoizzare con `useMemo` o factory fuori dal componente).

---

## 6. Performance

- Componenti 3D e sezioni pesanti fuori dal viewport: `dynamic(() => import(...), { ssr: false })` di Next.js per code-splitting e per evitare SSR su codice che dipende dal `window`/WebGL.
- Lazy load di scene 3D e asset pesanti non above-the-fold (`<Suspense>` + `IntersectionObserver` per montare il `<Canvas>` solo quando la sezione entra in viewport).
- Comprimere/ottimizzare modelli 3D (Draco/gltf-transform per i `.glb`, serviti da `public/`) e texture (formati moderni, risoluzione adeguata al contesto d'uso).
- Limitare il pixel ratio del renderer su device meno performanti (prop `dpr={[1, 2]}` su `<Canvas>`).
- R3F mette in pausa il render loop quando il tab non è visibile per default; verificare comunque con `frameloop="demand"` per scene statiche che non necessitano render continuo.
- Monitorare FPS in dev (`<Stats />` di drei o `<PerformanceMonitor>`) su scene complesse.
- Usare `next/image` per tutte le immagini non-3D, per ottimizzazione automatica.
- Ricorda: nei punteggi Awwwards l'usabilità/performance pesa quanto la creatività — un sito bellissimo ma che rema (jank, lag) perde punti.

---

## 7. Accessibilità (sempre da includere)

- **`prefers-reduced-motion`**: rilevare la preferenza utente (hook custom `useReducedMotion`) e fornire sempre una versione ridotta/statica delle animazioni principali (niente parallax estremi, durate ridotte, no autoplay continuo).
- Contrasto colori conforme a WCAG AA come minimo su testo e CTA, anche su sfondi animati/3D.
- Elementi interattivi (anche nel canvas 3D, se possibile) con equivalente accessibile via tastiera o che comunque non blocchi la navigazione per chi non interagisce col 3D.
- Alt text / label descrittive per contenuti veicolati solo tramite animazione o scena 3D.
- Evitare flash/strobo o animazioni ad altissima frequenza (rischio fotosensibilità).
- Sempre un modo per saltare/skippare intro animate lunghe.
- Usare elementi semantici HTML/Next (`<nav>`, `<main>`, `next/link`) sotto le animazioni: l'esperienza custom non deve rompere la semantica.

---

## 8. Landing Page vs Sito Multi-pagina (Next.js App Router)

Regole comuni (sezioni 1-7) sempre valide. Qui le differenze strutturali da applicare in base al tipo di progetto. **L'AI deve sempre chiedere all'inizio quale dei due tipi si sta costruendo**, se non specificato.

### 8.1 Landing Page (one-page)

- **Struttura:** un'unica route (`app/page.js`), contenuto diviso in componenti-sezione (`<Hero />`, `<About />`, `<Work />`, `<Contact />`...) importati in sequenza, ciascuno con proprio `id` per anchor/scroll.
- **Narrazione:** pensata come un'unica timeline continua — la scena 3D/2D può evolvere in modo coerente lungo tutta la pagina (un unico `<Canvas>` persistente con camera/oggetti che cambiano stato in base alla % di scroll totale, invece di scene scollegate per sezione).
- **GSAP:** un master timeline pilotato da un unico `ScrollTrigger` con `scrub`, mappato sull'intera altezza della pagina, gestito in un componente client dedicato (es. `<PageAnimations />`) via `useGSAP`.
- **Navigazione:** nav sticky minimale (spesso solo dot-indicator o menu a scomparsa) con smooth scroll agli anchor (`scroll-behavior` o ScrollSmoother); nessun cambio di route.
- **Preloader:** carica tutti gli asset necessari all'intera esperienza fin dall'inizio, perché non ci sono altri caricamenti dopo.
- **CTA:** unico obiettivo di conversione, ripetuto in punti strategici (hero, metà pagina, footer) invece che disperso in più pagine.
- **SEO:** una sola route indicizzabile: usare `generateMetadata`/`metadata` di Next per title/description/OG mirati sul contenuto core; headings (`h1`-`h3`) strutturati per sezione anche se visivamente non sembrano "titoli" classici.
- **Cartelle:** `components/sections/` con un componente per sezione, orchestrati da `app/page.js` + un componente client per la master timeline.

### 8.2 Sito Multi-pagina

- **Struttura:** routing nativo di Next.js App Router — una cartella per route (`app/about/page.js`, `app/work/page.js`, `app/work/[slug]/page.js` per contenuti dinamici). Layout condivisi via `app/layout.js` (root) ed eventuali `layout.js` annidati per sezioni con struttura comune.
- **Navigazione persistente:** header/nav e footer vivono nel `layout.js` root, così restano montati e non "flashano" tra una route e l'altra; usare sempre `next/link` per la navigazione client-side (niente `<a>` semplici).
- **Transizioni tra pagine:** mai un semplice reload/flash bianco (Next di suo non ricarica la pagina con `next/link`, ma senza transizione dedicata il cambio contenuto è comunque brusco). Costruire un sistema di **page transition** custom con GSAP + `usePathname()` (rilevare il cambio route e animare uscita/entrata del contenuto), oppure valutare la View Transitions API nativa se il target browser lo consente. Il pattern consigliato: `template.js` per il contenuto di route che deve rianimarsi ad ogni navigazione (a differenza di `layout.js`, `template.js` viene rimontato ad ogni cambio route, utile per orchestrare enter/exit animation).
- **Canvas 3D persistente (quando ha senso):** se più pagine condividono un elemento 3D di continuità (es. sfondo particellare, oggetto guida), mettere il `<Canvas>` nel `layout.js` root così il contesto WebGL **non viene ricreato** ad ogni cambio pagina — solo il contenuto React dentro la scena cambia in base alla route corrente (via context/store condiviso, es. Zustand o React Context).
- **Preloader:** solo al primo ingresso sul sito (gestito a livello di root layout); i cambi pagina successivi usano la sola page transition (più leggera), non un preloader completo, per non rallentare la navigazione interna.
- **Coerenza cross-page:** stessa libreria di componenti/animazioni (bottoni, hover, cursor custom) applicata identicamente su tutte le pagine tramite componenti condivisi in `components/`, per non rompere la sensazione di sito unico e curato.
- **Cartelle:** struttura guidata da Next.js: una cartella `app/<route>/page.js` per ogni pagina, `app/<route>/template.js` per le transizioni dove serve, `layout.js` root per header/footer/canvas persistente.

---

## 9. Struttura di File e Naming (App Router)

```
project-root/
├── next.config.js
├── package.json
├── public/
│   └── assets/
│       ├── models/          # file .glb/.gltf
│       ├── textures/        # texture, HDR/env maps
│       └── fonts/
├── app/
│   ├── layout.js             # root layout: header, footer, canvas persistente (se serve), providers
│   ├── page.js                # home / landing page
│   ├── globals.css
│   ├── about/
│   │   ├── page.js
│   │   └── template.js        # solo se serve enter/exit animation dedicata
│   └── work/
│       ├── page.js
│       └── [slug]/
│           └── page.js        # pagina dinamica progetto/case study
├── components/
│   ├── sections/               # componenti-sezione per landing page (Hero, About, Work...)
│   ├── ui/                     # bottoni, nav, cursor custom, elementi riutilizzabili
│   ├── three/
│   │   ├── Scene.jsx
│   │   ├── CameraRig.jsx
│   │   ├── Lights.jsx
│   │   ├── objects/            # un componente per oggetto/gruppo 3D
│   │   └── shaders/            # materiali custom (glsl via vite-plugin-glsl o template string)
│   └── transitions/
│       └── PageTransition.jsx  # solo siti multi-pagina
├── lib/
│   ├── gsap.config.js          # registrazione plugin GSAP
│   └── hooks/
│       ├── useReducedMotion.js
│       └── useDeviceCapabilities.js
└── store/                       # Zustand/Context se serve stato condiviso (es. scena 3D cross-page)
```

**Convenzioni di naming:**
- Cartelle di route: `kebab-case`, coerenti con gli URL (`app/case-studies/page.js`).
- Componenti React: `PascalCase.jsx` (es. `HeroScene.jsx`), un componente per file.
- Hook custom: `camelCase` con prefisso `use` (es. `useReducedMotion.js`).
- Componenti 3D: prefisso per tipo quando utile (`MeshHero`, `LightMain`, `MatGlass`).
- Timeline GSAP nominate per sezione/pagina: `tlHero`, `tlAbout`, `tlPageTransition`.
- CSS Modules: `Component.module.css` accanto al componente, classi in `camelCase` o BEM semplificato secondo preferenza del progetto.
- `"use client"` esplicito in cima a ogni componente che usa hook, GSAP, R3F o browser API — mantenere invece **server component** (nessuna direttiva) tutto ciò che è puramente contenuto/markup statico, per sfruttare i vantaggi di Next.js.

---

## 10. Checklist Rapida Pre-consegna (livello Awwwards)

- [ ] Il sito ha almeno un elemento distintivo/originale (non un template riconoscibile)
- [ ] Chiarito fin da subito: landing page o sito multi-pagina
- [ ] Componenti client (`"use client"`) usati solo dove serve, resto come server component
- [ ] Ogni animazione ha easing e durata intenzionali (no default)
- [ ] Preloader curato per asset 3D pesanti (via `useProgress`/Suspense)
- [ ] Scroll-storytelling: le scene evolvono con lo scroll, non solo fade-in statici
- [ ] Se multi-pagina: sistema di page transition custom (template.js/usePathname), mai reload/flash bianco
- [ ] Custom cursor / micro-interazioni dove ha senso
- [ ] `prefers-reduced-motion` gestito
- [ ] Contrasto testo/CTA verificato anche su sfondi animati
- [ ] Strategia mobile/touch per il 3D decisa e implementata
- [ ] Componenti 3D pesanti caricati con `dynamic(..., { ssr:false })` e lazy in viewport
- [ ] Render loop 3D in pausa/demand quando non necessario
- [ ] Skip disponibile per intro animate lunghe
- [ ] Nessuna sezione "urla" tutti gli effetti insieme: alternanza tra momenti wow e momenti di respiro
- [ ] Struttura cartelle App Router rispettata

---

## 11. Note per l'AI in fase di generazione

Quando generi codice per un nuovo sito partendo da questo file, obiettivo dichiarato: qualità da Awwwards Site of the Day/Nominee, sempre su **React + Next.js (App Router)**.

1. **Prima domanda sempre:** landing page (one-page) o sito multi-pagina? Da questo dipendono struttura, routing e gestione delle transizioni (vedi sezione 8).
2. Chiedi anche, se non specificato: tema/mood del sito, palette colori, tipo di contenuto (portfolio, prodotto, evento, brand...).
3. Se il progetto ha scene 3D pesanti, proponi tu la strategia mobile più adatta (semplificata / fallback 2D / qualità adattiva) motivandola, invece di assumerla in automatico.
4. Se multi-pagina, valuta e proponi se serve un `<Canvas>` persistente nel root layout (continuità 3D cross-page) o se ogni pagina ha la propria scena indipendente (più semplice, meno continuità visiva).
5. Usa sempre App Router (non Pages Router) salvo indicazione esplicita contraria.
6. Marca `"use client"` solo dove necessario (hook, GSAP, R3F, browser API); mantieni server component tutto il resto per performance e SEO.
7. Rispetta sempre struttura cartelle e naming definiti sopra, salvo indicazioni diverse dell'utente.
8. Non rinunciare mai alla gestione di `prefers-reduced-motion`, anche se non esplicitamente richiesta nel singolo progetto.
9. Cura sempre almeno: preloader, un momento hero cinematico, transizioni intenzionali (di sezione o di pagina), un elemento interattivo 3D con feedback reale. Sono gli ingredienti minimi ricorrenti nei siti premiati.
10. Non riempire ogni pixel di effetti: alterna momenti ad alta intensità visiva a momenti di respiro, per non affaticare l'utente e restare comunque leggibile/usabile.
