import {
  ArgsDictionary,
  createMethodDecorator,
  MiddlewareFn,
} from 'type-graphql'
import type { Context } from '../types/Context'
import { ErrorWithProps } from '../utility/ErrorWithProps'

/**
 * MUST BE PRECEDED BY @Authorized()
 * MUST BE PRECEDED BY @UseMiddleware(CurrentUser)
 *
 * Injects auditing fields (createdBy, updatedBy) to args.data
 * of a decorated resolver.
 */
export const InjectAuditingFields = async () =>
  createMethodDecorator(
    async (
      { args, context }: { args: ArgsDictionary; context: Context },
      next,
    ) => {
      console.log({ args })
      const { userId } = context

      if (!userId) {
        throw new ErrorWithProps(
          'Development implementation error: @Authorized and @UseMiddleware(CurrentUser) must precede @UseMiddleware(InjectAuditingFields)',
        )
      }

      console.log('hello')
      // const clone = JSON.parse(JSON.stringify(args))

      // const newArgs = {
      //   ...clone,
      //   data: {
      //     ...clone.data,
      //     createdBy: userId,
      //     updatedBy: userId,
      //   },
      // }

      // args = newArgs

      // const dataArg = info.fieldNodes[0].arguments?.find(
      //   ({ name }) => name.value === 'data',
      // )

      // ;(dataArg?.value as any).fields.push({
      //   kind: 'ObjectField',
      //   name: { kind: 'Name', value: 'createdBy' },
      //   value: {
      //     kind: 'StringValue',
      //     value: userId,
      //     // loc: { start: 53, end: 65 },
      //   },
      //   // loc: { start: 47, end: 65 },
      // })

      // console.log({ info, root })
      // console.log(JSON.stringify(info.fieldNodes, null, 2))

      return next()
    },
  )
