export type Photo = {file:number; x:number; y:number; w:number; h:number};
export type Piece = {id:string;name:string;group:string;description:string;photos:Photo[]};
const photo=(file:number,y:number,h:number,x=0,w=706):Photo=>({file,y,h,x,w});
export const pieces:Piece[]=[
 {id:'carousel',name:'Carousel',group:'Circus',description:'A procession of horses circles a sculptural vase, framed by playful red and cream stripes.',photos:[photo(2610,365,770)]},
 {id:'tiny-worlds',name:'Tiny Worlds',group:'Little worlds',description:'Small houses and trees turn everyday vessels into landscapes to get lost in.',photos:[photo(2603,380,770),photo(2602,395,760)]},
 {id:'staircase',name:'Staircase',group:'Little worlds',description:'A quiet cream vessel with a staircase to somewhere unexpected.',photos:[photo(2616,305,820)]},
 {id:'rose-tinted',name:'Rose Tinted',group:'Circus',description:'Red and cream meet in a stacked form that feels part circus tent, part imagined architecture.',photos:[photo(2612,370,770)]},
 {id:'light-traveler',name:'Light Traveler',group:'Otherworldly',description:'A three-legged explorer with a dark ceramic body and a window into another world.',photos:[photo(2614,355,725),photo(2615,340,745)]},
 {id:'teal-perspective',name:'Teal Perspective',group:'Pattern & form',description:'Teal geometry wraps a curved silhouette, shifting as you turn the piece.',photos:[photo(2609,250,690),photo(2608,250,690)]},
 {id:'jester',name:'Jester',group:'Little worlds',description:'An expressive face, a tiny home, and a tree: a whole character, shaped in clay.',photos:[photo(2604,250,760)]},
 {id:'color-play',name:'Color Play',group:'Circus',description:'A bright composition of stripes, spouts, and unexpected details.',photos:[photo(2613,560,720)]},
 {id:'time-capsules',name:'Time Capsules',group:'Otherworldly',description:'Weathered surfaces and mechanical details give these vessels the feeling of artifacts from another time.',photos:[photo(2611,574,386,46,612)]},
 {id:'blue-perspective',name:'Blue Perspective',group:'Pattern & form',description:'Cobalt planes play with depth across a bottle-shaped vessel.',photos:[photo(2605,245,770)]},
 {id:'black-orbit',name:'Black Orbit',group:'Pattern & form',description:'A matte black silhouette with an off-center spherical detail.',photos:[photo(2607,235,680)]},
 {id:'poppy',name:'Poppy',group:'Otherworldly',description:'Soft green, pink rims, and flashes of orange come together in an unusual little arrangement.',photos:[photo(2601,395,760)]}
];
