export type Environments = 'development' | 'staging' | 'production'

export type Env = {
  viteSveltekitHost: string
  viteHostAddress: string
  viteRecaptchaSiteKey: string
  viteImageKitPublicKey: string
  viteEnvironment: Environments
}

export const env = {
  /**
   * PUBLIC / EXPOSED KEYS ONLY
   * (non-sensitive variables may be added here, and must be prepended with 'VITE_')
   */

  viteSveltekitHost: import.meta.env['VITE_SVELTEKIT_HOST'] as string,
  viteHostAddress: import.meta.env['VITE_HOST_ADDRESS'] as string,
  viteRecaptchaSiteKey: import.meta.env['VITE_RECAPTCHA_SITE_KEY'] as string,
  viteImageKitPublicKey: import.meta.env['VITE_IMAGEKIT_PUBLIC_KEY'] as string,
  viteEnvironment: import.meta.env['VITE_ENVIRONMENT'] as Environments,
}
