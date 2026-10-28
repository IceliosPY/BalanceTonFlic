<script lang="ts">
  import { i18n, setLocale, t, type Locale } from "./lib/i18n.svelte.ts";
  import Batch from "./components/Batch.svelte";
  import DropZone from "./components/DropZone.svelte";
  import Photo from "./components/Photo.svelte";
  import Video from "./components/Video.svelte";
  import {
    defaultMaskOptions,
    type MaskOptions,
  } from "./lib/anonymize/render.ts";
  import { Engine } from "./lib/detect/client.ts";
  import { isVideo } from "./lib/media/image.ts";
  import type { Backend } from "./lib/detect/detector.ts";
  import offensive from "./assets/brand/offensive.png";

  const worker = new Engine();

  const CREDITS = [
    {
      name: "CenterFace",
      url: "https://github.com/Star-Clouds/CenterFace",
      license: "MIT",
      role: "creditCenterface",
    },
    {
      name: "deface",
      url: "https://github.com/ORB-HD/deface",
      license: "MIT",
      role: "creditDeface",
    },
    {
      name: "ONNX Runtime Web",
      url: "https://onnxruntime.ai",
      license: "MIT",
      role: "creditOnnx",
    },
    {
      name: "Mediabunny",
      url: "https://mediabunny.dev",
      license: "MPL-2.0",
      role: "creditMediabunny",
    },
    {
      name: "Svelte",
      url: "https://svelte.dev",
      license: "MIT",
      role: "creditSvelte",
    },
    {
      name: "fflate",
      url: "https://github.com/101arrowz/fflate",
      license: "MIT",
      role: "creditFflate",
    },
    {
      name: "IBM Plex Mono",
      url: "https://github.com/IBM/plex",
      license: "OFL-1.1",
      role: "creditPlex",
    },
  ] as const;

  let backend = $state<Backend>();
  let error = $state<string>();
  let options = $state<MaskOptions>({ ...defaultMaskOptions });
  let threshold = $state(0.2);
  let files = $state.raw<File[]>([]);
  let offline = $state(false);

  navigator.serviceWorker?.ready.then(() => (offline = true));

  worker
    .call("init", {})
    .then(
      (b) => (backend = b),
      (e: Error) => (error = t("detectorFailed", e.message)),
    )
    // Precaching the model while the detector downloads it makes Chromium's HTTP cache fail one of the two.
    .finally(() => {
      if (import.meta.env.PROD && "serviceWorker" in navigator)
        navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
    });

  function open(selected: File[]) {
    error = undefined;
    if (selected.length > 1 && selected.some(isVideo)) {
      error = t("oneVideo");
      return;
    }
    files = selected;
  }

  const onerror = (message: string) => (error = message);
  const onclose = () => (files = []);
</script>

<main>
  <nav class="toolbar" aria-label="Navigation de l’outil">
    <a class="btf-brand" href="../">
      <img
        src="/BalanceTonFlic/assets/logo-btf-round.webp"
        alt=""
        width="48"
        height="48"
      />
      <span>Balance ton flic</span>
    </a>
    <a class="btf-back" href="../transmettre/">← Retour à Transmettre</a>
  </nav>
  <header>
    <p class="eyebrow">Outil d’anonymisation local</p>
    <h1>Masquer les <em>visages</em></h1>
    <p>{t("tagline")}</p>
  </header>

  {#if error}
    <p class="error" role="alert">{error}</p>
  {/if}

  {#if files.length}
    {#key files}
      {#if files.length > 1}
        <Batch {files} {worker} bind:options bind:threshold {onclose} />
      {:else if isVideo(files[0])}
        <Video
          file={files[0]}
          {worker}
          bind:options
          bind:threshold
          {onerror}
          {onclose}
        />
      {:else}
        <Photo
          file={files[0]}
          {worker}
          bind:options
          bind:threshold
          {onerror}
          {onclose}
        />
      {/if}
    {/key}
  {:else}
    <DropZone accept="image/*,video/*" onfiles={open} />
  {/if}

  <p class="disclaimer">{t("warning")}</p>

  <footer>
    <section aria-labelledby="about">
      <h2 id="about">{t("about")}</h2>
      <p>{t("aboutText")}</p>
      <p>
        {t("guideIntro")}
        <a href={t("guideUrl")} target="_blank" rel="noopener noreferrer"
          >{t("guideTitle")}</a
        >.
      </p>
      <p>
        {t("freeSoftware")}
        <a
          href="https://github.com/IceliosPY/BalanceTonFlic/tree/main/vendor/masque"
          target="_blank"
          rel="noopener noreferrer">code source de la version intégrée</a
        >
      </p>
    </section>

    <section aria-labelledby="created-by">
      <h2 id="created-by">{t("createdBy")}</h2>
      <ul class="orgs">
        <li>
          <a
            href="https://onestla.tech"
            target="_blank"
            rel="noopener noreferrer"
            class="onestla"
          >
            <span class="emoji" aria-hidden="true">✊</span><span
              >on<b>est</b>la.tech<b>/</b></span
            >
          </a>
          <p>{t("onestlaDescription")}</p>
        </li>
        <li>
          <a
            href="https://offensive.eco"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={offensive} alt="L’Offensive" width="96" height="96" />
          </a>
          <p>{t("offensiveDescription")}</p>
        </li>
      </ul>
    </section>

    <div class="meta">
      {#if offline}
        <p>{t("offline")}</p>
      {/if}
      {#if backend}
        <p class="backend">
          {t(backend === "webgpu" ? "backendGpu" : "backendCpu")}
        </p>
      {/if}
      <label>
        {t("language")}
        <select
          value={i18n.locale}
          onchange={(e) => setLocale(e.currentTarget.value as Locale)}
        >
          <option value="en" lang="en">English</option>
          <option value="fr" lang="fr">Français</option>
        </select>
      </label>
    </div>

    <details class="credits">
      <summary>{t("credits")}</summary>
      <ul>
        {#each CREDITS as c (c.name)}
          <li>
            <a href={c.url} target="_blank" rel="noopener noreferrer"
              >{c.name}</a
            >{t("colon")}{t(c.role)} ({c.license})
          </li>
        {/each}
      </ul>
      <p>{t("hosting")}</p>
      <p>{t("aiDisclosure")}</p>
    </details>
  </footer>
</main>

<style>
  main {
    --gutter: clamp(1rem, 4vw, 3rem);
    max-width: 82rem;
    min-height: 100vh;
    margin: 0 auto;
    padding: 0 var(--gutter) 3rem;
    background: var(--surface);
  }

  @media (max-width: 40rem) {
    main {
      --gutter: 1rem;
    }
  }

  header {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(17rem, 0.65fr);
    gap: clamp(1.5rem, 5vw, 5rem);
    align-items: end;
    padding: clamp(3.5rem, 8vw, 7rem) 0 clamp(2.5rem, 5vw, 4.5rem);
    border-bottom: 3px solid var(--fg);
  }

  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    min-height: 5rem;
    border-bottom: 1px solid var(--line);
  }

  .btf-brand {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--fg);
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
  }

  .btf-brand img {
    width: 3rem;
    height: 3rem;
    object-fit: contain;
  }

  .btf-back {
    color: var(--fg);
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
  }

  .btf-back:hover {
    color: var(--accent);
  }

  h1 {
    margin: 0;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    font-size: clamp(4rem, 9vw, 8rem);
    font-weight: 900;
    letter-spacing: -0.035em;
    line-height: 0.8;
    text-transform: uppercase;
  }

  h1 em {
    color: var(--accent);
    font-style: normal;
  }

  .eyebrow {
    grid-column: 1 / -1;
    margin: 0 0 -2rem;
    color: var(--accent);
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  header p {
    margin: 0;
    color: var(--muted);
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    line-height: 1.4;
  }

  .error {
    color: var(--danger);
    font-weight: bold;
  }

  .disclaimer {
    margin: 3rem 0 0;
    padding: 1.25rem 1.5rem;
    border-left: 6px solid var(--accent);
    color: var(--fg);
    font-weight: bold;
    background: var(--tint);
  }

  footer {
    margin-top: 4rem;
    padding-top: 0.5rem;
    border-top: 3px solid var(--fg);
    font-size: 0.875rem;
  }

  h2 {
    margin: 2.5rem 0 0.75rem;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.5rem;
  }

  h2::after {
    content: "";
    display: block;
    width: 3rem;
    margin-top: 0.25rem;
    border-top: 3px solid var(--accent);
  }

  ul {
    padding: 0;
    list-style: none;
  }

  .orgs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 1.5rem;
  }

  .orgs a {
    display: inline-flex;
    align-items: center;
    min-height: 96px;
    color: inherit;
    text-decoration: none;
  }

  .onestla {
    gap: 0.5rem;
    font-size: 1.5rem;
  }

  .onestla .emoji {
    font-size: 2.5rem;
  }

  .orgs p {
    margin: 0.25rem 0 0;
    color: var(--muted);
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 2rem;
    align-items: center;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--line);
    color: var(--muted);
  }

  .meta p {
    margin: 0;
  }

  .credits {
    margin-top: 1rem;
    color: var(--muted);
  }

  .credits summary {
    cursor: pointer;
  }

  @media (max-width: 46rem) {
    header {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding-block: 3.5rem 2.5rem;
    }

    .eyebrow {
      margin-bottom: 0;
    }

    h1 {
      font-size: clamp(3.4rem, 18vw, 5.5rem);
    }

    .btf-brand span {
      display: none;
    }

    .btf-back {
      text-align: right;
    }
  }
</style>
