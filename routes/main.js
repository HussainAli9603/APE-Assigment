var express = require("express");
var router = express.Router();
var Excavator = require('../data.json');
var axios = require('axios');
var moment = require('moment');
let alert = require('alert'); 



router.get('/',(req,res)=>{
   res.render('Site.html')
})
// router.get('/add-excavator',(req,res)=>{
//   res.render('add_excavaltor.html')
// })
router.post('/add-booking',async (req,res)=>{
  try{
	       let idGen = await Math.floor(11000 + Math.random() * 19000);
         var id = idGen;
         var fullName = req.body.fullName;
         var excavatorModelName = req.body.excavatorModelName;
         var location = req.body.location;
         var startDate = req.body.startDate;
         var endDate = req.body.endDate;

         var options = { weekday: 'long'};
         var today  = new Date(startDate);
         var day = today.toLocaleDateString("en-US", options)
           
         var weekDates= []; 
          for (var i = 1; i <= 7; i++) {
            var d = new Date(moment().day(i));
            var mm = d.getMonth() + 1;
            var dd = d.getDate();
            var yy = d.getFullYear();
            var myDateString = yy + '-' + mm + '-' + dd; //(US)
             
            weekDates.push(myDateString); 
          }
          // weekDates.forEach(function(date){ console.log(date.format());});
        
           
         const fName = await Excavator.excavator.filter(x => x.fullName === req.body.fullName);
         const stDate = await Excavator.excavator.filter(x => x.startDate === req.body.startDate);
         const stDatee = await Excavator.excavator.filter(x => 
         x.fullName === req.body.fullName && x.startDate === req.body.startDate);
         
            if(stDatee.length != 0){
              alert(`Already Booked the ${fullName} in this date!`);
            	res.redirect('/')
            
            }else{
      const staDate = await Excavator.working.filter(x => x.startDate === req.body.startDate);
         if (staDate.length != 0) {
          var data = { all: [] }
          var saves = []
          
          for (var i = 0; i < staDate.length;i++) {
              var save = staDate[i]
              var id = staDate[i].id
                 
              var excavator1;
              var excavator2;
              var excavator3;
              var excavator4;
              var excavator5;

               if(fullName == "Excavator 1"){
                  excavator1 = req.body.location
                }else{
                  excavator1 = staDate[i].excavator1
                }
                if(fullName == "Excavator 2"){
                  excavator2 = req.body.location
                }else{
                  excavator2 = staDate[i].excavator2
                }
                if(fullName == "Excavator 3"){
                  excavator3 = req.body.location
                }else{
                  excavator3 = staDate[i].excavator3
                }
                if(fullName == "Excavator 4"){
                  excavator4 = req.body.location
                }else{
                  excavator4 = staDate[i].excavator4
                }
                if(fullName == "Excavator 5"){
                  excavator5 = req.body.location
                }else{
                  excavator5 = staDate[i].excavator5
                }
                  // console.log(fullName == "Excavator 1")
                  // console.log(staDate[i].excavator1)

                  var dd = saves.push({
                      id:id,
                      startDate:startDate,
                      day:day,
                      excavator1:excavator1, 
                      excavator2:excavator2, 
                      excavator3:excavator3, 
                      excavator4:excavator4, 
                      excavator5:excavator5 
                    })
                    var ddd = {
                      id:id,
                      startDate:startDate,
                      day:day,
                      excavator1:excavator1, 
                      excavator2:excavator2, 
                      excavator3:excavator3, 
                      excavator4:excavator4, 
                      excavator5:excavator5 
                    }
                  // console.log(ddd)
                  // console.log(saves)
                  await axios.put("http://localhost:3003/working/"+id,ddd)
          }
           
         }else{
          
              var excavator1;
              var excavator2;
              var excavator3;
              var excavator4;
              var excavator5;

               if(fullName == "Excavator 1"){
                  excavator1 = req.body.location
                }else{
                  excavator1 = ""
                }
                if(fullName == "Excavator 2"){
                  excavator2 = req.body.location
                }else{
                  excavator2 = ""
                }
                if(fullName == "Excavator 3"){
                  excavator3 = req.body.location
                }else{
                  excavator3 = ""
                }
                if(fullName == "Excavator 4"){
                  excavator4 = req.body.location
                }else{
                  excavator4 = ""
                }
                if(fullName == "Excavator 5"){
                  excavator5 = req.body.location
                }else{
                  excavator5 = ""
                }

              var dddd = {
                id:id,
                startDate:startDate,
                day:day,
                excavator1:excavator1, 
                excavator2:excavator2, 
                excavator3:excavator3, 
                excavator4:excavator4, 
                excavator5:excavator5 
              }
            const newVehicle = await axios.post("http://localhost:3003/working",dddd);
              // console.log("ddddddddddddd",dddd)
              // res.json(dddd)
              res.redirect('/')  
             }
      const weekDate = await Excavator.excavator.filter(x => x.location === req.body.location || x.A === req.body.startDate || x.B === req.body.startDate || x.C === req.body.startDate || x.D === req.body.startDate || x.E === req.body.startDate || x.F === req.body.startDate || x.G === req.body.startDate);
      console.log("ne",weekDate[0])
      if (weekDate.length != 0) {
            var data = { all: [] }
            var saves = []
                  
            for (var i = 0; i < weekDate.length;i++) {
                var save = weekDate[i]
                var id = weekDate[i].id
                console.log(weekDate[i].id)
                //   console.log()
                  var Monday;
                  var Tuesday;
                  var Wednesday;
                  var Thursday;
                  var Friday;
                  var Saturday;
                  var Sunday;

                if(day == "Monday"){
                    Monday = fullName
                  }else{
                    Monday = weekDate[i].monday
                  }
                  if(day == "Tuesday"){
                    Tuesday = fullName
                  }else{
                    Tuesday = weekDate[i].tuesday
                  }
                  if(day == "Wednesday"){
                    Wednesday = fullName
                  }else{
                    Wednesday = weekDate[i].wednesday
                  }
                  if(day == "Thursday"){
                    Thursday = fullName
                  }else{
                    Thursday = weekDate[i].thursday
                  }
                  if(day == "Friday"){
                    Friday = fullName
                  }else{
                    Friday = weekDate[i].friday
                  }
                  if(day == "Saturday"){
                    Saturday = fullName
                  }else{
                    Saturday = weekDate[i].saturday
                  }
                  if(day == "Sunday"){
                    Sunday = fullName
                  }else{
                    Sunday = weekDate[i].sunday
                  }

                    var dd = saves.push({
                        id:id,
                        startDate:startDate,
                        Monday:Monday,
                        Tuesday:Tuesday,
                        Wednesday:Wednesday,
                        Thursday:Thursday,
                        Friday:Friday,
                        Saturday:Saturday,
                        Sunday:Sunday
                      })
                      var iddd = Math.floor(11000 + Math.random() * 19000);
                      for (var i = 0; i < weekDates.length; i++){    
                      var ddddd = {
                        id:id,
                        startDate:startDate,
                        location:location,
                        monday:Monday,
                        tuesday:Tuesday,
                        wednesday:Wednesday,
                        thursday:Thursday,
                        friday:Friday,
                        saturday:Saturday,
                        sunday:Sunday,
                        A: weekDates[0],
                        B: weekDates[1],
                        C: weekDates[2],
                        D: weekDates[3],
                        E: weekDates[4], 
                        F: weekDates[5], 
                        G: weekDates[6], 
                      }
                    }
                    console.log("newwww",ddddd)
                    // console.log(saves)
                    await axios.put("http://localhost:3003/excavator/"+id,ddddd)
                    res.redirect('/') 
                  }
            // -------------------------------------------------------------------
          }else{
            var Monday;
            var Tuesday;
            var Wednesday;
            var Thursday;
            var Friday;
            var Saturday;
            var Sunday;
            // console.log("newwww",weekDate)
      // console.log(weekDate.A == req.body.starDate)

            if(day == "Monday"){
                Monday = fullName
              }else{
                Monday = ""
              }
              if(day == "Tuesday"){
                Tuesday = fullName
              }else{
                Tuesday = ""
              }
              if(day == "Wednesday"){
                Wednesday = fullName
              }else{
                Wednesday = ""
              }
              if(day == "Thursday"){
                Thursday = fullName
              }else{
                Thursday = ""
              }
              if(day == "Friday"){
                Friday = fullName
              }else{
                Friday = ""
              }
              if(day == "Saturday"){
                Saturday = fullName
              }else{
                Saturday = ""
              }
              if(day == "Sunday"){
                Sunday = fullName
              }else{
                Sunday = ""
              }
              for (var i = 0; i < weekDates.length; i++){
              var ddddd = {
                id:Math.floor(11000 + Math.random() * 19000),
                startDate:startDate,
                location:location,
                monday:Monday,
                tuesday:Tuesday,
                wednesday:Wednesday,
                thursday:Thursday,
                friday:Friday,
                saturday:Saturday,
                sunday:Sunday,
                A: weekDates[0],
                B: weekDates[1],
                C: weekDates[2],
                D: weekDates[3],
                E: weekDates[4], 
                F: weekDates[5], 
                G: weekDates[6], 
                } 
              }
                 
                
              const newVehicle = await axios.post("http://localhost:3003/excavator",ddddd);
                // console.log("ddddddddddddd",ddddd)
                // res.json(dddd)
                res.redirect('/')  

              
              
            }
          // res.redirect('/')
    }
  }catch(err){ console.log(err)}
})

router.get('/view-all',async (req,res)=>{

  var allData = [];
   var allExcavaltor = await axios.get("http://localhost:3003/working",{
    params: {
      _page: 1,
      _limit: 31
     }
   })
   var allWeekExcavaltor = await axios.get("http://localhost:3003/working",{
     params:{
       _skip:8
     }
   })
         var weekDates= []; 
          for (var i = 1; i <= 7; i++) {
            var d = new Date(moment().day(i));
            var mm = d.getMonth() + 1;
            var dd = d.getDate();
            var yy = d.getFullYear();
            var myDateString = yy + '-' + mm + '-' + dd; //(US)
             
            weekDates.push(myDateString); 
          }
          console.log(weekDates[0])

const staDate = await Excavator.excavator.filter(x => x.A === weekDates[0]);     
   console.log("ssssssssssssssssssssssssssssssss",staDate)
  //  var byWeekData = staDate.slice(Math.max(staDate.length - 7, 1))
   
   for(var i = 0; i < allExcavaltor.data.length; i++){
    var pushData = allExcavaltor.data[i];
        allData.push(pushData)
   }
        var monthsDates= []; 
          for (var i = 1; i <= 22; i++) {
            var d = new Date(moment().day(i));
            var mm = d.getMonth() + 1;
            var dd = d.getDate();
            var yy = d.getFullYear();
            var myDateString = yy + '-' + mm + '-' + dd; //(US)
             
            monthsDates.push(myDateString); 
          }
   
  res.render('View_all.html',{
    allExcavaltor:allExcavaltor.data,
    staDate:staDate,
    monthsDates:monthsDates
  })

})

router.post('/week',async (req,res)=>{
  var allData = [];
  var allExcavaltor = await axios.get("http://localhost:3003/working",{
   params: {
     _page: 1,
     _limit: 31
    }
  })
  var allWeekExcavaltor = await axios.get("http://localhost:3003/working",{
    params:{
      _skip:8
    }
  })

  var monthsDates= []; 
          for (var i = 1; i <= 28; i++) {
            var d = new Date(moment().day(i));
            var mm = d.getMonth() + 1;
            var dd = d.getDate();
            var yy = d.getFullYear();
            var myDateString = yy + '-' + mm + '-' + dd; //(US)
             
            monthsDates.push(myDateString); 
          }
   
 
  var weekDates= []; 
      for (var i = 1; i <= 7; i++) {
        var d = new Date(moment().day(i));
        var mm = d.getMonth() + 1;
        var dd = d.getDate();
        var yy = d.getFullYear();
        var myDateString = yy + '-' + mm + '-' + dd; //(US)
          
        weekDates.push(myDateString); 
      }
      for(var i = 0; i < allExcavaltor.data.length; i++){
        var pushData = allExcavaltor.data[i];
            allData.push(pushData)
       }

  var weekData = [];
  const staDate = await Excavator.excavator.filter(x => x.A === weekDates[0]);
    console.log(staDate)
   for(var j = 0; j < staDate.length; j++){
    var weekData = staDate[j];
    if(weekData.A === req.body.searchWeek){
        allData.push(weekData)
    }
  }
  res.render('View_all.html',{
    allExcavaltor:allExcavaltor.data,
    staDate:staDate,
    monthsDates:monthsDates
  })

})


module.exports = router;




