if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return i[e]||(c=new Promise(async c=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=c}else importScripts(e),c()})),c.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},c=(c,i)=>{Promise.all(c.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(c)};self.define=(c,n,a)=>{i[c]||(i[c]=Promise.resolve().then(()=>{let i={};const s={uri:location.origin+c.slice(1)};return Promise.all(n.map(c=>{switch(c){case"exports":return i;case"module":return s;default:return e(c)}})).then(e=>{const c=a(...e);return i.default||(i.default=c),i})}))}}define("./service-worker.js",["./workbox-e170c028"],(function(e){"use strict";e.setCacheNameDetails({prefix:"myguardmoney"}),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"/css/1.3218de86.css",revision:"3870e031af05ab9303a80b537e9ca688"},{url:"/css/app.fea0c297.css",revision:"b1200966d0d7ae469a726644d31cd391"},{url:"/css/vendor.12e75b1c.css",revision:"1cae6145753c8a4e1fb97e9048d344b6"},{url:"/favicon.ico",revision:"b2bd8146e429f663b2f121c74ddd483a"},{url:"/fonts/KFOkCnqEu92Fr1MmgVxIIzQ.a45108d3.woff",revision:"5cb7edfceb233100075dc9a1e12e8da3"},{url:"/fonts/KFOlCnqEu92Fr1MmEU9fBBc-.cea99d3e.woff",revision:"87284894879f5b1c229cb49c8ff6decc"},{url:"/fonts/KFOlCnqEu92Fr1MmSU5fBBc-.865f928c.woff",revision:"b00849e00f4c2331cddd8ffb44a6720b"},{url:"/fonts/KFOlCnqEu92Fr1MmWUlfBBc-.2267169e.woff",revision:"adcde98f1d584de52060ad7b16373da3"},{url:"/fonts/KFOlCnqEu92Fr1MmYUtfBBc-.bac8362e.woff",revision:"bb1e4dc6333675d11ada2e857e7f95d7"},{url:"/fonts/KFOmCnqEu92Fr1Mu4mxM.49ae34d4.woff",revision:"60fa3c0614b8fb2f394fa29944c21540"},{url:"/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.1811d381.woff",revision:"84a37de85c17f186652a179b1145392f"},{url:"/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.fa3334fe.woff2",revision:"703cf8f274fbb265d49c6262825780e1"},{url:"/icons/apple-icon-120x120.png",revision:"c9920835d2adb9f6ab6a79a27f220a3a"},{url:"/icons/apple-icon-152x152.png",revision:"9df9e65a1d2c6df3bd9143666b0e8c63"},{url:"/icons/apple-icon-167x167.png",revision:"4300c6c136c06abcd781aa18644dd7a3"},{url:"/icons/apple-icon-180x180.png",revision:"88dbf3d9e8269f1298486d103e22a57c"},{url:"/icons/icon-128x128.png",revision:"1be07e62226c8f6a7086f132d9be1642"},{url:"/icons/icon-192x192.png",revision:"a1b423855a450ae7adbd9d2a782e0dfb"},{url:"/icons/icon-256x256.png",revision:"9f33ebc999e51d0dc2975fc573d53a0b"},{url:"/icons/icon-384x384.png",revision:"a126be0d50ed682c3129e0b8b31f680a"},{url:"/icons/icon-512x512.png",revision:"02abd24e7c8638e848d96a6bf78d2c27"},{url:"/icons/ms-icon-144x144.png",revision:"f256ec55be616f32ae486ab7571eb936"},{url:"/icons/safari-pinned-tab.svg",revision:"de8107bed7f087fb443d8e36855e7467"},{url:"/index.html",revision:"af9c9f842209ba7a69f5df625915cf93"},{url:"/js/1.eee09a04.js",revision:"f235cf120f6dd2fe991703a6b3391580"},{url:"/js/2.b19da891.js",revision:"a1ac013bd1b9ee1a45816ad5c80b1dc9"},{url:"/js/4.c32a5e98.js",revision:"94aea917e509d3d8e1b943e61fcd960e"},{url:"/js/5.6281ca90.js",revision:"05bb77270cfbf98dfbba66a74d419946"},{url:"/js/6.d29dc4ee.js",revision:"afde7a98d1bf3cdbed61f31c670d0eb4"},{url:"/js/7.c80b6e00.js",revision:"50e0ca4945ea9204c515963ba03fa9c8"},{url:"/js/8.66b67a17.js",revision:"e3f85a2a5e2787c46558b162d18c18ec"},{url:"/js/app.a48d0053.js",revision:"a573e0e5dcf920b31609dc67f65a99d1"},{url:"/js/vendor.ab7dc7f7.js",revision:"a24290f47f36247e2f790570eaf2f117"},{url:"/logo.png",revision:"3a491c2ff5cbbca99611788993fc1476"},{url:"/manifest.json",revision:"890a2854e358545785829f0851f65773"},{url:"/myicons/apple-icon-120x120.png",revision:"c0e84ffabd4bfcff947baed9f11e0968"},{url:"/myicons/apple-icon-152x152.png",revision:"1c3ea084da9ebc2ca28a4669ff62c20d"},{url:"/myicons/apple-icon-167x167.png",revision:"1af44575e08e185a0b68b44c59bae792"},{url:"/myicons/apple-icon-180x180.png",revision:"e7a919dd5ae14c5020a1c0caad22cbdd"},{url:"/myicons/apple-launch-1125x2436.png",revision:"077b091808bdac1101ba411aa05db3e6"},{url:"/myicons/apple-launch-1242x2208.png",revision:"9b06b6e37450bf0c63b6d346bf87df46"},{url:"/myicons/apple-launch-1242x2688.png",revision:"208e8222d494d3baae40bc812775c7d1"},{url:"/myicons/apple-launch-1536x2048.png",revision:"ba026c9c8c7649f2c9438b58efd05ac8"},{url:"/myicons/apple-launch-1668x2224.png",revision:"1047db41a5c7f48545eb92993a72c7f9"},{url:"/myicons/apple-launch-1668x2388.png",revision:"ab47ebfe6d2e699ee62bd98497caed12"},{url:"/myicons/apple-launch-2048x2732.png",revision:"3aa5e2539836ea95473979a069b9b30f"},{url:"/myicons/apple-launch-640x1136.png",revision:"0a950feb54fb2d0d75b16e61400030fc"},{url:"/myicons/apple-launch-750x1334.png",revision:"f9c52a05814a45530bb7caed08dacf80"},{url:"/myicons/apple-launch-828x1792.png",revision:"e379ffa12d37d560d7d945cd8a243e5a"},{url:"/myicons/favicon-128x128.png",revision:"67107396a167a33ace2d271f5d28471e"},{url:"/myicons/favicon-16x16.png",revision:"e6e83a12682611a8ac1027ccdeb35ad2"},{url:"/myicons/favicon-32x32.png",revision:"bc03752601e38eec269df4d9b188bc5d"},{url:"/myicons/favicon-96x96.png",revision:"c3e6e9a1b96adec19132df83465de29c"},{url:"/myicons/icon-128x128.png",revision:"67107396a167a33ace2d271f5d28471e"},{url:"/myicons/icon-192x192.png",revision:"40996d1e5e551367e0b957a95e3f9397"},{url:"/myicons/icon-256x256.png",revision:"1e39b10f0d0f8724be95c606f5318719"},{url:"/myicons/icon-384x384.png",revision:"8466082dd8cef3054e9b890a0c93dc28"},{url:"/myicons/icon-512x512.png",revision:"e14fa1004ff84ccf793f6eb157692c2f"},{url:"/myicons/ms-icon-144x144.png",revision:"9d76f339d528947147505ce8e3caac18"},{url:"/myicons/safari-pinned-tab.svg",revision:"bdd6f8914db6b6bc48cb0f3a21f8a7d9"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/index.html"),{denylist:[/service-worker\.js$/,/workbox-(.)*\.js$/]}))}));