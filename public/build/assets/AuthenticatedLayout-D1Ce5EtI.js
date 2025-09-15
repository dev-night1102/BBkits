import{r as t,j as e,t as f,a as g,J as N}from"./app-Bs15GPR-.js";import{z as y}from"./transition-Dbs6O0HY.js";const b=t.createContext(),h=({children:n})=>{const[o,a]=t.useState(!1),i=()=>{a(d=>!d)};return e.jsx(b.Provider,{value:{open:o,setOpen:a,toggleOpen:i},children:e.jsx("div",{className:"relative",children:n})})},L=({children:n})=>{const{open:o,setOpen:a,toggleOpen:i}=t.useContext(b);return e.jsxs(e.Fragment,{children:[e.jsx("div",{onClick:i,children:n}),o&&e.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>a(!1)})]})},M=({align:n="right",width:o="48",contentClasses:a="py-1 bg-white",children:i})=>{const{open:d,setOpen:p}=t.useContext(b);let c="origin-top";n==="left"?c="ltr:origin-top-left rtl:origin-top-right start-0":n==="right"&&(c="ltr:origin-top-right rtl:origin-top-left end-0");let m="";return o==="48"&&(m="w-48"),e.jsx(e.Fragment,{children:e.jsx(y,{show:d,enter:"transition ease-out duration-200",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:e.jsx("div",{className:`absolute z-50 mt-2 rounded-md shadow-lg ${c} ${m}`,onClick:()=>p(!1),children:e.jsx("div",{className:"rounded-md ring-1 ring-black ring-opacity-5 "+a,children:i})})})})},C=({className:n="",children:o,...a})=>e.jsx(f,{...a,className:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none "+n,children:o});h.Trigger=L;h.Content=M;h.Link=C;function l({active:n=!1,className:o="",children:a,...i}){return e.jsx(f,{...i,className:"inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none "+(n?"border-indigo-400 text-gray-900 focus:border-indigo-700":"border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700")+o,children:a})}function s({active:n=!1,className:o="",children:a,...i}){return e.jsx(f,{...i,className:`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${n?"border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800":"border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800"} text-base font-medium transition duration-150 ease-in-out focus:outline-none ${o}`,children:a})}function z({title:n,titleId:o,...a},i){return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":o},a),n?t.createElement("title",{id:o},n):null,t.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"}))}const j=t.forwardRef(z);function B({title:n,titleId:o,...a},i){return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":o},a),n?t.createElement("title",{id:o},n):null,t.createElement("path",{fillRule:"evenodd",d:"M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z",clipRule:"evenodd"}))}const F=t.forwardRef(B);function W(){const[n,o]=t.useState(0),[a,i]=t.useState([]),[d,p]=t.useState(!1);t.useEffect(()=>{c();const r=setInterval(c,3e4);return()=>clearInterval(r)},[]);const c=async()=>{try{const r=await g.get("/notifications/unread-count",{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}});o(r.data.count)}catch{o(0)}},m=async()=>{try{const r=await g.get("/notifications",{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}});i(r.data.notifications||[])}catch{i([])}},v=async r=>{try{await g.post(`/notifications/${r}/read`,{},{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}}),c(),m()}catch{}},u=async()=>{try{await g.post("/notifications/mark-all-read",{},{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}}),o(0),m()}catch{}},x=()=>{p(!d),d||m()},w=r=>{switch(r){case"sale_approved":return"✅";case"sale_rejected":return"❌";case"new_sale":return"📋";case"goal_reached":return"🎯";default:return"📢"}},k=r=>{switch(r){case"sale_approved":return"bg-green-100 text-green-800";case"sale_rejected":return"bg-red-100 text-red-800";case"new_sale":return"bg-blue-100 text-blue-800";case"goal_reached":return"bg-yellow-100 text-yellow-800";default:return"bg-gray-100 text-gray-800"}};return e.jsxs("div",{className:"relative",children:[e.jsxs("button",{onClick:x,className:"relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200",children:[n>0?e.jsx(F,{className:"h-6 w-6 text-pink-600"}):e.jsx(j,{className:"h-6 w-6 text-gray-600"}),n>0&&e.jsx("span",{className:"absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transform translate-x-1/2 -translate-y-1/2",children:n>9?"9+":n})]}),d&&e.jsxs("div",{className:"absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden",children:[e.jsx("div",{className:"bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-3 border-b border-gray-100",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-800",children:"Notificações"}),n>0&&e.jsx("button",{onClick:u,className:"text-sm text-pink-600 hover:text-pink-800 font-medium",children:"Marcar todas como lidas"})]})}),e.jsx("div",{className:"max-h-96 overflow-y-auto",children:a.length>0?a.map(r=>e.jsx("div",{className:`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${r.read?"":"bg-pink-50"}`,onClick:()=>!r.read&&v(r.id),children:e.jsxs("div",{className:"flex items-start space-x-3",children:[e.jsx("div",{className:`p-2 rounded-full ${k(r.type)}`,children:e.jsx("span",{className:"text-lg",children:w(r.type)})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm text-gray-800",children:r.message}),e.jsx("p",{className:"text-xs text-gray-500 mt-1",children:new Date(r.created_at).toLocaleString("pt-BR")})]}),!r.read&&e.jsx("div",{className:"w-2 h-2 bg-pink-500 rounded-full mt-2"})]})},r.id)):e.jsxs("div",{className:"px-4 py-8 text-center",children:[e.jsx("div",{className:"w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3",children:e.jsx(j,{className:"h-8 w-8 text-gray-400"})}),e.jsx("p",{className:"text-gray-500",children:"Nenhuma notificação no momento"})]})}),a.length>0&&e.jsx("div",{className:"px-4 py-3 bg-gray-50 border-t border-gray-100",children:e.jsx("a",{href:"/notifications",className:"text-sm text-pink-600 hover:text-pink-800 font-medium block text-center",children:"Ver todas as notificações"})})]}),d&&e.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>p(!1)})]})}function $({header:n,children:o}){const a=N().props.auth.user,[i,d]=t.useState(!1),[p,c]=t.useState(!1),m=()=>["admin","manager","production_admin","finance_admin","financeiro"].includes(a.role),v=()=>["admin","manager","production_admin","finance_admin","financeiro"].includes(a.role),u=()=>["admin","manager","production_admin","finance_admin","financeiro"].includes(a.role);return t.useEffect(()=>{const x=()=>{c(window.scrollY>50)};return window.addEventListener("scroll",x),()=>window.removeEventListener("scroll",x)},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
                
                :root {
                    --primary-color: #D4A574;
                    --secondary-color: #F5E6D3;
                    --accent-color: #E8B4CB;
                    --accent-dark: #C8869B;
                    --text-dark: #2C2C2C;
                    --text-light: #666;
                    --white: #FFFFFF;
                    --gradient: linear-gradient(135deg, #D4A574 0%, #E8B4CB 100%);
                    --gradient-soft: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 100%);
                    --gradient-hero: linear-gradient(135deg, rgba(212, 165, 116, 0.95) 0%, rgba(232, 180, 203, 0.95) 100%);
                    --shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    --shadow-hover: 0 25px 50px rgba(0, 0, 0, 0.2);
                    --shadow-glow: 0 0 30px rgba(212, 165, 116, 0.3);
                }

                * {
                    font-family: 'Poppins', sans-serif;
                }

                .premium-bg {
                    background: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 30%, #F0F9FF 70%, #FDF2F8 100%);
                    position: relative;
                    overflow: hidden;
                }

                .floating-particles {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 0;
                }

                .particle {
                    position: absolute;
                    background: rgba(212, 165, 116, 0.1);
                    border-radius: 50%;
                    animation: float 15s infinite linear;
                }

                @keyframes float {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.3;
                    }
                    90% {
                        opacity: 0.3;
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }

                .navbar-glass {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(212, 165, 116, 0.2);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .navbar-scrolled {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(25px);
                    box-shadow: var(--shadow);
                    border-bottom: 2px solid var(--primary-color);
                }

                .logo-container {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }

                .logo-container::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: var(--gradient);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    opacity: 0;
                    transition: all 0.4s ease;
                    z-index: -1;
                }

                .logo-container:hover::before {
                    width: 120%;
                    height: 120%;
                    opacity: 0.1;
                }

                .logo-container:hover {
                    transform: scale(1.1) rotate(5deg);
                    filter: drop-shadow(0 0 20px rgba(212, 165, 116, 0.4));
                }

                .nav-link {
                    position: relative;
                    padding: 6px 10px;
                    border-radius: 12px;
                    font-weight: 500;
                    font-size: 0.75rem;
                    color: var(--text-dark);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                    white-space: nowrap;
                }
                
                @media (min-width: 640px) {
                    .nav-link {
                        padding: 6px 12px;
                        font-size: 0.8125rem;
                    }
                }
                
                @media (min-width: 768px) {
                    .nav-link {
                        padding: 8px 14px;
                        font-size: 0.875rem;
                        border-radius: 14px;
                    }
                }
                
                @media (min-width: 1024px) {
                    .nav-link {
                        padding: 10px 16px;
                        font-size: 0.9375rem;
                        font-weight: 600;
                        border-radius: 15px;
                    }
                }
                
                @media (min-width: 1280px) {
                    .nav-link {
                        padding: 12px 20px;
                        font-size: 1rem;
                    }
                }

                .nav-link::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: var(--gradient-soft);
                    transition: left 0.5s ease;
                    z-index: -1;
                }

                .nav-link:hover::before,
                .nav-link.active::before {
                    left: 0;
                }

                .nav-link:hover {
                    color: var(--primary-color);
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(212, 165, 116, 0.2);
                }
                
                @media (min-width: 1024px) {
                    .nav-link:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 10px 25px rgba(212, 165, 116, 0.2);
                    }
                }

                .nav-link.active {
                    color: var(--primary-color);
                    background: var(--gradient-soft);
                    box-shadow: 0 8px 20px rgba(212, 165, 116, 0.3);
                }

                .user-dropdown {
                    background: var(--gradient-soft);
                    border: 2px solid transparent;
                    background-clip: padding-box;
                    border-radius: 12px;
                    padding: 4px 8px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                
                @media (min-width: 768px) {
                    .user-dropdown {
                        padding: 6px 12px;
                        border-radius: 16px;
                    }
                }
                
                @media (min-width: 1024px) {
                    .user-dropdown {
                        padding: 8px 16px;
                        border-radius: 20px;
                    }
                }

                .user-dropdown::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: var(--gradient);
                    border-radius: inherit;
                    z-index: -1;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .user-dropdown:hover::before {
                    opacity: 1;
                }

                .user-dropdown:hover {
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: var(--shadow-hover);
                }

                .user-avatar {
                    background: var(--gradient);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(212, 165, 116, 0.3);
                }

                .user-avatar:hover {
                    transform: scale(1.1) rotate(10deg);
                    box-shadow: var(--shadow-glow);
                }

                .dropdown-content {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(212, 165, 116, 0.2);
                    border-radius: 20px;
                    box-shadow: var(--shadow-hover);
                    overflow: hidden;
                    margin-top: 8px;
                }

                .dropdown-header {
                    background: var(--gradient-soft);
                    padding: 16px;
                    border-bottom: 1px solid rgba(212, 165, 116, 0.1);
                }

                .dropdown-link {
                    padding: 12px 16px;
                    transition: all 0.3s ease;
                    border-radius: 0;
                    margin: 4px 8px;
                    border-radius: 12px;
                }

                .dropdown-link:hover {
                    background: var(--gradient-soft);
                    color: var(--primary-color);
                    transform: translateX(5px);
                }

                .mobile-menu {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    border-bottom: 1px solid rgba(212, 165, 116, 0.2);
                }

                .mobile-toggle {
                    background: var(--gradient-soft);
                    border-radius: 12px;
                    padding: 6px;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }
                
                @media (min-width: 640px) {
                    .mobile-toggle {
                        padding: 8px;
                        border-radius: 15px;
                    }
                }

                .mobile-toggle:hover {
                    background: var(--gradient);
                    color: white;
                    transform: scale(1.1);
                    box-shadow: 0 5px 15px rgba(212, 165, 116, 0.3);
                }

                .header-section {
                    background: var(--gradient-soft);
                    border-bottom: 2px solid var(--primary-color);
                    box-shadow: var(--shadow);
                    position: relative;
                    overflow: hidden;
                }

                .header-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, rgba(212, 165, 116, 0.05) 0%, rgba(232, 180, 203, 0.05) 100%);
                    pointer-events: none;
                }

                .main-content {
                    position: relative;
                    z-index: 1;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                    transform: translateY(30px);
                }

                .animate-fadeInUp.delay-200 {
                    animation-delay: 0.2s;
                }

                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .icon-hover {
                    transition: all 0.3s ease;
                }

                .icon-hover:hover {
                    transform: scale(1.2) rotate(10deg);
                    color: var(--primary-color);
                }

                /* Mobile responsive menu animations */
                .mobile-nav-item {
                    transition: all 0.3s ease;
                    margin: 4px 0;
                }

                .mobile-nav-item:hover {
                    transform: translateX(10px) scale(1.02);
                    background: var(--gradient-soft);
                    border-radius: 15px;
                }

                /* Scroll indicator */
                .scroll-indicator {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 4px;
                    background: var(--gradient);
                    z-index: 9999;
                    transition: width 0.3s ease;
                }

                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                ::-webkit-scrollbar-thumb {
                    background: var(--gradient);
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: var(--accent-color);
                }
                
                /* Responsive icon sizes */
                .nav-icon {
                    width: 0.875rem;
                    height: 0.875rem;
                }
                
                @media (min-width: 768px) {
                    .nav-icon {
                        width: 1rem;
                        height: 1rem;
                    }
                }
                
                @media (min-width: 1024px) {
                    .nav-icon {
                        width: 1.125rem;
                        height: 1.125rem;
                    }
                }
                
                /* Hide text on smaller screens */
                .nav-text {
                    display: none;
                }
                
                @media (min-width: 1024px) {
                    .nav-text {
                        display: inline;
                    }
                }
                
                /* Adjust navbar height */
                .navbar-height {
                    height: 3rem;
                }
                
                @media (min-width: 640px) {
                    .navbar-height {
                        height: 3.5rem;
                    }
                }
                
                @media (min-width: 768px) {
                    .navbar-height {
                        height: 3.75rem;
                    }
                }
                
                @media (min-width: 1024px) {
                    .navbar-height {
                        height: 4rem;
                    }
                }
            `}),e.jsxs("div",{className:"min-h-screen premium-bg",children:[e.jsx("div",{className:"floating-particles",children:Array.from({length:25},(x,w)=>e.jsx("div",{className:"particle",style:{left:Math.random()*100+"%",width:Math.random()*10+4+"px",height:Math.random()*10+4+"px",animationDelay:Math.random()*15+"s",animationDuration:Math.random()*10+15+"s"}},w))}),e.jsxs("nav",{className:`fixed top-0 w-full z-50 navbar-glass ${p?"navbar-scrolled":""}`,children:[e.jsx("div",{className:"mx-auto w-full max-w-[100%] px-2 sm:px-3 md:px-4 lg:px-6 xl:max-w-7xl xl:px-8",children:e.jsxs("div",{className:"navbar-height flex justify-between items-center",children:[e.jsxs("div",{className:"flex items-center flex-shrink-0",children:[e.jsx("div",{className:"flex shrink-0 items-center",children:e.jsx(f,{href:"/",className:"logo-container",children:e.jsx("img",{src:"/images/logo.webp",alt:"BBKits Logo",className:"h-6 sm:h-7 md:h-8 lg:h-9 xl:h-10 w-auto object-contain drop-shadow-xl hover:drop-shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-3 filter hover:brightness-110 hover:saturate-125 cursor-pointer animate-pulse hover:animate-none rounded-lg sm:rounded-xl bg-white from-white/20 to-transparent backdrop-blur-sm border border-white/30 p-0.5 sm:p-0.75 lg:p-1 shadow-xl hover:shadow-yellow-400/50"})})}),e.jsxs("div",{className:"hidden md:flex items-center space-x-0.5 lg:space-x-1 xl:space-x-2 ms-2 sm:ms-3 md:ms-4 lg:ms-6 xl:ms-10",children:[e.jsxs(l,{href:route("dashboard"),active:window.location.pathname==="/dashboard",className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname==="/dashboard"?"active":""}`,children:[e.jsx("svg",{className:"nav-icon icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"})}),e.jsx("span",{className:"nav-text",children:"Dashboard"})]}),e.jsxs(l,{href:route("sales.index"),active:window.location.pathname.includes("/sales"),className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname.includes("/sales")?"active":""}`,children:[e.jsx("svg",{className:"nav-icon icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"})}),e.jsx("span",{className:"nav-text",children:"Vendas"})]}),(a.role==="finance_admin"||a.role==="financeiro"||a.role==="admin")&&e.jsxs(l,{href:route("finance.orders.index"),active:window.location.pathname.includes("/finance"),className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname.includes("/finance")?"active":""}`,children:[e.jsx("svg",{className:"nav-icon icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"})}),e.jsx("span",{className:"nav-text",children:"Financeiro"})]}),(a.role==="production_admin"||a.role==="admin")&&e.jsxs(l,{href:route("production.orders.index"),active:window.location.pathname.includes("/production"),className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname.includes("/production")?"active":""}`,children:[e.jsx("svg",{className:"nav-icon icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"})}),e.jsx("span",{className:"nav-text",children:"Produção"})]}),(a.role==="admin"||a.role==="financeiro")&&e.jsxs(e.Fragment,{children:[e.jsxs(l,{href:route("admin.dashboard"),active:window.location.pathname==="/admin/dashboard",className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname==="/admin/dashboard"?"active":""}`,children:[e.jsx("svg",{className:"nav-icon icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"})}),e.jsx("span",{className:"nav-text",children:"Admin"})]}),(a.role==="manager"||a.role==="admin")&&e.jsxs(l,{href:route("manager.dashboard"),active:window.location.pathname.includes("/manager"),className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname.includes("/manager")?"active":""}`,children:[e.jsx("svg",{className:"nav-icon icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})}),e.jsx("span",{className:"nav-text",children:"Gerência"})]}),e.jsxs(l,{href:route("admin.users.index"),active:window.location.pathname==="/admin/users",className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname==="/admin/users"?"active":""}`,children:[e.jsx("svg",{className:"nav-icon icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M19 7.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"})}),e.jsx("span",{className:"nav-text",children:"👥 Usuários"})]}),e.jsxs(l,{href:route("admin.sales.index"),active:window.location.pathname.includes("/admin/sales"),className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname.includes("/admin/sales")?"active":""}`,children:[e.jsx("svg",{className:"nav-icon icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})}),e.jsx("span",{className:"nav-text",children:"Financeiro"})]}),e.jsxs(l,{href:"/admin/embroidery",active:window.location.pathname.includes("/admin/embroidery"),className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname.includes("/admin/embroidery")?"active":""}`,children:[e.jsx("svg",{className:"nav-icon icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"})}),e.jsx("span",{className:"nav-text",children:"Bordados"})]}),m()&&e.jsxs(l,{href:route("admin.materials.index"),active:window.location.pathname.includes("/admin/materials"),className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname.includes("/admin/materials")?"active":""}`,children:[e.jsx("svg",{className:"nav-icon icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"})}),e.jsx("span",{className:"nav-text",children:"Materiais"})]}),v()&&e.jsxs(l,{href:route("admin.suppliers.index"),active:window.location.pathname.includes("/admin/suppliers"),className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname.includes("/admin/suppliers")?"active":""}`,children:[e.jsx("svg",{className:"nav-icon icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})}),e.jsx("span",{className:"nav-text",children:"Fornecedores"})]}),u()&&e.jsxs(l,{href:route("admin.inventory.index"),active:window.location.pathname.includes("/admin/inventory"),className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname.includes("/admin/inventory")?"active":""}`,children:[e.jsx("svg",{className:"nav-icon icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"})}),e.jsx("span",{className:"nav-text",children:"Estoque"})]}),a.role==="admin"&&e.jsxs(l,{href:route("admin.permissions.index"),active:window.location.pathname.includes("/admin/permissions"),className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname.includes("/admin/permissions")?"active":""}`,children:[e.jsx("svg",{className:"nav-icon icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"})}),e.jsx("span",{className:"nav-text",children:"Permissões"})]}),["admin","manager"].includes(a.role)&&e.jsxs(l,{href:route("admin.reports.index"),active:window.location.pathname.includes("/admin/reports"),className:`nav-link flex items-center gap-0.5 lg:gap-1 xl:gap-2 ${window.location.pathname.includes("/admin/reports")?"active":""}`,children:[e.jsx("svg",{className:"nav-icon icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})}),e.jsx("span",{className:"nav-text",children:"Relatórios"})]})]})]})]}),e.jsxs("div",{className:"hidden md:flex md:items-center md:gap-2 lg:gap-3",children:[e.jsx(W,{}),e.jsx("div",{className:"relative",children:e.jsxs(h,{children:[e.jsx(h.Trigger,{children:e.jsx("span",{className:"inline-flex rounded-md",children:e.jsx("button",{type:"button",className:"user-dropdown",children:e.jsxs("div",{className:"flex items-center gap-1.5 sm:gap-2 lg:gap-3",children:[e.jsx("div",{className:"user-avatar w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[10px] sm:text-xs",children:a.name.charAt(0).toUpperCase()}),e.jsx("span",{className:"hidden lg:block font-medium text-xs lg:text-sm xl:text-base text-gray-700",children:a.name}),e.jsx("svg",{className:"-me-0.5 ms-1 lg:ms-2 h-3 w-3 lg:h-4 lg:w-4 transition-transform duration-300 group-hover:rotate-180",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})})]})})})}),e.jsxs(h.Content,{className:"dropdown-content w-64",children:[e.jsx("div",{className:"dropdown-header",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"user-avatar w-12 h-12 text-sm",children:a.name.charAt(0).toUpperCase()}),e.jsxs("div",{children:[e.jsx("div",{className:"font-bold text-gray-800",children:a.name}),e.jsx("div",{className:"text-sm text-gray-600",children:a.email}),e.jsxs("div",{className:"text-xs text-purple-600 font-medium mt-1",children:["✨"," ",a.role==="vendedora"?"Vendedora BBKits":a.role==="admin"?"Administrador":a.role==="finance_admin"?"Financeiro Admin":a.role==="production_admin"?"Produção Admin":"Financeiro"]})]})]})}),e.jsxs(h.Link,{href:route("profile.edit"),className:"dropdown-link flex items-center gap-3",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),"👤 Meu Perfil"]}),e.jsxs(h.Link,{href:route("logout"),method:"post",as:"button",className:"dropdown-link flex items-center gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 w-full text-left",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"})}),"🚪 Sair"]})]})]})})]}),e.jsx("div",{className:"-me-2 flex items-center md:hidden",children:e.jsx("button",{onClick:()=>d(!i),className:"mobile-toggle",children:e.jsxs("div",{className:"relative w-5 h-5 sm:w-6 sm:h-6",children:[e.jsx("div",{className:`absolute inset-0 transition-all duration-300 ${i?"opacity-0 rotate-45":"opacity-100 rotate-0"}`,children:e.jsx("svg",{className:"h-5 w-5 sm:h-6 sm:w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 6h16M4 12h16M4 18h16"})})}),e.jsx("div",{className:`absolute inset-0 transition-all duration-300 ${i?"opacity-100 rotate-0":"opacity-0 -rotate-45"}`,children:e.jsx("svg",{className:"h-5 w-5 sm:h-6 sm:w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})})})]})})})]})}),e.jsxs("div",{className:`md:hidden mobile-menu transition-all duration-500 ease-in-out overflow-hidden ${i?"max-h-screen opacity-100":"max-h-0 opacity-0"}`,children:[e.jsxs("div",{className:"space-y-2 pb-4 pt-4 px-4",children:[e.jsxs(s,{href:route("dashboard"),active:window.location.pathname==="/dashboard",className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"})}),"Dashboard"]}),e.jsxs(s,{href:route("sales.index"),active:window.location.pathname.includes("/sales"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"})}),"Minhas Vendas"]}),(a.role==="finance_admin"||a.role==="financeiro"||a.role==="admin")&&e.jsxs(s,{href:route("finance.orders.index"),active:window.location.pathname.includes("/finance"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"})}),"Financeiro"]}),(a.role==="production_admin"||a.role==="admin")&&e.jsxs(s,{href:route("production.orders.index"),active:window.location.pathname.includes("/production"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"})}),"Produção"]}),(a.role==="admin"||a.role==="financeiro")&&e.jsxs(e.Fragment,{children:[e.jsxs(s,{href:route("admin.dashboard"),active:window.location.pathname==="/admin/dashboard",className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"})}),"Admin Dashboard"]}),(a.role==="manager"||a.role==="admin")&&e.jsxs(s,{href:route("manager.dashboard"),active:window.location.pathname.includes("/manager"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})}),"Dashboard Gerencial"]}),e.jsxs(s,{href:route("admin.users.index"),active:window.location.pathname==="/admin/users",className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M19 7.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"})}),"Gerenciar Usuários"]}),e.jsxs(s,{href:route("admin.sales.index"),active:window.location.pathname.includes("/admin/sales"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})}),"Painel Financeiro"]}),e.jsxs(s,{href:"/admin/embroidery",active:window.location.pathname.includes("/admin/embroidery"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"})}),"Gerenciar Bordados"]}),m()&&e.jsxs(s,{href:route("admin.materials.index"),active:window.location.pathname.includes("/admin/materials"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"})}),"Gerenciar Materiais"]}),v()&&e.jsxs(s,{href:route("admin.suppliers.index"),active:window.location.pathname.includes("/admin/suppliers"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})}),"Gerenciar Fornecedores"]}),u()&&e.jsxs(s,{href:route("admin.inventory.index"),active:window.location.pathname.includes("/admin/inventory"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"})}),"Transações de Estoque"]}),a.role==="admin"&&e.jsxs(s,{href:route("admin.permissions.index"),active:window.location.pathname.includes("/admin/permissions"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"})}),"Gerenciar Permissões"]})]})]}),e.jsxs("div",{className:"border-t border-pink-200 mx-4 py-4",children:[e.jsx("div",{className:"px-4 pb-4",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"user-avatar w-12 h-12 text-sm",children:a.name.charAt(0).toUpperCase()}),e.jsxs("div",{children:[e.jsx("div",{className:"text-base font-bold text-gray-800",children:a.name}),e.jsx("div",{className:"text-sm text-gray-600",children:a.email}),e.jsxs("div",{className:"text-xs text-purple-600 font-medium mt-1",children:["✨"," ",a.role==="vendedora"?"Vendedora BBKits":a.role==="admin"?"Administrador":a.role==="finance_admin"?"Financeiro Admin":a.role==="production_admin"?"Produção Admin":"Financeiro"]})]})]})}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs(s,{href:route("profile.edit"),className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),"👤 Meu Perfil"]}),e.jsxs(s,{method:"post",href:route("logout"),as:"button",className:"mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 w-full text-left",children:[e.jsx("svg",{className:"w-4 h-4 icon-hover",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"})}),"🚪 Sair"]})]})]})]})]}),n&&e.jsx("header",{className:"header-section mt-12 sm:mt-14 md:mt-15 lg:mt-16 border-b border-pink-100/50 relative z-10",children:e.jsx("div",{className:"mx-auto max-w-7xl px-4 py-4 sm:py-5 md:py-6 sm:px-6 lg:px-8 relative z-10",children:e.jsx("div",{className:"animate-fadeInUp",children:n})})}),e.jsx("main",{className:"pt-12 sm:pt-14 md:pt-15 lg:pt-16 min-h-screen main-content",children:e.jsx("div",{className:"animate-fadeInUp delay-200 relative z-10",children:o})})]})]})}export{$ as A};
