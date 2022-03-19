<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Modal from '../components/Modal.svelte'

  const dispatch = createEventDispatcher()

  /**
   * PROPS
   */

  export let isDisplayed
</script>

<Modal
  on:dismiss={() => dispatch('dismiss')}
  shouldDisplayCloseButton={false}
  isBlurDismissable={true}
  {isDisplayed}
  maxWidth={750}
  isAnimated={true}
>
  <div slot="content">
    <h2>This campaign is not live... Yet!</h2>

    <h4>We need your insight!</h4>

    <p>
      We need passionate advocates and subject-matter experts like you to help craft the perfect
      campaign! Whether your specialization is in economics, legal, sociology, marketing, content
      strategy, copy editing, project management, development or any other peripheral disciplines,
      we need your input to deliver the most widespread and impactful campaigns possible.
    </p>

    <h4>Submit your ideas</h4>
    <p>We've opened the following pipelines for suggestions:</p>

    <p class="pipelines">
      Campaign ideas: <a
        href="https://late-stage.com/campaign-rfcs#campaign-idea-template"
        target="_blank">late-stage.com/campaign-rfcs#campaign-idea-template</a
      >
    </p>
    <p class="pipelines">
      Checklist ideas: <a
        href="https://late-stage.com/checklist-rfcs#checklist-idea-template"
        target="_blank">late-stage.com/checklist-rfcs#checklist-idea-template</a
      >
    </p>
    <p class="pipelines">
      Audit the platform here: <a
        href="https://late-stage.com/audit#audit-report-template"
        target="_blank">late-stage.com/audit#audit-report-template</a
      >
    </p>
  </div>
  <div slot="actions">
    <button class="primary" on:click>Got it!</button>
  </div>
</Modal>

<style>
  h4 {
    margin-top: 32px;
  }

  .pipelines {
    margin-bottom: 4px;
  }
</style>
