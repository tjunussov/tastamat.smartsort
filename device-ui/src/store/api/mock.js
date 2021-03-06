// import axios from 'axios'
import {$http,$device} from '@/store/api/http'
import MockAdapter from 'axios-mock-adapter'
import { WebSocket, Server } from 'mock-socket';
import Vue from 'vue'


var plan = {
    "result": "success",
    "techindex": "055990",
    "parentPostIndexes": [
        {
            "nameRu": "УОДП-8 г.Алматы",
            "techindex": "800508",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-35",
            "techindex": "050035",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-30",
            "techindex": "050030",
            "isOfficial": false
        },
        {
            "nameRu": "УОиДП №6 г.Алматы",
            "techindex": "800506",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-63",
            "techindex": "050063",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-18",
            "techindex": "050018",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-31",
            "techindex": "050031",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-32",
            "techindex": "050032",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-56",
            "techindex": "050056",
            "isOfficial": false
        },
        {
            "nameRu": "УДОП-3 г.Алматы",
            "techindex": "800503",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-7",
            "techindex": "050007",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-23",
            "techindex": "050023",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-47",
            "techindex": "050047",
            "isOfficial": false
        },
        {
            "nameRu": "УОДП-9 г.Алматы",
            "techindex": "800509",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-40",
            "techindex": "050040",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-19",
            "techindex": "050019",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-46",
            "techindex": "050046",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-5",
            "techindex": "050005",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-8",
            "techindex": "050008",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-17",
            "techindex": "050017",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-52",
            "techindex": "050052",
            "isOfficial": false
        },
        {
            "nameRu": "УДОП 2 г.Алматы",
            "techindex": "800502",
            "isOfficial": false
        },
        {
            "nameRu": "УОиДП-5 г.Алматы",
            "techindex": "800505",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-28",
            "techindex": "050028",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-53",
            "techindex": "050053",
            "isOfficial": false
        },
        {
            "nameRu": "Центр по выдаче почтовых отправлений г.Алматы",
            "techindex": "800510",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-27",
            "techindex": "050027",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-64",
            "techindex": "050064",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-71",
            "techindex": "050071",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-36",
            "techindex": "050036",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-65",
            "techindex": "050065",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-67",
            "techindex": "050067",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-69",
            "techindex": "050069",
            "isOfficial": false
        },
        {
            "nameRu": "УОиДП-7 г.Алматы",
            "techindex": "800507",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-58",
            "techindex": "050058",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-26",
            "techindex": "050026",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-70",
            "techindex": "050070",
            "isOfficial": false
        },
        {
            "nameRu": "УДОП-4 г.Алматы",
            "techindex": "800504",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-9",
            "techindex": "050009",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-6",
            "techindex": "050006",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-38",
            "techindex": "050038",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-62",
            "techindex": "050062",
            "isOfficial": false
        },
        {
            "nameRu": "УД и ПП Алматински почтамт",
            "techindex": "800519",
            "isOfficial": false
        },
        {
            "nameRu": "Алматы-44",
            "techindex": "050044",
            "isOfficial": false
        }
    ]
};

var barcodes = {
    "result": "success",
    "mails": [
        "RN057495927KZ",
        "RN056452942KZ",
        "VS051508534KZ",
        "VS051510422KZ",
        "VS051524435KZ",
        "RN056453157KZ",
        "RN056454461KZ",
        "RN056448982KZ",
        "RN056826874KZ",
        "RN057495900KZ",
        "RN052056946KZ",
        "RN056827605KZ",
        "RN057497137KZ",
        "RN056424456KZ",
        "BP050108725KZ",
        "RN053293249KZ",
        "BP050108901KZ",
        "RN057497168KZ",
        "BP050108760KZ",
        "RN057478314KZ",
        "RN057478623KZ",
        "RN057497239KZ",
        "RN057478376KZ",
        "RN056453072KZ",
        "BP050110410KZ",
        "BP050110162KZ",
        "RN057495799KZ",
        "RR131616464CN",
        "RN056423963KZ",
        "RN051966353KZ",
        "RN052055702KZ",
        "RN056105188KZ",
        "RN056815655KZ",
        "RN056815647KZ",
        "RN052054605KZ",
        "RN056817166KZ",
        "RN056817121KZ",
        "RN052054741KZ",
        "BP050023715KZ",
        "CO053968175KZ",
        "RN053295647KZ",
        "RN052055693KZ",
        "RN052055716KZ",
        "RN052055747KZ",
        "RN052055755KZ",
        "RN052055764KZ",
        "RN052055778KZ",
        "RN053297166KZ",
        "RN052055818KZ",
        "RN052055821KZ",
        "BP050107265KZ",
        "BP050107248KZ",
        "BP050104683KZ",
        "RN051966375KZ",
        "RN051966384KZ",
        "RN051966415KZ",
        "RN051966424KZ",
        "RN051966438KZ",
        "RN056816262KZ",
        "BP050092804KZ",
        "BP050092818KZ",
        "RN051966557KZ",
        "RN053295678KZ",
        "RN053295664KZ",
        "RN057475556KZ",
        "RN057475542KZ",
        "RN057475573KZ",
        "RN057475560KZ",
        "RN056456825KZ",
        "RN053416552KZ",
        "RN056456839KZ",
        "RN053295602KZ",
        "RN056805874KZ",
        "RN055763532KZ",
        "RN056456900KZ",
        "RN051966565KZ",
        "RN051966574KZ",
        "RC053358877KZ",
        "RN056816395KZ",
        "RN056805959KZ",
        "RN053295695KZ",
        "RN053295545KZ",
        "RN056457026KZ",
        "RN056457012KZ",
        "RN056456961KZ",
        "RN056457088KZ",
        "RN056457074KZ",
        "RN053416455KZ",
        "BP050092835KZ",
        "BP050092821KZ",
        "BP050096307KZ",
        "BP050096315KZ",
        "BP050096324KZ",
        "BP050096338KZ",
        "RN052055035KZ",
        "RN056457216KZ",
        "RN056457202KZ",
        "RN056457247KZ",
        "RN056457233KZ",
        "RN056457295KZ"
    ]
};

  
//INFO! dont remove delay respnose, it doesnt workk if removed
export const mock = new MockAdapter($http,{delayResponse:50}) 
// export const mock = new MockAdapter($http)

.onGet('authorize').reply((cfg)=>{

    console.log('authorize',cfg.params);

    if(cfg.params.login == 'test.ast17.sc1')
        return [200,{"result": "success","name": "demo:Мырзанова Гульмира"}];
    else if(cfg.params.login == 'test')
        return [200,{"result": "success","name": "demo:Азамат Алимбаев"}];
    else if(cfg.params.login == 'demo')
        return [200,{"result": "success","name": "demo:Demo Demoаев"}];
    else
        return [200,{"result": "error","resultInfo": "demo:user by login not found"}];
})
.onGet('getRPO').reply((cfg)=>{
    if(cfg.params.techindex == '000000') return [200,{"result": "error","resultInfo": "demo:techindex not found"}];
    return [200,barcodes];
})
.onAny('listBagIndexes').reply((cfg)=>{
    if(cfg.params.techindex == '000000') return [200,{"result": "error","resultInfo": "demo:techindex not found"}];
    return [200,plan];
})
.onAny('findBagIndex').reply(async (cfg)=>{

  var req = cfg.params;
  
  var p = Math.ceil(Math.random()*10) < 5 ? (barcodes.mails.findIndex((k)=> k == req.barcode )%plan.parentPostIndexes.length) : 0;
  if(p<0) p = Math.floor(plan.parentPostIndexes.length * Math.random())

  console.debug('findBagIndex',req, p);

  // return [200,{"result":"error","resultInfo":"TEST TEST "}];

  var resp = 
    {
        "result": "success",
        "parentPostIndex": plan.parentPostIndexes[p].techindex,
        "postIndex": Math.ceil(Math.random()*10000),
        "postIndexTitle": "DEMO Алматы-"+Math.ceil(Math.random()*10),
        "weight":Math.ceil(Math.random()*1000),
        "typeName": "Письмо РК",
        "mailInfo": {
            "mailCategory": "1",
            "mailId": req.barcode,
            "toFullName": "DEMO КАЗ НПУ ИМ АБАЯ ",
            "toStreet": "DEMO ПР ДОСТЫК 13 Г АЛМАТЫ ",
            "mailStatus": "Registered",
            "mailType2": "P101",
            "storagePaymentPaid": false,
            "returnPaymentPaid": false,
            "selfPaymentPaid": false,
            "notices": 0,
            "finMonBlock": false,
            "isPartialRedemption": false
        }
    }


  // if(Vue.prototype.$store.getters.config.mockdelay){
  //   var sleepTime = (Math.random()*1000);
  //   console.debug('DelayingResponse',sleepTime);
  //   await sleep(sleepTime);
  // }

  if((Math.random()*100) < 70)
    return [200,resp];
  else {
    if((Math.random()*100) < 70)
        return [200,{
            "result":Math.ceil(Math.random()*10)>5?"error":"warning",
            "resultInfo":"DEMO:Отправление "+req.barcode+" не относится к сортплану!",
            "weight":Math.ceil(Math.random()*1000),
            "typeName": "Письмо РК",
        }]
    else
        return [200,{result:"error",resultInfo:"DEMO:Отправление "+req.barcode+" не найдено!"}]
  }

}).onAny('formBag').reply((cfg)=>{
  
  var req = JSON.parse(cfg.data);

  console.debug('formBag',req);

  return [200,
  {
    "result": "success",
    "packetListNo": "B20191007"+Math.ceil(Math.random()*10000),
    "labelListNo": "G201910072104795",
    "actualWeight": req.totalWeight,
    "workerName": req.login,
    "fromDepartment": "АФ АО «Казпочта» «Алматинский почтамт»",
    "toDepartment": "Алматы-9",
    "route": req.sendMethod == 1?"Наземный":"Авиа", //delete in future
    "sendMethod": req.sendMethod,
    "date": new Date(),
    "count": req.barcodeList.length,

    "totalWeight": req.totalWeight,
    "fromTechindex": "055990",
    "toTechindex": "050009",
    "techindex": "055990",
    "bagType": req.bagType,
    "taraType": req.taraType,
    "plombaNum": req.plombaNum,
    "comment":'DEMO:'+req.comment
}]}
)
.onAny('formBagByPacklist').reply((cfg)=>{
  
  var req = JSON.parse(cfg.data);

  console.debug('formBagByPacklist',req);

  // return [200,{"result":"error","resultInfo":"Общий вес не введён!"}];

  return [200,
  {
    "result": "success",
    "labelListNo": "G2020"+Math.ceil(Math.random()*100000),
    "actualWeight": req.totalWeight,
    "workerName": req.login,
    "date": new Date(),
    "count": req.packetList.length,
    "packetListCount":req.packetList.length,
    "toTechindex": "050009",
    "toDepartment": "Алматы-9",
    

    "totalWeight": req.totalWeight,
    "fromTechindex": "055990",
    "techindex": "055990",
    "fromDepartment": "АФ АО «Казпочта» «Алматинский почтамт»",
    "route": req.sendMethod == 1?"Наземный":"Авиа", //delete in future
    "sendMethod": req.sendMethod,
    "bagType": req.bagType,
    "taraType": req.taraType,
    "plombaNum": req.plombaNum,
    "comment":'DEMO:'+req.comment
}]}
)
.onAny('formPacketList').reply((cfg)=>{
  
  var req = JSON.parse(cfg.data);

  console.debug('formPacketList',req);

  // return [200,{"result":"error","resultInfo":"Общий вес не введён!"}];

  return [200,
  {
    "packetListNo": "B20201007"+Math.ceil(Math.random()*10000),
    "workerName": req.login,
    "date": new Date(),
    "totalWeight": "10000",

    "actualWeight": 42,
    "fromDepartment": "АФ АО «Казпочта» «Алматинский почтамт»",
    "toDepartment": "Алматы-40",
    "fromTechindex": "055990",
    "toTechindex": "050040",
    "comment": "",

    "result": "success",
    "count": req.barcodeList.length,
    "techindex": "055990"
}]}
)
.onAny().reply((cfg)=>{

  var req = cfg.params;
  console.debug("Mock any",req);

  return [500,{error:"DEMO:Mock no rule found"}]

})


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockDevices = [];

$device.onInit = (axioses)=>{

  console.debug('$device.onInit',axioses);

  axioses.forEach((v,i)=>{
    mockDevices[i] = new MockAdapter(v).onAny().reply((cfg)=>{
      console.debug('led mock received ' + i,cfg.url,cfg.params);
      Vue.$bus.$emit('mock:led',cfg.params,i);
      return [200,null];
    })
  });
};



/////////////////////////////


export const $wsmock = {
  socket:null,
  enable(url){
    var $mockServer = new Server(url);
    window.WebSocket = WebSocket; // Here we stub out the window object

    $mockServer.on('connection', socket => {
      this.socket = socket
      console.log("started mock socket demo",socket);
      this.socket.on('close',() => {
        console.log("stopping mock socket demo");
        this.socket = null;
      });
      this.socket('data',(m)=>{
        this.send('/',m);
      })
    });
  },
  demo(){
    console.log('demo');
  }
}


