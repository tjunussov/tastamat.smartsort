import Vue from 'vue'
import {$smartsort,$http,$device} from '@/store/api/http'

const state = {
  sortplan:null,
  barcode:null,
  color:null,
  response:null,
  closeResponse:null,
  loginResponse:null,
  error:null,
  calibrating:false,
  selected:null,
  status:null,
  index:null,
  demoBarcodes:null
}

// getters
const getters = {
  getColor : (state,getters) => state.color,
  getSessionBColor: (state,getters) => kase(state.color,{'G':'success','B':'primary','random':'dark'},'danger'),
  config : (state,getters) => getters.getSettingsSelected,  
  getBags : (state,getters) => getters.getSettingsSelected?getters.getSettingsSelected.bags:null,
  getConfig : (state,getters) => getters.config,
  getSortplan : (state) => state.sortplan,
  getBarcode : (state) => state.barcode,
  getDepcode : (state,getters) => getters.config?getters.config.depcode:null,
  getLedOn : (state,getters) => getters.config?getters.config.isLedOn:null,
  getDemo : (state,getters) => getters.config?getters.config.isDemo:null,
  getDemoBarcodes: (state) => state.demoBarcodes,
  getCalibrating : (state) => state.calibrating,
  getStatus : (state) => state.status,
  getUser : (state,getters) => getters.config?getters.config.user:null,
  getError : (state) => state.error,
  getResponse : (state) => state.response,
  
  getCloseResponse : (state) => state.closeResponse,
  getLoginResponse : (state) => state.loginResponse,
  
  getSelected : (state) => state.selected,
  getWeight : (state,getters) => { 
    if(getters.getSelectedBag)
      return Object.values(getters.getSelectedBag.wpi).reduce((t,k)=> t + (k.weight?k.weight:0),0)
    else return null
  },  
  getLastBag: (state,getters) => {
    if(getters.config.bags)
      return getters.config.bags[getters.config.bags.length - 1];
    return null
  },
  getSelectedBag: (state,getters) => {
    if(state.selected) return getters.getBags[getters.cursor]
  },
  cursor : (state,getters) => {
    if(state.selected) return getters.getBags.findIndex((key)=>{return state.selected == key.ppi})
  },
  thor : (state,getters) => {
      if(typeof getters.cursor !== 'undefined') return  Math.floor(getters.cursor/24)
  },
  bagMetaData : (state,getters) => {
    if(getters.getSelectedBag){
      return getters.getSelectedBag.wpi[Object.keys(getters.getSelectedBag.wpi)[0]]
    }
  }

}

// actions
const actions = {
  $onHydrated({ commit, dispatch, state, getters }){
    dispatch('settingsSelect',getters.getSettings[0]);
    if(!getters.getBags) dispatch('$initBags');
    dispatch('$initSettings');
  },
  $initSettings({ commit, dispatch, state, getters }){

    
    // $http.defaults.baseURL = getters.config.apiUrl;


    // $device.defaults.baseURL = getters.config.ledUrl;

    // no led if timeout
    $device.init(getters.config.leds,getters.config.size,getters.getLastBag.led,(error)=>{
      // console.error('ErroZZZ',error ) 
      // if (error == 'Error: timeout of 1000ms exceeded') getters.config.isLedOn = false;
    });


    // $device.defaults.timeout = 1000;
    // $device.interceptors.response.use(function (response) {
    //   return response;
    // }, function (error) {
    //   console.error('ErroZZZ',error ) 
    //   if (error == 'Error: timeout of 1000ms exceeded') getters.config.isLedOn = false;
    // });
  },
  $initBags ({ commit, dispatch, state, getters }) {

    

      /*getters.getSettings[0].bags = {};
      var size = getters.getSettings[0].size||24;

      for(var i=0; i < size; i++){
        Vue.set(getters.getBags,'#'+i,{})
      }*/

      console.log('initBags',getters.getConfig.size);

      var ledTemplate = [
      3,2,1,0,12,13,14,15,
      7,6,5,4,16,17,18,19,
      11,10,9,8,20,21,22,23];

      getters.getConfig.bags = [...new Array(Number(getters.getConfig.size)||24)].map((x,i) => { 
        return {ppi:'#'+i,led:ledTemplate[i%24],ppn:null,wpi:{},batch:[]}
      });

      getters.getConfig.leds = [...new Array(getters.getConfig.size/24)].map((x,i) => { 
        return '192.168.10.10'
      });
      getters.getLastBag.isErrorBag = true;
  
    // TODO Rewrite to Promise Chain
    /*
    dispatch('salesAdd',cart).then(()=>{

      commit(types.CHECKOUT_CART, cart)
      commit(types.SALE_SEQ_INCREMENT)
      commit(types.FISCALIZE_PENDING)
    })
    */
  },
  $save({ commit, dispatch, state, getters }){
    dispatch('settingsUpdate',getters.getSettingsSelected);
  },
  $clear ({ commit, dispatch, state, getters }) {
    console.debug('clearing');
    state.response = null;
    // state.closeResponse = null; #после закрытия мешка, через 10 сек, удалался ярлык
    state.barcode = null;
    state.status = null;
    state.error = null;
    // state.selected = null; // если очищать selected то если модалка открыта, и если произошла ошибка то он тоже очищается,
  },
  $clearSelected({ commit, dispatch, state, getters }){
    state.selected = null;
  },
  $clearCloseResponse({ commit, dispatch, state, getters }){
    state.closeResponse = null;
  },
  $selectBag({ commit, dispatch, state, getters },{ppi}) {
    return new Promise((resolve,reject)=>{
      try{
        findBag(getters.getBags,ppi);
        state.selected = ppi
        // state.selected.bag = this.bags[ppi];
        state.status = 'selectbag';
        resolve(ppi)
      } catch(e){
        state.error = e
        state.status = 'error';
        reject(e);
      }
    });
  },
  $deselectBag({ commit, dispatch, state, getters }) {
    state.status = 'deselectbag';
    // state.selected = null
    window.setTimeout(()=>{
      state.selected = null
    },50);
  },
  $removeWpi({ commit, dispatch, state, getters },{barcode}){

    console.log('removeWpi',barcode);
    
    if(confirm('Вы уверены что хотите удалить ' + barcode)) {
      Vue.delete(getters.getSelectedBag.wpi,barcode);
      state.status = 'pull';
      dispatch('$save');
    }
  },
  $removeB({ commit, dispatch, state, getters },{b}){

    console.log('removeB',b);
    
    if(confirm('Вы уверены что хотите удалить ' + b)) {
      // Vue.delete(getters.getSelectedBag.batch,b);
      getters.getSelectedBag.batch.splice(b, 1);
      state.status = 'pull';
      dispatch('$save');
    }
  },
  
  $forcePutToBag({ commit, dispatch, state, getters },{barcode}){

    barcode = barcode.toUpperCase().replace(/\s/g,"");

    state.barcode = barcode
    state.status = 'search';

    if(barcode in getters.getSelectedBag.wpi){
      state.status = 'pull';
      Vue.delete(getters.getSelectedBag.wpi,barcode);
      dispatch('$save');
    } else {


      var response;

      
      
      return $smartsort.forcePutToBag(state.barcode,getters.getDepcode,getters.getUser?getters.getUser.login:null)
      .then((resp)=>{

        checkUniqueBarcode(getters.getBags,state.barcode);
        response = resp.data
        state.status = 'forcepush';
        console.log('2 forcePutToBag barcode',state.barcode,response.parentPostIndex);

        console.log('3 forcePutToBag barcode',barcode,response);
        state.response = response

        var val = {}; val[barcode] = response; val[barcode].forcepush = true;
        var currentVal = getters.getSelectedBag.wpi;
          val = {...val,...currentVal};
        Vue.set(getters.getSelectedBag,'wpi',val)

        dispatch('$save');

        return response;

      }).catch((error)=>{
        state.status = 'error';
        response = {error};
        state.error = error.message?error.message:error.resultInfo;
      });

      
    }

  },
  $putToBag ({ commit, dispatch, state, getters },{barcode,color}) {

      dispatch('$clear');

      barcode = barcode.toUpperCase().replace(/\s/g,"");

      state.barcode = barcode
      state.status = 'search';


      // console.log('$smartsort.putToBag',state.barcode,state.depcode,state.user);

      //$http.get(this.barcode).then((resp)=>{
      return $smartsort.putToBag(state.barcode,getters.getDepcode,getters.getUser?getters.getUser.login:null)
      .then((resp)=>{

        // console.log('putToBag',resp);

        resp = resp.data 

        // console.log('1 ZputToBag barcode',state.barcode,resp.parentPostIndex);

        // checking if bag is found in plan
        checkUniqueBarcode(getters.getBags,state.barcode);
        // findBag(getters.getBags,resp.parentPostIndex,state.barcode);

        state.response = resp
        state.status = 'push';

        dispatch('$selectBag',{ppi:resp.parentPostIndex}).then(()=>{
           Vue.set(getters.getSelectedBag.wpi,barcode,resp)
        })




        // state.selected = resp.parentPostIndex
        // ложим посылку в корзину


        // console.log('2 ZputToBag barcode',state.barcode,state.selected);

        //////////////// ARRAY MANAGMENT

        /*    var val = {}; val[barcode] = resp;

            var pos = getters.cursor;

            if(pos > -1){
              var currentVal = getters.getSelectedBag.wpi;
              val = {...val,...currentVal};
            } else {
              pos = renameEmptyKey(getters.getBags,state.selected);
            }

            var bag = getters.getBags[pos];

            Vue.set(bag,'wpi',val)
            Vue.set(bag,'selected',color)

            bag = null;

        */

        dispatch('$save');


        /////////////


        return resp;

      }).catch((error)=>{
        state.status = 'error';
        state.error = error.message?error.message:error;

        // console.log('errorzzz',error);

        var val = {}; val[barcode] = state.error;
        var currentVal = getters.getLastBag.wpi;
            val = {...val,...currentVal};
        Vue.set(getters.getLastBag,'wpi',val)
        dispatch('$save');

        throw error;
        // this.status = 'notfound';
        // this.status = 'notbind';
        // this.status = 'notfoundnextplan';
      });

    // TODO Rewrite to Promise Chain
    /*
    dispatch('salesAdd',cart).then(()=>{

      commit(types.CHECKOUT_CART, cart)
      commit(types.SALE_SEQ_INCREMENT)
      commit(types.FISCALIZE_PENDING)
    })
    */

        
  },
  $formBag ({ commit, dispatch, state, getters },{ppi,wpi,weight,sendmeth,plomba,bagType,taraType,comment}) {

    console.debug('formBag',ppi,wpi,weight,sendmeth,plomba,bagType,taraType,comment);

    // weight = String(weight).replace(".","").replace(",","");
    weight = (Number(weight)*1000).toFixed(0);


    return $smartsort.formBag(
        ppi,wpi,weight,String(sendmeth),getters.getDepcode,getters.getUser.login,String(plomba),
        String(bagType),String(taraType),comment
        ).then((resp)=>{

        state.closeResponse = resp.data

        // Печатаем на принтере
        // $leds.$printBag(document.getElementById('bagPrintData').innerText);

        Vue.set(getters.getSelectedBag,'wpi',{})
        Vue.set(getters.getSelectedBag,'closeResponse',state.closeResponse)

        // Vue.set(getters.getSelectedBag,'batch',{})
        
        // state.selected = ppi
        state.status = 'formbag';
        dispatch('$save');

        return resp.data
        
      }).catch((error)=>{
        console.error('error',error);
        state.status = 'error';
        state.error = error.response?error.response.data:error.message||error
        return Promise.reject(state.error);
        // state.closeResponse = error.response?error.response.data:{"error":"catch"}
      });

    
  },
  $formBagByPacklist({ commit, dispatch, state, getters },{ppi,packList,weight,sendmeth,plomba,bagType,taraType,comment}) {

    console.debug('formBagByPacklist',ppi,packList,weight,sendmeth,plomba,bagType,taraType,comment);

    // weight = String(weight).replace(".","").replace(",","");
    weight = (Number(weight)*1000).toFixed(0);


    return $smartsort.formBagByPacklist(
        ppi,packList,weight,String(sendmeth),getters.getDepcode,getters.getUser.login,String(plomba),
        String(bagType),String(taraType),comment
        ).then((resp)=>{

        console.log(resp.data);

        state.closeResponse = resp.data

        // Печатаем на принтере
        // $leds.$printBag(document.getElementById('bagPrintData').innerText);

        Vue.set(getters.getSelectedBag,'batch',[])
        Vue.set(getters.getSelectedBag,'closeResponse',state.closeResponse)

        // Vue.set(getters.getSelectedBag,'batch',{})
        
        // state.selected = ppi
        state.status = 'formbagbypacklist';
        dispatch('$save');

        return resp.data
        
      }).catch((error)=>{
        console.error('error',error);
        state.status = 'error';
        state.error = error.response||error.message||error
        return Promise.reject(state.error);
        // state.closeResponse = error.response?error.response.data:{"error":"catch"}
      });

    
  },
  $formB({ commit, dispatch, state, getters },{ppi,wpi}) {

    // weight = String(Number(weight)*1000);

    console.debug('formB',ppi,wpi,wpi.length);

    return $smartsort.formB(
        ppi,wpi,wpi.length,String(getters.getWeight),getters.getDepcode,getters.getUser.login
        ).then((resp)=>{

          // var val = {}; val[resp.data.packetListNo] = resp.data;
          // var currentBatchVal = getters.getSelectedBag.batch;
          //   val = {...val,...currentBatchVal};

          // Vue.set(getters.getSelectedBag,'batch',val)

          if(getters.getSelectedBag.batch == null) getters.getSelectedBag.batch = [];

          getters.getSelectedBag.batch.push(resp.data);
          Vue.set(getters.getSelectedBag,'wpi',{})

          state.response = resp.data
          state.status = 'formb';
          dispatch('$save');

          return resp.data
        }).catch((error)=>{
          console.error('error',error);
          state.status = 'error';
          state.error = error.response||error.message||error
          return Promise.reject(state.error);
          // state.closeResponse = error.response?error.response.data:{"error":"catch"}
      });

  },
  $fillBags ({ commit, dispatch, state, getters },{plan}) {
      /*Object.entries(plan).forEach((k)=>{
        renameEmptyKey(getters.getBags,k[0])
        // getters.getBags[k[0]] = {toIndex:k[1]};
      });*/
      // var bags = new Array();
      
      // plan.forEach((item,i)=>{
      //   return bags.push({ppi:item.techindex,led:null,ppn:item.nameRu,wpi:{}});
      // })

      var bags = getters.getConfig.bags;

      bags.forEach((item,i)=>{
        if(plan[i]) getters.getConfig.bags[i] = { ...item, ppi:plan[i].techindex,ppn:plan[i].nameRu, wpi:{} };
      }),

      dispatch('$save');

  },
  $fetchSortplan({ commit, dispatch, state, getters },{depcode}){
    return $smartsort.sortplan(depcode).then((resp)=>{
      state.sortplan = resp.data.parentPostIndexes
      console.log("sortplan",state.sortplan)
      Vue.set(getters.getConfig,'sortplan',state.sortplan);
      dispatch('$save');
      return resp;
    }).catch((error)=>{
      state.sortplan = null
      state.status = 'error';
      state.error = error;
      throw error;
    });
  },
  $login({ commit, dispatch, state, getters },{user}){
    return $smartsort.auth(user,getters.getDepcode).then((resp)=>{
       console.log('login',user,getters.getDepcode,resp);
       state.status = 'login';
       Vue.set(getters.getConfig,'user',{login:user,name:resp.data.name});
       dispatch('$save');
    }).catch((error)=>{
      state.status = 'error';
      state.loginResponse = error;
      throw error;
    });
  },
  $logout({ commit, dispatch, state, getters }){
      Vue.set(getters.getConfig,'user',null);
      state.status = 'logout';
      dispatch('$save');
  },
  $fetchDemoRPO({ commit, dispatch, state, getters }){
    return $smartsort.fetchDemoRPO(getters.getDepcode).then((resp)=>{
       state.demoBarcodes = resp.data.mails;
       console.log('fetchRPO',state.demoBarcodes);
    }).catch((error)=>{
      state.status = 'error';
      state.error = error;
      throw error;
    });
  },
  $registerDepcode({ commit, dispatch, state, getters },{depcode}){
    getters.getConfig.depcode = depcode;
    console.log('$registerdepcode',depcode);
    state.status = 'registerpoint';
    dispatch('$save');
    dispatch('$fetchSortplan',{depcode});
    
  },
  $togleDemo({ commit, dispatch, state, getters },{val}){
    // console.log('togleDemo',val)
    // console.log('demo1',val,getters.getConfig.isDemo);
    if(val !== undefined)
      getters.getConfig.isDemo = val
    else
      getters.getConfig.isDemo = !getters.getConfig.isDemo;
    // console.log('demo2',val,getters.getConfig.isDemo);
    return dispatch('$save');

  },
  $togleLed({ commit, dispatch, state, getters },{val}){
    if(val !== undefined)
      getters.getConfig.isLedOn = val
    else 
      getters.getConfig.isLedOn = !getters.getConfig.isLedOn;

    return dispatch('$save');
  },
  $setColor({ commit, dispatch, state, getters },color){
    console.log('$setColor',color);
      state.color = color
  },
  $remapPpi({ commit, dispatch, state, getters },{i,ppi}){

    console.debug('calibrateMapBagBarcode',ppi,i);

    Vue.set(getters.getConfig.bags[i],'ppi',ppi);

    state.status = 'bindinline';

    if(getters.getConfig.sortplan){
      var ppn = getters.getConfig.sortplan.find((k)=>{
        return k.techindex == ppi
      })
      if(ppn)
        Vue.set(getters.getConfig.bags[i],'ppn',ppn.nameRu);
      else
        console.debug('calibrateMapBagBarcode not found ppi in sortplan',ppi);
    }

  }
  // $remapSelectedBag({ commit, dispatch, state, getters },{ppi,led}){
  //   // findBag(getters.getBags,ppi);// just for check
  //   console.log('remapSelectedBag',getters.getSelectedBag,led)
  //   getters.getSelectedBag.led = led
  //   getters.getSelectedBag.ppi = ppi
  //   dispatch('$saveConfig');
  // },


}

// mutations
const mutations = {
  ['PUSH_TO_BAG'] (state,ppi,barcode,data) {

  },
  ['CLEAR_BAG'] (state,ppi) {
    Vue.set(state.bags,ppi,{})
  }
}

function findBag(bags,ppi,barcode){
  var indx = bags.findIndex((key)=> ppi == key.ppi );
  if(indx < 0) indx = renameEmptyKey(bags,ppi) // Пытаюсь найти свободную ячейку
  if(indx < 0) throw `Индекс назначения ${ppi} не привязан ни к одной корзине!`;
  return indx
}

function checkUniqueBarcode(bags,barcode){
  console.debug('checkUniqueBarcode',barcode);
  bags.every((key)=> {
    if(key.wpi[barcode]) {
      console.debug('found dublicate checkUniqueBarcode-->',key.wpi,barcode,key.wpi[barcode])
      throw `Отправление ${barcode} уже лежит в ячейке ${key.ppi} !`;
    }
    return true;
  });
}


function renameEmptyKey(obj,newKey){
  var indx = obj.findIndex((e)=>{return e.ppi.startsWith('#')})
  if(indx > -1) {
    obj[indx].ppi = newKey
  }
  return indx
}


function kase(val,map,els){
  console.log('kase',val);
  if(val)
    return map[val] || els;
  else 
    return els;
}
  // return {

export default {
    state,
    getters,
    actions,
    mutations
  }