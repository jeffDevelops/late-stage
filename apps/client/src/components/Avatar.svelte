<script lang="ts">
  import type { User } from '../types/User'

  /**
   * PROPS
   */
  export let user: User | undefined = undefined
  export let anonymous: boolean = false
  export let size: 'small' | 'normal' = 'small'

  const initials =
    anonymous || !user
      ? 'A'
      : user.username
          .split(/([\-|_|.])/) // Split on separators
          .filter((char) => !char.match(/([\-|_|.])/)) // Remove separators
          .reduce((acc, word) => acc + word[0].toUpperCase(), '') // Concatenate
          .substring(0, 2) // Limit to 2 characters
</script>

<div
  class="border"
  style="
    height: {size === 'normal' ? '40px;' : '24px'};
    width: {size === 'normal' ? '40px;' : '24px'};
    font-size: {size === 'normal' ? '20px' : '12px'};
  "
>
  {initials}
</div>

<style>
  .border {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--interactive-color);
    border-radius: 50%;
    color: var(--interactive-color);
    font-family: var(--font-sans);
  }

  @media screen and (max-width: 600px) {
    .border {
      max-height: 24px;
      max-width: 24px;
      font-size: 12px;
    }
  }
</style>
