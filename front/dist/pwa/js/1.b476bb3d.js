(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{2809:function(e,t,a){"use strict";var n=a("45c3"),o=a.n(n);o.a},"45c3":function(e,t,a){},"713b":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-layout",{attrs:{view:"lHh Lpr lFf"}},[a("q-header",{staticClass:"bg-primary",attrs:{elevated:""}},[a("q-toolbar",[a("q-btn",{attrs:{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu"},on:{click:function(t){e.leftDrawerOpen=!e.leftDrawerOpen}}}),a("q-toolbar-title",[e._v("\n        MyGuardMoney\n      ")])],1)],1),a("q-drawer",{attrs:{"show-if-above":"",bordered:"","content-class":"bg-primary text-white"},model:{value:e.leftDrawerOpen,callback:function(t){e.leftDrawerOpen=t},expression:"leftDrawerOpen"}},[a("q-list",[a("q-item-label",{staticClass:"text-white text-center text-h6",attrs:{header:""}},[e._v("\n        Menu\n      ")]),e._l(e.essentialLinks,(function(t){return a("EssentialLink",e._b({key:t.title,attrs:{view:e.view}},"EssentialLink",t,!1))}))],2)],1),a("q-page-container",["gastos"===e.view?a("gastos"):e._e(),"tipos-gastos"===e.view?a("tipos-gastos"):e._e(),"analisis"===e.view?a("analisis"):e._e(),"ingresos"===e.view?a("ingresos"):e._e()],1)],1)},o=[],r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-item",{class:e.view===e.link?"marked":"",attrs:{clickable:"",tag:"a",target:"_blank"},on:{click:function(t){return e.goTo(e.link)}}},[e.icon?a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:e.icon}})],1):e._e(),a("q-item-section",[a("q-item-label",[e._v(e._s(e.title))]),a("q-item-label",{attrs:{caption:""}},[e._v("\n      "+e._s(e.caption)+"\n    ")])],1)],1)},s=[],i=(a("a15b"),a("26e9"),a("d3b7"),a("ac1f"),a("25f0"),a("5319"),a("1276"),a("96cf"),a("c973")),l=a.n(i),c=a("cf57"),u=a("4515"),p=a("af0d"),d={data:function(){return{db:{}}},created:function(){this.db=new p["a"]("db")},methods:{addToCollection:function(e,t){this.db.collection(e).add(t).then((function(e){console.log("Agregado")})).catch((function(e){console.log(e)}))},getDataCollection:function(e){var t=arguments,a=this;return l()(regeneratorRuntime.mark((function n(){var o,r,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(o=t.length>1&&void 0!==t[1]?t[1]:"",r=t.length>2&&void 0!==t[2]?t[2]:"",s=[],""!==o||""!==r){n.next=8;break}return n.next=6,a.db.collection(e).get().then((function(e){s=e}));case 6:n.next=10;break;case 8:return n.next=10,a.db.collection(e).orderBy(o,r).get().then((function(e){s=e}));case 10:return n.abrupt("return",s);case 11:case"end":return n.stop()}}),n)})))()},getDataCollectionByNombre:function(e,t){var a=arguments,n=this;return l()(regeneratorRuntime.mark((function o(){var r,s,i;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:if(r=a.length>2&&void 0!==a[2]?a[2]:"",s=a.length>3&&void 0!==a[3]?a[3]:"",i=[],""!==r||""!==s){o.next=8;break}return o.next=6,n.db.collection(e).doc({nombre:t}).get().then((function(e){i=e}));case 6:o.next=10;break;case 8:return o.next=10,n.db.collection(e).doc({nombre:t}).orderBy(r,s).get().then((function(e){i=e}));case 10:return o.abrupt("return",i);case 11:case"end":return o.stop()}}),o)})))()},deleteDataCollection:function(e,t){var a=this;return l()(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:a.db.collection(e).doc({id:t}).delete().then((function(e){console.log("Delete successful, now do something.")})).catch((function(e){console.log(e)}));case 1:case"end":return n.stop()}}),n)})))()},isNumber:function(e){return!isNaN(parseFloat(e))&&!isNaN(e-0)},miles:function(e){if(e&&void 0!==e){"number"===typeof e&&(e=e.toString());var t=e.replace(/\./g,"");return this.isNumber(e)?isNaN(t)||(t=t.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g,"$1."),t=t.split("").reverse().join("").replace(/^[.]/,"")):t="",t}},goTo:function(e){this.$router.push("/"+e).catch((function(e){e._name}))},alert:function(e,t){this.$q.notify({message:t,color:e})},activateLoading:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a={message:e};1===t?a.spinner=c["a"]:2===t&&(a.spinner=u["a"]),this.$q.loading.show(a)},disableLoading:function(){this.$q.loading.hide()}}},m={name:"EssentialLink",mixins:[d],props:{title:{type:String,required:!0},caption:{type:String,default:""},link:{type:String,default:"#"},icon:{type:String,default:""},view:{type:String,default:""}}},f=m,h=(a("2809"),a("2877")),b=a("66e5"),g=a("4074"),v=a("0016"),y=a("0170"),w=a("eebe"),x=a.n(w),q=Object(h["a"])(f,r,s,!1,null,"1f122eb0",null),k=q.exports;x()(q,"components",{QItem:b["a"],QItemSection:g["a"],QIcon:v["a"],QItemLabel:y["a"]});var C=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pa-md"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-1"}),a("div",{staticClass:"col-10 container"},[e.options.length>0?a("q-form",{on:{submit:e.save}},[a("q-input",{attrs:{inputmode:"numeric",color:"green",label:"Valor"},on:{keyup:function(t){return e.milesInput()}},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"attach_money"}})]},proxy:!0}],null,!1,2568092296),model:{value:e.gasto.valor,callback:function(t){e.$set(e.gasto,"valor",t)},expression:"gasto.valor"}}),a("br"),a("q-input",{attrs:{color:"green",label:"Nombre"},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"description"}})]},proxy:!0}],null,!1,736773578),model:{value:e.gasto.nombre,callback:function(t){e.$set(e.gasto,"nombre",t)},expression:"gasto.nombre"}}),a("br"),a("q-select",{attrs:{options:e.options,label:"Tipo",required:""},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"account_balance"}})]},proxy:!0}],null,!1,4264257012),model:{value:e.gasto.tipo,callback:function(t){e.$set(e.gasto,"tipo",t)},expression:"gasto.tipo"}}),a("br"),a("q-input",{attrs:{color:"green",label:"Fecha y hora",required:"",rules:[function(e){return!!e||"Tienes que llenar este campo"}]},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{mask:"YYYY-MM-DD HH:mm"},model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}})],1)],1)]},proxy:!0},{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"access_time"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-time",{attrs:{mask:"YYYY-MM-DD HH:mm",format24h:""},model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}})],1)],1)]},proxy:!0}],null,!1,3771727303),model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}}),a("br"),a("q-btn",{staticClass:"full-width",attrs:{label:"Agregar",type:"submit",color:"positive"}})],1):a("div",[e._v("\n            Para comenzar, debes ingresar un tipo de gasto.\n          ")]),a("br"),a("q-separator"),a("br"),a("q-table",{staticClass:"table",attrs:{dense:e.$q.screen.lt.md,data:e.data,columns:e.columns,"row-key":"name"},scopedSlots:e._u([{key:"body",fn:function(t){return[a("q-tr",{attrs:{props:t}},[a("q-td",{key:"tipo",attrs:{props:t}},[e._v("\n                  "+e._s(e.getNombre(t.row.tipo))+"\n                ")]),a("q-td",{key:"nombre",attrs:{props:t}},[e._v("\n                  "+e._s(t.row.nombre)+"\n                ")]),a("q-td",{key:"valor",attrs:{props:t}},[e._v("\n                  "+e._s(e.miles(t.row.valor))+"\n                ")]),a("q-td",{key:"fecha",attrs:{props:t}},[e._v("\n                  "+e._s(t.row.fecha)+"\n                ")]),a("q-td",{key:"ops",attrs:{props:t}},[a("a",{staticClass:"text-red",staticStyle:{cursor:"pointer",padding:"5px"},on:{click:function(a){return e.del(t.row.id)}}},[a("q-icon",{attrs:{size:"md",name:"delete"}}),a("q-tooltip",{attrs:{delay:1e3,offset:[0,10]}},[e._v("eliminar")])],1)])],1)]}}])})],1),a("div",{staticClass:"col-1"})])])},_=[],T=(a("c740"),a("a434"),a("bd4c")),D={name:"gastos",mixins:[d],data:function(){return{gasto:{},options:[],data:[],columns:[{name:"tipo",align:"center",label:"Tipo",field:"tipo",sortable:!0},{name:"nombre",align:"center",label:"Nombre",field:"nombre",sortable:!0},{name:"valor",align:"center",label:"Valor",field:"valor",sortable:!0},{name:"fecha",align:"center",label:"Fecha",field:"fecha",sortable:!0},{name:"ops",align:"center",label:"Opciones",field:"ops",sortable:!0}],fecha:T["b"].formatDate(Date.now(),"YYYY-MM-DD HH:mm:ss")}},created:function(){this.getData(),this.getTypes()},methods:{getTypes:function(){var e=this;return l()(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getDataCollection("tipos");case 2:for(a=t.sent,n=0;n<a.length;n++)e.options.push(a[n].nombre);case 4:case"end":return t.stop()}}),t)})))()},getData:function(){var e=this;return l()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getDataCollection("gastos","id","desc");case 2:e.data=t.sent;case 3:case"end":return t.stop()}}),t)})))()},save:function(){var e=this;return l()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""===e.gasto.valor){t.next=11;break}return e.gasto.id=Date.now(),e.gasto.valor=e.gasto.valor.replace(/\./g,""),t.next=5,e.getDataCollectionByNombre("tipos",e.gasto.tipo);case 5:e.gasto.tipo=t.sent,e.gasto.fecha=e.fecha,e.addToCollection("gastos",e.gasto),e.data.push(e.gasto),e.gasto={},e.gasto.fecha=T["b"].formatDate(Date.now(),"YYYY-MM-DD HH:mm:ss");case 11:case"end":return t.stop()}}),t)})))()},del:function(e){var t=this;return l()(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=t.data.findIndex((function(t){return t.id===e})),t.data.splice(n,1),a.next=4,t.deleteDataCollection("gastos",e);case 4:case"end":return a.stop()}}),a)})))()},getNombre:function(e){var t="";return t=void 0!==e?e.nombre:e,t},milesInput:function(){this.gasto.valor=this.miles(this.gasto.valor)}}},Q=D,M=a("0378"),S=a("27f9"),I=a("ddd8"),Y=a("7cbe"),R=a("52ee"),O=a("ca78"),$=a("9c40"),N=a("eb85"),H=a("eaac"),P=a("bd08"),B=a("db86"),E=a("05c0"),L=Object(h["a"])(Q,C,_,!1,null,null,null),G=L.exports;x()(L,"components",{QForm:M["a"],QInput:S["a"],QIcon:v["a"],QSelect:I["a"],QPopupProxy:Y["a"],QDate:R["a"],QTime:O["a"],QBtn:$["a"],QSeparator:N["a"],QTable:H["a"],QTr:P["a"],QTd:B["a"],QTooltip:E["a"]});var A=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pa-md"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-1"}),a("div",{staticClass:"col-10 container"},[a("q-form",{on:{submit:e.save}},[a("q-input",{attrs:{color:"green",required:"",label:"Nombre"},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"account_balance"}})]},proxy:!0}]),model:{value:e.type.nombre,callback:function(t){e.$set(e.type,"nombre",t)},expression:"type.nombre"}}),a("br"),a("q-input",{staticClass:"my-input",attrs:{label:"Color",required:""},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"palette"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-color",{model:{value:e.type.color,callback:function(t){e.$set(e.type,"color",t)},expression:"type.color"}})],1)],1)]},proxy:!0}]),model:{value:e.type.color,callback:function(t){e.$set(e.type,"color",t)},expression:"type.color"}}),a("br"),a("q-btn",{staticClass:"full-width",attrs:{type:"submit",label:"Agregar",color:"positive"}})],1),a("br"),a("q-separator"),a("div",{staticClass:"text-h6"},[e._v("Tipos actuales")]),a("q-table",{staticClass:"table",attrs:{dense:e.$q.screen.lt.md,data:e.data,columns:e.columns,"row-key":"name"},scopedSlots:e._u([{key:"body",fn:function(t){return[a("q-tr",{attrs:{props:t}},[a("q-td",{key:"name",attrs:{props:t}},[e._v("\n                    "+e._s(t.row.nombre)+"\n                  ")]),a("q-td",{key:"ops",attrs:{props:t}},[a("a",{staticClass:"text-red",staticStyle:{cursor:"pointer",padding:"5px"},on:{click:function(a){return e.del(t.row.id)}}},[a("q-icon",{attrs:{size:"md",name:"delete"}}),a("q-tooltip",{attrs:{delay:1e3,offset:[0,10]}},[e._v("eliminar")])],1)])],1)]}}])})],1),a("div",{staticClass:"col-1"})])])},F=[],j={name:"gastos",mixins:[d],data:function(){return{type:{},columns:[{name:"name",align:"center",label:"Nombre",field:"name",sortable:!0},{name:"ops",align:"center",label:"Opciones",field:"ops",sortable:!0}],data:[]}},mounted:function(){this.getData()},methods:{save:function(){""!==this.type.nombre?(this.type.id=Date.now(),this.addToCollection("tipos",this.type),this.data.push(this.type),this.type={}):this.alert("negative","El nombre es obligatorio")},getData:function(){var e=this;return l()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getDataCollection("tipos","id","desc");case 2:e.data=t.sent;case 3:case"end":return t.stop()}}),t)})))()},del:function(e){var t=this;return l()(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=t.data.findIndex((function(t){return t.id===e})),t.data.splice(n,1),a.next=4,t.deleteDataCollection("tipos",e);case 4:case"end":return a.stop()}}),a)})))()}}},z=j,V=a("b498"),J=Object(h["a"])(z,A,F,!1,null,null,null),U=J.exports;x()(J,"components",{QForm:M["a"],QInput:S["a"],QIcon:v["a"],QPopupProxy:Y["a"],QColor:V["a"],QBtn:$["a"],QSeparator:N["a"],QTable:H["a"],QTr:P["a"],QTd:B["a"],QTooltip:E["a"]});var W=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pa-md"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-1"}),a("div",{staticClass:"col-10 container"},[a("q-select",{attrs:{options:e.options,label:"Mes",required:""},on:{input:function(t){return e.init()}},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"event"}})]},proxy:!0}]),model:{value:e.monthSelected,callback:function(t){e.monthSelected=t},expression:"monthSelected"}}),a("br"),a("highcharts",{attrs:{options:e.chartOptions1}}),a("highcharts",{attrs:{options:e.chartOptions2}}),a("br"),a("q-table",{staticClass:"table",attrs:{dense:e.$q.screen.lt.md,data:e.dataCompativeTable,columns:e.columnsComparativeTable,"row-key":"name","rows-per-page-options":[0]},scopedSlots:e._u([{key:"body",fn:function(t){return[a("q-tr",{attrs:{props:t}},[a("q-td",{key:"detail",attrs:{props:t}},[e._v("\n                  "+e._s(t.row.detail)+"\n                ")]),a("q-td",{key:"incoming",attrs:{props:t}},[e._v("\n                  "+e._s(e.miles(t.row.incoming))+"\n                ")]),a("q-td",{key:"outcoming",attrs:{props:t}},[e._v("\n                  "+e._s(e.miles(t.row.outcoming))+"\n                ")])],1)]}},{key:"bottom-row",fn:function(){return[a("q-tr",[a("q-td",{key:"detail",staticClass:"text-center"},[a("b",[e._v("Total")])]),a("q-td",{key:"incoming"}),a("q-td",{key:"outcoming",staticClass:"text-center"},[e._v("\n                  "+e._s(e.miles(e.totalComparativeTable))+"\n                ")])],1)]},proxy:!0}])})],1),a("div",{staticClass:"col-1"})])])},K=[],X=(a("7db0"),a("4452")),Z={name:"gastos",mixins:[d],components:{highcharts:X["Chart"]},data:function(){return{dataTiposPorMes:[],totalComparativeTable:0,columnsComparativeTable:[{name:"detail",align:"center",label:"Nombre",field:"detail",sortable:!0},{name:"incoming",align:"center",label:"Debitos",field:"incoming",sortable:!0},{name:"outcoming",align:"center",label:"Creditos",field:"outcoming",sortable:!0}],dataCompativeTable:[],monthSelected:{value:0,label:"Enero"},options:[{value:0,label:"Enero"},{value:1,label:"Febrero"},{value:2,label:"Marzo"},{value:3,label:"Abril"},{value:4,label:"Mayo"},{value:5,label:"Junio"},{value:6,label:"Julio"},{value:7,label:"Agosto"},{value:8,label:"Septiembre"},{value:9,label:"Octubre"},{value:10,label:"Noviembre"},{value:11,label:"Diciembre"}],dataTipos:[],dataGastos:[],chartOptions1:{chart:{type:"area"},title:{text:"Gastos este mes"},xAxis:{title:{text:"Dias"},categories:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]},yAxis:{title:{text:"Valor"}},plotOptions:{line:{dataLabels:{enabled:!0},enableMouseTracking:!1},area:{fillColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#E9BC36"]]},marker:{radius:2},lineWidth:1,states:{hover:{lineWidth:1}},threshold:null}},series:[{name:"Gastos",data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],color:"#E9BC36"}]},chartOptions2:{chart:{type:"pie"},plotOptions:{pie:{allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!0,format:"{point.name}: {point.percentage:.1f}%"},showInLegend:!0}},colorAxis:{minColor:"#F2f2f2",maxColor:"#E9BC36"},series:[{colorByPoint:!0,data:[{name:"",value:"1",color:"#E9BC36"}]}],title:{text:"Gastos por categoria"}}}},mounted:function(){var e=this;return l()(regeneratorRuntime.mark((function t(){var a,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=new Date,n=a.getUTCMonth(),o=e.options.find((function(e){return e.value===n})),e.monthSelected=o,t.next=6,e.init();case 6:case"end":return t.stop()}}),t)})))()},methods:{init:function(){var e=this;return l()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getData();case 2:e.organiceByType(),e.organiceByMonth(),e.fillTable();case 5:case"end":return t.stop()}}),t)})))()},fillTable:function(){this.dataCompativeTable=[],this.totalComparativeTable=0;for(var e=this.valuesMonthSelected.incoming,t=this.dataTiposPorMes,a=0;a<e.length;a++)this.dataCompativeTable.push({detail:e[a].nombre,incoming:e[a].valor,outcoming:0}),this.totalComparativeTable=parseInt(this.totalComparativeTable)+parseInt(e[a].valor);for(var n=0;n<t.length;n++)this.dataCompativeTable.push({detail:t[n].nombre,outcoming:t[n].valor,incoming:0}),this.totalComparativeTable=parseInt(this.totalComparativeTable)-parseInt(t[n].valor)},getData:function(){var e=this;return l()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getDataCollection("tipos","id","desc");case 2:return e.dataTipos=t.sent,t.next=5,e.getDataCollection("gastos","id","desc");case 5:return e.dataGastos=t.sent,t.next=8,e.getDataCollection("ingresos","id","desc");case 8:e.dataIngresos=t.sent,e.valuesMonthSelected=e.selectMonth();case 10:case"end":return t.stop()}}),t)})))()},organiceByType:function(){this.chartOptions2.series[0].data=[];for(var e=0;e<this.dataTipos.length;e++){this.dataTiposPorMes[e]={id:this.dataTipos[e].id,valor:0,nombre:this.dataTipos[e].nombre,color:this.dataTipos[e].color};for(var t=0;t<this.valuesMonthSelected.outcoming.length;t++)this.dataTiposPorMes[e].id===this.valuesMonthSelected.outcoming[t].tipo.id&&(this.dataTiposPorMes[e].valor+=parseInt(this.valuesMonthSelected.outcoming[t].valor));this.chartOptions2.series[0].data.push({name:this.dataTiposPorMes[e].nombre,y:this.dataTiposPorMes[e].valor,color:this.dataTiposPorMes[e].color})}},organiceByMonth:function(){for(var e=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;t<this.valuesMonthSelected.outcoming.length;t++){var a=new Date(this.valuesMonthSelected.outcoming[t].fecha),n=a.getUTCDate()-1;0===e[n]?e[n]=parseInt(this.valuesMonthSelected.outcoming[t].valor):e[n]+=parseInt(this.valuesMonthSelected.outcoming[t].valor)}this.chartOptions1.series[0].data=e},selectMonth:function(){for(var e=[],t=[],a=0;a<this.dataGastos.length;a++)new Date(this.dataGastos[a].fecha).getUTCMonth()===this.monthSelected.value&&e.push(this.dataGastos[a]);for(var n=0;n<this.dataIngresos.length;n++)new Date(this.dataIngresos[n].fecha).getUTCMonth()===this.monthSelected.value&&t.push(this.dataIngresos[n]);return{incoming:t,outcoming:e}}}},ee=Z,te=Object(h["a"])(ee,W,K,!1,null,null,null),ae=te.exports;x()(te,"components",{QSelect:I["a"],QIcon:v["a"],QTable:H["a"],QTr:P["a"],QTd:B["a"]});var ne=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pa-md"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-1"}),a("div",{staticClass:"col-10 container"},[a("q-form",{on:{submit:e.save}},[a("q-input",{attrs:{inputmode:"numeric",color:"green",label:"Valor"},on:{keyup:function(t){return e.milesInput()}},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"attach_money"}})]},proxy:!0}]),model:{value:e.ingreso.valor,callback:function(t){e.$set(e.ingreso,"valor",t)},expression:"ingreso.valor"}}),a("br"),a("q-input",{attrs:{color:"green",label:"Nombre"},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"description"}})]},proxy:!0}]),model:{value:e.ingreso.nombre,callback:function(t){e.$set(e.ingreso,"nombre",t)},expression:"ingreso.nombre"}}),a("br"),a("q-input",{attrs:{color:"green",label:"Fecha y hora",required:"",rules:[function(e){return!!e||"Tienes que llenar este campo"}]},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{mask:"YYYY-MM-DD HH:mm"},model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}})],1)],1)]},proxy:!0},{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"access_time"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-time",{attrs:{mask:"YYYY-MM-DD HH:mm",format24h:""},model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}})],1)],1)]},proxy:!0}]),model:{value:e.fecha,callback:function(t){e.fecha=t},expression:"fecha"}}),a("br"),a("q-btn",{staticClass:"full-width",attrs:{label:"Agregar",type:"submit",color:"positive"}})],1),a("br"),a("q-table",{staticClass:"table",attrs:{dense:e.$q.screen.lt.md,data:e.data,columns:e.columns,"row-key":"name"},scopedSlots:e._u([{key:"body",fn:function(t){return[a("q-tr",{attrs:{props:t}},[a("q-td",{key:"nombre",attrs:{props:t}},[e._v("\n                    "+e._s(t.row.nombre)+"\n                  ")]),a("q-td",{key:"valor",attrs:{props:t}},[e._v("\n                    "+e._s(e.miles(t.row.valor))+"\n                  ")]),a("q-td",{key:"fecha",attrs:{props:t}},[e._v("\n                    "+e._s(t.row.fecha)+"\n                  ")]),a("q-td",{key:"ops",attrs:{props:t}},[a("a",{staticClass:"text-red",staticStyle:{cursor:"pointer",padding:"5px"},on:{click:function(a){return e.del(t.row.id)}}},[a("q-icon",{attrs:{size:"md",name:"delete"}}),a("q-tooltip",{attrs:{delay:1e3,offset:[0,10]}},[e._v("eliminar")])],1)])],1)]}}])})],1),a("div",{staticClass:"col-1"})])])},oe=[],re={name:"ingresos",mixins:[d],data:function(){return{ingreso:{},data:[],columns:[{name:"nombre",align:"center",label:"Nombre",field:"nombre",sortable:!0},{name:"valor",align:"center",label:"Valor",field:"valor",sortable:!0},{name:"fecha",align:"center",label:"Fecha",field:"fecha",sortable:!0},{name:"ops",align:"center",label:"Opciones",field:"ops",sortable:!0}],fecha:T["b"].formatDate(Date.now(),"YYYY-MM-DD HH:mm:ss")}},created:function(){this.getData()},methods:{getData:function(){var e=this;return l()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getDataCollection("ingresos","id","desc");case 2:e.data=t.sent;case 3:case"end":return t.stop()}}),t)})))()},save:function(){var e=this;return l()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:""!==e.ingreso.valor&&(e.ingreso.id=Date.now(),e.ingreso.valor=e.ingreso.valor.replace(/\./g,""),e.ingreso.fecha=e.fecha,e.addToCollection("ingresos",e.ingreso),e.data.push(e.ingreso),e.ingreso={},e.ingreso.fecha=T["b"].formatDate(Date.now(),"YYYY-MM-DD HH:mm:ss"));case 1:case"end":return t.stop()}}),t)})))()},milesInput:function(){this.ingreso.valor=this.miles(this.ingreso.valor)},del:function(e){var t=this;return l()(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=t.data.findIndex((function(t){return t.id===e})),t.data.splice(n,1),a.next=4,t.deleteDataCollection("ingresos",e);case 4:case"end":return a.stop()}}),a)})))()}}},se=re,ie=Object(h["a"])(se,ne,oe,!1,null,null,null),le=ie.exports;x()(ie,"components",{QForm:M["a"],QInput:S["a"],QIcon:v["a"],QPopupProxy:Y["a"],QDate:R["a"],QTime:O["a"],QBtn:$["a"],QTable:H["a"],QTr:P["a"],QTd:B["a"],QTooltip:E["a"]});var ce=[{title:"Gastos",icon:"attach_money",link:"gastos"},{title:"Tipos gastos",icon:"article",link:"tipos-gastos"},{title:"Ingresos",icon:"account_balance",link:"ingresos"},{title:"Analisis",icon:"analytics",link:"analisis"}],ue={name:"MainLayout",components:{EssentialLink:k,Gastos:G,TiposGastos:U,Analisis:ae,Ingresos:le},mixins:[d],data:function(){return{leftDrawerOpen:!1,essentialLinks:ce}},props:["view"]},pe=ue,de=a("4d5a"),me=a("e359"),fe=a("65c6"),he=a("6ac5"),be=a("9404"),ge=a("1c1c"),ve=a("09e3"),ye=Object(h["a"])(pe,n,o,!1,null,null,null);t["default"]=ye.exports;x()(ye,"components",{QLayout:de["a"],QHeader:me["a"],QToolbar:fe["a"],QBtn:$["a"],QToolbarTitle:he["a"],QDrawer:be["a"],QList:ge["a"],QItemLabel:y["a"],QPageContainer:ve["a"]})}}]);