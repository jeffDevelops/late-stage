export const env: { [key: string]: string } = {
	sveltekitUrl: import.meta.env['VITE_SVELTEKIT_URL'] as string,
	kjvUrl: import.meta.env['VITE_KJV_URL'] as string,
	apiBaseUrl: import.meta.env['VITE_API_BASE_URL'] as string,
	apiPath: import.meta.env['VITE_API_PATH'] as string,
}
