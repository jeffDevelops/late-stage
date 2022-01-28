import * as assert from 'uvu/assert'

export const assertPasswordNotQueryable = (response: {
  data?: unknown
  errors?: { message: string }[]
}) => {
  assert.is(response.data, null)

  // Expect password field NOT to be query-able
  assert.is(
    response.errors?.some(
      (error: any) =>
        error.message ===
        "Cannot query field \"password\" on type \"User\".", // prettier-ignore
    ),
    true,
  )
}
