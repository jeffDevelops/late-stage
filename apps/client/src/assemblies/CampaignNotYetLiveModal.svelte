<script lang="ts">
  import Modal from '../components/Modal.svelte'

  /**
   * PROPS
   */

  export let isDisplayed
</script>

<Modal shouldDisplayCloseButton={false} {isDisplayed} maxWidth={750} isAnimated={true}>
  <div slot="content">
    <h2>This campaign is not live... Yet!</h2>
    <p>
      While this campaign is likely to be in the spirit of what Late-Stage will do, this page is not
      completely functional and is intended to serve as an example of the capabilities of the
      platform as a springboard for discussion.
    </p>

    <h4>We need your insight!</h4>

    <p>
      We need passionate advocates and subject-matter experts like you to help craft the perfect
      first campaign! Whether your specialization is in economics, legal, sociology, marketing,
      content strategy, copy editing, project management, development or any other peripheral
      disciplines, we need your input to deliver the most widespread and impactful campaigns
      possible.
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
