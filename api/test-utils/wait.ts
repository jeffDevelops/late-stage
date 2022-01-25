export const wait = async (
  timeoutMilliseconds: number,
  verbose: boolean = false,
) =>
  new Promise<void>((resolve) => {
    let secondsCount = 1
    let interval: NodeJS.Timeout

    if (process.env.VERBOSE) {
      interval = setInterval(() => {
        console.log(`Waiting... ${secondsCount}`)
        secondsCount += 1
      }, 999.999) // not quite a second so that the call site can specify even second intervals and still see wait logs
    }

    const timeout = setTimeout(() => {
      if (interval) clearInterval(interval)
      clearTimeout(timeout)
      return resolve()
    }, timeoutMilliseconds)
  })
