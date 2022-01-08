export const manifest = {
	appDir: "_app",
	assets: new Set(["Jeff.jpeg","Late-StageCoverPhoto.png","Late-StageIcon.png","favicon.png"]),
	_: {
		mime: {".jpeg":"image/jpeg",".png":"image/png"},
		entry: {"file":"start-65291668.js","js":["start-65291668.js","chunks/vendor-a62e5b1e.js"],"css":["assets/start-61d1577b.css"]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js')
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
				pattern: /^\/checklist-rfcs\/?$/,
				params: null,
				path: "/checklist-rfcs",
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/campaign-rfcs\/?$/,
				params: null,
				path: "/campaign-rfcs",
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/register\/?$/,
				params: null,
				path: "/register",
				a: [0,5],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/roadmap\/?$/,
				params: null,
				path: "/roadmap",
				a: [0,6],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/about\/?$/,
				params: null,
				path: "/about",
				a: [0,7],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/audit\/?$/,
				params: null,
				path: "/audit",
				a: [0,8],
				b: [1]
			}
		]
	}
};
