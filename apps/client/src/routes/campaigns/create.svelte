<script context="module">
  import { env } from '../../networking/env'
  import { gqlRequest } from '../../networking/gqlRequest'
  import { tags as tagsQuery } from '../../networking/graphql/query/Tags'

  export const load = async ({ session, fetch }) => {
    if (!session.user || !session.user.isAdmin) {
      return {
        status: 404,
      }
    }

    const [tags] = await Promise.all([
      fetch(
        `${env.viteSveltekitHost}/proxy/tags`,
        gqlRequest({
          query: tagsQuery(`id name`),
        }),
      ).then(async (res) => await res.json()),
    ])

    return {
      status: 200,
      props: {
        tags,
      },
    }
  }
</script>

<script lang="ts">
  import CampaignWorksCited from '../../assemblies/CampaignWorksCited.svelte'
  import Controls from '../../components/Controls.svelte'
  import Card from '../../components/Card.svelte'
  import Checkbox from '../../components/Checkbox.svelte'
  import CloseIcon from '../../components/iconography/Close.svelte'
  import { createTag } from '../../networking/graphql/mutation/CreateTag'
  import { createCampaign } from '../../networking/graphql/mutation/CreateCampaign'
  import { createWorkCited } from '../../networking/graphql/mutation/CreateWorkCited'
  import type { Tag } from '../../types/Tag'
  import type { Scalars as WorksCitedScalars, WorkCited } from '../../types/WorksCited'
  import { disableInteractablesWhile } from '../../utility/disableInteractablesWhile'

  const workCited = {
    authorFirstInitial: '',
    authorLastName: '',
    publicationYear: '',
    title: '',
    hyperlink: '',
    publicationMonth: '',
    publicationDate: '',
    publicationName: '',
  }

  /**
   * PROPS
   */
  export let tags: Tag[]

  /**
   * STATE
   */

  let title: string = ''
  let checklistTitle: string = ''
  let credRewarded: number
  let goal: number
  let goalUnit: string = ''
  let goalUnitIsDollars = true
  let goalVerb = ''
  let goalStartDate = ''
  let goalDeadline = ''
  let shortName = ''
  let whatParagraphs: string[] = ['']
  let whyParagraphs: string[] = ['']
  let outcomesParagraphs: string[] = ['']
  let tagName: string = '' // value for a new tag name
  let selectedTags: Tag[] = []
  let worksCited: WorksCitedScalars[] = [{ ...workCited }]
  let mayBeCompletedMultipleTimes = false

  /** WorkCited[] that have been created in the database for this Campaign */
  let createdWorksCited: WorkCited[] = []
  let didAttemptSubmit = false

  const handleWorksCitedSubmit = async () => {
    // Iterate through the required fields of each work cited and ensure there's a value present
    const requiredFields = [
      'authorFirstInitial',
      'authorLastName',
      'publicationYear',
      'title',
      'publicationName',
    ]

    const inputValid = worksCited.every((workCited) =>
      requiredFields.every((field) => !!workCited[field]),
    )

    if (!inputValid) {
      console.error(
        'Some required fields for Works Cited creation are missing. Please check the inputs and try again.',
      )

      return
    }

    return await disableInteractablesWhile(async () => {
      const responses: WorkCited[] = await worksCited.reduce(async (promise, current) => {
        const acc = await promise

        const response = await fetch(
          `${env.viteSveltekitHost}/proxy/create-work-cited`,
          gqlRequest({
            query: createWorkCited(`
              id
              authorFirstInitial
              authorLastName
              publicationYear
              title
              hyperlink
              publicationMonth
              publicationDate
              publicationName
            `),
            variables: {
              data: {
                ...current,
                publicationYear: parseInt(current.publicationYear),
                publicationDate: current.publicationDate
                  ? parseInt(current.publicationDate)
                  : undefined,
                type: 'WEBSITE', // TODO: hardcoded until additional types are supported
              },
            },
          }),
        )

        const deserialized = await response.json()

        return [...acc, deserialized]
      }, Promise.resolve([]))

      createdWorksCited = responses
      worksCited = [{ ...workCited }]
    })
  }

  const handleSubmit = async () => {
    didAttemptSubmit = true

    await fetch(
      `${env.viteSveltekitHost}/proxy/create-campaign`,
      gqlRequest({
        query: createCampaign(`id`),
        variables: {
          data: {
            title,
            checklistTitle,
            credRewarded,
            goal,
            goalUnit: goalUnitIsDollars ? 'dollars' : goalUnit,
            goalVerb,
            goalStartDate,
            goalDeadline,
            shortName,
            mayBeCompletedMultipleTimes,
            what: {
              set: whatParagraphs,
            },
            why: {
              set: whyParagraphs,
            },
            outcomes: {
              set: outcomesParagraphs,
            },
            tags: {
              connect: selectedTags.map((tag) => ({
                id: tag.id,
              })),
            },
            workCited: {
              connect: createdWorksCited.map((work) => ({
                id: work.id,
              })),
            },
          },
        },
      }),
    )
  }

  const handleMultiParagraphChange = (e, i: number) => {
    const { value, name } = e.target

    const updateParagraph = (paragraphs: string[], i: number) => {
      paragraphs[i] = value
      return paragraphs
    }

    switch (name) {
      case 'what':
        return (whatParagraphs = updateParagraph(whatParagraphs, i))
      case 'why':
        return (whyParagraphs = updateParagraph(whyParagraphs, i))
      case 'outcomes':
        return (outcomesParagraphs = updateParagraph(outcomesParagraphs, i))
      default:
        throw new Error('Unhandled multi-paragraph change')
    }
  }

  const handleWorksCitedChange = (e, i: number) => {
    const { value, name } = e.target
    worksCited[i][name] = value
  }

  const handleInitialKeydown = (e) => {
    if (e.key === 'Tab' || e.key === 'Enter') return
    if (e.key !== 'Backspace' && e.target.value.length === 1) {
      e.preventDefault()
    }
  }

  const selectTag = (tag: Tag) => {
    const existingTag = selectedTags.find((t) => t.id === tag.id)

    if (!existingTag) {
      return (selectedTags = [...selectedTags, tag])
    }

    return (selectedTags = selectedTags.filter((t) => t.id !== tag.id))
  }

  const createNewTag = async () => {
    if (!tagName) return

    const response = await fetch(
      `${env.viteSveltekitHost}/proxy/create-tag`,
      gqlRequest({
        query: createTag(`id name`),
        variables: {
          data: {
            name: tagName,
          },
        },
      }),
    )

    const deserialized = await response.json()

    if (deserialized.error) {
      return console.error(deserialized.error)
    }

    // Optimistically add the new tag to the list
    tags = [...tags, deserialized]
    tagName = ''
  }
</script>

<Controls />

<main class="create-campaign">
  <h2>Create Campaign</h2>

  <Card>
    <form on:submit|preventDefault={handleSubmit}>
      <h4>Campaign Details</h4>
      <label for="create-campaign-title"> Campaign Title </label>
      <input
        id="create-campaign-title"
        type="text"
        bind:value={title}
        placeholder="Exodus from for-profit banking"
        required
      />

      <label for="create-campaign-checklist-title"> Checklist Title </label>
      <input
        id="create-campaign-checklist-title"
        type="text"
        bind:value={checklistTitle}
        placeholder="Remove my money from participation in for-profit banking"
        required
      />

      <label for="create-campaign-cred"> Cred Rewarded </label>
      <input
        id="create-campaign-cred"
        type="number"
        bind:value={credRewarded}
        placeholder="100"
        required
      />

      <label for="create-campaign-goal">Goal</label>
      <input
        id="create-campaign-goal"
        type="number"
        bind:value={goal}
        required
        placeholder="1000000"
      />

      <Checkbox
        on:change={() => (goalUnitIsDollars = !goalUnitIsDollars)}
        checked={goalUnitIsDollars}
        >Dollars (there are special display logic implications for dollars, like displaying the '$'
        unit in front of figures)</Checkbox
      >

      {#if !goalUnitIsDollars}
        <label for="create-campaign-goal-unit"> Goal Unit </label>
        <input
          type="text"
          bind:value={goalUnit}
          required
          placeholder="(i.e., participants, strikers)"
        />
      {/if}

      <label for="create-campaign-goal-verb">Goal Verb</label>
      <input
        id="create-campaign-goal-verb"
        type="text"
        bind:value={goalVerb}
        required
        placeholder="(i.e., removed, achieved, reached, attained, met)"
      />

      <label for="create-campaign-start-date">Goal Start Date</label>
      <input
        id="create-campaign-goal-start-date"
        type="text"
        bind:value={goalStartDate}
        required
        placeholder="ISO 8601 date (i.e., 2022-02-21 01:40:35.149)"
      />

      <label for="create-campaign-goal-dealine">Goal Deadline</label>
      <input
        id="create-campaign-goal-deadline"
        type="text"
        bind:value={goalDeadline}
        required
        placeholder="ISO 8601 date (i.e., 2022-02-21 01:40:35.149)"
      />

      <label for="create-campaign-short-name"
        >Campaign Short Name
        <p class="subdued">How the app differentiates campaigns in the absence of an UUID</p>
      </label>

      <input
        id="create-campaign-short-name"
        type="text"
        bind:value={shortName}
        required
        placeholder="(i.e., banks)"
      />

      <label for="create-campaign-what-0"
        >What
        <p class="subdued">
          A brief description of what the main ask of the campaign is. Stored as separate
          paragraphs.
        </p>
      </label>

      {#each whatParagraphs as paragraph, i}
        <div style="position: relative;">
          {#if whatParagraphs.length !== 1}
            <button
              class="close-button"
              type="button"
              on:click={() =>
                (whatParagraphs = whatParagraphs.slice(0, i).concat(whatParagraphs.slice(i + 1)))}
              style="position: absolute; top: 4px; right: 0px;"><CloseIcon /></button
            >
          {/if}

          <textarea
            name="what"
            id={`create-campaign-what-${i}`}
            on:change={(e) => handleMultiParagraphChange(e, i)}
            type="text"
            bind:value={paragraph}
            required
            placeholder="We're calling on the community to remove personal funds from the large for-profit banks."
          />
        </div>

        {#if i === whatParagraphs.length - 1}
          <button
            type="button"
            class="secondary"
            on:click={() => (whatParagraphs = [...whatParagraphs, ''])}
          >
            Add Another Paragraph</button
          >
        {/if}
      {/each}

      <label for="create-campaign-why-0"
        >Why
        <p class="subdued">
          A not-so-brief background behind why we're launching the campaign. Stored as separate
          paragraphs.
        </p>
      </label>

      {#each whyParagraphs as paragraph, i}
        <div style="position: relative;">
          {#if whyParagraphs.length !== 1}
            <button
              class="close-button"
              type="button"
              on:click={() =>
                (whyParagraphs = whyParagraphs.slice(0, i).concat(whyParagraphs.slice(i + 1)))}
              style="position: absolute; top: 4px; right:0px;"><CloseIcon /></button
            >
          {/if}

          <textarea
            name="why"
            id={`create-campaign-what-${i}`}
            on:change={(e) => handleMultiParagraphChange(e, i)}
            type="text"
            bind:value={paragraph}
            required
            placeholder="In addition to historically denying home- and business loans to disadvantaged people and people of color, banks charge service fees to people that don't meet arbitrary standards for the amount of money held in accounts; they've even been known to create unauthorized accounts in your name to conjure new fee revenue streams out of thin air with your money."
          />
        </div>

        {#if i === whyParagraphs.length - 1}
          <button
            type="button"
            class="secondary"
            on:click={() => (whyParagraphs = [...whyParagraphs, ''])}
          >
            Add Another Paragraph</button
          >
        {/if}
      {/each}

      <label for="create-campaign-outcomes-0"
        >Outcomes
        <p class="subdued">
          Brief, 1-2 line tenets of what the campaign will accomplish. Stored as separate tenets.
        </p>
      </label>

      {#each outcomesParagraphs as paragraph, i}
        <div style="position: relative;">
          {#if outcomesParagraphs.length !== 1}
            <button
              class="close-button"
              type="button"
              on:click={() =>
                (outcomesParagraphs = outcomesParagraphs
                  .slice(0, i)
                  .concat(outcomesParagraphs.slice(i + 1)))}
              style="position: absolute; top: 4px; right: 0px;"><CloseIcon /></button
            >
          {/if}

          <textarea
            name="outcomes"
            id={`create-campaign-what-${i}`}
            on:change={(e) => handleMultiParagraphChange(e, i)}
            type="text"
            bind:value={paragraph}
            required
            placeholder="Disable the use of our dollars in coal, oil, and gas"
          />
        </div>

        {#if i === outcomesParagraphs.length - 1}
          <button
            type="button"
            class="secondary"
            on:click={() => (outcomesParagraphs = [...outcomesParagraphs, ''])}
          >
            Add Another Outcome</button
          >
        {/if}
      {/each}

      <h4>Works Cited</h4>
      <p>
        Create multiple works cited at once before submitting the campaign. Submitting the campaign
        will link all of the works cited created in this form.
      </p>

      <div class="works-cited">
        {#each worksCited as work, i}
          <Card>
            <div style="position: relative;">
              {#if worksCited.length !== 1}
                <button
                  class="close-button"
                  type="button"
                  on:click={() =>
                    (worksCited = worksCited.slice(0, i).concat(worksCited.slice(i + 1)))}
                  style="position: absolute; top: -18px; right: -24px;"><CloseIcon /></button
                >
              {/if}

              <div class="author-row">
                <div>
                  <label for={`create-campaign-works-cited-last-name-${i}`}
                    >Author 1 Last Name</label
                  >
                  <input
                    name="authorLastName"
                    id={`create-campaign-works-cited-last-name-${i}`}
                    on:change={(e) => handleWorksCitedChange(e, i)}
                    type="text"
                    bind:value={work.authorLastName}
                    placeholder="Reynolds"
                  />
                </div>

                <div>
                  <label for={`create-campaign-works-cited-first-initial-${i}`}
                    >Author 1 First Initial</label
                  >
                  <input
                    on:keydown={(e) => handleInitialKeydown(e)}
                    name="authorFirstInitial"
                    id={`create-campaign-works-cited-first-initial-${i}`}
                    on:change={(e) => handleWorksCitedChange(e, i)}
                    type="text"
                    bind:value={work.authorFirstInitial}
                    placeholder="J"
                  />
                </div>
              </div>
            </div>

            <div class="author-row">
              <div>
                <label for={`create-campaign-works-cited-last-name-2-${i}`}
                  >Author 2 Last Name</label
                >
                <input
                  name="authorLastName2"
                  id={`create-campaign-works-cited-last-name-${i}`}
                  on:change={(e) => handleWorksCitedChange(e, i)}
                  type="text"
                  bind:value={work.authorLastName2}
                  placeholder="Reynolds"
                />
              </div>

              <div>
                <label for={`create-campaign-works-cited-first-initial-2-${i}`}
                  >Author 2 First Initial</label
                >
                <input
                  on:keydown={(e) => handleInitialKeydown(e)}
                  name="authorFirstInitial2"
                  id={`create-campaign-works-cited-first-initial-${i}`}
                  on:change={(e) => handleWorksCitedChange(e, i)}
                  type="text"
                  bind:value={work.authorFirstInitial2}
                  placeholder="J"
                />
              </div>
            </div>

            <div class="author-row">
              <div>
                <label for={`create-campaign-works-cited-last-name-3-${i}`}
                  >Author 3 Last Name</label
                >
                <input
                  name="authorLastName3"
                  id={`create-campaign-works-cited-last-name-3-${i}`}
                  on:change={(e) => handleWorksCitedChange(e, i)}
                  type="text"
                  bind:value={work.authorLastName3}
                  placeholder="Reynolds"
                />
              </div>

              <div>
                <label for={`create-campaign-works-cited-first-initial-3-${i}`}
                  >Author 3 First Initial</label
                >
                <input
                  on:keydown={(e) => handleInitialKeydown(e)}
                  name="authorFirstInitial3"
                  id={`create-campaign-works-cited-first-initial-3-${i}`}
                  on:change={(e) => handleWorksCitedChange(e, i)}
                  type="text"
                  bind:value={work.authorFirstInitial3}
                  placeholder="J"
                />
              </div>
            </div>

            <div class="date-row">
              <div>
                <label for={`create-campaign-works-cited-publication-year-${i}`}
                  >Publication Year</label
                >
                <input
                  name="publicationYear"
                  id={`create-campaign-works-cited-publication-year-${i}`}
                  on:change={(e) => handleWorksCitedChange(e, i)}
                  type="number"
                  bind:value={work.publicationYear}
                  placeholder="2022"
                />
              </div>

              <div>
                <label for={`create-campaign-works-cited-publication-month-${i}`}
                  >Publication Month</label
                >
                <input
                  name="publicationMonth"
                  id={`create-campaign-works-cited-publication-month-${i}`}
                  on:change={(e) => handleWorksCitedChange(e, i)}
                  type="text"
                  bind:value={work.publicationMonth}
                  placeholder="September"
                />
              </div>

              <div>
                <label for={`create-campaign-works-cited-publication-date-${i}`}
                  >Publication Date</label
                >
                <input
                  name="publicationDate"
                  id={`create-campaign-works-cited-publication-date-${i}`}
                  on:change={(e) => handleWorksCitedChange(e, i)}
                  type="number"
                  bind:value={work.publicationDate}
                  placeholder="31"
                />
              </div>
            </div>

            <label for={`create-campaign-works-cited-title-${i}`}>Title</label>
            <input
              name="title"
              id={`create-campaign-works-cited-title-${i}`}
              on:change={(e) => handleWorksCitedChange(e, i)}
              type="text"
              bind:value={work.title}
              placeholder="Title"
            />

            <label for={`create-campaign-works-cited-publication-name-${i}`}>Publication Name</label
            >
            <input
              name="publicationName"
              id={`create-campaign-works-cited-publication-name-${i}`}
              on:change={(e) => handleWorksCitedChange(e, i)}
              type="text"
              bind:value={work.publicationName}
              placeholder="The New York Times"
            />

            <label for={`create-campaign-works-cited-hyperlink-${i}`}>Hyperlink</label>
            <input
              name="hyperlink"
              id={`create-campaign-works-cited-hyperlink-${i}`}
              on:change={(e) => handleWorksCitedChange(e, i)}
              type="text"
              bind:value={work.hyperlink}
              placeholder="https://wikipedia.com/late-capitalism"
            />
          </Card>
          {#if i === worksCited.length - 1}
            <button
              type="button"
              class="secondary"
              on:click={() => (worksCited = [...worksCited, { ...workCited }])}
            >
              + Another Source</button
            >
          {/if}
        {/each}
      </div>

      <button on:click={handleWorksCitedSubmit} type="button" class="primary"
        >Create Works Cited</button
      >

      {#if createdWorksCited.length > 0}
        <div class="works-cited-to-be-added">
          <CampaignWorksCited worksCited={createdWorksCited} />
        </div>
      {/if}

      <Card>
        <h4>Campaign Tags</h4>

        <p>Click all that apply to this campaign</p>

        <div class="tags-container">
          {#each tags as tag}
            <button
              on:click={() => selectTag(tag)}
              type="button"
              class:selected={!!selectedTags.find((selectedTag) => tag.id === selectedTag.id)}
              class="tag">{tag.name}</button
            >
          {/each}
        </div>

        <label for="create-campaign-tag"
          >New Tag
          <p>If you don't see the tag you want, you can add another right here.</p>
        </label>
        <input bind:value={tagName} id="create-campaign-tag" type="text" />

        <button class="primary" on:click={createNewTag} type="button">Create New Tag</button>
      </Card>

      <Checkbox
        bind:checked={mayBeCompletedMultipleTimes}
        on:change={() => (mayBeCompletedMultipleTimes = !mayBeCompletedMultipleTimes)}
        >This campaign may be completed multiple times</Checkbox
      >

      <button class="primary" type="submit">Create Campaign</button>
    </form>
  </Card>
</main>

<style>
  main {
    padding: 72px 0;
    margin: auto;
    width: calc(100% - 48px);
    max-width: 750px;
  }

  p {
    text-transform: none;
    color: var(--text-color-subdued);
  }

  textarea {
    height: 80px;
  }

  label {
    margin-top: 40px;
  }

  label:first-of-type {
    margin-top: 0;
  }

  h4:not(:first-of-type) {
    margin-top: 40px;
  }

  .close-button {
    z-index: 2;
  }

  .tags-container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
    margin-bottom: 16px;
  }

  .tag {
    width: auto;
    font-size: 0.8em;
    white-space: nowrap;
    display: inline-block;
    background-color: transparent;
    color: var(--text-color-subdued);
    border-radius: 16px;
    padding: 4px 16px;
    margin: 0 0;
    cursor: default;
    border: 1px solid var(--visualization-color);
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .tag.selected {
    background-color: var(--interactive-color);
    color: var(--button-text-color);
    transition: background-color 0.2s;
  }

  :global(.create-campaign .card) {
    margin: 32px auto 16px;
  }

  :global(.create-campaign .card label) {
    margin-top: 24px;
  }

  button {
    margin-top: 16px;
  }

  .primary {
    width: 100%;
    max-width: none;
  }

  .works-cited label {
    margin-top: 16px;
  }

  .works-cited :global(.card) {
    padding-top: 8px;
  }

  .author-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  .author-row div:first-child {
    width: calc(100% - 160px - 8px);
  }

  .author-row div:nth-child(2) {
    width: 160px;
  }

  .date-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .date-row div:first-child {
    width: 132px;
  }

  .date-row div:nth-child(2) {
    width: calc(100% - 160px - 132px - 8px);
  }

  .date-row div:last-child {
    width: 160px;
  }

  .works-cited-to-be-added :global(h2) {
    margin-top: 24px;
  }

  .works-cited-to-be-added :global(svg) {
    fill: var(--interactive-color);
  }
</style>
