const c = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../runtime/components/error.svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/confirm-user-callback.svelte"),
	() => import("../../src/routes/checklist-rfcs.svelte"),
	() => import("../../src/routes/campaign-rfcs.svelte"),
	() => import("../../src/routes/verify-email.svelte"),
	() => import("../../src/routes/campaigns/[id].svelte"),
	() => import("../../src/routes/checklist.svelte"),
	() => import("../../src/routes/resources.svelte"),
	() => import("../../src/routes/register.svelte"),
	() => import("../../src/routes/log-in.svelte"),
	() => import("../../src/routes/about.svelte"),
	() => import("../../src/routes/audit.svelte"),
	() => import("../../src/routes/error.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/confirm-user-callback.svelte
	[/^\/confirm-user-callback\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/checklist-rfcs.svelte
	[/^\/checklist-rfcs\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/campaign-rfcs.svelte
	[/^\/campaign-rfcs\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/verify-email.svelte
	[/^\/verify-email\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/campaigns/[id].svelte
	[/^\/campaigns\/([^/]+?)\/?$/, [c[0], c[7]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/checklist.svelte
	[/^\/checklist\/?$/, [c[0], c[8]], [c[1]]],

	// src/routes/resources.svelte
	[/^\/resources\/?$/, [c[0], c[9]], [c[1]]],

	// src/routes/register.svelte
	[/^\/register\/?$/, [c[0], c[10]], [c[1]]],

	// src/routes/log-in.svelte
	[/^\/log-in\/?$/, [c[0], c[11]], [c[1]]],

	// src/routes/about.svelte
	[/^\/about\/?$/, [c[0], c[12]], [c[1]]],

	// src/routes/audit.svelte
	[/^\/audit\/?$/, [c[0], c[13]], [c[1]]],

	// src/routes/error.svelte
	[/^\/error\/?$/, [c[0], c[14]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];