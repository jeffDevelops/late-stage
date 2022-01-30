export const manifest = {
	appDir: "_app",
	assets: new Set(["Jeff.jpeg","Late-StageCoverPhoto.png","Late-StageIcon.png","LateStageBackground.afdesign","favicon.png"]),
	_: {
		mime: {".jpeg":"image/jpeg",".png":"image/png"},
		entry: {"file":"start-e486737e.js","js":["start-e486737e.js","chunks/vendor-e5aa1018.js","chunks/singletons-d19c42e4.js"],"css":["assets/vendor-4ff902fe.css"]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/10.js'),
			() => import('./nodes/11.js'),
			() => import('./nodes/12.js'),
			() => import('./nodes/13.js'),
			() => import('./nodes/14.js'),
			() => import('./nodes/15.js')
		],
		routes: [
			{
				type: 'page',
				pattern: /^\/$/,
				params: null,
				path: "/",
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/password-reset-callback\/?$/,
				params: null,
				path: "/password-reset-callback",
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/confirm-user-callback\/?$/,
				params: null,
				path: "/confirm-user-callback",
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/checklist-rfcs\/?$/,
				params: null,
				path: "/checklist-rfcs",
				a: [0,5],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/reset-password\/?$/,
				params: null,
				path: "/reset-password",
				a: [0,6],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/campaign-rfcs\/?$/,
				params: null,
				path: "/campaign-rfcs",
				a: [0,7],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/verify-email\/?$/,
				params: null,
				path: "/verify-email",
				a: [0,8],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/campaigns\/([^/]+?)\/?$/,
				params: (m) => ({ id: m[1]}),
				path: null,
				a: [0,9],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/checklist\/?$/,
				params: null,
				path: "/checklist",
				a: [0,10],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/resources\/?$/,
				params: null,
				path: "/resources",
				a: [0,11],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/register\/?$/,
				params: null,
				path: "/register",
				a: [0,12],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/log-in\/?$/,
				params: null,
				path: "/log-in",
				a: [0,13],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/about\/?$/,
				params: null,
				path: "/about",
				a: [0,14],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/audit\/?$/,
				params: null,
				path: "/audit",
				a: [0,15],
				b: [1]
			},
			{
				type: 'endpoint',
				pattern: /^\/proxy\/send-password-reset-email\/?$/,
				params: null,
				load: () => import('./entries/endpoints/proxy/send-password-reset-email.ts.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/proxy\/verify-email-address\/?$/,
				params: null,
				load: () => import('./entries/endpoints/proxy/verify-email-address.ts.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/proxy\/update-password\/?$/,
				params: null,
				load: () => import('./entries/endpoints/proxy/update-password.ts.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/proxy\/authenticate\/?$/,
				params: null,
				load: () => import('./entries/endpoints/proxy/authenticate.ts.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/proxy\/confirm-user\/?$/,
				params: null,
				load: () => import('./entries/endpoints/proxy/confirm-user.ts.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/proxy\/current-user\/?$/,
				params: null,
				load: () => import('./entries/endpoints/proxy/current-user.ts.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/proxy\/health-check\/?$/,
				params: null,
				load: () => import('./entries/endpoints/proxy/health-check.ts.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/proxy\/user-where\/?$/,
				params: null,
				load: () => import('./entries/endpoints/proxy/user-where.ts.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/proxy\/register\/?$/,
				params: null,
				load: () => import('./entries/endpoints/proxy/register.ts.js')
			},
			{
				type: 'endpoint',
				pattern: /^\/proxy\/log-out\/?$/,
				params: null,
				load: () => import('./entries/endpoints/proxy/log-out.ts.js')
			}
		]
	}
};
