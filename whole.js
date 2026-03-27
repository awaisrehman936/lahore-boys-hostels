/* ══════════════════════════════════════════════════════════
   LAHORE BOYS HOSTELS v2.1 — Full Platform Engine (FIXED)
   ══════════════════════════════════════════════════════════ */

// ── HOSTEL DATA ──
var HOSTELS=[
{id:1,slug:"h1",name:"Abdul Rehman Boys Hostel",short:"Abdul Rehman",area:"Nasir Colony",loc:"Nasir Colony, Lahore",emoji:"\uD83C\uDFDB\uFE0F",accentBg:"#0F1923",accentC:"#E8A84B",badge:"featured",badgeT:"Featured",rating:4.9,reviews:47,est:2008,yrs:16,cap:70,avail:8,availS:"available",from:6500,bldg:"10 Marla \u00B7 3 Floors \u00B7 23 Rooms",phone:"+92 307 435 0428",wa:"923074350428",owner:"Abdul Rehman Talib",owner2:"Muhammad Awais Rehman",phone2:"+92 304 412 8338",wa2:"923044128338",tags:["student","professional"],tagLbls:["Students","Professionals","WiFi"],meals:false,wifi:true,mapQ:"Nasir+Colony+Lahore",amenities:[["\uD83D\uDCF6","High-Speed WiFi"],["\uD83D\uDEBF","Attached Bathrooms"],["\uD83C\uDF73","Open Kitchen Every Floor"],["\uD83C\uDD7F\uFE0F","Parking"],["\uD83D\uDCF9","CCTV"],["\uD83D\uDD27","On-Call Maintenance"],["\uD83D\uDCA1","All Bills Included"],["\uD83E\uDDF9","Cleaning Service"]],rooms:[{type:"Sharing (per person)",count:"14x4 + 7x3 + 2x2",price:6500,feats:["Attached bathroom","Kitchen access","WiFi","All bills included"]},{type:"Private 3-Person",count:"7 rooms",price:19500,feats:["Whole room","Attached bathroom","All bills"]},{type:"Private 4-Person",count:"14 rooms",price:26000,feats:["Whole room","Attached bathroom","All bills"]}],desc:"One of Lahore most trusted boys hostels with 16+ years of operation.",about:"Abdul Rehman Boys Hostel has been a trusted residence since 2008. 10 Marla triple-storey with clean spacious rooms.",hls:[["10 Marla Building","23 rooms across three floors."],["All Bills Included","Electricity, gas, water covered."],["16+ Years","Serving since 2008."],["On-Call Maintenance","Dedicated staff available."]]},
{id:2,slug:"h2",name:"Al-Noor Boys Hostel",short:"Al-Noor",area:"Johar Town",loc:"Block P, Johar Town",emoji:"\uD83C\uDFE2",accentBg:"#0A1E38",accentC:"#4A9EFF",badge:"verified",badgeT:"Verified",rating:4.6,reviews:31,est:2014,yrs:10,cap:48,avail:6,availS:"available",from:7000,bldg:"8 Marla \u00B7 2 Floors",phone:"+92 300 123 4567",wa:"923001234567",owner:"Noor Ahmed",owner2:null,phone2:null,wa2:null,tags:["student","meals"],tagLbls:["Students","Meals","WiFi"],meals:true,wifi:true,mapQ:"Johar+Town+Lahore",amenities:[["\uD83D\uDCF6","WiFi"],["\uD83C\uDF7D","2 Meals Daily"],["\uD83D\uDEBF","Bathrooms"],["\uD83D\uDC55","Laundry"],["\u26A1","Generator"],["\uD83D\uDCF9","CCTV"],["\uD83D\uDCDA","Study Room"],["\uD83D\uDCA1","Bills Included"]],rooms:[{type:"Sharing",count:"10x3 + 6x2",price:7000,feats:["2 meals","Bathroom","Study room","WiFi"]},{type:"Private 3-Person",count:"10 rooms",price:21000,feats:["Whole room","2 meals","All bills"]}],desc:"Popular student hostel near Johar Town with meals and study room.",about:"Established 2014 for students. Easy access to universities.",hls:[["2 Meals Daily","Breakfast and dinner."],["Study Room","24/7 quiet study space."],["Generator","Uninterrupted power."],["Near Universities","UCP, UMT nearby."]]},
{id:3,slug:"h3",name:"Gulberg Comfort Hostel",short:"Gulberg Comfort",area:"Gulberg III",loc:"Main Boulevard, Gulberg III",emoji:"\uD83C\uDFD9\uFE0F",accentBg:"#130820",accentC:"#9A6AFF",badge:null,badgeT:null,rating:4.4,reviews:22,est:2017,yrs:7,cap:36,avail:3,availS:"limited",from:9500,bldg:"6 Marla \u00B7 3 Floors",phone:"+92 321 765 4321",wa:"923217654321",owner:"Imran Khalid",owner2:null,phone2:null,wa2:null,tags:["professional"],tagLbls:["Professionals","AC","WiFi"],meals:false,wifi:true,mapQ:"Gulberg+III+Lahore",amenities:[["\uD83D\uDCF6","Fibre WiFi"],["\u2744","AC All Rooms"],["\uD83D\uDEBF","Bathrooms"],["\uD83C\uDD7F","Parking"],["\uD83D\uDCF9","CCTV"],["\uD83D\uDC82","24/7 Guard"],["\uD83C\uDF07","Rooftop Lounge"],["\uD83D\uDCA1","Bills Included"]],rooms:[{type:"Sharing",count:"8x2 + 4x3",price:9500,feats:["AC","Bathroom","Fibre WiFi","Bills included"]},{type:"Private",count:"4 rooms",price:22000,feats:["AC","Whole room","Rooftop access","Bills included"]}],desc:"Premium professional hostel in Gulberg with AC and rooftop lounge.",about:"Built for professionals in Gulberg III. AC in every room.",hls:[["AC Every Room","Year-round comfort."],["Rooftop Lounge","City views."],["Prime Location","Near offices and restaurants."],["24/7 Security","Guard plus CCTV."]]},
{id:4,slug:"h4",name:"Iqbal Town Boys Residence",short:"Iqbal Town",area:"Iqbal Town",loc:"Ravi Block, Iqbal Town",emoji:"\uD83C\uDFE0",accentBg:"#041808",accentC:"#3DAA7A",badge:null,badgeT:null,rating:4.2,reviews:18,est:2019,yrs:5,cap:40,avail:12,availS:"available",from:5500,bldg:"7 Marla \u00B7 2 Floors",phone:"+92 333 987 6543",wa:"923339876543",owner:"Tariq Mahmood",owner2:null,phone2:null,wa2:null,tags:["student"],tagLbls:["Students","Budget","WiFi"],meals:false,wifi:true,mapQ:"Iqbal+Town+Lahore",amenities:[["\uD83D\uDCF6","WiFi"],["\uD83C\uDF73","Kitchen"],["\uD83D\uDEBF","Bathrooms"],["\uD83C\uDD7F","Parking"],["\uD83D\uDCF9","CCTV"],["\uD83D\uDCA1","Electricity"],["\uD83D\uDCA7","Water"],["\uD83E\uDDF9","Cleaning"]],rooms:[{type:"Sharing",count:"8x4 + 6x3",price:5500,feats:["Bathroom","Kitchen","WiFi","Bills included"]},{type:"Private 4-Person",count:"8 rooms",price:20000,feats:["Whole room","Bathroom","All bills"]}],desc:"Budget option for students in Iqbal Town.",about:"Est. 2019 for affordable accommodation.",hls:[["Lowest Rates","From Rs. 5500."],["Community","Welcoming environment."],["Connected","Central location."],["Clean","Regular maintenance."]]},
{id:5,slug:"h5",name:"Garden Town Executive Hostel",short:"Garden Town",area:"Garden Town",loc:"Tufail Road, Garden Town",emoji:"\uD83C\uDF3F",accentBg:"#1A0C00",accentC:"#C8842A",badge:null,badgeT:null,rating:4.7,reviews:35,est:2012,yrs:12,cap:55,avail:5,availS:"limited",from:8000,bldg:"12 Marla \u00B7 3 Floors",phone:"+92 345 112 2334",wa:"923451122334",owner:"Farhan Siddiqui",owner2:null,phone2:null,wa2:null,tags:["student","professional","meals"],tagLbls:["Students","Professionals","3 Meals","WiFi"],meals:true,wifi:true,mapQ:"Garden+Town+Lahore",amenities:[["\uD83D\uDCF6","Fibre WiFi"],["\uD83C\uDF7D","3 Meals Daily"],["\uD83D\uDEBF","Bathrooms"],["\uD83D\uDC55","Laundry"],["\u26A1","Generator"],["\uD83C\uDD7F","Parking"],["\uD83D\uDCDA","Study Hall"],["\uD83D\uDCF9","CCTV"],["\uD83D\uDD4C","Prayer Room"],["\uD83D\uDCA1","Bills Included"]],rooms:[{type:"Sharing",count:"12x3 + 8x4",price:8000,feats:["3 meals","Bathroom","WiFi","Study hall"]},{type:"Private",count:"6 rooms",price:24000,feats:["Whole room","3 meals","All bills"]}],desc:"Full-service hostel with 3 daily meals, study hall, prayer room.",about:"Operating since 2012, one of the most comprehensive hostels.",hls:[["3 Meals Daily","Breakfast, lunch, dinner."],["Study Hall 24/7","Quiet study space."],["Prayer Room","Dedicated space."],["12+ Years","Trusted management."]]},
{id:6,slug:"h6",name:"DHA Phase 5 Executive Hostel",short:"DHA Executive",area:"DHA Phase 5",loc:"Block L, DHA Phase 5",emoji:"\uD83C\uDFE2",accentBg:"#071320",accentC:"#38BDF8",badge:null,badgeT:null,rating:4.6,reviews:28,est:2016,yrs:8,cap:44,avail:7,availS:"available",from:11000,bldg:"",phone:"+92 312 456 7890",wa:"923124567890",owner:"Salman Baig",owner2:null,phone2:null,wa2:null,tags:["professional"],tagLbls:["Professionals","AC","Gym","WiFi"],meals:false,wifi:true,mapQ:"DHA+Phase+5+Lahore",amenities:[["\uD83D\uDCF1","Fibre WiFi"],["\u2744","AC"],["\uD83D\uDEBF","Bathrooms"],["\uD83C\uDD7F","Basement Parking"],["\uD83D\uDCF9","CCTV"],["\uD83D\uDC82","Guard"],["\uD83C\uDFCB","Gym"],["\uD83D\uDCA1","Bills Included"]],rooms:[{type:"Sharing",count:"8x2 + 6x3",price:11000,feats:["AC","Bathroom","Gym","Bills included"]},{type:"Private",count:"5 rooms",price:28000,feats:["AC","Private bathroom","Gym","Bills included"]}],desc:"Premium executive hostel in DHA Phase 5.",about:"Caters exclusively to working professionals in DHA.",hls:[["DHA Location","Near corporate offices."],["Gym Included","Full gym."],["Basement Parking","Covered secure parking."],["Executive Standard","Higher specification."]]},
{id:7,slug:"h7",name:"Faisal Town Boys Hostel",short:"Faisal Town",area:"Faisal Town",loc:"Block C, Faisal Town",emoji:"\uD83C\uDFD8",accentBg:"#0D1F0D",accentC:"#4ADE80",badge:null,badgeT:null,rating:4.3,reviews:19,est:2018,yrs:6,cap:38,avail:9,availS:"available",from:6000,bldg:"",phone:"+92 315 678 9012",wa:"923156789012",owner:"Kamran Butt",owner2:null,phone2:null,wa2:null,tags:["student"],tagLbls:["Students","Budget","WiFi"],meals:false,wifi:true,mapQ:"Faisal+Town+Lahore",amenities:[["\uD83D\uDCF1","WiFi"],["\uD83C\uDF73","Kitchen"],["\uD83D\uDEBF","Bathrooms"],["\uD83D\uDCF9","CCTV"],["\uD83D\uDCA1","Bills Included"],["\uD83E\uDDF9","Daily Cleaning"]],rooms:[{type:"Sharing",count:"10x4 + 4x3",price:6000,feats:["Bathroom","Kitchen","WiFi","Bills included"]},{type:"Double",count:"4 rooms",price:8500,feats:["2-person","Bathroom","Bills included"]}],desc:"Affordable clean hostel in Faisal Town.",about:"Affordable accommodation near FAST, LUMS, UCP.",hls:[["Near Universities","Short commute."],["Great Value","From Rs. 6000."],["Daily Cleaning","Common areas daily."],["Community","Lasting friendships."]]},
{id:8,slug:"h8",name:"Wapda Town Comfort Hostel",short:"Wapda Town",area:"Wapda Town",loc:"Phase 1, Wapda Town",emoji:"\uD83C\uDFE0",accentBg:"#130A1F",accentC:"#C084FC",badge:null,badgeT:null,rating:4.4,reviews:24,est:2019,yrs:5,cap:40,avail:6,availS:"available",from:7500,bldg:"",phone:"+92 300 987 6543",wa:"923009876543",owner:"Nadeem Hussain",owner2:null,phone2:null,wa2:null,tags:["student","professional"],tagLbls:["Students","Professionals","Generator","WiFi"],meals:false,wifi:true,mapQ:"Wapda+Town+Lahore",amenities:[["\uD83D\uDCF1","WiFi"],["\uD83D\uDEBF","Bathrooms"],["\u26A1","Generator"],["\uD83D\uDCF9","CCTV"],["\uD83C\uDD7F","Parking"],["\uD83D\uDCA1","Bills Included"],["\uD83D\uDCDA","Study Lounge"],["\uD83E\uDDF9","Cleaning"]],rooms:[{type:"Sharing",count:"8x4 + 6x3",price:7500,feats:["Bathroom","Study lounge","WiFi","Bills included"]},{type:"Private 3-Person",count:"4 rooms",price:22000,feats:["Whole room","Bathroom","Generator","Bills included"]}],desc:"Well-maintained hostel with generator and study lounge.",about:"Serves students and professionals with uninterrupted power.",hls:[["Generator","100% power backup."],["Study Lounge","24 hours."],["Ring Road","Easy access."],["Mixed Community","Balanced environment."]]},
{id:9,slug:"h9",name:"Bahria Town Boys Residence",short:"Bahria Town",area:"Bahria Town",loc:"Sector C, Bahria Town",emoji:"\uD83C\uDFDB",accentBg:"#1A0A00",accentC:"#FB923C",badge:"verified",badgeT:"Verified",rating:4.7,reviews:33,est:2015,yrs:9,cap:52,avail:4,availS:"limited",from:9000,bldg:"",phone:"+92 321 111 2233",wa:"923211112233",owner:"Shahid Mehmood",owner2:"Asif Ali",phone2:"+92 333 444 5566",wa2:"923334445566",tags:["professional","meals"],tagLbls:["Professionals","3 Meals","AC","WiFi"],meals:true,wifi:true,mapQ:"Bahria+Town+Lahore",amenities:[["\uD83D\uDCF1","Fibre WiFi"],["\uD83C\uDF7D","3 Meals"],["\uD83D\uDEBF","Bathrooms"],["\u2744","AC"],["\u26A1","Generator"],["\uD83D\uDCF9","CCTV"],["\uD83C\uDD7F","Parking"],["\uD83D\uDCA1","Bills Included"]],rooms:[{type:"Sharing",count:"10x3 + 8x2",price:9000,feats:["3 meals","AC","Bathroom","Bills included"]},{type:"Private",count:"8 rooms",price:26000,feats:["3 meals","AC","Whole room","Bills included"]}],desc:"Full-service verified hostel with 3 meals, AC, parking.",about:"Offers three meals, AC, uninterrupted power in Bahria Town.",hls:[["3 Meals Daily","Fresh daily."],["AC + Generator","Year-round comfort."],["Bahria Lifestyle","Wide roads, parks."],["Covered Parking","Dedicated bay."]]},
{id:10,slug:"h10",name:"Cavalry Ground Officers Hostel",short:"Cavalry Ground",area:"Cavalry Ground",loc:"Cavalry Ground Ext, Cantt",emoji:"\uD83C\uDF96",accentBg:"#0F1309",accentC:"#A3E635",badge:null,badgeT:null,rating:4.2,reviews:16,est:2020,yrs:4,cap:32,avail:10,availS:"available",from:8000,bldg:"",phone:"+92 305 222 3344",wa:"923052223344",owner:"Usman Farooq",owner2:null,phone2:null,wa2:null,tags:["professional"],tagLbls:["Professionals","Cantt","Quiet","WiFi"],meals:false,wifi:true,mapQ:"Cavalry+Ground+Lahore",amenities:[["\uD83D\uDCF1","WiFi"],["\uD83D\uDEBF","Bathrooms"],["\uD83C\uDD7F","Parking"],["\uD83D\uDCF9","CCTV"],["\uD83D\uDCA1","Bills Included"],["\uD83E\uDDF9","Cleaning"],["\uD83D\uDC82","Gate Security"]],rooms:[{type:"Sharing",count:"6x3 + 5x2",price:8000,feats:["Bathroom","WiFi","Bills included"]},{type:"Private",count:"4 rooms",price:20000,feats:["Whole room","Bathroom","Bills included"]}],desc:"Clean secure hostel in Cavalry Ground cantonment.",about:"Reliable accommodation in the secure cantonment area.",hls:[["Cantt Security","Gate controlled."],["Tree-Lined Streets","Quiet neighbourhood."],["Strategic Location","Near Gulberg, Defence."],["Responsive Management","Active management."]]},
{id:11,slug:"h11",name:"Township Budget Hostel",short:"Township",area:"Township",loc:"Sector A-2, Township",emoji:"\uD83C\uDF93",accentBg:"#0A0F1F",accentC:"#818CF8",badge:null,badgeT:null,rating:4.1,reviews:14,est:2021,yrs:3,cap:56,avail:14,availS:"available",from:5000,bldg:"",phone:"+92 311 555 6677",wa:"923115556677",owner:"Zubair Ahmed",owner2:null,phone2:null,wa2:null,tags:["student","meals"],tagLbls:["Students","Dinner","Lowest Price","WiFi"],meals:true,wifi:true,mapQ:"Township+Lahore",amenities:[["\uD83D\uDCF1","WiFi"],["\uD83C\uDF7D","Dinner Daily"],["\uD83D\uDEBF","Bathrooms"],["\uD83D\uDCF9","CCTV"],["\uD83D\uDCDA","Study Hall"],["\uD83D\uDCA1","Electricity"],["\uD83E\uDDF9","Cleaning"]],rooms:[{type:"Sharing",count:"12x4 + 6x3",price:5000,feats:["Dinner","Bathroom","Study hall","WiFi"]},{type:"3-Person",count:"6 rooms",price:14500,feats:["Dinner","Bathroom","WiFi"]}],desc:"Most affordable at Rs. 5000 with dinner daily.",about:"Built for students who need max value. Near UET, PUCIT, NFC.",hls:[["Lowest Price","Rs. 5000 with dinner."],["Near UET/PUCIT","5 min drive."],["Dinner Daily","Fresh every evening."],["Study Hall","Good lighting, 24/7."]]},
{id:12,slug:"h12",name:"Shadman Colony Boys Hostel",short:"Shadman Colony",area:"Shadman Colony",loc:"Shadman 1, Lahore",emoji:"\uD83C\uDFE1",accentBg:"#1A0D0D",accentC:"#F87171",badge:null,badgeT:null,rating:4.5,reviews:22,est:2013,yrs:11,cap:36,avail:5,availS:"limited",from:7000,bldg:"",phone:"+92 322 888 9900",wa:"923228889900",owner:"Akram Sheikh",owner2:null,phone2:null,wa2:null,tags:["student","professional"],tagLbls:["Students","Professionals","Central","WiFi"],meals:false,wifi:true,mapQ:"Shadman+Colony+Lahore",amenities:[["\uD83D\uDCF1","WiFi"],["\uD83D\uDEBF","Bathrooms"],["\uD83C\uDD7F","Parking"],["\uD83D\uDCF9","CCTV"],["\uD83D\uDCA1","Bills Included"],["\u26A1","Generator"],["\uD83E\uDDF9","Daily Cleaning"],["\uD83C\uDFE0","Homely"]],rooms:[{type:"Sharing",count:"7x4 + 5x3",price:7000,feats:["Bathroom","WiFi","Generator","Bills included"]},{type:"Private 3-Person",count:"5 rooms",price:20000,feats:["Whole room","Bathroom","Generator","Bills included"]}],desc:"Est. 2013 with 11 years trusted management.",about:"Trusted home since 2013 in central Lahore.",hls:[["11 Years","Decade of management."],["Shadman Location","Central Lahore."],["Generator","Uninterrupted power."],["Homely","Management knows everyone."]]}
];

var MGRS=[
{hid:1,user:"manager.ar",pass:"ar2024",name:"Abdul Rehman Talib"},
{hid:2,user:"manager.alnoor",pass:"alnoor24",name:"Noor Ahmed"},
{hid:3,user:"manager.gulberg",pass:"gulberg24",name:"Imran Khalid"},
{hid:4,user:"manager.iqbal",pass:"iqbal24",name:"Tariq Mahmood"},
{hid:5,user:"manager.garden",pass:"garden24",name:"Farhan Siddiqui"},
{hid:6,user:"manager.dha",pass:"dha2024",name:"Salman Baig"},
{hid:7,user:"manager.faisal",pass:"faisal24",name:"Kamran Butt"},
{hid:8,user:"manager.wapda",pass:"wapda24",name:"Nadeem Hussain"},
{hid:9,user:"manager.bahria",pass:"bahria24",name:"Shahid Mehmood"},
{hid:10,user:"manager.cavalry",pass:"cavalry24",name:"Usman Farooq"},
{hid:11,user:"manager.township",pass:"township24",name:"Zubair Ahmed"},
{hid:12,user:"manager.shadman",pass:"shadman24",name:"Akram Sheikh"}
];
var RCFG={1:[[4,14],[3,7],[2,2]],2:[[3,10],[2,6]],3:[[2,8],[3,4]],4:[[4,8],[3,6]],5:[[3,12],[4,8]],6:[[2,8],[3,6]],7:[[4,10],[3,4]],8:[[4,8],[3,6]],9:[[3,10],[2,8]],10:[[3,6],[2,5]],11:[[4,12],[3,6]],12:[[4,7],[3,5]]};
var HPFX={1:"ARH",2:"ALN",3:"GCH",4:"ITR",5:"GTE",6:"DHX",7:"FTB",8:"WTC",9:"BTR",10:"CVG",11:"TWN",12:"SHD"};
var PLBLS={regular:"Regular",advance:"Advance",overpayment:"Overpayment",partial:"Partial",security:"Security Deposit"};
var PBDGS={regular:"bg",advance:"bb",overpayment:"bo",partial:"bo",security:"bgold"};
var RLBLS={advance_rent:"Advance rent",rounding:"Rounding up",utility_extra:"Utility extra",goodwill:"Goodwill",mistake:"Mistake (refund)",other:"Other"};

// ── GLOBALS ──
var activeFilter="all",viewMode="grid",compareList=[],currentApplyId=null,currentUser=null,mTab="dashboard";
var sessionTimer=null,SESSION_TIMEOUT=30*60*1000;
var isUrdu=false;
var _attActiveTab="tenant";
var adminViewMode="list";

// ── i18n ──
var UR={dashboard:"\u0688\u06CC\u0634 \u0628\u0648\u0631\u0688",tenants:"\u06A9\u0631\u0627\u0626\u06CC\u062F\u0627\u0631"};

// ── UTILITY FUNCTIONS ──
function fmt(n){return new Intl.NumberFormat("en-PK").format(n||0);}
function mFmt(n){return fmt(n);}
function today(){var d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function curM(){var d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");}
function fdate(d){if(!d)return "\u2014";return new Date(d+"T12:00:00").toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"});}
function fdateFull(d){if(!d)return "\u2014";return new Date(d+"T12:00:00").toLocaleDateString("en-PK",{day:"2-digit",month:"long",year:"numeric"});}
function mlabel(ym){if(!ym)return "";var p=ym.split("-");return new Date(parseInt(p[0]),parseInt(p[1])-1).toLocaleDateString("en-PK",{month:"long",year:"numeric"});}
function dbGet(k){try{return JSON.parse(localStorage.getItem("lbh_"+k)||"[]");}catch(e){return[];}}
function dbSet(k,v){localStorage.setItem("lbh_"+k,JSON.stringify(v));}
function dbGetO(k){try{return JSON.parse(localStorage.getItem("lbh_"+k)||"{}");}catch(e){return{};}}
function dbSetO(k,v){localStorage.setItem("lbh_"+k,JSON.stringify(v));}
function dbId(){return Date.now().toString(36)+Math.random().toString(36).slice(2,4);}
function hk(hid,t){return "h"+hid+"_"+t;}
function mFld(l,v){return '<div class="mvt-f"><div class="mvt-fl">'+l+'</div><div class="mvt-fv">'+(v||"\u2014")+'</div></div>';}
function stars(r){var s="";for(var i=0;i<5;i++)s+=i<Math.floor(r)?"\u2605":"\u2606";return s;}
function smoothScroll(sel){setTimeout(function(){var el=document.querySelector(sel);if(el)el.scrollIntoView({behavior:"smooth"});},100);}

function toast(msg){var t=document.createElement("div");t.className="tmsg ok";t.textContent=msg;document.getElementById("toast-c").appendChild(t);setTimeout(function(){t.remove();},3000);}
function mToast(msg,type){var c=document.getElementById("m-toast");if(!c)return;var t=document.createElement("div");t.className="tmsg "+(type==="err"?"err":"ok");t.textContent=msg;c.appendChild(t);setTimeout(function(){t.remove();},3500);}

function toggleTheme(){
  var cur=document.documentElement.getAttribute("data-theme");
  var nw=cur==="dark"?"light":"dark";
  document.documentElement.setAttribute("data-theme",nw);
  localStorage.setItem("lbh_theme",nw);
  document.querySelectorAll(".theme-toggle").forEach(function(b){b.textContent=nw==="dark"?"\u2600":"\u263E";});
}
function loadTheme(){
  var t=localStorage.getItem("lbh_theme")||"light";
  document.documentElement.setAttribute("data-theme",t);
  document.querySelectorAll(".theme-toggle").forEach(function(b){b.textContent=t==="dark"?"\u2600":"\u263E";});
}

function resetSession(){
  clearTimeout(sessionTimer);
  if(currentUser){
    sessionTimer=setTimeout(function(){
      if(currentUser){mToast("Session timed out. Please log in again.","err");logout();}
    },SESSION_TIMEOUT);
  }
}
document.addEventListener("click",resetSession);
document.addEventListener("keydown",resetSession);

// NOTIFICATIONS
var notifications=[];
function addNotif(msg,role){
  notifications.unshift({id:dbId(),msg:msg,time:new Date().toISOString(),read:false,role:role||"all"});
  if(notifications.length>50)notifications=notifications.slice(0,50);
  updateNotifBell();
}
function updateNotifBell(){
  var bell=document.getElementById("notif-bell");if(!bell)return;
  var role=currentUser?currentUser.role:"";
  var unread=notifications.filter(function(n){return !n.read&&(n.role==="all"||n.role===role);}).length;
  var countEl=bell.querySelector(".notif-count");
  if(countEl){countEl.textContent=unread;countEl.style.display=unread?"flex":"none";}
}
function toggleNotifPanel(){
  var panel=document.getElementById("notif-panel");
  if(!panel)return;
  if(panel.classList.contains("open")){panel.classList.remove("open");return;}
  var role=currentUser?currentUser.role:"";
  var items=notifications.filter(function(n){return n.role==="all"||n.role===role;});
  panel.innerHTML=items.length?items.slice(0,15).map(function(n){
    return '<div class="notif-item'+(n.read?'':' notif-unread')+'" onclick="markNotifRead(\''+n.id+'\')"><div>'+n.msg+'</div><div class="notif-time">'+new Date(n.time).toLocaleString("en-PK",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})+'</div></div>';
  }).join(''):'<div style="padding:16px;text-align:center;color:var(--muted);font-size:.82rem">No notifications</div>';
  panel.classList.add("open");
}
function markNotifRead(id){
  var n=notifications.find(function(x){return x.id===id;});
  if(n)n.read=true;
  updateNotifBell();toggleNotifPanel();
}

function trackApplication(hostelId,appData){
  var apps=dbGet("applications");
  var entry={hid:hostelId,date:new Date().toISOString()};
  if(appData)Object.assign(entry,appData);
  apps.push(entry);
  dbSet("applications",apps);
  var hApps=dbGet(hk(hostelId,"apps"));
  hApps.push(entry);
  dbSet(hk(hostelId,"apps"),hApps);
}

function exportAllData(){
  var data={};
  for(var i=0;i<localStorage.length;i++){
    var key=localStorage.key(i);
    if(key.startsWith("lbh_"))data[key]=localStorage.getItem(key);
  }
  var blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  var url=URL.createObjectURL(blob);
  var a=document.createElement("a");a.href=url;a.download="lbh_backup_"+today()+".json";a.click();
  URL.revokeObjectURL(url);
  mToast("Backup downloaded","ok");
}
function importData(file){
  var reader=new FileReader();
  reader.onload=function(e){
    try{
      var data=JSON.parse(e.target.result);
      Object.keys(data).forEach(function(k){localStorage.setItem(k,data[k]);});
      mToast("Data restored! Refreshing...","ok");
      setTimeout(function(){location.reload();},1500);
    }catch(err){mToast("Invalid backup file","err");}
  };
  reader.readAsText(file);
}

function initRooms(hid){
  var key=hk(hid,"rooms");var ex=dbGet(key);
  if(ex.length&&ex[0].cap&&ex[0].num&&ex[0].floor)return;
  var rms=[],n=1;
  (RCFG[hid]||[[4,10]]).forEach(function(cfg){for(var i=0;i<cfg[1];i++){var x=n++;rms.push({id:"r"+x,num:"R"+String(x).padStart(2,"0"),cap:cfg[0],floor:Math.ceil(x/8)});}});
  dbSet(key,rms);
}
function nextTid(hid){
  var pfx=HPFX[hid]||"H"+hid;var all=dbGet(hk(hid,"tenants"));var n=all.length+1;
  var id=pfx+"-"+String(n).padStart(3,"0");
  while(all.find(function(t){return t.tid===id;})){n++;id=pfx+"-"+String(n).padStart(3,"0");}
  return id;
}

function calcHealthScore(hid){
  var tenants=dbGet(hk(hid,"tenants")).filter(function(t){return t.status==="active";});
  var rooms=dbGet(hk(hid,"rooms"));
  var totalBeds=rooms.reduce(function(s,r){return s+r.cap;},0);
  var occupancy=totalBeds?tenants.length/totalBeds:0;
  var pays=dbGet(hk(hid,"pays")).filter(function(p){return p.month===curM()&&p.status==="paid";});
  var paidCount=new Set(pays.map(function(p){return p.tid;})).size;
  var collection=tenants.length?paidCount/tenants.length:1;
  var issues=dbGet(hk(hid,"maint")).filter(function(i){return i.status!=="resolved";}).length;
  var issuePenalty=Math.min(issues*5,30);
  var score=Math.round(occupancy*35+collection*45+(100-issuePenalty)*0.2);
  return Math.max(0,Math.min(100,score));
}

// ── PAGE NAVIGATION ──
function showPage(id){
  document.querySelectorAll(".page").forEach(function(p){p.classList.remove("active");});
  var pg=document.getElementById("page-"+id);
  if(pg)pg.classList.add("active");
  var nb=document.getElementById("nav-back");
  var ncl=document.getElementById("nav-portal-close");
  var nl=document.getElementById("nav-logo");
  if(id==="home"){
    if(nb)nb.style.display="none";
    if(ncl)ncl.style.display="none";
    if(nl)nl.onclick=function(){showPage("home");};
    window.scrollTo(0,0);
  }else if(id==="hostel"){
    if(nb){nb.style.display="flex";nb.onclick=function(){showPage("home");smoothScroll("#hostels");};}
    if(ncl)ncl.style.display="none";
    window.scrollTo(0,0);
  }else if(id==="portal"){
    if(nb)nb.style.display="none";
    if(ncl)ncl.style.display="flex";
  }
}

function openPortal(){
  showPage("portal");
  if(!currentUser){
    var lw=document.getElementById("l-wrap");
    if(lw)lw.style.display="block";
    var pw=document.getElementById("p-wrap");
    if(pw)pw.style.display="none";
  }
}

function closePortal(){
  logout();
  showPage("home");
  window.scrollTo(0,0);
}

function openHostelPage(id){
  var h=HOSTELS.find(function(x){return x.id===id;});
  if(!h)return;
  buildHostelPages(h);
  showPage("hostel");
  window.scrollTo(0,0);
}

// ── FILTER & HOSTEL GRID ──
function setViewMode(mode){
  viewMode=mode;
  document.querySelectorAll(".vt-btn").forEach(function(b){b.classList.remove("active");});
  var btn=document.getElementById("vt-"+mode);
  if(btn)btn.classList.add("active");
  filterHostels();
}

function setF(f){
  activeFilter=f;
  document.querySelectorAll(".fb").forEach(function(b){b.classList.remove("active");});
  var btn=document.getElementById("fb-"+f);
  if(btn)btn.classList.add("active");
  filterHostels();
}

function filterHostels(){
  var area=document.getElementById("fsel-area")?document.getElementById("fsel-area").value:"all";
  var sort=document.getElementById("fsel-sort")?document.getElementById("fsel-sort").value:"default";
  var results=HOSTELS.filter(function(h){
    if(activeFilter==="meals"&&!h.meals)return false;
    if(activeFilter==="wifi"&&!h.wifi)return false;
    if(activeFilter==="student"&&!h.tags.includes("student"))return false;
    if(activeFilter==="pro"&&!h.tags.includes("professional"))return false;
    if(area!=="all"&&h.area!==area)return false;
    return true;
  });
  if(sort==="price-asc")results.sort(function(a,b){return a.from-b.from;});
  else if(sort==="price-desc")results.sort(function(a,b){return b.from-a.from;});
  else if(sort==="rating")results.sort(function(a,b){return b.rating-a.rating;});
  var rc=document.getElementById("result-count");
  if(rc)rc.textContent=results.length+" hostel"+(results.length!==1?"s":"")+" found";
  var grid=document.getElementById("hgrid");
  if(!grid)return;
  if(viewMode==="list"){
    grid.classList.add("list-mode");
    grid.innerHTML='<div class="hlist">'+results.map(renderHListItem).join("")+"</div>";
  }else{
    grid.classList.remove("list-mode");
    grid.innerHTML=results.map(renderHCard).join("");
  }
  updateInlineCompare();
}

function handleCardClick(e,hid){
  if(e.target.closest("button")||e.target.closest("a")||e.target.closest("label")||e.target.closest("input"))return;
  openHostelPage(hid);
}

function renderHCard(h){
  var inComp=compareList.includes(h.id);
  return '<div class="hcard" onclick="handleCardClick(event,'+h.id+')">'+
    '<div class="ci" style="background:'+h.accentBg+'">'+
    (h.badge?'<span class="cbadge '+h.badge+'">'+h.badgeT+'</span>':'')+
    '<span style="font-size:3.5rem">'+h.emoji+'</span>'+
    '<span class="cavail '+h.availS+'">'+(h.availS==="available"?h.avail+" beds free":"Limited")+' </span></div>'+
    '<div class="cbody">'+
    '<div class="chdr"><div class="cname">'+h.name+'</div><div class="crat">'+h.rating+' \u2605</div></div>'+
    '<div class="cloc">📍 '+h.loc+'</div>'+
    '<div class="ctags">'+h.tagLbls.map(function(t){return '<span class="ctag">'+t+'</span>';}).join("")+'</div>'+
    '<div class="cpr">'+
      '<div class="cprice">Rs. '+fmt(h.from)+' <span>/person/mo</span></div>'+
      '<div class="cacts">'+
        '<button class="btn-view" onclick="event.stopPropagation();openHostelPage('+h.id+')">View</button>'+
        '<button class="btn-apply" onclick="event.stopPropagation();openApply('+h.id+')">Apply</button>'+
        '<button class="btn-wa" onclick="event.stopPropagation();openWA(\''+h.wa+'\',\''+h.name+'\')">💬</button>'+
      '</div>'+
    '</div>'+
    '<div class="cmp-row"><label class="cmp-lbl" onclick="event.stopPropagation()"><input type="checkbox" '+(inComp?"checked":"")+'onchange="toggleCompare('+h.id+',this)"> Compare</label></div>'+
    '</div></div>';
}

function renderHListItem(h){
  var inComp=compareList.includes(h.id);
  return '<div class="hlist-item" onclick="handleCardClick(event,'+h.id+')">'+
    '<div class="hlist-emoji">'+h.emoji+'</div>'+
    '<div class="hlist-info">'+
      '<div class="hlist-name">'+h.name+'</div>'+
      '<div class="hlist-meta">📍 '+h.loc+' &nbsp;·&nbsp; ⭐ '+h.rating+' &nbsp;·&nbsp; '+h.avail+' beds free</div>'+
      '<div class="hlist-tags">'+h.tagLbls.map(function(t){return '<span class="ctag">'+t+'</span>';}).join("")+'</div>'+
    '</div>'+
    '<div class="hlist-right">'+
      '<div class="hlist-price">Rs. '+fmt(h.from)+'</div>'+
      '<div class="cacts">'+
        '<button class="btn-view" onclick="event.stopPropagation();openHostelPage('+h.id+')">View</button>'+
        '<button class="btn-apply" onclick="event.stopPropagation();openApply('+h.id+')">Apply</button>'+
        '<button class="btn-wa" onclick="event.stopPropagation();openWA(\''+h.wa+'\',\''+h.name+'\')">💬</button>'+
        '<label onclick="event.stopPropagation()"><input type="checkbox" '+(inComp?"checked":"")+'onchange="toggleCompare('+h.id+',this)"> Cmp</label>'+
      '</div>'+
    '</div></div>';
}

function openWA(wa,name){
  window.open("https://wa.me/"+wa+"?text="+encodeURIComponent("Hi, I am interested in your boys hostel. Can you tell me about room availability?"),"_blank");
}

// ── COMPARE ──
function toggleCompare(id,cb){
  if(cb.checked){
    if(compareList.length>=3){cb.checked=false;toast("Max 3 hostels to compare");return;}
    compareList.push(id);
  }else{
    compareList=compareList.filter(function(x){return x!==id;});
  }
  updateCompareBar();
  updateInlineCompare();
}
function clearCompare(){
  compareList=[];
  updateCompareBar();
  updateInlineCompare();
  filterHostels();
}
function updateCompareBar(){
  var bar=document.getElementById("compare-bar");if(!bar)return;
  if(compareList.length===0){bar.style.display="none";return;}
  bar.style.display="flex";
  var slots=document.getElementById("cmp-slots");
  if(!slots)return;
  var html="";
  for(var i=0;i<3;i++){
    if(compareList[i]){var h=HOSTELS.find(function(x){return x.id===compareList[i];});html+='<div class="cslot">'+h.emoji+' '+h.short+'</div>';}
    else html+='<div class="cslot empty">+ Add hostel</div>';
  }
  slots.innerHTML=html;
}
function updateInlineCompare(){
  var bar=document.getElementById("inline-compare-bar");if(!bar)return;
  if(compareList.length===0){bar.classList.remove("visible");return;}
  bar.classList.add("visible");
  var slots=document.getElementById("inline-compare-slots");if(!slots)return;
  var html="";
  for(var i=0;i<3;i++){
    if(compareList[i]){var h=HOSTELS.find(function(x){return x.id===compareList[i];});html+='<span class="cislot">'+h.emoji+' '+h.short+'</span>';}
    else html+='<span class="cislot empty">+</span>';
  }
  slots.innerHTML=html;
}
function openCompare(){
  if(compareList.length<2){toast("Select at least 2 hostels");return;}
  var hs=compareList.map(function(id){return HOSTELS.find(function(h){return h.id===id;});});
  var fields=["Rating","Location","Price From","Meals","WiFi","Availability","Est."];
  var cols=hs.map(function(h){
    var items=[
      {l:"Rating",v:h.rating+" ★",best:false},
      {l:"Location",v:h.area,best:false},
      {l:"From",v:"Rs. "+fmt(h.from),best:false},
      {l:"Meals",v:h.meals?"✅ Yes":"❌ No",best:false},
      {l:"WiFi",v:h.wifi?"✅ Yes":"❌ No",best:false},
      {l:"Beds Free",v:h.avail,best:false},
      {l:"Est.",v:h.est,best:false}
    ];
    return '<div class="cmp-col">'+
      '<div class="cmp-col-hd"><h4>'+h.emoji+' '+h.short+'</h4><p>'+h.loc+'</p></div>'+
      items.map(function(i){return '<div class="crow"><span class="crow-lbl">'+i.l+'</span><span class="crow-val">'+i.v+'</span></div>';}).join("")+
    '</div>';
  }).join("");
  var mb=document.getElementById("m-cmp-body");
  if(mb)mb.innerHTML='<div class="cmp-grid" style="grid-template-columns:repeat('+hs.length+',1fr)">'+cols+'</div>';
  var mo=document.getElementById("m-compare");
  if(mo)mo.classList.add("open");
}

// ── APPLY MODAL ──
function openApply(id){
  currentApplyId=id;
  var h=HOSTELS.find(function(x){return x.id===id;});if(!h)return;
  var mo=document.getElementById("m-apply");
  if(mo){
    var title=document.getElementById("m-apply-title");if(title)title.textContent="Apply to "+h.name;
    var body=document.getElementById("m-apply-body");
    if(body)body.style.display="block";
    var suc=document.getElementById("m-apply-success");if(suc)suc.style.display="none";
    mo.classList.add("open");
  }
}
function submitApply(){
  var name=document.getElementById("ap-name").value.trim();
  var phone=document.getElementById("ap-phone").value.trim();
  var roomType=document.getElementById("ap-room").value;
  var msg=document.getElementById("ap-msg").value.trim();
  if(!name||!phone){toast("Please fill required fields");return;}
  trackApplication(currentApplyId,{name:name,phone:phone,roomType:roomType,msg:msg});
  var body=document.getElementById("m-apply-body");if(body)body.style.display="none";
  var suc=document.getElementById("m-apply-success");if(suc)suc.style.display="block";
}
function closeModal(id){
  var el=document.getElementById(id);if(el)el.classList.remove("open");
}

// ── HOSTEL DETAIL PAGE ──
function buildHostelPages(h){
  var pg=document.getElementById("page-hostel");if(!pg)return;
  var sc=calcHealthScore(h.id);
  var mapURL="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(h.mapQ||h.loc);
  pg.innerHTML=
    '<div class="hp-banner" id="hp-banner-'+h.id+'"></div>'+
    '<div class="hp-hero" style="background:'+h.accentBg+'">'+
      '<div class="hp-hero-bg">'+h.emoji+'</div>'+
      '<div class="hp-hero-inner">'+
        (h.badge?'<div class="hp-badge" style="background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.2)">'+h.badge.toUpperCase()+' &bull; VERIFIED &bull; EST. '+h.est+'</div>':
        '<div class="hp-badge" style="background:rgba(255,255,255,.1);color:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.15)">EST. '+h.est+' &bull; LAHORE</div>')+
        '<div class="hp-name">'+h.emoji+' '+h.name+'</div>'+
        '<div class="hp-loc">📍 '+h.loc+'</div>'+
        '<div class="hp-acts">'+
          '<button class="hp-btn-apply" style="background:'+h.accentC+';color:#0F1923" onclick="openApply('+h.id+')">Apply for a Room</button>'+
          '<button class="hp-btn-wa" onclick="openWA(\''+h.wa+'\',\''+h.name+'\')">💬 WhatsApp</button>'+
          '<button class="hp-btn-back" onclick="showPage(\'home\');smoothScroll(\'#hostels\')">← Back</button>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="hp-stats">'+
      '<div class="hp-stat"><div class="hp-stat-val" style="color:'+h.accentC+'">'+h.rating+'★</div><div class="hp-stat-lbl">Rating</div></div>'+
      '<div class="hp-stat"><div class="hp-stat-val">'+h.avail+'</div><div class="hp-stat-lbl">Beds Free</div></div>'+
      '<div class="hp-stat"><div class="hp-stat-val">'+h.cap+'</div><div class="hp-stat-lbl">Capacity</div></div>'+
      '<div class="hp-stat"><div class="hp-stat-val">'+h.yrs+' yrs</div><div class="hp-stat-lbl">Operating</div></div>'+
      '<div class="hp-stat"><div class="hp-stat-val">'+sc+'%</div><div class="hp-stat-lbl">Health Score</div></div>'+
    '</div>'+
    '<section><div class="stag">About</div><div class="stitle">'+h.name+'</div>'+
    '<div class="hp-about"><div>'+
    '<p>'+h.about+'</p>'+
    '<p>'+h.bldg+'</p>'+
    '</div><div class="hp-hls">'+h.hls.map(function(hl){return '<div class="hp-hl"><h4>'+hl[0]+'</h4><p>'+hl[1]+'</p></div>';}).join('')+'</div></div></section>'+
    '<section style="background:var(--cream2)"><div class="stag">Rooms & Pricing</div><div class="stitle">Room Types</div>'+
    '<div class="rooms-grid2">'+h.rooms.map(function(r){return '<div class="rcard"><div class="rcard-type">'+r.type+'</div><div class="rcard-count">'+r.count+'</div>'+
      '<div class="rcard-price">Rs. '+fmt(r.price)+'<span class="rcard-unit"> /person/mo</span></div>'+
      '<div class="rcard-feats">'+r.feats.map(function(f){return '<div class="rfeat">'+f+'</div>';}).join('')+'</div></div>';}).join('')+'</div></section>'+
    '<section><div class="stag">Amenities</div><div class="stitle">What\'s Included</div>'+
    '<div class="amen-grid">'+h.amenities.map(function(a){return '<div class="acard"><div class="acard-icon">'+a[0]+'</div><div class="acard-text">'+a[1]+'</div></div>';}).join('')+'</div></section>'+
    '<section style="background:var(--cream2)"><div class="stag">Location</div><div class="stitle">Where We Are</div>'+
    '<div class="loc-grid"><div class="loc-map"><span style="font-size:3rem">🗺️</span><p>'+h.loc+'<br>Click to open in Google Maps</p><a href="'+mapURL+'" target="_blank">Open Google Maps</a></div>'+
    '<div><p style="color:var(--ink2);line-height:1.8;font-size:.92rem;margin-bottom:1rem">Located in '+h.area+', Lahore with easy access to public transport.</p></div></div></section>'+
    '<section><div class="stag">Contact</div><div class="stitle">Get in Touch</div>'+
    '<div class="con-grid">'+
      '<div class="ccard"><h3>'+h.owner+'</h3><div class="ccard-role">Owner / Manager</div><div class="ccard-num">'+h.phone+'</div>'+
        '<div class="ccard-btns"><a href="tel:'+h.phone+'" class="btn-call">📞 Call</a><a href="https://wa.me/'+h.wa+'" class="btn-whatsapp">💬 WhatsApp</a></div></div>'+
      (h.owner2?'<div class="ccard"><h3>'+h.owner2+'</h3><div class="ccard-role">Manager</div><div class="ccard-num">'+h.phone2+'</div>'+
        '<div class="ccard-btns"><a href="tel:'+h.phone2+'" class="btn-call">📞 Call</a><a href="https://wa.me/'+h.wa2+'" class="btn-whatsapp">💬 WhatsApp</a></div></div>':'')
    +'</div></section>';
  loadCustomHostels(h.id);
}

function loadCustomHostels(hid){
  var banner=document.getElementById("hp-banner-"+hid);
  var settings=dbGetO(hk(hid,"settings"));
  if(banner&&settings.bannerText){banner.textContent=settings.bannerText;banner.style.display="block";}
}

// ── SESSION RESTORE ──
function restoreSession(){
  try{
    var saved=sessionStorage.getItem("lbh_cu");
    if(!saved)return;
    var cu=JSON.parse(saved);
    if(!cu||!cu.role)return;
    if(cu.role==="manager"){
      var mgr=MGRS.find(function(m){return m.hid===cu.hid&&m.user===cu.user;});
      if(!mgr){sessionStorage.removeItem("lbh_cu");return;}
    }
    currentUser=cu;
    showPortalView();
  }catch(e){sessionStorage.removeItem("lbh_cu");}
}

// ── PORTAL LOGIN ──
function mLog(tab){
  document.querySelectorAll(".l-tab").forEach(function(t){t.classList.remove("active");});
  document.querySelectorAll(".l-form").forEach(function(f){f.style.display="none";});
  var bt=document.getElementById("lt-"+tab);if(bt)bt.classList.add("active");
  var bf=document.getElementById("lf-"+tab);if(bf)bf.style.display="block";
}
function loginM(){
  var u=document.getElementById("l-muser").value.trim();
  var p=document.getElementById("l-mpass").value.trim();
  var mgr=MGRS.find(function(m){return m.user===u&&m.pass===p;});
  if(!mgr){mToast("Invalid manager credentials","err");return;}
  var h=HOSTELS.find(function(x){return x.id===mgr.hid;});
  currentUser={role:"manager",name:mgr.name,hid:mgr.hid,user:mgr.user,hostelName:h?h.name:"Hostel #"+mgr.hid};
  initRooms(mgr.hid);
  resetSession();
  showPortalView();
}
function loginA(){
  var u=document.getElementById("l-auser").value.trim();
  var p=document.getElementById("l-apass").value.trim();
  if(u==="admin.lbh"&&p==="lbh@admin2025"){
    currentUser={role:"admin",name:"LBH Administrator"};
    resetSession();showPortalView();
  }else mToast("Invalid admin credentials","err");
}
function loginF(){
  var u=document.getElementById("l-fuser").value.trim();
  var p=document.getElementById("l-fpass").value.trim();
  if(u==="finance.lbh"&&p==="finance@2025"){
    currentUser={role:"finance",name:"Finance Officer"};
    resetSession();showPortalView();
  }else mToast("Invalid finance credentials","err");
}
function loginH(){
  var u=document.getElementById("l-huser").value.trim();
  var p=document.getElementById("l-hpass").value.trim();
  var allT=[];
  HOSTELS.forEach(function(h){
    dbGet(hk(h.id,"tenants")).forEach(function(t){if(t.status==="active")allT.push({...t,hid:h.id,hname:h.name});});
  });
  var matched=allT.find(function(t){return (t.username||t.tid)===u&&(t.password||t.cnic||t.tid)===p;});
  if(!matched&&u.startsWith("T")){
    matched=allT.find(function(t){return t.tid===u;});
    if(matched&&matched.tid!==p)matched=null;
  }
  if(matched){
    currentUser={role:"hostelite",name:matched.name,tid:matched.tid,hid:matched.hid,hname:matched.hname};
    resetSession();showPortalView();
  }else mToast("Invalid credentials","err");
}
function loginS(){
  var u=document.getElementById("l-suser").value.trim();
  var p=document.getElementById("l-spass").value.trim();
  var allS=[];
  HOSTELS.forEach(function(h){
    dbGet(hk(h.id,"staff")).forEach(function(s){if(s.status!=="inactive")allS.push({...s,hid:h.id,hname:h.name});});
  });
  var matched=allS.find(function(s){return (s.username||s.name)===u&&(s.password||s.cnic||s.name)===p;});
  if(matched){
    currentUser={role:"staff",name:matched.name,hid:matched.hid,hname:matched.hname};
    resetSession();showPortalView();
  }else mToast("Invalid staff credentials","err");
}
function loginHEQ(tid,pass){
  var allT=[];
  HOSTELS.forEach(function(h){
    dbGet(hk(h.id,"tenants")).forEach(function(t){if(t.status==="active")allT.push({...t,hid:h.id,hname:h.name});});
  });
  var matched=allT.find(function(t){return t.tid===tid&&(t.cnic||t.tid)===pass;});
  if(matched){
    currentUser={role:"hostelite",name:matched.name,tid:matched.tid,hid:matched.hid,hname:matched.hname};
    resetSession();showPortalView();
  }
}

function logout(){
  currentUser=null;
  clearTimeout(sessionTimer);
  sessionStorage.removeItem("lbh_cu");
  var lw=document.getElementById("l-wrap");if(lw)lw.style.display="block";
  var pw=document.getElementById("p-wrap");if(pw)pw.style.display="none";
  mTab="dashboard";
  showPage("home");
}

function showPortalView(){
  if(!currentUser)return;
  sessionStorage.setItem("lbh_cu",JSON.stringify(currentUser));
  showPage("portal");
  var lw=document.getElementById("l-wrap");if(lw)lw.style.display="none";
  var pw=document.getElementById("p-wrap");if(pw)pw.style.display="block";
  var topbar=document.getElementById("p-topbar");
  if(topbar)topbar.innerHTML=buildTopbar();
  var mc=document.getElementById("p-main-content");
  if(mc){
    if(currentUser.role==="manager")renderMDash();
    else if(currentUser.role==="admin")renderAdmin();
    else if(currentUser.role==="finance")renderFinance("overview");
    else if(currentUser.role==="hostelite")renderHostelite();
    else if(currentUser.role==="staff")renderStaff();
  }
}

function buildTopbar(){
  var roleColors={admin:"#E8B84B",manager:"#4A9EFF",finance:"#3DD68C",hostelite:"#C084FC",staff:"#FB923C"};
  var roleIcons={admin:"⚙️",manager:"🏠",finance:"💰",hostelite:"🛏️",staff:"👷"};
  var hname=currentUser.hostelName||currentUser.hname||"";
  return '<div style="display:flex;align-items:center;gap:10px;flex:1">'+
    '<div style="display:flex;flex-direction:column">'+
      '<div style="font-size:.78rem;font-weight:700;color:'+(roleColors[currentUser.role]||"#E8B84B")+'">'+
        (roleIcons[currentUser.role]||"")+'  '+(currentUser.role.toUpperCase())+'</div>'+
      (hname?'<div style="font-size:.7rem;color:#6B7A99">'+hname+'</div>':'')+
    '</div>'+
    '<div class="gsearch-wrap" style="display:none"><span class="gsearch-icon">🔍</span><input class="gsearch" placeholder="Search..." oninput="portalSearch(this.value)"><div class="gsearch-results" id="gsearch-results"></div></div>'+
  '</div>'+
  '<div style="display:flex;align-items:center;gap:8px;flex-shrink:0;position:relative">'+
    '<span style="font-size:.83rem;color:#8A99B0">'+currentUser.name+'</span>'+
    '<button class="notif-bell" id="notif-bell" onclick="toggleNotifPanel()">🔔<span class="notif-count" style="display:none">0</span></button>'+
    '<div class="notif-panel" id="notif-panel"></div>'+
    '<button class="mb mb-out mb-sm" onclick="logout()">Logout</button>'+
  '</div>';
}

// ── MANAGER PORTAL ──
var MGR_TABS=[
  {id:"dashboard",icon:"📊",label:"Dashboard"},
  {id:"tenants",icon:"👥",label:"Tenants"},
  {id:"rooms",icon:"🚪",label:"Rooms"},
  {id:"payments",icon:"💳",label:"Payments"},
  {id:"ledger",icon:"📒",label:"Ledger"},
  {id:"maintenance",icon:"🔧",label:"Maintenance"},
  {id:"notices",icon:"📋",label:"Notices"},
  {id:"documents",icon:"📄",label:"Documents"},
  {id:"staff",icon:"👷",label:"Staff"},
  {id:"expenses",icon:"💰",label:"Expenses"},
  {id:"bills",icon:"📃",label:"Bills"},
  {id:"visitors",icon:"🚪",label:"Visitors"},
  {id:"attendance",icon:"📅",label:"Attendance"},
  {id:"settings",icon:"⚙️",label:"Settings"}
];
function renderMDash(){
  mTab="dashboard";
  var mc=document.getElementById("p-main-content");if(!mc)return;
  var hid=currentUser.hid;
  var h=HOSTELS.find(function(x){return x.id===hid;});
  var tenants=dbGet(hk(hid,"tenants")).filter(function(t){return t.status==="active";});
  var rooms=dbGet(hk(hid,"rooms"));
  var pays=dbGet(hk(hid,"pays"));
  var curPays=pays.filter(function(p){return p.month===curM();});
  var paid=curPays.filter(function(p){return p.status==="paid";});
  var totalRent=paid.reduce(function(s,p){return s+p.amount;},0);
  var issues=dbGet(hk(hid,"maint")).filter(function(i){return i.status!=="resolved";});
  var health=calcHealthScore(hid);
  var healthClass=health>=75?"health-good":health>=50?"health-ok":"health-bad";
  var sidebar='<div class="p-sidebar">'+
    '<div class="p-sidebar-hdr"><h3>'+currentUser.name+'</h3><p>'+(h?h.name:"Hostel")+'</p></div>'+
    '<div class="sb-section">'+
    MGR_TABS.map(function(t){
      return '<div class="sb-item'+(t.id===mTab?" active":"")+'" onclick="switchMTab(\''+t.id+'\')">'+
        '<span class="sb-icon">'+t.icon+'</span><span>'+t.label+'</span>'+
        (t.id==="maintenance"&&issues.length?'<span class="sb-badge">'+issues.length+'</span>':'')+
      '</div>';
    }).join('')+'</div></div>';
  mc.innerHTML='<div class="p-layout" id="m-layout">'+sidebar+
    '<div class="p-main" id="m-panel">'+
    '<div class="m-stats">'+
      statCard("Total Tenants",tenants.length,"👥","#4A9EFF")+
      statCard("Beds Free",(rooms.reduce(function(s,r){return s+r.cap;},0)-tenants.length),"🛏","#3DD68C")+
      statCard("Paid This Month",paid.length+"/"+tenants.length,"💳","#E8B84B")+
      statCard("Revenue","\u20A8"+fmt(totalRent),"💰","#FB923C")+
      statCard("Open Issues",issues.length,"🔧",issues.length>0?"#FF5C5C":"#3DD68C")+
    '</div>'+
    '<div style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:.82rem;color:var(--muted)">Hostel Health Score</span><span style="font-family:var(--mono);font-weight:700;color:var(--text)">'+health+'/100</span></div><div class="health-bar"><div class="health-fill '+healthClass+'" style="width:'+health+'%"></div></div></div>'+
    '<div class="dash-grid">'+
      '<div class="dc"><div class="dc-title">Quick Actions</div>'+
        '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px">'+
          '<button class="mb mb-gold mb-sm" onclick="switchMTab(\'tenants\');setTimeout(function(){openMAddTenant();},300)">+ Add Tenant</button>'+
          '<button class="mb mb-out mb-sm" onclick="switchMTab(\'payments\')">Record Payment</button>'+
          '<button class="mb mb-out mb-sm" onclick="switchMTab(\'maintenance\')">Log Issue</button>'+
          '<button class="mb mb-out mb-sm" onclick="switchMTab(\'notices\')">Post Notice</button>'+
        '</div>'+
      '</div>'+
      '<div class="dc"><div class="dc-title">Unpaid This Month</div>'+
        tenants.filter(function(t){return !paid.find(function(p){return p.tid===t.tid;});}).slice(0,5).map(function(t){
          return '<div class="oi"><span>'+t.name+' <span style="font-size:.7rem;color:var(--muted)">'+t.room+'</span></span><span class="badge br">Unpaid</span></div>';
        }).join("")||'<div class="oi" style="justify-content:center;color:var(--muted)">All tenants paid ✅</div>'+
      '</div>'+
    '</div>'+
    '</div></div>'+
    '<div id="m-toast" class="m-toast"></div>';
}

function statCard(lbl,val,icon,color){
  return '<div class="stat-card" style="--accent:'+color+'"><div class="slabel">'+lbl+'</div><div class="sval">'+val+'</div><div class="ssub">'+icon+'</div></div>';
}

function switchMTab(tab){
  mTab=tab;
  var fns={
    dashboard:renderMDash,
    tenants:renderMTenants,
    rooms:renderMRooms,
    payments:renderMPayments,
    ledger:renderMLedger,
    maintenance:renderMMaint,
    notices:renderMNotices,
    documents:renderMDocs,
    staff:renderMStaff,
    expenses:renderMExpenses,
    bills:renderMBills,
    visitors:renderMVisitors,
    attendance:renderMAttendance,
    settings:renderMSettings
  };
  if(fns[tab])fns[tab]();
  document.querySelectorAll(".sb-item").forEach(function(el){
    el.classList.remove("active");
    if(el.getAttribute("onclick")==="switchMTab('"+tab+"')")el.classList.add("active");
  });
}

// TENANTS TAB
function renderMTenants(){
  mTab="tenants";
  var hid=currentUser.hid;
  var tenants=dbGet(hk(hid,"tenants"));
  var rooms=dbGet(hk(hid,"rooms"));
  var panel=document.getElementById("m-panel");if(!panel)return;
  panel.innerHTML=
    '<div class="sec-header">'+
      '<div class="sec-title">Tenants ('+tenants.filter(function(t){return t.status==="active";}).length+' active)</div>'+
      '<button class="mb mb-gold mb-sm" onclick="openMAddTenant()">+ Add Tenant</button>'+
    '</div>'+
    '<div class="filter-bar">'+
      '<input class="mfi fi-search" type="text" placeholder="Search by name, TID, room..." oninput="filterMTenants(this.value)" id="tenant-search">'+
      '<select class="mfi" onchange="filterMTenants(document.getElementById(\'tenant-search\').value)" id="tenant-status-f">'+
        '<option value="all">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option>'+
      '</select>'+
    '</div>'+
    '<div class="tw"><table><thead><tr>'+
      '<th>TID</th><th>Name</th><th>CNIC</th><th>Room</th><th>Rent</th><th>Move In</th><th>Status</th><th>Actions</th>'+
    '</tr></thead><tbody id="tenant-tbody">'+
    renderTenantRows(tenants)+'</tbody></table></div>'+
    '<div id="mm-addtenant" class="mm-ov"><div class="mm-modal" style="max-width:560px">'+
      '<div class="mm-hdr"><div class="mm-title">Add Tenant</div><div class="mm-sub">Register a new tenant</div><button class="mm-x" onclick="closeMMModal(\'mm-addtenant\')">✕</button></div>'+
      '<div class="mm-body">'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Full Name *</label><input class="mfi" id="at-name" placeholder="Muhammad Ali"></div>'+
        '<div class="mfg"><label class="mfl">CNIC *</label><input class="mfi" id="at-cnic" placeholder="35202-XXXXXXX-X"></div></div>'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Phone *</label><input class="mfi" id="at-phone" placeholder="+92 300..."></div>'+
        '<div class="mfg"><label class="mfl">Father Name</label><input class="mfi" id="at-father" placeholder="Father name"></div></div>'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Room *</label>'+
          '<select class="mfi" id="at-room">'+rooms.map(function(r){return '<option value="'+r.num+'">'+r.num+' ('+r.cap+'-bed)</option>';}).join("")+'</select>'+
        '</div>'+
        '<div class="mfg"><label class="mfl">Rent (Rs) *</label><input class="mfi" id="at-rent" type="number" placeholder="6500"></div></div>'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Move-In Date</label><input class="mfi" id="at-movein" type="date" value="'+today()+'"></div>'+
        '<div class="mfg"><label class="mfl">Emergency Contact</label><input class="mfi" id="at-emrg" placeholder="+92 ..."></div></div>'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Profession</label><input class="mfi" id="at-prof" placeholder="Student/Professional"></div>'+
        '<div class="mfg"><label class="mfl">University/Company</label><input class="mfi" id="at-org" placeholder="University/Company"></div></div>'+
        '<div class="mfg" style="margin-bottom:10px"><label class="mfl">Notes</label><textarea class="mfi" id="at-notes" placeholder="Any notes..."></textarea></div>'+
      '</div>'+
      '<div class="mm-foot"><button class="mb mb-out" onclick="closeMMModal(\'mm-addtenant\')">Cancel</button><button class="mb mb-gold" onclick="saveTenant()">Save Tenant</button></div>'+
    '</div></div>';
}

function renderTenantRows(tenants,q,sf){
  var list=tenants;
  if(q)list=list.filter(function(t){var s=(t.name+t.tid+(t.room||"")).toLowerCase();return s.includes(q.toLowerCase());});
  if(sf&&sf!=="all")list=list.filter(function(t){return t.status===sf;});
  if(!list.length)return '<tr><td colspan="8" style="text-align:center;color:var(--muted);padding:24px">No tenants found</td></tr>';
  return list.map(function(t){
    return '<tr>'+
      '<td><span class="m-tid">'+t.tid+'</span></td>'+
      '<td>'+t.name+'</td>'+
      '<td style="font-size:.75rem;color:var(--muted)">'+t.cnic+'</td>'+
      '<td>'+t.room+'</td>'+
      '<td>Rs. '+fmt(t.rent)+'</td>'+
      '<td>'+fdate(t.movein)+'</td>'+
      '<td><span class="badge '+(t.status==="active"?"bg":"bmuted")+'">'+t.status+'</span></td>'+
      '<td><div style="display:flex;gap:4px">'+
        '<button class="mb mb-blue mb-sm" onclick="viewTenant(\''+t.tid+'\')">View</button>'+
        '<button class="mb mb-out mb-sm" onclick="editTenant(\''+t.tid+'\')">Edit</button>'+
        '<button class="mb mb-red mb-sm" onclick="deactivateTenant(\''+t.tid+'\')">Move Out</button>'+
      '</div></td>'+
    '</tr>';
  }).join("");
}

function filterMTenants(q){
  var sf=document.getElementById("tenant-status-f")?document.getElementById("tenant-status-f").value:"all";
  var tbody=document.getElementById("tenant-tbody");if(!tbody)return;
  tbody.innerHTML=renderTenantRows(dbGet(hk(currentUser.hid,"tenants")),q,sf);
}

function openMAddTenant(){
  var mo=document.getElementById("mm-addtenant");if(mo)mo.classList.add("open");
}
function closeMMModal(id){var el=document.getElementById(id);if(el)el.classList.remove("open");}

function saveTenant(){
  var name=document.getElementById("at-name").value.trim();
  var cnic=document.getElementById("at-cnic").value.trim();
  var phone=document.getElementById("at-phone").value.trim();
  if(!name||!cnic||!phone){mToast("Name, CNIC and phone required","err");return;}
  var hid=currentUser.hid;
  var tenants=dbGet(hk(hid,"tenants"));
  var t={
    tid:nextTid(hid),name:name,cnic:cnic,phone:phone,
    father:document.getElementById("at-father").value.trim(),
    room:document.getElementById("at-room").value,
    rent:parseInt(document.getElementById("at-rent").value)||6500,
    movein:document.getElementById("at-movein").value||today(),
    emrg:document.getElementById("at-emrg").value.trim(),
    prof:document.getElementById("at-prof").value.trim(),
    org:document.getElementById("at-org").value.trim(),
    notes:document.getElementById("at-notes").value.trim(),
    status:"active",addedOn:today()
  };
  tenants.push(t);
  dbSet(hk(hid,"tenants"),tenants);
  mToast("Tenant "+t.name+" added ("+t.tid+")","ok");
  addNotif("New tenant added: "+t.name+" ("+t.tid+")","manager");
  closeMMModal("mm-addtenant");
  renderMTenants();
}

function viewTenant(tid){
  var hid=currentUser.hid;
  var t=dbGet(hk(hid,"tenants")).find(function(x){return x.tid===tid;});
  if(!t)return;
  var pays=dbGet(hk(hid,"pays")).filter(function(p){return p.tid===tid;});
  var totalPaid=pays.reduce(function(s,p){return s+(p.status==="paid"?p.amount:0);},0);
  var panel=document.getElementById("m-panel");if(!panel)return;
  panel.innerHTML='<div style="margin-bottom:16px"><button class="mb mb-out mb-sm" onclick="renderMTenants()">← Back</button></div>'+
    '<div class="dc" style="margin-bottom:16px">'+
      '<div class="dc-title">Tenant Details — '+t.tid+'</div>'+
      '<div class="mvt-g">'+
        mFld("Full Name",t.name)+mFld("CNIC",t.cnic)+mFld("Phone",t.phone)+
        mFld("Room",t.room)+mFld("Rent","Rs. "+fmt(t.rent))+mFld("Move-In",fdate(t.movein))+
        mFld("Father",t.father)+mFld("Emergency",t.emrg)+mFld("Status",'<span class="badge '+(t.status==="active"?"bg":"bmuted")+'">'+t.status+'</span>')+
        mFld("Profession",t.prof)+mFld("Organization",t.org)+mFld("Added",fdate(t.addedOn))+
      '</div>'+
      (t.notes?'<div class="m-notes">'+t.notes+'</div>':'')+
      '<div style="display:flex;gap:8px;margin-top:12px">'+
        '<button class="mb mb-gold mb-sm" onclick="switchMTab(\'payments\')">Record Payment</button>'+
        '<button class="mb mb-out mb-sm" onclick="editTenant(\''+tid+'\')">Edit Tenant</button>'+
        '<button class="mb mb-red mb-sm" onclick="deactivateTenant(\''+tid+'\')">Move Out</button>'+
      '</div>'+
    '</div>'+
    '<div class="dc"><div class="dc-title">Payment History (Rs. '+fmt(totalPaid)+' total paid)</div>'+
      (pays.length?'<div class="tw"><table><thead><tr><th>Month</th><th>Amount</th><th>Type</th><th>Status</th><th>Date</th></tr></thead><tbody>'+
        pays.slice().reverse().map(function(p){return '<tr><td>'+mlabel(p.month)+'</td><td>Rs. '+fmt(p.amount)+'</td><td><span class="badge '+(PBDGS[p.type]||"bgold")+'">'+p.type+'</span></td><td><span class="badge '+(p.status==="paid"?"bg":"br")+'">'+p.status+'</span></td><td>'+fdate(p.date)+'</td></tr>';}).join("")+'</tbody></table></div>':
      '<div style="text-align:center;color:var(--muted);padding:16px;font-size:.82rem">No payment history</div>')+
    '</div>';
}

function editTenant(tid){
  var hid=currentUser.hid;
  var tenants=dbGet(hk(hid,"tenants"));
  var t=tenants.find(function(x){return x.tid===tid;});
  if(!t)return;
  var rooms=dbGet(hk(hid,"rooms"));
  var panel=document.getElementById("m-panel");if(!panel)return;
  panel.innerHTML='<div style="margin-bottom:16px"><button class="mb mb-out mb-sm" onclick="renderMTenants()">← Back</button></div>'+
    '<div class="dc"><div class="dc-title">Edit Tenant — '+tid+'</div>'+
      '<div class="mfr"><div class="mfg"><label class="mfl">Full Name</label><input class="mfi" id="et-name" value="'+t.name+'"></div>'+
      '<div class="mfg"><label class="mfl">CNIC</label><input class="mfi" id="et-cnic" value="'+t.cnic+'"></div></div>'+
      '<div class="mfr"><div class="mfg"><label class="mfl">Phone</label><input class="mfi" id="et-phone" value="'+t.phone+'"></div>'+
      '<div class="mfg"><label class="mfl">Father Name</label><input class="mfi" id="et-father" value="'+(t.father||"")+'"></div></div>'+
      '<div class="mfr"><div class="mfg"><label class="mfl">Room</label>'+
        '<select class="mfi" id="et-room">'+rooms.map(function(r){return '<option value="'+r.num+'"'+(r.num===t.room?" selected":"")+'>'+r.num+'</option>';}).join("")+'</select>'+
      '</div>'+
      '<div class="mfg"><label class="mfl">Rent (Rs)</label><input class="mfi" id="et-rent" type="number" value="'+t.rent+'"></div></div>'+
      '<div class="mfr"><div class="mfg"><label class="mfl">Move-In</label><input class="mfi" id="et-movein" type="date" value="'+(t.movein||"")+'"></div>'+
      '<div class="mfg"><label class="mfl">Status</label><select class="mfi" id="et-status"><option value="active"'+(t.status==="active"?" selected":"")+'>Active</option><option value="inactive"'+(t.status!=="active"?" selected":"")+'>Inactive</option></select></div></div>'+
      '<div class="mfg" style="margin-bottom:12px"><label class="mfl">Notes</label><textarea class="mfi" id="et-notes">'+(t.notes||"")+'</textarea></div>'+
      '<div style="display:flex;gap:8px"><button class="mb mb-gold" onclick="saveEditTenant(\''+tid+'\')">Save Changes</button><button class="mb mb-out" onclick="renderMTenants()">Cancel</button></div>'+
    '</div>';
}

function saveEditTenant(tid){
  var hid=currentUser.hid;
  var tenants=dbGet(hk(hid,"tenants"));
  var idx=tenants.findIndex(function(t){return t.tid===tid;});
  if(idx===-1)return;
  tenants[idx].name=document.getElementById("et-name").value.trim();
  tenants[idx].cnic=document.getElementById("et-cnic").value.trim();
  tenants[idx].phone=document.getElementById("et-phone").value.trim();
  tenants[idx].father=document.getElementById("et-father").value.trim();
  tenants[idx].room=document.getElementById("et-room").value;
  tenants[idx].rent=parseInt(document.getElementById("et-rent").value)||tenants[idx].rent;
  tenants[idx].movein=document.getElementById("et-movein").value;
  tenants[idx].status=document.getElementById("et-status").value;
  tenants[idx].notes=document.getElementById("et-notes").value.trim();
  dbSet(hk(hid,"tenants"),tenants);
  mToast("Tenant updated","ok");
  renderMTenants();
}

function deactivateTenant(tid){
  if(!confirm("Move out tenant "+tid+"? This will mark them inactive."))return;
  var hid=currentUser.hid;
  var tenants=dbGet(hk(hid,"tenants"));
  var t=tenants.find(function(x){return x.tid===tid;});
  if(t){t.status="inactive";t.moveout=today();}
  dbSet(hk(hid,"tenants"),tenants);
  mToast("Tenant moved out","ok");
  renderMTenants();
}

// ── ROOMS TAB ──
function renderMRooms(){
  mTab="rooms";
  var hid=currentUser.hid;
  var rooms=dbGet(hk(hid,"rooms"));
  var tenants=dbGet(hk(hid,"tenants")).filter(function(t){return t.status==="active";});
  var panel=document.getElementById("m-panel");if(!panel)return;
  var totalBeds=rooms.reduce(function(s,r){return s+r.cap;},0);
  var occupied=tenants.length;
  panel.innerHTML='<div class="sec-header"><div class="sec-title">Rooms ('+rooms.length+' rooms, '+occupied+"/"+totalBeds+' beds occupied)</div></div>'+
    '<div class="rooms-grid">'+rooms.map(function(r){
      var roomTenants=tenants.filter(function(t){return t.room===r.num;});
      var cls=roomTenants.length===0?"vacant":roomTenants.length>=r.cap?"occupied":"partial";
      return '<div class="room-tile '+cls+'">'+
        '<div class="rt-num">'+r.num+'</div>'+
        '<div class="rt-type">'+r.cap+'-Bed Room</div>'+
        '<div class="rt-beds">'+Array.from({length:r.cap}).map(function(_,i){return '<div class="bed-dot'+(i<roomTenants.length?" filled":"")+'"></div>';}).join("")+'</div>'+
        '<div style="font-size:.72rem;color:var(--muted);margin-bottom:4px">'+roomTenants.length+"/"+r.cap+' beds</div>'+
        (roomTenants.length?'<div class="rt-names">'+roomTenants.map(function(t){return t.name.split(" ")[0];}).join(", ")+'</div>':
          '<div style="font-size:.72rem;color:var(--muted)">Vacant</div>')+
      '</div>';
    }).join("")+'</div>';
}

// ── PAYMENTS TAB ──
function renderMPayments(){
  mTab="payments";
  var hid=currentUser.hid;
  var tenants=dbGet(hk(hid,"tenants")).filter(function(t){return t.status==="active";});
  var pays=dbGet(hk(hid,"pays"));
  var m=curM();
  var curPays=pays.filter(function(p){return p.month===m;});
  var paid=new Set(curPays.filter(function(p){return p.status==="paid";}).map(function(p){return p.tid;}));
  var panel=document.getElementById("m-panel");if(!panel)return;
  panel.innerHTML='<div class="sec-header"><div class="sec-title">Payments — '+mlabel(m)+'</div><button class="mb mb-gold mb-sm" onclick="openPayModal()">+ Record Payment</button></div>'+
    '<div class="tw"><table><thead><tr><th>TID</th><th>Tenant</th><th>Room</th><th>Rent</th><th>Status</th><th>Actions</th></tr></thead><tbody>'+
    tenants.map(function(t){
      var isPaid=paid.has(t.tid);
      return '<tr><td><span class="m-tid">'+t.tid+'</span></td><td>'+t.name+'</td><td>'+t.room+'</td>'+
        '<td>Rs. '+fmt(t.rent)+'</td>'+
        '<td><span class="badge '+(isPaid?"bg":"br")+'">'+(isPaid?"Paid":"Pending")+'</span></td>'+
        '<td>'+(isPaid?'<span style="color:var(--muted);font-size:.76rem">✅ Paid</span>':'<button class="mb mb-gold mb-sm" onclick="quickPay(\''+t.tid+'\',\''+t.name+'\','+t.rent+')">Record Pay</button>')+
        '</td></tr>';
    }).join("")+'</tbody></table></div>'+
    '<div id="mm-pay" class="mm-ov"><div class="mm-modal" style="max-width:500px">'+
      '<div class="mm-hdr"><div class="mm-title">Record Payment</div><button class="mm-x" onclick="closeMMModal(\'mm-pay\')">✕</button></div>'+
      '<div class="mm-body">'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Tenant</label>'+
          '<select class="mfi" id="pay-tid">'+tenants.map(function(t){return '<option value="'+t.tid+'">'+t.tid+' — '+t.name+'</option>';}).join("")+'</select>'+
        '</div><div class="mfg"><label class="mfl">Month</label><input class="mfi" id="pay-month" type="month" value="'+m+'"></div></div>'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Amount (Rs)</label><input class="mfi" id="pay-amount" type="number"></div>'+
        '<div class="mfg"><label class="mfl">Type</label><select class="mfi" id="pay-type">'+Object.keys(PLBLS).map(function(k){return '<option value="'+k+'">'+PLBLS[k]+'</option>';}).join("")+'</select></div></div>'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Date Received</label><input class="mfi" id="pay-date" type="date" value="'+today()+'"></div>'+
        '<div class="mfg"><label class="mfl">Mode</label><select class="mfi" id="pay-mode"><option>Cash</option><option>Bank Transfer</option><option>JazzCash</option><option>Easypaisa</option></select></div></div>'+
        '<div class="mfg" style="margin-bottom:10px"><label class="mfl">Notes</label><textarea class="mfi" id="pay-notes" placeholder="Optional notes..."></textarea></div>'+
      '</div>'+
      '<div class="mm-foot"><button class="mb mb-out" onclick="closeMMModal(\'mm-pay\')">Cancel</button><button class="mb mb-gold" onclick="savePayment()">Save</button></div>'+
    '</div></div>';
}

function openPayModal(){var mo=document.getElementById("mm-pay");if(mo)mo.classList.add("open");}
function quickPay(tid,name,rent){
  var mo=document.getElementById("mm-pay");
  if(!mo){renderMPayments();setTimeout(function(){quickPay(tid,name,rent);},200);return;}
  var sel=document.getElementById("pay-tid");if(sel)sel.value=tid;
  var amt=document.getElementById("pay-amount");if(amt)amt.value=rent;
  mo.classList.add("open");
}
function savePayment(){
  var hid=currentUser.hid;
  var tid=document.getElementById("pay-tid").value;
  var month=document.getElementById("pay-month").value;
  var amount=parseInt(document.getElementById("pay-amount").value);
  var type=document.getElementById("pay-type").value;
  var date=document.getElementById("pay-date").value||today();
  var mode=document.getElementById("pay-mode").value;
  var notes=document.getElementById("pay-notes").value.trim();
  if(!tid||!month||!amount){mToast("Fill required fields","err");return;}
  var pays=dbGet(hk(hid,"pays"));
  pays.push({id:dbId(),tid:tid,month:month,amount:amount,type:type,date:date,mode:mode,notes:notes,status:"paid",addedBy:currentUser.name,addedOn:today()});
  dbSet(hk(hid,"pays"),pays);
  mToast("Payment saved","ok");
  addNotif("Payment recorded: "+tid+" — Rs. "+fmt(amount),"manager");
  closeMMModal("mm-pay");
  renderMPayments();
}

// ── LEDGER TAB ──
function renderMLedger(){
  mTab="ledger";
  var hid=currentUser.hid;
  var tenants=dbGet(hk(hid,"tenants")).filter(function(t){return t.status==="active";});
  var pays=dbGet(hk(hid,"pays"));
  var m=curM();
  var totalExpected=tenants.reduce(function(s,t){return s+t.rent;},0);
  var paidPays=pays.filter(function(p){return p.month===m&&p.status==="paid";});
  var totalCollected=paidPays.reduce(function(s,p){return s+p.amount;},0);
  var outstanding=totalExpected-totalCollected;
  var panel=document.getElementById("m-panel");if(!panel)return;
  panel.innerHTML='<div class="sec-header"><div class="sec-title">Ledger — '+mlabel(m)+'</div>'+
    '<div style="display:flex;gap:8px"><input class="mfi" type="month" value="'+m+'" onchange="renderMLedgerM(this.value)" style="width:160px">'+
    '<button class="mb mb-out mb-sm" onclick="exportLedger()">📥 Export</button></div></div>'+
    '<div class="ledger-cards">'+
      statCard("Expected","Rs. "+fmt(totalExpected),"📋","#E8B84B")+
      statCard("Collected","Rs. "+fmt(totalCollected),"✅","#3DD68C")+
      statCard("Outstanding","Rs. "+fmt(Math.max(0,outstanding)),"⚠️",outstanding>0?"#FF5C5C":"#3DD68C")+
      statCard("Collection Rate",Math.round(totalExpected?totalCollected/totalExpected*100:100)+"%","📊","#4A9EFF")+
    '</div>'+
    '<div class="tw"><table><thead><tr><th>TID</th><th>Tenant</th><th>Room</th><th>Expected</th><th>Paid</th><th>Difference</th><th>Status</th></tr></thead><tbody>'+
    tenants.map(function(t){
      var tPaid=paidPays.filter(function(p){return p.tid===t.tid;}).reduce(function(s,p){return s+p.amount;},0);
      var diff=tPaid-t.rent;
      return '<tr><td><span class="m-tid">'+t.tid+'</span></td><td>'+t.name+'</td><td>'+t.room+'</td>'+
        '<td>Rs. '+fmt(t.rent)+'</td><td>Rs. '+fmt(tPaid)+'</td>'+
        '<td style="color:'+(diff>=0?"var(--p-green)":"var(--p-red)")+'">'+(diff>=0?"+":"")+'Rs. '+fmt(diff)+'</td>'+
        '<td><span class="badge '+(tPaid>=t.rent?"bg":tPaid>0?"bo":"br")+'">'+(tPaid>=t.rent?"Paid":tPaid>0?"Partial":"Pending")+'</span></td>'+
      '</tr>';
    }).join("")+'</tbody></table></div>';
}

function renderMLedgerM(m){
  mTab="ledger";var hid=currentUser.hid;
  var tenants=dbGet(hk(hid,"tenants")).filter(function(t){return t.status==="active";});
  var pays=dbGet(hk(hid,"pays")).filter(function(p){return p.month===m&&p.status==="paid";});
  var tbody=document.querySelector(".tw table tbody");if(!tbody)return;
  tbody.innerHTML=tenants.map(function(t){
    var tPaid=pays.filter(function(p){return p.tid===t.tid;}).reduce(function(s,p){return s+p.amount;},0);
    var diff=tPaid-t.rent;
    return '<tr><td><span class="m-tid">'+t.tid+'</span></td><td>'+t.name+'</td><td>'+t.room+'</td>'+
      '<td>Rs. '+fmt(t.rent)+'</td><td>Rs. '+fmt(tPaid)+'</td>'+
      '<td style="color:'+(diff>=0?"var(--p-green)":"var(--p-red)")+'">'+(diff>=0?"+":"")+'Rs. '+fmt(diff)+'</td>'+
      '<td><span class="badge '+(tPaid>=t.rent?"bg":tPaid>0?"bo":"br")+'">'+(tPaid>=t.rent?"Paid":tPaid>0?"Partial":"Pending")+'</span></td>'+
    '</tr>';
  }).join("");
}

function exportLedger(){
  var hid=currentUser.hid;
  var tenants=dbGet(hk(hid,"tenants")).filter(function(t){return t.status==="active";});
  var pays=dbGet(hk(hid,"pays")).filter(function(p){return p.month===curM()&&p.status==="paid";});
  var rows=[["TID","Name","Room","Expected","Paid","Status"]];
  tenants.forEach(function(t){
    var tPaid=pays.filter(function(p){return p.tid===t.tid;}).reduce(function(s,p){return s+p.amount;},0);
    rows.push([t.tid,t.name,t.room,t.rent,tPaid,tPaid>=t.rent?"Paid":tPaid>0?"Partial":"Pending"]);
  });
  var csv=rows.map(function(r){return r.join(",");}).join("\n");
  var blob=new Blob([csv],{type:"text/csv"});
  var url=URL.createObjectURL(blob);
  var a=document.createElement("a");a.href=url;a.download="ledger_"+curM()+".csv";a.click();
  URL.revokeObjectURL(url);
  mToast("Ledger exported","ok");
}

// ── MAINTENANCE TAB ──
function renderMMaint(){
  mTab="maintenance";
  var hid=currentUser.hid;
  var issues=dbGet(hk(hid,"maint"));
  var panel=document.getElementById("m-panel");if(!panel)return;
  panel.innerHTML='<div class="sec-header"><div class="sec-title">Maintenance ('+issues.filter(function(i){return i.status!=="resolved";}).length+' open)</div>'+
    '<button class="mb mb-gold mb-sm" onclick="openMaintModal()">+ Log Issue</button></div>'+
    (issues.length?'<div class="tw"><table><thead><tr><th>ID</th><th>Title</th><th>Category</th><th>Priority</th><th>Status</th><th>Reported</th><th>Actions</th></tr></thead><tbody>'+
    issues.slice().reverse().map(function(i){
      return '<tr><td><span class="m-tid">'+i.id.slice(-6)+'</span></td><td>'+i.title+'</td>'+
        '<td>'+i.cat+'</td>'+
        '<td><span class="badge '+(i.priority==="high"?"br":i.priority==="medium"?"bo":"bg")+'">'+i.priority+'</span></td>'+
        '<td><span class="badge '+(i.status==="resolved"?"bg":i.status==="in-progress"?"bb":"br")+'">'+i.status+'</span></td>'+
        '<td>'+fdate(i.date)+'</td>'+
        '<td><button class="mb mb-grn mb-sm" onclick="resolveMaint(\''+i.id+'\')">Resolve</button></td>'+
      '</tr>';
    }).join("")+'</tbody></table></div>':
    '<div class="hint-box">No maintenance issues logged.</div>')+
    '<div id="mm-maint" class="mm-ov"><div class="mm-modal" style="max-width:460px">'+
      '<div class="mm-hdr"><div class="mm-title">Log Maintenance Issue</div><button class="mm-x" onclick="closeMMModal(\'mm-maint\')">✕</button></div>'+
      '<div class="mm-body">'+
        '<div class="mfg" style="margin-bottom:10px"><label class="mfl">Title *</label><input class="mfi" id="mi-title" placeholder="e.g. Bathroom tap leaking"></div>'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Category</label><select class="mfi" id="mi-cat"><option>Plumbing</option><option>Electrical</option><option>Carpentry</option><option>Cleaning</option><option>Other</option></select></div>'+
        '<div class="mfg"><label class="mfl">Priority</label><select class="mfi" id="mi-pri"><option value="low">Low</option><option value="medium" selected>Medium</option><option value="high">High</option></select></div></div>'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Room/Location</label><input class="mfi" id="mi-room" placeholder="R01 / Common Area"></div>'+
        '<div class="mfg"><label class="mfl">Date</label><input class="mfi" id="mi-date" type="date" value="'+today()+'"></div></div>'+
        '<div class="mfg" style="margin-bottom:10px"><label class="mfl">Description</label><textarea class="mfi" id="mi-desc" placeholder="Details..."></textarea></div>'+
      '</div>'+
      '<div class="mm-foot"><button class="mb mb-out" onclick="closeMMModal(\'mm-maint\')">Cancel</button><button class="mb mb-gold" onclick="saveMaint()">Log Issue</button></div>'+
    '</div></div>';
}

function openMaintModal(){var mo=document.getElementById("mm-maint");if(mo)mo.classList.add("open");}
function saveMaint(){
  var title=document.getElementById("mi-title").value.trim();
  if(!title){mToast("Title required","err");return;}
  var hid=currentUser.hid;
  var issues=dbGet(hk(hid,"maint"));
  issues.push({id:dbId(),title:title,cat:document.getElementById("mi-cat").value,priority:document.getElementById("mi-pri").value,room:document.getElementById("mi-room").value,date:document.getElementById("mi-date").value||today(),desc:document.getElementById("mi-desc").value.trim(),status:"open",addedBy:currentUser.name});
  dbSet(hk(hid,"maint"),issues);
  mToast("Issue logged","ok");
  closeMMModal("mm-maint");
  renderMMaint();
}
function resolveMaint(id){
  var hid=currentUser.hid;
  var issues=dbGet(hk(hid,"maint"));
  var i=issues.find(function(x){return x.id===id;});
  if(i){i.status="resolved";i.resolvedOn=today();}
  dbSet(hk(hid,"maint"),issues);
  mToast("Issue resolved","ok");
  renderMMaint();
}

// ── NOTICES TAB ──
function renderMNotices(){
  mTab="notices";
  var hid=currentUser.hid;
  var notices=dbGet(hk(hid,"notices"));
  var panel=document.getElementById("m-panel");if(!panel)return;
  panel.innerHTML='<div class="sec-header"><div class="sec-title">Notices</div><button class="mb mb-gold mb-sm" onclick="openNoticeModal()">+ Post Notice</button></div>'+
    (notices.length?notices.slice().reverse().map(function(n){
      return '<div class="ncard"><div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">'+
        '<div style="font-weight:600;font-size:.9rem">'+n.title+'</div>'+
        '<span class="badge '+(n.priority==="urgent"?"br":"bgold")+'">'+n.priority+'</span>'+
        '</div><div style="font-size:.82rem;color:var(--muted);margin-bottom:8px">'+fdate(n.date)+'</div>'+
        '<div style="font-size:.84rem;color:var(--text);line-height:1.6">'+n.body+'</div>'+
        '<div style="margin-top:8px"><button class="mb mb-red mb-sm" onclick="deleteNotice(\''+n.id+'\')">Delete</button></div>'+
      '</div>';
    }).join(""):
    '<div class="hint-box">No notices posted.</div>')+
    '<div id="mm-notice" class="mm-ov"><div class="mm-modal" style="max-width:460px">'+
      '<div class="mm-hdr"><div class="mm-title">Post Notice</div><button class="mm-x" onclick="closeMMModal(\'mm-notice\')">✕</button></div>'+
      '<div class="mm-body">'+
        '<div class="mfg" style="margin-bottom:10px"><label class="mfl">Title *</label><input class="mfi" id="nc-title" placeholder="Notice title"></div>'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Priority</label><select class="mfi" id="nc-pri"><option value="normal">Normal</option><option value="urgent">Urgent</option></select></div>'+
        '<div class="mfg"><label class="mfl">Date</label><input class="mfi" id="nc-date" type="date" value="'+today()+'"></div></div>'+
        '<div class="mfg" style="margin-bottom:10px"><label class="mfl">Body *</label><textarea class="mfi" id="nc-body" placeholder="Notice content..."></textarea></div>'+
      '</div>'+
      '<div class="mm-foot"><button class="mb mb-out" onclick="closeMMModal(\'mm-notice\')">Cancel</button><button class="mb mb-gold" onclick="saveNotice()">Post</button></div>'+
    '</div></div>';
}

function openNoticeModal(){var mo=document.getElementById("mm-notice");if(mo)mo.classList.add("open");}
function saveNotice(){
  var title=document.getElementById("nc-title").value.trim();
  var body=document.getElementById("nc-body").value.trim();
  if(!title||!body){mToast("Title and body required","err");return;}
  var hid=currentUser.hid;
  var notices=dbGet(hk(hid,"notices"));
  notices.push({id:dbId(),title:title,body:body,priority:document.getElementById("nc-pri").value,date:document.getElementById("nc-date").value||today(),postedBy:currentUser.name});
  dbSet(hk(hid,"notices"),notices);
  mToast("Notice posted","ok");
  addNotif("New notice: "+title,"hostelite");
  closeMMModal("mm-notice");
  renderMNotices();
}
function deleteNotice(id){
  if(!confirm("Delete this notice?"))return;
  var hid=currentUser.hid;
  var notices=dbGet(hk(hid,"notices")).filter(function(n){return n.id!==id;});
  dbSet(hk(hid,"notices"),notices);
  mToast("Notice deleted","ok");
  renderMNotices();
}

// ── DOCUMENTS TAB ──
function renderMDocs(){
  mTab="documents";
  var hid=currentUser.hid;
  var tenants=dbGet(hk(hid,"tenants")).filter(function(t){return t.status==="active";});
  var docs=dbGetO(hk(hid,"docs"));
  var panel=document.getElementById("m-panel");if(!panel)return;
  panel.innerHTML='<div class="sec-header"><div class="sec-title">Tenant Documents</div></div>'+
    '<div class="hint-box">Documents are stored as references. Upload files and mark which documents are collected.</div>'+
    tenants.map(function(t){
      var tDocs=docs[t.tid]||[];
      return '<div class="mdoc-ten">'+
        '<div class="mdoc-hdr"><div><strong>'+t.name+'</strong> <span class="m-tid" style="margin-left:6px">'+t.tid+'</span></div>'+
          '<button class="mb mb-out mb-sm" onclick="addDocEntry(\''+t.tid+'\')">+ Add Document</button>'+
        '</div>'+
        '<div class="mdoc-files">'+
          (tDocs.length?tDocs.map(function(d){return '<span class="mdoc-chip">📄 '+d.name+' <span style="color:var(--muted);font-size:.65rem">'+fdate(d.date)+'</span></span>';}).join(""):
          '<span style="font-size:.75rem;color:var(--muted)">No documents added</span>')+
        '</div>'+
      '</div>';
    }).join("");
}
function addDocEntry(tid){
  var name=prompt("Document name (e.g. CNIC Copy, Photograph):");
  if(!name)return;
  var hid=currentUser.hid;
  var docs=dbGetO(hk(hid,"docs"));
  if(!docs[tid])docs[tid]=[];
  docs[tid].push({name:name,date:today()});
  dbSetO(hk(hid,"docs"),docs);
  mToast("Document recorded","ok");
  renderMDocs();
}

// ── STAFF TAB ──
function renderMStaff(){
  mTab="staff";
  var hid=currentUser.hid;
  var staff=dbGet(hk(hid,"staff"));
  var panel=document.getElementById("m-panel");if(!panel)return;
  panel.innerHTML='<div class="sec-header"><div class="sec-title">Staff ('+staff.length+')</div>'+
    '<button class="mb mb-gold mb-sm" onclick="openStaffModal()">+ Add Staff</button></div>'+
    (staff.length?'<div class="tw"><table><thead><tr><th>Name</th><th>Role</th><th>Phone</th><th>Salary</th><th>Join Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>'+
    staff.map(function(s){
      return '<tr><td>'+s.name+'</td><td>'+s.role+'</td><td>'+s.phone+'</td><td>Rs. '+fmt(s.salary)+'</td>'+
        '<td>'+fdate(s.joindate)+'</td>'+
        '<td><span class="badge '+(s.status==="active"?"bg":"bmuted")+'">'+s.status+'</span></td>'+
        '<td><button class="mb mb-red mb-sm" onclick="removeStaff(\''+s.id+'\')">Remove</button></td>'+
      '</tr>';
    }).join("")+'</tbody></table></div>':
    '<div class="hint-box">No staff members added.</div>')+
    '<div id="mm-staff" class="mm-ov"><div class="mm-modal" style="max-width:460px">'+
      '<div class="mm-hdr"><div class="mm-title">Add Staff Member</div><button class="mm-x" onclick="closeMMModal(\'mm-staff\')">✕</button></div>'+
      '<div class="mm-body">'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Name *</label><input class="mfi" id="sf-name"></div>'+
        '<div class="mfg"><label class="mfl">Role *</label><select class="mfi" id="sf-role"><option>Guard</option><option>Cleaner</option><option>Cook</option><option>Electrician</option><option>Plumber</option><option>Manager Assistant</option><option>Other</option></select></div></div>'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Phone</label><input class="mfi" id="sf-phone"></div>'+
        '<div class="mfg"><label class="mfl">CNIC</label><input class="mfi" id="sf-cnic"></div></div>'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Salary (Rs)</label><input class="mfi" id="sf-salary" type="number"></div>'+
        '<div class="mfg"><label class="mfl">Join Date</label><input class="mfi" id="sf-join" type="date" value="'+today()+'"></div></div>'+
      '</div>'+
      '<div class="mm-foot"><button class="mb mb-out" onclick="closeMMModal(\'mm-staff\')">Cancel</button><button class="mb mb-gold" onclick="saveStaff()">Add Staff</button></div>'+
    '</div></div>';
}
function openStaffModal(){var mo=document.getElementById("mm-staff");if(mo)mo.classList.add("open");}
function saveStaff(){
  var name=document.getElementById("sf-name").value.trim();
  if(!name){mToast("Name required","err");return;}
  var hid=currentUser.hid;
  var staff=dbGet(hk(hid,"staff"));
  staff.push({id:dbId(),name:name,role:document.getElementById("sf-role").value,phone:document.getElementById("sf-phone").value.trim(),cnic:document.getElementById("sf-cnic").value.trim(),salary:parseInt(document.getElementById("sf-salary").value)||0,joindate:document.getElementById("sf-join").value||today(),status:"active"});
  dbSet(hk(hid,"staff"),staff);
  mToast("Staff added","ok");closeMMModal("mm-staff");renderMStaff();
}
function removeStaff(id){
  if(!confirm("Remove staff member?"))return;
  var hid=currentUser.hid;
  var staff=dbGet(hk(hid,"staff"));
  var idx=staff.findIndex(function(s){return s.id===id;});
  if(idx!==-1){staff[idx].status="inactive";}
  dbSet(hk(hid,"staff"),staff);
  mToast("Staff removed","ok");
  renderMStaff();
}

// ── EXPENSES TAB ──
function renderMExpenses(){
  mTab="expenses";
  var hid=currentUser.hid;
  var expenses=dbGet(hk(hid,"expenses"));
  var total=expenses.reduce(function(s,e){return s+e.amount;},0);
  var panel=document.getElementById("m-panel");if(!panel)return;
  panel.innerHTML='<div class="sec-header"><div class="sec-title">Expenses (Total: Rs. '+fmt(total)+')</div>'+
    '<button class="mb mb-gold mb-sm" onclick="openExpenseModal()">+ Add Expense</button></div>'+
    (expenses.length?'<div class="tw"><table><thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th><th>Actions</th></tr></thead><tbody>'+
    expenses.slice().reverse().map(function(e){
      return '<tr><td>'+fdate(e.date)+'</td><td><span class="badge bgold">'+e.cat+'</span></td>'+
        '<td>'+e.desc+'</td><td>Rs. '+fmt(e.amount)+'</td>'+
        '<td><button class="mb mb-red mb-sm" onclick="deleteExpense(\''+e.id+'\')">Delete</button></td>'+
      '</tr>';
    }).join("")+'</tbody></table></div>':
    '<div class="hint-box">No expenses recorded.</div>')+
    '<div id="mm-expense" class="mm-ov"><div class="mm-modal" style="max-width:420px">'+
      '<div class="mm-hdr"><div class="mm-title">Add Expense</div><button class="mm-x" onclick="closeMMModal(\'mm-expense\')">✕</button></div>'+
      '<div class="mm-body">'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Category</label><select class="mfi" id="ex-cat"><option>Utilities</option><option>Maintenance</option><option>Salary</option><option>Supplies</option><option>Rent</option><option>Other</option></select></div>'+
        '<div class="mfg"><label class="mfl">Amount (Rs) *</label><input class="mfi" id="ex-amt" type="number"></div></div>'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Date</label><input class="mfi" id="ex-date" type="date" value="'+today()+'"></div>'+
        '<div class="mfg"><label class="mfl">Description *</label><input class="mfi" id="ex-desc" placeholder="What was this for?"></div></div>'+
      '</div>'+
      '<div class="mm-foot"><button class="mb mb-out" onclick="closeMMModal(\'mm-expense\')">Cancel</button><button class="mb mb-gold" onclick="saveExpense()">Save</button></div>'+
    '</div></div>';
}
function openExpenseModal(){var mo=document.getElementById("mm-expense");if(mo)mo.classList.add("open");}
function saveExpense(){
  var amt=parseInt(document.getElementById("ex-amt").value);
  var desc=document.getElementById("ex-desc").value.trim();
  if(!amt||!desc){mToast("Amount and description required","err");return;}
  var hid=currentUser.hid;
  var expenses=dbGet(hk(hid,"expenses"));
  expenses.push({id:dbId(),cat:document.getElementById("ex-cat").value,amount:amt,desc:desc,date:document.getElementById("ex-date").value||today(),addedBy:currentUser.name});
  dbSet(hk(hid,"expenses"),expenses);
  mToast("Expense saved","ok");closeMMModal("mm-expense");renderMExpenses();
}
function deleteExpense(id){
  if(!confirm("Delete expense?"))return;
  var hid=currentUser.hid;
  var expenses=dbGet(hk(hid,"expenses")).filter(function(e){return e.id!==id;});
  dbSet(hk(hid,"expenses"),expenses);
  mToast("Deleted","ok");renderMExpenses();
}

// ── BILLS TAB ──
function renderMBills(){
  mTab="bills";
  var hid=currentUser.hid;
  var bills=dbGet(hk(hid,"bills"));
  var panel=document.getElementById("m-panel");if(!panel)return;
  panel.innerHTML='<div class="sec-header"><div class="sec-title">Utility Bills</div>'+
    '<button class="mb mb-gold mb-sm" onclick="openBillModal()">+ Add Bill</button></div>'+
    (bills.length?'<div class="tw"><table><thead><tr><th>Month</th><th>Type</th><th>Amount</th><th>Due Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>'+
    bills.slice().reverse().map(function(b){
      return '<tr><td>'+mlabel(b.month)+'</td><td>'+b.type+'</td><td>Rs. '+fmt(b.amount)+'</td>'+
        '<td>'+fdate(b.due)+'</td>'+
        '<td><span class="badge '+(b.status==="paid"?"bg":"br")+'">'+b.status+'</span></td>'+
        '<td><button class="mb mb-grn mb-sm" onclick="markBillPaid(\''+b.id+'\')">Mark Paid</button></td>'+
      '</tr>';
    }).join("")+'</tbody></table></div>':
    '<div class="hint-box">No bills recorded.</div>')+
    '<div id="mm-bill" class="mm-ov"><div class="mm-modal" style="max-width:420px">'+
      '<div class="mm-hdr"><div class="mm-title">Add Utility Bill</div><button class="mm-x" onclick="closeMMModal(\'mm-bill\')">✕</button></div>'+
      '<div class="mm-body">'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Type</label><select class="mfi" id="bl-type"><option>Electricity</option><option>Gas</option><option>Water</option><option>Internet</option><option>Cable</option></select></div>'+
        '<div class="mfg"><label class="mfl">Month</label><input class="mfi" id="bl-month" type="month" value="'+curM()+'"></div></div>'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Amount (Rs) *</label><input class="mfi" id="bl-amt" type="number"></div>'+
        '<div class="mfg"><label class="mfl">Due Date</label><input class="mfi" id="bl-due" type="date"></div></div>'+
      '</div>'+
      '<div class="mm-foot"><button class="mb mb-out" onclick="closeMMModal(\'mm-bill\')">Cancel</button><button class="mb mb-gold" onclick="saveBill()">Save</button></div>'+
    '</div></div>';
}
function openBillModal(){var mo=document.getElementById("mm-bill");if(mo)mo.classList.add("open");}
function saveBill(){
  var amt=parseInt(document.getElementById("bl-amt").value);
  if(!amt){mToast("Amount required","err");return;}
  var hid=currentUser.hid;
  var bills=dbGet(hk(hid,"bills"));
  bills.push({id:dbId(),type:document.getElementById("bl-type").value,month:document.getElementById("bl-month").value||curM(),amount:amt,due:document.getElementById("bl-due").value||"",status:"pending",addedOn:today()});
  dbSet(hk(hid,"bills"),bills);
  mToast("Bill saved","ok");closeMMModal("mm-bill");renderMBills();
}
function markBillPaid(id){
  var hid=currentUser.hid;
  var bills=dbGet(hk(hid,"bills"));
  var b=bills.find(function(x){return x.id===id;});
  if(b){b.status="paid";b.paidOn=today();}
  dbSet(hk(hid,"bills"),bills);
  mToast("Bill marked paid","ok");renderMBills();
}

// ── VISITORS TAB ──
function renderMVisitors(){
  mTab="visitors";
  var hid=currentUser.hid;
  var visitors=dbGet(hk(hid,"visitors"));
  var panel=document.getElementById("m-panel");if(!panel)return;
  panel.innerHTML='<div class="sec-header"><div class="sec-title">Visitor Log</div>'+
    '<button class="mb mb-gold mb-sm" onclick="openVisitorModal()">+ Log Visitor</button></div>'+
    (visitors.length?visitors.slice().reverse().slice(0,50).map(function(v){
      return '<div class="visitor-card">'+
        '<div><div style="font-weight:600;font-size:.88rem">'+v.name+'</div>'+
          '<div style="font-size:.75rem;color:var(--muted)">Visiting: '+v.tenant+' &bull; '+fdate(v.date)+'</div>'+
        '</div>'+
        '<span class="badge '+(v.status==="checked-out"?"bg":"bb")+'">'+v.status+'</span>'+
      '</div>';
    }).join(""):
    '<div class="hint-box">No visitors logged.</div>')+
    '<div id="mm-visitor" class="mm-ov"><div class="mm-modal" style="max-width:420px">'+
      '<div class="mm-hdr"><div class="mm-title">Log Visitor</div><button class="mm-x" onclick="closeMMModal(\'mm-visitor\')">✕</button></div>'+
      '<div class="mm-body">'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Visitor Name *</label><input class="mfi" id="vi-name"></div>'+
        '<div class="mfg"><label class="mfl">CNIC / ID</label><input class="mfi" id="vi-cnic"></div></div>'+
        '<div class="mfr"><div class="mfg"><label class="mfl">Visiting Tenant</label><input class="mfi" id="vi-tenant" placeholder="Tenant name or TID"></div>'+
        '<div class="mfg"><label class="mfl">Date</label><input class="mfi" id="vi-date" type="date" value="'+today()+'"></div></div>'+
        '<div class="mfg" style="margin-bottom:10px"><label class="mfl">Purpose</label><input class="mfi" id="vi-purpose" placeholder="Reason for visit"></div>'+
      '</div>'+
      '<div class="mm-foot"><button class="mb mb-out" onclick="closeMMModal(\'mm-visitor\')">Cancel</button><button class="mb mb-gold" onclick="saveVisitor()">Log</button></div>'+
    '</div></div>';
}
function openVisitorModal(){var mo=document.getElementById("mm-visitor");if(mo)mo.classList.add("open");}
function saveVisitor(){
  var name=document.getElementById("vi-name").value.trim();
  if(!name){mToast("Visitor name required","err");return;}
  var hid=currentUser.hid;
  var visitors=dbGet(hk(hid,"visitors"));
  visitors.push({id:dbId(),name:name,cnic:document.getElementById("vi-cnic").value.trim(),tenant:document.getElementById("vi-tenant").value.trim(),date:document.getElementById("vi-date").value||today(),purpose:document.getElementById("vi-purpose").value.trim(),status:"checked-in",loggedBy:currentUser.name});
  dbSet(hk(hid,"visitors"),visitors);
  mToast("Visitor logged","ok");closeMMModal("mm-visitor");renderMVisitors();
}

// ── ATTENDANCE TAB ──
function renderMAttendance(){
  mTab="attendance";
  var hid=currentUser.hid;
  var tenants=dbGet(hk(hid,"tenants")).filter(function(t){return t.status==="active";});
  var staff=dbGet(hk(hid,"staff")).filter(function(s){return s.status==="active";});
  var att=dbGetO(hk(hid,"att"));
  var todayKey=today();
  var panel=document.getElementById("m-panel");if(!panel)return;

  panel.innerHTML='<div class="sec-header"><div class="sec-title">Attendance — '+fdateFull(todayKey)+'</div></div>'+
    '<div class="att-subtab-bar">'+
      '<button class="att-subtab'+(_attActiveTab==="tenant"?" active":"")+ '" onclick="switchAttTab(\'tenant\')">👥 Tenant Attendance</button>'+
      '<button class="att-subtab'+(_attActiveTab==="staff"?" active":"")+ '" onclick="switchAttTab(\'staff\')">👷 Staff Clock-In / Out</button>'+
    '</div>'+
    '<div id="att-tenant-panel" style="display:'+(_attActiveTab==="tenant"?"block":"none")+'">'+
      '<div style="margin-bottom:12px;font-size:.8rem;color:var(--muted)">Click a tenant to toggle present/absent for today.</div>'+
      '<div class="att-grid">'+
      tenants.map(function(t){
        var key="t_"+t.tid+"_"+todayKey;
        var status=att[key]||"";
        return '<div class="att-cell '+(status==="present"?"present":status==="absent"?"absent":"")+'" onclick="toggleAttendance(\'t\',\''+t.tid+'\',\''+todayKey+'\')">'+
          '<div style="font-size:1.1rem;margin-bottom:4px">'+(status==="present"?"✅":status==="absent"?"❌":"⬜")+'</div>'+
          '<div style="font-weight:600;font-size:.75rem">'+t.name.split(" ")[0]+'</div>'+
          '<div style="font-size:.67rem;color:var(--muted)">'+t.room+'</div>'+
        '</div>';
      }).join("")+'</div>'+
    '</div>'+
    '<div id="att-staff-panel" style="display:'+(_attActiveTab==="staff"?"block":"none")+'">'+
      (staff.length?
        '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;">'+
        staff.map(function(s){
          var clockKey="s_"+s.id+"_"+todayKey;
          var clockData=att[clockKey]||{};
          var isIn=!!clockData.in&&!clockData.out;
          var isDone=!!clockData.in&&!!clockData.out;
          return '<div class="staff-clock-card '+(isIn?"clocked-in":isDone?"clocked-out":"")+'">'+
            '<div style="font-weight:700;font-size:.88rem;color:var(--text)">'+s.name+'</div>'+
            '<div class="staff-clock-meta">'+s.role+'</div>'+
            (clockData.in?'<div class="staff-clock-time">In: '+clockData.in+(clockData.out?' · Out: '+clockData.out:'')+'</div>':'')+
            '<div style="display:flex;gap:6px;flex-wrap:wrap">'+
              (!clockData.in?'<button class="mb mb-grn mb-sm" onclick="mMgrStaffClockIn(\''+s.id+'\')">Clock In</button>':'')+ 
              (clockData.in&&!clockData.out?'<button class="mb mb-blue mb-sm" onclick="mMgrStaffClockOut(\''+s.id+'\')">Clock Out</button>':'')+ 
              (isDone?'<span class="badge bg">Done ✅</span>':'')+
            '</div>'+
          '</div>';
        }).join("")+'</div>':
        '<div class="hint-box">No active staff members. Add staff in the Staff tab first.</div>')+
    '</div>';
}

function switchAttTab(tab){
  _attActiveTab=tab;
  var tenant=document.getElementById("att-tenant-panel");
  var staff=document.getElementById("att-staff-panel");
  document.querySelectorAll(".att-subtab").forEach(function(b){b.classList.remove("active");});
  var activeBtn=document.querySelector('.att-subtab[onclick="switchAttTab(\''+tab+'\')"]');
  if(activeBtn)activeBtn.classList.add("active");
  if(tenant)tenant.style.display=tab==="tenant"?"block":"none";
  if(staff)staff.style.display=tab==="staff"?"block":"none";
}

function toggleAttendance(type,id,date){
  var hid=currentUser.hid;
  var att=dbGetO(hk(hid,"att"));
  var key=type+"_"+id+"_"+date;
  att[key]=att[key]==="present"?"absent":att[key]==="absent"?"":type==="t"?"present":"present";
  dbSetO(hk(hid,"att"),att);
  renderMAttendance();
}

function mMgrStaffClockIn(staffId){
  var hid=currentUser.hid;
  var att=dbGetO(hk(hid,"att"));
  var key="s_"+staffId+"_"+today();
  var now=new Date().toLocaleTimeString("en-PK",{hour:"2-digit",minute:"2-digit"});
  if(att[key]&&att[key].in){mToast("Already clocked in","err");return;}
  att[key]={in:now};
  dbSetO(hk(hid,"att"),att);
  var staff=dbGet(hk(hid,"staff")).find(function(s){return s.id===staffId;});
  mToast((staff?staff.name:"Staff")+" clocked in at "+now,"ok");
  renderMAttendance();
}

function mMgrStaffClockOut(staffId){
  var hid=currentUser.hid;
  var att=dbGetO(hk(hid,"att"));
  var key="s_"+staffId+"_"+today();
  if(!att[key]||!att[key].in){mToast("Not clocked in yet","err");return;}
  var now=new Date().toLocaleTimeString("en-PK",{hour:"2-digit",minute:"2-digit"});
  att[key].out=now;
  dbSetO(hk(hid,"att"),att);
  var staff=dbGet(hk(hid,"staff")).find(function(s){return s.id===staffId;});
  mToast((staff?staff.name:"Staff")+" clocked out at "+now,"ok");
  renderMAttendance();
}

// ── SETTINGS TAB ──
function renderMSettings(){
  mTab="settings";
  var hid=currentUser.hid;
  var h=HOSTELS.find(function(x){return x.id===hid;});
  var settings=dbGetO(hk(hid,"settings"));
  var panel=document.getElementById("m-panel");if(!panel)return;
  panel.innerHTML='<div class="sec-header"><div class="sec-title">Hostel Settings</div></div>'+
    '<div class="dc" style="margin-bottom:16px">'+
      '<div class="dc-title">Public Page Settings</div>'+
      '<div class="mfg" style="margin-bottom:10px"><label class="mfl">Banner Text (shows on public hostel page)</label>'+
        '<input class="mfi" id="set-banner" value="'+(settings.bannerText||"")+'" placeholder="e.g. Special Ramadan discount available!"></div>'+
      '<div class="mfr">'+
        '<div class="mfg"><label class="mfl">Contact WhatsApp Override</label><input class="mfi" id="set-wa" value="'+(settings.waOverride||"")+'" placeholder="923001234567"></div>'+
        '<div class="mfg"><label class="mfl">Special Offer Tag</label><input class="mfi" id="set-offer" value="'+(settings.offer||"")+'" placeholder="First month free!"></div>'+
      '</div>'+
      '<button class="mb mb-gold" style="margin-top:8px" onclick="saveSettings()">Save Settings</button>'+
    '</div>'+
    '<div class="dc" style="margin-bottom:16px">'+
      '<div class="dc-title">Data Management</div>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px">'+
        '<button class="mb mb-out mb-sm" onclick="exportAllData()">📥 Export Backup</button>'+
        '<label class="mb mb-out mb-sm" style="cursor:pointer">📤 Import Backup<input type="file" style="display:none" accept=".json" onchange="importData(this.files[0])"></label>'+
      '</div>'+
    '</div>'+
    '<div class="dc">'+
      '<div class="dc-title">Manager Credentials</div>'+
      '<div class="mcred">Username: <code>'+(MGRS.find(function(m){return m.hid===hid;})||{}).user+'</code><br>Change passwords via admin portal.</div>'+
    '</div>';
}
function saveSettings(){
  var hid=currentUser.hid;
  var settings=dbGetO(hk(hid,"settings"));
  settings.bannerText=document.getElementById("set-banner").value.trim();
  settings.waOverride=document.getElementById("set-wa").value.trim();
  settings.offer=document.getElementById("set-offer").value.trim();
  dbSetO(hk(hid,"settings"),settings);
  mToast("Settings saved","ok");
}

// ── HOSTELITE PORTAL ──
function renderHostelite(){
  var cu=currentUser;var hid=cu.hid;
  var tenants=dbGet(hk(hid,"tenants"));
  var t=tenants.find(function(x){return x.tid===cu.tid;});
  if(!t){document.getElementById("p-main-content").innerHTML='<div class="p-content"><div class="warn-box">Account not found. Please contact your manager.</div></div>';return;}
  var pays=dbGet(hk(hid,"pays")).filter(function(p){return p.tid===t.tid;});
  var curPay=pays.filter(function(p){return p.month===curM()&&p.status==="paid";});
  var isPaid=curPay.length>0;
  var totalPaid=pays.reduce(function(s,p){return s+(p.status==="paid"?p.amount:0);},0);
  var notices=dbGet(hk(hid,"notices")).slice(-3).reverse();
  var issues=dbGet(hk(hid,"maint")).filter(function(i){return i.status!=="resolved";});
  var mc=document.getElementById("p-main-content");
  mc.innerHTML='<div class="p-content">'+
    '<div style="margin-bottom:20px"><div style="font-size:1.1rem;font-weight:700;color:var(--text)">Welcome, '+t.name.split(" ")[0]+' 👋</div>'+
      '<div style="font-size:.82rem;color:var(--muted);margin-top:2px">'+t.room+' · '+cu.hname+'</div></div>'+
    '<div class="m-stats" style="grid-template-columns:repeat(4,1fr)">'+
      '<div class="ht-stat" style="--ha:#E8B84B"><div class="mstat-l">Monthly Rent</div><div class="mstat-v">Rs.'+fmt(t.rent)+'</div></div>'+
      '<div class="ht-stat" style="--ha:'+(isPaid?"#3DD68C":"#FF5C5C")+'"><div class="mstat-l">This Month</div><div class="mstat-v" style="font-size:1rem">'+(isPaid?"✅ Paid":"⚠️ Pending")+'</div></div>'+
      '<div class="ht-stat" style="--ha:#4A9EFF"><div class="mstat-l">Total Paid</div><div class="mstat-v">Rs.'+fmt(totalPaid)+'</div></div>'+
      '<div class="ht-stat" style="--ha:#FB923C"><div class="mstat-l">Open Issues</div><div class="mstat-v">'+issues.length+'</div></div>'+
    '</div>'+
    '<div class="dash-grid" style="margin-top:20px">'+
      '<div class="dc"><div class="dc-title">My Details</div>'+
        '<div class="ht-pr"><span>Tenant ID</span><span class="m-tid">'+t.tid+'</span></div>'+
        '<div class="ht-pr"><span>Room</span><span>'+t.room+'</span></div>'+
        '<div class="ht-pr"><span>Move-In</span><span>'+fdate(t.movein)+'</span></div>'+
        '<div class="ht-pr"><span>Phone</span><span>'+t.phone+'</span></div>'+
        '<div class="ht-pr"><span>CNIC</span><span style="font-size:.76rem">'+t.cnic+'</span></div>'+
      '</div>'+
      '<div class="dc"><div class="dc-title">Recent Notices</div>'+
        (notices.length?notices.map(function(n){return '<div class="oi"><span>'+n.title+'</span><span class="badge '+(n.priority==="urgent"?"br":"bgold")+'">'+n.priority+'</span></div>';}).join(""):
        '<div class="oi" style="justify-content:center;color:var(--muted)">No notices</div>')+
      '</div>'+
    '</div>'+
    '<div class="dc" style="margin-top:16px"><div class="dc-title">Payment History</div>'+
      (pays.length?'<div class="tw"><table><thead><tr><th>Month</th><th>Amount</th><th>Type</th><th>Date</th></tr></thead><tbody>'+
        pays.slice().reverse().slice(0,12).map(function(p){return '<tr><td>'+mlabel(p.month)+'</td><td>Rs. '+fmt(p.amount)+'</td><td><span class="badge '+(PBDGS[p.type]||"bgold")+'">'+p.type+'</span></td><td>'+fdate(p.date)+'</td></tr>';}).join("")+'</tbody></table></div>':
        '<div style="text-align:center;color:var(--muted);padding:16px;font-size:.82rem">No payment history</div>')+
    '</div>'+
    '</div>'+
    '<div id="m-toast" class="m-toast"></div>';
}

// ── STAFF PORTAL ──
function renderStaff(){
  var cu=currentUser;var hid=cu.hid;
  var staff=dbGet(hk(hid,"staff"));
  var s=staff.find(function(x){return x.name===cu.name;});
  var att=dbGetO(hk(hid,"att"));
  var todayKey=today();
  var mc=document.getElementById("p-main-content");
  mc.innerHTML='<div class="p-content">'+
    '<div style="margin-bottom:20px"><div style="font-size:1.1rem;font-weight:700;color:var(--text)">Staff Portal — '+cu.name+'</div>'+
      '<div style="font-size:.82rem;color:var(--muted)">'+cu.hname+'</div></div>'+
    (s?
      '<div class="dc" style="margin-bottom:16px"><div class="dc-title">My Details</div>'+
        '<div class="ht-pr"><span>Role</span><span>'+s.role+'</span></div>'+
        '<div class="ht-pr"><span>Salary</span><span>Rs. '+fmt(s.salary)+'</span></div>'+
        '<div class="ht-pr"><span>Join Date</span><span>'+fdate(s.joindate)+'</span></div>'+
        '<div class="ht-pr"><span>Status</span><span class="badge bg">'+s.status+'</span></div>'+
      '</div>':'')+
    '<div class="dc"><div class="dc-title">Today\'s Attendance</div>'+
      (function(){
        var clockKey="s_"+(s?s.id:cu.name)+"_"+todayKey;
        var cd=att[clockKey]||{};
        return '<div style="text-align:center;padding:20px">'+
          (cd.in?'<div style="font-size:1rem;margin-bottom:8px;color:var(--p-green)">Clocked In: <strong>'+cd.in+'</strong></div>':'')+
          (cd.out?'<div style="font-size:1rem;margin-bottom:8px;color:var(--p-blue)">Clocked Out: <strong>'+cd.out+'</strong></div>':'')+
          (!cd.in?'<div style="color:var(--muted);margin-bottom:12px">Not clocked in yet</div>':'')+
        '</div>';
      })()+
    '</div>'+
    '</div>'+
    '<div id="m-toast" class="m-toast"></div>';
}

// ── ADMIN PORTAL ──
function renderAdmin(){
  var mc=document.getElementById("p-main-content");if(!mc)return;
  var totTenants=0,totOccupancy=0,totRevenue=0,totIssues=0;
  HOSTELS.forEach(function(h){
    totTenants+=dbGet(hk(h.id,"tenants")).filter(function(t){return t.status==="active";}).length;
    totRevenue+=dbGet(hk(h.id,"pays")).filter(function(p){return p.month===curM()&&p.status==="paid";}).reduce(function(s,p){return s+p.amount;},0);
    totIssues+=dbGet(hk(h.id,"maint")).filter(function(i){return i.status!=="resolved";}).length;
  });
  mc.innerHTML='<div class="p-content">'+
    '<div style="margin-bottom:24px"><div style="font-size:1.2rem;font-weight:700;color:var(--text)">⚙️ Admin Dashboard</div>'+
      '<div style="font-size:.8rem;color:var(--muted)">Full network overview</div></div>'+
    '<div class="m-stats" style="grid-template-columns:repeat(4,1fr)">'+
      statCard("Total Hostels",HOSTELS.length,"🏠","#E8B84B")+
      statCard("Total Tenants",totTenants,"👥","#4A9EFF")+
      statCard("Network Revenue","Rs. "+fmt(totRevenue),"💰","#3DD68C")+
      statCard("Open Issues",totIssues,"🔧",totIssues>0?"#FF5C5C":"#3DD68C")+
    '</div>'+
    '<div style="margin-top:24px"><div class="sec-header"><div class="sec-title">All Hostels</div></div>'+
    '<div class="admin-grid">'+HOSTELS.map(function(h){
      var hTenants=dbGet(hk(h.id,"tenants")).filter(function(t){return t.status==="active";}).length;
      var hRevenue=dbGet(hk(h.id,"pays")).filter(function(p){return p.month===curM()&&p.status==="paid";}).reduce(function(s,p){return s+p.amount;},0);
      var health=calcHealthScore(h.id);
      var hClass=health>=75?"bg":health>=50?"bo":"br";
      return '<div class="admin-gcard">'+
        '<div class="admin-gcard-top" style="background:'+h.accentBg+'"><span>'+h.emoji+'</span></div>'+
        '<div class="admin-gcard-body">'+
          '<div class="admin-gcard-name">'+h.name+'</div>'+
          '<div class="admin-gcard-area">'+h.area+'</div>'+
          '<div class="admin-gcard-stats">'+
            '<span class="badge bgold">'+hTenants+' tenants</span>'+
            '<span class="badge bg">Rs. '+fmt(hRevenue)+'</span>'+
            '<span class="badge '+hClass+'">Health: '+health+'%</span>'+
          '</div>'+
          '<div style="margin-top:10px"><button class="mb mb-gold mb-sm" onclick="adminViewHostel('+h.id+')">Manage</button></div>'+
        '</div>'+
      '</div>';
    }).join("")+'</div></div>'+
    '</div>'+
    '<div id="m-toast" class="m-toast"></div>';
}

function adminViewHostel(hid){
  var mgr=MGRS.find(function(m){return m.hid===hid;});
  if(mgr){
    currentUser={role:"manager",name:mgr.name,hid:hid,user:mgr.user,hostelName:HOSTELS.find(function(h){return h.id===hid;}).name,adminOriginal:{role:"admin",name:"LBH Administrator"}};
    initRooms(hid);showPortalView();
  }
}

// ── FINANCE PORTAL ──
function renderFinance(tab){
  var mc=document.getElementById("p-main-content");if(!mc)return;
  var allPays=[];
  HOSTELS.forEach(function(h){
    dbGet(hk(h.id,"pays")).forEach(function(p){allPays.push({...p,hname:h.name,area:h.area});});
  });
  var mPays=allPays.filter(function(p){return p.month===curM()&&p.status==="paid";});
  var totalCollected=mPays.reduce(function(s,p){return s+p.amount;},0);
  var totExpected=0;HOSTELS.forEach(function(h){dbGet(hk(h.id,"tenants")).filter(function(t){return t.status==="active";}).forEach(function(t){totExpected+=t.rent;});});
  mc.innerHTML='<div class="p-content">'+
    '<div style="margin-bottom:20px"><div style="font-size:1.2rem;font-weight:700;color:var(--text)">💰 Finance Portal</div>'+
      '<div style="font-size:.8rem;color:var(--muted)">Network-wide financial overview</div></div>'+
    '<div class="ptabs">'+
      '<button class="ptab'+(tab==="overview"?" active":"")+ '" onclick="renderFinance(\'overview\')">Overview</button>'+
      '<button class="ptab'+(tab==="perhostel"?" active":"")+ '" onclick="renderFinance(\'perhostel\')">Per Hostel</button>'+
      '<button class="ptab'+(tab==="charts"?" active":"")+ '" onclick="renderFinance(\'charts\')">Summary</button>'+
    '</div>'+
    (tab==="overview"?
      '<div id="fp-overview">'+
        '<div class="m-stats" style="grid-template-columns:repeat(3,1fr)">'+
          statCard("Expected","\u20A8"+fmt(totExpected),"📋","#E8B84B")+
          statCard("Collected","\u20A8"+fmt(totalCollected),"✅","#3DD68C")+
          statCard("Outstanding","\u20A8"+fmt(Math.max(0,totExpected-totalCollected)),"⚠️","#FF5C5C")+
        '</div>'+
        '<div class="dc" style="margin-top:16px"><div class="dc-title">All Payments — '+mlabel(curM())+'</div>'+
          '<div class="tw"><table><thead><tr><th>Hostel</th><th>Tenant</th><th>Amount</th><th>Type</th><th>Date</th></tr></thead><tbody>'+
          mPays.slice().reverse().slice(0,30).map(function(p){
            return '<tr><td>'+p.hname+'</td><td>'+p.tid+'</td><td>Rs. '+fmt(p.amount)+'</td>'+
              '<td><span class="badge '+(PBDGS[p.type]||"bgold")+'">'+p.type+'</span></td>'+
              '<td>'+fdate(p.date)+'</td></tr>';
          }).join("")+'</tbody></table></div>'+
        '</div>'+
      '</div>':
    tab==="perhostel"?
      '<div id="fp-perhostel">'+
        '<div class="tw"><table><thead><tr><th>Hostel</th><th>Active Tenants</th><th>Expected</th><th>Collected</th><th>Rate</th></tr></thead><tbody>'+
        HOSTELS.map(function(h){
          var hTenants=dbGet(hk(h.id,"tenants")).filter(function(t){return t.status==="active";});
          var hExpected=hTenants.reduce(function(s,t){return s+t.rent;},0);
          var hPaid=allPays.filter(function(p){return p.hname===h.name&&p.month===curM()&&p.status==="paid";}).reduce(function(s,p){return s+p.amount;},0);
          var rate=hExpected?Math.round(hPaid/hExpected*100):0;
          return '<tr><td>'+h.emoji+' '+h.name+'</td><td>'+hTenants.length+'</td>'+
            '<td>Rs. '+fmt(hExpected)+'</td><td>Rs. '+fmt(hPaid)+'</td>'+
            '<td><span class="badge '+(rate>=80?"bg":rate>=50?"bo":"br")+'">'+rate+'%</span></td></tr>';
        }).join("")+'</tbody></table></div>'+
      '</div>':
      '<div id="fp-charts">'+
        '<div class="hint-box">Summary view — showing collection rates across all hostels for '+mlabel(curM())+'.</div>'+
        HOSTELS.map(function(h){
          var hTenants=dbGet(hk(h.id,"tenants")).filter(function(t){return t.status==="active";});
          var hExpected=hTenants.reduce(function(s,t){return s+t.rent;},0);
          var hPaid=allPays.filter(function(p){return p.hname===h.name&&p.month===curM()&&p.status==="paid";}).reduce(function(s,p){return s+p.amount;},0);
          var rate=hExpected?Math.round(hPaid/hExpected*100):0;
          return '<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:.82rem;margin-bottom:4px"><span>'+h.emoji+' '+h.short+'</span><span>'+rate+'% (Rs. '+fmt(hPaid)+')</span></div>'+
            '<div class="health-bar"><div class="health-fill '+(rate>=75?"health-good":rate>=50?"health-ok":"health-bad")+'" style="width:'+rate+'%"></div></div></div>';
        }).join("")+
      '</div>')+
    '</div>'+
    '<div id="m-toast" class="m-toast"></div>';
}

function switchFTab(tab){renderFinance(tab);}

// ── GLOBAL SEARCH ──
function portalSearch(q){
  var res=document.getElementById("gsearch-results");if(!res)return;
  if(!q||q.length<2){res.classList.remove("open");return;}
  var hid=currentUser?currentUser.hid:null;
  var items=[];
  if(hid){
    dbGet(hk(hid,"tenants")).forEach(function(t){
      if((t.name+t.tid+t.room).toLowerCase().includes(q.toLowerCase()))items.push({type:"Tenant",label:t.name+" ("+t.tid+")",fn:"viewTenant('"+t.tid+"')"});
    });
  }
  res.innerHTML=items.slice(0,8).map(function(i){return '<div class="gsr-item" onclick="'+i.fn+'"><div class="gsr-type">'+i.type+'</div>'+i.label+'</div>';}).join("")||'<div class="gsr-item" style="color:var(--muted)">No results</div>';
  res.classList.add("open");
}

// ── DOM READY ──
document.addEventListener("DOMContentLoaded",function(){
  loadTheme();
  HOSTELS.forEach(function(h){initRooms(h.id);});
  showPage("home");
  filterHostels();
  restoreSession();
  addNotif("Welcome to Lahore Boys Hostels Portal!","all");
  document.addEventListener("click",function(e){
    var np=document.getElementById("notif-panel");
    if(np&&np.classList.contains("open")&&!np.closest(".notif-bell")&&!e.target.closest("#notif-bell"))np.classList.remove("open");
    var gr=document.getElementById("gsearch-results");
    if(gr&&gr.classList.contains("open")&&!e.target.closest(".gsearch-wrap"))gr.classList.remove("open");
  });
});