<script lang="ts">
  import { t } from "../lib/i18n.svelte.ts";
  let {
    accept,
    onfiles,
  }: { accept: string; onfiles: (files: File[]) => void } = $props();

  let over = $state(false);

  function drop(e: DragEvent) {
    e.preventDefault();
    over = false;
    if (e.dataTransfer?.files.length) onfiles([...e.dataTransfer.files]);
  }
</script>

<label
  class="zone"
  class:over
  ondragover={(e) => {
    e.preventDefault();
    over = true;
  }}
  ondragleave={() => (over = false)}
  ondrop={drop}
>
  <input
    type="file"
    {accept}
    multiple
    onchange={(e) => {
      const input = e.currentTarget;
      if (input.files?.length) onfiles([...input.files]);
      input.value = "";
    }}
  />
  <strong>{t("choose")}</strong>
  <span>{t("dropHere")}</span>
</label>

<style>
  .zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    min-height: 23rem;
    justify-content: center;
    padding: 3rem 1rem;
    border: 2px solid var(--fg);
    border-top: 8px solid var(--accent);
    background: var(--tint);
    cursor: pointer;
    text-align: center;
  }

  .zone.over,
  .zone:focus-within {
    background: #ebe4d8;
    box-shadow: 8px 8px 0 var(--accent);
  }

  strong {
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    font-size: clamp(2rem, 6vw, 4rem);
    font-weight: 900;
    line-height: 0.9;
    text-transform: uppercase;
  }

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  span {
    color: var(--muted);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }
</style>
