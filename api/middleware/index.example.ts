// import { createDashboardSummaryMiddleware } from './DashboardSummary/create'
// import mercurius from 'mercurius'
// const { ErrorWithProps } = mercurius

// export const middleware = async (params, next) => {
//   if (params.action === 'create' || params.action === 'update') {
//     switch (params.model) {
//       case 'DashboardSummary': {
//         if (params.action === 'create') {
//           try {
//             const isValid = await createDashboardSummaryMiddleware(params)
//             if (isValid) return next()
//           } catch (error) {
//             throw new ErrorWithProps(error)
//           }
//         }
//       }

//       default:
//         throw new ErrorWithProps(
//           `Operation not validated. Operation: ${params.action}; Model: ${params.model}`
//         )
//     }
//   }

//   return next()
// }
