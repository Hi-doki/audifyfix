import{_ as i,o,c,b as n,w as _,a as s,z as a,t as l,e as r}from"./DLCLJ7vf.js";const d={name:"PlaylistBox",props:{playlist:{type:Object,required:!0}}},p={class:"playlist-info"},y={class:"playlist-title"},m={class:"playlist-description"};function u(x,f,t,b,g,h){const e=r;return o(),c("div",{class:"playlist-box",style:a({backgroundColor:t.playlist.primarycolor})},[n(e,{to:`./playlist/id/${t.playlist.id}`},{default:_(()=>[s("div",{alt:"Playlist Cover",class:"playlist-image",style:a({backgroundImage:"url("+t.playlist.image+")"})},null,4),s("div",p,[s("h3",y,l(t.playlist.title),1),s("p",m,l(t.playlist.description),1)])]),_:1},8,["to"])],4)}const v=i(d,[["render",u],["__scopeId","data-v-3725d97b"]]);export{v as _};