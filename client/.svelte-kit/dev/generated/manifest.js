const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/checklist-rfcs.svelte"),
	() => import("../../../src/routes/campaign-rfcs.svelte"),
	() => import("../../../src/routes/register.svelte"),
	() => import("../../../src/routes/roadmap.svelte"),
	() => import("../../../src/routes/about.svelte"),
	() => import("../../../src/routes/audit.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/checklist-rfcs.svelte
	[/^\/checklist-rfcs\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/campaign-rfcs.svelte
	[/^\/campaign-rfcs\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/register.svelte
	[/^\/register\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/roadmap.svelte
	[/^\/roadmap\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/about.svelte
	[/^\/about\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/audit.svelte
	[/^\/audit\/?$/, [c[0], c[8]], [c[1]]],

	,

	,

	,

	,

	,

	,

	
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];