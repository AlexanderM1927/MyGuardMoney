(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"9f21":function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));n("d3b7"),n("ac1f"),n("25f0"),n("5319"),n("96cf");var r=n("c973"),a=n.n(r),i=n("cf57"),o=n("4515"),c=n("af0d"),s={data:function(){return{db:{}}},created:function(){this.db=new c["a"]("db")},methods:{addToCollection:function(e,t){this.db.collection(e).add(t).then((function(e){console.log("Agregado")})).catch((function(e){console.log(e)}))},getDataCollection:function(e){var t=arguments,n=this;return a()(regeneratorRuntime.mark((function r(){var a,i,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(a=t.length>1&&void 0!==t[1]?t[1]:"",i=t.length>2&&void 0!==t[2]?t[2]:"",o=[],""!==a||""!==i){r.next=8;break}return r.next=6,n.db.collection(e).get().then((function(e){o=e}));case 6:r.next=10;break;case 8:return r.next=10,n.db.collection(e).orderBy(a,i).get().then((function(e){o=e}));case 10:return r.abrupt("return",o);case 11:case"end":return r.stop()}}),r)})))()},getDataCollectionById:function(e,t){var n=arguments,r=this;return a()(regeneratorRuntime.mark((function a(){var i,o,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(i=n.length>2&&void 0!==n[2]?n[2]:"",o=n.length>3&&void 0!==n[3]?n[3]:"",c=[],""!==i||""!==o){a.next=8;break}return a.next=6,r.db.collection(e).doc({id:t}).get().then((function(e){c=e}));case 6:a.next=10;break;case 8:return a.next=10,r.db.collection(e).doc({id:t}).orderBy(i,o).get().then((function(e){c=e}));case 10:return a.abrupt("return",c);case 11:case"end":return a.stop()}}),a)})))()},deleteDataCollection:function(e,t){var n=this;return a()(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:n.db.collection(e).doc({id:t}).delete().then((function(e){console.log("Delete successful, now do something.")})).catch((function(e){console.log(e)}));case 1:case"end":return r.stop()}}),r)})))()},updateDataOnCollectionById:function(e,t,n){var r=this;return a()(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:r.db.collection(e).doc({id:t}).set(n).then((function(e){r.alert("positive","Datos actualizados correctamente")})).catch((function(e){console.log(e)}));case 1:case"end":return a.stop()}}),a)})))()},deleteDatabase:function(){var e=this;return a()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.db.delete();case 1:case"end":return t.stop()}}),t)})))()},isNumber:function(e){var t=e.replaceAll(".",""),n=t.replaceAll("-","");return/^\d+$/.test(n)},miles:function(e){if(e&&void 0!==e){"number"===typeof e&&(e=e.toString());var t=e.replace(/\./g,"");if(this.isNumber(e)){t=parseInt(t);var n={style:"decimal",useGrouping:!0};t=t.toLocaleString("es",n)}else t="";return t}return""},milesInput:function(e,t){var n=this.miles(e.target.value);e.target.value=n,t.valor=n,this.$emit("input",n)},goTo:function(e){this.$router.push("/"+e).catch((function(e){e._name}))},alert:function(e,t){this.$q.notify({message:t,color:e})},activateLoading:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n={message:e};1===t?n.spinner=i["a"]:2===t&&(n.spinner=o["a"]),this.$q.loading.show(n)},disableLoading:function(){this.$q.loading.hide()},generateRand:function(){return Math.random().toString(36).substr(2)},generateToken:function(){return this.generateRand()+this.generateRand()}}}},b41f:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",[n("div",{staticClass:"q-pa-md"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 container"},[n("q-btn",{staticClass:"full-width",attrs:{label:"Actualizar aplicación",color:"primary"},on:{click:e.updateApp}}),n("br"),n("q-separator"),n("br"),n("q-btn",{staticClass:"full-width",attrs:{label:"Eliminar datos",color:"primary"},on:{click:e.deleteData}}),n("br"),n("q-separator"),n("br"),n("q-btn",{staticClass:"full-width",attrs:{label:"Agregar correo electrónico",color:"primary"},on:{click:e.addEmail}}),n("br"),n("q-separator"),n("br"),n("q-btn",{staticClass:"full-width",attrs:{label:"Eliminar recordatorios",color:"primary"},on:{click:e.deleteReminders}}),n("br"),n("q-separator"),n("br"),e._v("\n            Para agregar esta aplicación en tu dispositivo iOS, presiona el boton del navegador para compartir, y agregarlo a tu pantalla de inicio (Add to Home Screen)\n          ")],1)])])])},a=[],i=(n("e260"),n("d81d"),n("d3b7"),n("e6cf"),n("3ca3"),n("ddb0"),n("96cf"),n("c973")),o=n.n(i),c=n("b496"),s=n("9f21"),l=n("758b"),u={store:function(e){return Object(l["a"])().post("emails",e)},checkIfEmailIsVerfied:function(e){return Object(l["a"])().get("emails"+e.id)},verifyEmail:function(e){return Object(l["a"])().put("emails/"+e.id,e)}},d={name:"expenses",mixins:[s["a"]],data:function(){return{}},created:function(){},methods:{deleteReminders:function(){var e=this,t=JSON.parse(localStorage.getItem("user"));t&&t.token&&c["a"].deleteAllReminders(t.token).then((function(t){e.alert("positive","Se eliminaron los recordatorios vinculados al correo electrónico registrado en la app."),e.disableLoading()})).catch((function(t){e.alert("negative",t.response.data.message),e.disableLoading()}))},updateApp:function(){caches.keys().then((function(e){return Promise.all(e.map((function(e){return caches.delete(e)})))})),location.reload()},deleteData:function(){var e=this;return o()(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.deleteDatabase();case 2:localStorage.removeItem("user"),e.alert("positive","La base de datos fue eliminada exitosamente");case 4:case"end":return t.stop()}}),t)})))()},addEmail:function(){var e=this;this.$q.dialog({title:"Verifica tu correo electrónico",message:"Con tu correo electrónico podrás usar los recordatorios.",prompt:{model:"",type:"email"},cancel:!0,persistent:!0}).onOk(function(){var t=o()(regeneratorRuntime.mark((function t(n){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:r={email:n,token:e.generateToken()},e.activateLoading(),u.store(r).then((function(t){localStorage.setItem("user",JSON.stringify(r)),e.alert("positive","Se envió un correo para verificar tu cuenta, por favor sigue las instrucciones."),e.disableLoading()})).catch((function(t){e.alert("negative",t.response.data.message),e.disableLoading()}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).onCancel((function(){})).onDismiss((function(){}))}}},f=d,p=n("2877"),m=n("9989"),g=n("9c40"),h=n("eb85"),b=n("eebe"),v=n.n(b),w=Object(p["a"])(f,r,a,!1,null,null,null);t["default"]=w.exports;v()(w,"components",{QPage:m["a"],QBtn:g["a"],QSeparator:h["a"]})},b496:function(e,t,n){"use strict";var r=n("758b");t["a"]={store:function(e){return Object(r["a"])().post("reminders",e)},index:function(e){return Object(r["a"])().get("reminders/"+e)},update:function(e){return Object(r["a"])().put("reminders/"+e.id,e)},delete:function(e){return Object(r["a"])().delete("reminders/"+e)},deleteAllReminders:function(e){return Object(r["a"])().delete("reminders-all/"+e)}}}}]);