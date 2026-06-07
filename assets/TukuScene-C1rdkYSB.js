import{r as s,j as t}from"./index-7uogZS2o.js";const B=[{style:{left:70,top:7,width:128,height:272},href:"#",outlineImg:"https://tuku.coffee/_next/static/media/01_pesan_di_sini_outline.7d3aceec.webp",popup:{img:"https://tuku.coffee/_next/static/media/02_text_box_image.69c74767.webp",style:{position:"absolute",left:90,top:180,width:175}}},{style:{left:306,top:168,width:368,height:120},href:"#lini-produk",outlineImg:"https://tuku.coffee/_next/static/media/06_menu_outline.cea0a188.webp",popup:{img:"https://tuku.coffee/_next/static/media/menu_tetangga_tuku_type_03.c1a90bf0.webp",style:{position:"absolute",left:360,top:0,width:180}}},{style:{left:498,top:320,width:388,height:207},href:"https://beragam.co.id/en/",target:"_blank",outlineImg:"https://tuku.coffee/_next/static/media/05_bergam_roastery_outline.f25ecc01.webp",popup:{img:"https://tuku.coffee/_next/static/media/beragam_coffee_roastery_type_04.435e4c9a.webp",style:{position:"absolute",left:80,top:-60,width:200}}},{style:{left:186,top:385,width:280,height:130},href:"#lini-produk",outlineImg:"https://tuku.coffee/_next/static/media/04_tukudapan_outline.8f41d789.webp",popup:{img:"https://tuku.coffee/_next/static/media/tukudapan_type_01.0799cc55.webp",style:{position:"absolute",left:-60,top:-60,width:160}}},{style:{bottom:102,left:46,width:395,height:190},href:"#lini-produk",outlineImg:"https://tuku.coffee/_next/static/media/03_selain_kopi_outline.db9b6e5b.webp",popup:{img:"https://tuku.coffee/_next/static/media/selain_kopi_type_02.f637f5b2.webp",style:{position:"absolute",left:370,top:-70,width:160}}}],w=[{id:1,label:"Registrasi",description:"Isi form data diri.",trigger:.08,posClass:"pos-1"},{id:2,label:"Medex Check",description:"Tes kesehatan fisik.",trigger:.28,posClass:"pos-2"},{id:3,label:"Akademik",description:"Ujian TPA & Inggris.",trigger:.48,posClass:"pos-3"},{id:4,label:"Interview",description:"Wawancara User.",trigger:.68,posClass:"pos-4"},{id:5,label:"Onboard",description:"Siap Pendidikan.",trigger:.88,posClass:"pos-5"}],L="M -100 350 L 350 350 C 550 350, 600 120, 800 120 L 1300 120";function D(){const v=s.useRef(null),j=s.useRef(null),_=s.useRef(null),c=s.useRef(null),R=s.useRef(null),f=s.useRef(null),h=s.useRef(null),I=s.useRef(null),m=s.useRef([]),g=s.useCallback(e=>{const i=_.current,o=j.current;if(!i||!o)return;const a=i.getBoundingClientRect();let r=e.clientX-a.left-112;r=Math.max(-50,Math.min(950,r)),o.style.left=`${r}px`},[]),p=s.useCallback(e=>{const i=f.current,o=h.current,a=I.current,r=R.current;if(!i||!o||!a||!r)return;const n=Math.max(0,Math.min(1,e)),l=i.getTotalLength(),y=n*l;o.style.strokeDashoffset=String(l-y);const d=i.getPointAtLength(y),S=i.getPointAtLength(Math.min(y+10,l)),N=Math.atan2(S.y-d.y,S.x-d.x)*(180/Math.PI),P=r.getBoundingClientRect(),u=r.viewBox.baseVal,M=P.width/u.width,E=P.height/u.height,T=(d.x-u.x)*M,A=(d.y-u.y)*E;a.style.left=`${T}px`,a.style.top=`${A}px`,a.style.transform=`translate(-50%, -50%) rotate(${N}deg)`,m.current.forEach((k,W)=>{if(!k)return;const C=w[W].trigger,z=.08;n>=C-z&&n<=C+z?k.classList.add("active"):k.classList.remove("active")})},[]),x=s.useCallback(e=>{const i=c.current;if(!i)return;const o=i.getBoundingClientRect(),a=(e.clientX-o.left)/o.width;requestAnimationFrame(()=>p(a))},[p]),b=s.useCallback(e=>{const i=c.current;if(!i)return;const o=i.getBoundingClientRect(),a=(e.touches[0].clientX-o.left)/o.width;requestAnimationFrame(()=>p(a))},[p]);return s.useEffect(()=>{const e=v.current,i=c.current;e&&e.addEventListener("mousemove",g),i&&(i.addEventListener("mousemove",x),i.addEventListener("touchmove",b,{passive:!0}));const a=setTimeout(()=>{const r=f.current,n=h.current;if(!r||!n)return;const l=r.getTotalLength();n.style.strokeDasharray=`${l} ${l}`,n.style.strokeDashoffset=String(l),p(0)},100);return()=>{e?.removeEventListener("mousemove",g),i?.removeEventListener("mousemove",x),i?.removeEventListener("touchmove",b),clearTimeout(a)}},[g,x,b,p]),t.jsxs("div",{style:{fontFamily:"'Inter', 'Segoe UI', sans-serif"},children:[t.jsx("style",{children:`
        @keyframes ojol-masuk {
          0%   { transform: translateX(400px); opacity: 0; }
          100% { transform: translateX(0);      opacity: 1; }
        }
        @keyframes jalan-menul {
          0%   { transform: translateY(0px);   }
          50%  { transform: translateY(-10px); }
          100% { transform: translateY(0px);   }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        /* ---- Hotspot / Popup ---- */
        .tuku-hotspot { position: absolute; z-index: 60; cursor: pointer; }

        .tuku-popup {
          opacity: 0;
          transition: all 0.2s ease-out;
          pointer-events: none;
          transform: scale(0.8);
          z-index: 70;
        }
        .tuku-hotspot:hover .tuku-popup {
          opacity: 1;
          transform: scale(1);
        }

        /* ---- Ojol ---- */
        .area-ojol:hover .img-ojol {
          transform: translateX(0) !important;
        }

        /* ---- Roadmap PIN ---- */
        .roadmap-pin-wrapper {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 30;
          opacity: 0.4;
          transform: scale(0.8);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          filter: grayscale(100%);
        }
        .roadmap-pin-wrapper.active {
          opacity: 1;
          transform: scale(1.1);
          filter: grayscale(0%);
          z-index: 60;
        }

        /* Pulse ring aktif */
        .roadmap-pin-wrapper.active .pin-circle::after {
          content: '';
          position: absolute;
          top: -10px; left: -10px; right: -10px; bottom: -10px;
          border-radius: 50%;
          border: 2px solid #3b82f6;
          animation: pulse-ring 1.5s infinite;
        }

        /* Posisi PIN */
        .road-pos-1 { bottom: 60px;  left: 5%;   }
        .road-pos-2 { bottom: 90px;  left: 25%;  }
        .road-pos-3 { top: 180px;    left: 45%;  }
        .road-pos-4 { top: 40px;     right: 28%; }
        .road-pos-5 { top: 40px;     right: 5%;  }

        /* Mobile */
        @media (max-width: 768px) {
          .road-layer { display: none !important; }
          .roadmap-pin-wrapper {
            position: relative !important;
            inset: auto !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            flex-direction: row;
            gap: 15px;
            margin-bottom: 20px;
            width: 100%;
          }
          .pin-circle { margin-bottom: 0; min-width: 48px; }
          .pin-card   { text-align: left; width: 100%; }
        }
      `}),t.jsx("div",{ref:v,style:{width:"100%",overflowX:"auto",backgroundColor:"#f3f4f6",position:"relative"},children:t.jsxs("div",{ref:_,style:{position:"relative",width:1152,height:814,margin:"0 auto",backgroundColor:"white",overflow:"hidden"},children:[t.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:1},children:t.jsx("img",{src:"https://tuku.coffee/_next/static/media/background_desktop.24186be3.webp",style:{width:"100%",height:"100%",objectFit:"cover"},alt:"background"})}),t.jsx("div",{ref:j,style:{position:"absolute",left:450,bottom:220,width:224,height:288,zIndex:20,transition:"left 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",pointerEvents:"none"},children:t.jsx("img",{src:"https://tuku.coffee/_next/static/media/01_barista_pose_front.5aa6b1d4.webp",style:{width:"100%",height:"100%",objectFit:"contain",animation:"jalan-menul 0.8s infinite ease-in-out"},alt:"barista"})}),t.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:30,pointerEvents:"none"},children:t.jsx("img",{src:"https://tuku.coffee/_next/static/media/table_desktop.4ae3c07c.webp",style:{width:"100%",height:"100%",objectFit:"cover"},alt:"table"})}),B.map((e,i)=>t.jsxs("div",{className:"tuku-hotspot",style:{...e.style,position:"absolute"},children:[t.jsx("a",{href:e.href,target:e.target,rel:e.target==="_blank"?"noopener noreferrer":void 0,style:{display:"block",width:"100%",height:"100%"},children:t.jsx("img",{className:"tuku-popup",src:e.outlineImg,style:{width:"100%",height:"100%",objectFit:"contain",position:"absolute",top:0,left:0},alt:`hotspot-${i}`})}),t.jsx("div",{className:"tuku-popup",style:e.popup.style,children:t.jsx("img",{src:e.popup.img,style:{width:"100%"},alt:`popup-${i}`})})]},i)),t.jsxs("div",{className:"tuku-hotspot area-ojol",style:{position:"absolute",right:0,top:0,width:200,height:814},children:[t.jsx("div",{className:"tuku-popup",style:{position:"absolute",top:20,right:80,width:93},children:t.jsx("img",{src:"https://tuku.coffee/_next/static/media/07_ambil_di_sini_outline.bef1bd67.webp",style:{width:"100%"},alt:"ambil di sini"})}),t.jsx("div",{className:"img-ojol",style:{position:"absolute",bottom:0,right:0,width:290,transform:"translateX(400px)",transition:"transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",pointerEvents:"none",zIndex:50},children:t.jsx("img",{src:"https://tuku.coffee/_next/static/media/08_ojol_image_new.f48ea72d.webp",style:{width:"100%"},alt:"ojol"})})]})]})}),t.jsx("div",{ref:c,style:{width:"100%",background:"#f8fafc",overflow:"hidden"},children:t.jsxs("div",{style:{position:"relative",width:"100%",maxWidth:"100%",margin:"0 auto",padding:"40px 0",background:"transparent"},children:[t.jsxs("div",{style:{textAlign:"center",marginBottom:20,position:"relative",zIndex:20},children:[t.jsx("h2",{style:{margin:0,fontWeight:800,color:"#0f172a",fontSize:"2rem",letterSpacing:"-1px"},children:"Flight Map Recruitment"}),t.jsx("p",{style:{margin:"8px 0 0 0",color:"#64748b",fontSize:"1rem"},children:"Gerakkan kursor/sentuh layar untuk menerbangkan pesawat."})]}),t.jsxs("div",{className:"road-layer",style:{width:"100%",height:400,position:"relative"},children:[t.jsxs("svg",{ref:R,viewBox:"0 0 1200 400",preserveAspectRatio:"none",style:{width:"100%",height:"100%",overflow:"visible"},children:[t.jsx("defs",{children:t.jsx("path",{id:"tuku-road-def",ref:f,d:L})}),t.jsx("use",{href:"#tuku-road-def",style:{fill:"none",stroke:"#e2e8f0",strokeWidth:60,strokeLinecap:"round"}}),t.jsx("path",{ref:h,d:L,style:{fill:"none",stroke:"#3b82f6",strokeWidth:60,strokeLinecap:"round",strokeDasharray:"0, 10000",transition:"stroke-dashoffset 0.1s linear",opacity:.2}}),t.jsx("use",{href:"#tuku-road-def",style:{fill:"none",stroke:"#cbd5e1",strokeWidth:2,strokeDasharray:"15, 25"}})]}),t.jsx("img",{ref:I,src:"https://upload.wikimedia.org/wikipedia/commons/8/86/Airliner_silhouette.svg",alt:"Plane",style:{position:"absolute",width:120,zIndex:50,pointerEvents:"none",filter:"drop-shadow(0 20px 30px rgba(0,0,0,0.3))",transformOrigin:"center center",transition:"transform 0.1s linear"}}),w.map((e,i)=>t.jsxs("div",{ref:o=>{m.current[i]=o},className:`roadmap-pin-wrapper road-${e.posClass}`,children:[t.jsx("div",{className:"pin-circle",style:{width:48,height:48,background:"#fff",borderRadius:"50%",boxShadow:"0 10px 25px rgba(59,130,246,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#3b82f6",border:"4px solid #3b82f6",marginBottom:12,position:"relative"},children:String(e.id).padStart(2,"0")}),t.jsxs("div",{className:"pin-card",style:{background:"rgba(255,255,255,0.85)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",padding:"15px 20px",borderRadius:16,border:"1px solid rgba(255,255,255,0.6)",boxShadow:"0 10px 40px rgba(0,0,0,0.1)",textAlign:"center",minWidth:160,transition:"transform 0.3s"},children:[t.jsx("h4",{style:{margin:0,fontSize:"1rem",color:"#1e293b",fontWeight:700,textTransform:"uppercase"},children:e.label}),t.jsx("p",{style:{margin:"5px 0 0 0",fontSize:"0.85rem",color:"#64748b",lineHeight:1.4},children:e.description})]})]},e.id))]}),t.jsx("div",{style:{display:"none"},className:"roadmap-mobile-list",children:w.map((e,i)=>t.jsxs("div",{ref:o=>{m.current[i]=o},className:"roadmap-pin-wrapper",children:[t.jsx("div",{className:"pin-circle",style:{width:48,height:48,background:"#fff",borderRadius:"50%",boxShadow:"0 10px 25px rgba(59,130,246,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#3b82f6",border:"4px solid #3b82f6",marginBottom:0,position:"relative"},children:String(e.id).padStart(2,"0")}),t.jsxs("div",{className:"pin-card",style:{background:"rgba(255,255,255,0.85)",backdropFilter:"blur(12px)",padding:"15px 20px",borderRadius:16,border:"1px solid rgba(255,255,255,0.6)",boxShadow:"0 10px 40px rgba(0,0,0,0.1)",minWidth:160},children:[t.jsx("h4",{style:{margin:0,fontSize:"1rem",color:"#1e293b",fontWeight:700,textTransform:"uppercase"},children:e.label}),t.jsx("p",{style:{margin:"5px 0 0 0",fontSize:"0.85rem",color:"#64748b",lineHeight:1.4},children:e.description})]})]},e.id))})]})})]})}export{D as default};
