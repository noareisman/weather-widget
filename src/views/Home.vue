<template>
  <div class="home" :class="bgImg">
    <!-- <h1>{{city}}</h1> -->
    <day-list :days="days"/>
  </div>
</template>

<script>
import dayList from '../components/day-list.vue'
import {weatherService} from '../services/weather.service'

export default {
  name: "Home",
  data(){
    return{
      days:[],
      location:{},
      weather:{},
      city:''
    }
  },
  methods:{
    getEmptyDay(){
      const day={
        timestamp:0, 
        description:'',
        maxDeg:0,
        minDeg:0,
        }
        return day
    },
    setCurrWeek(){
      const days=[]
      const now=Date.now()
      for (var i=0;i<7;i++){
        let day=this.getEmptyDay()
        day.timestamp=now+i*(1000*60*60*24)
        day.maxDeg=this.weather[i].temp.max.toFixed()
        day.minDeg=this.weather[i].temp.min.toFixed()
        day.description=this.weather[i].weather[0].description
        days.push(day)
      }
      return days
    },
    async getLocation() {
      
      return new Promise((resolve, reject) => {

        if(!("geolocation" in navigator)) {
          reject(new Error('Geolocation is not available.'));
        }

        navigator.geolocation.getCurrentPosition(pos => {
          resolve(pos);
        }, err => {
          reject(err);
        });
      });
    },
    async locateMe() {
      this.gettingLocation = true;
      try {
        this.gettingLocation = false;
        let location = await this.getLocation();
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        // this.getAddress()//require billing
        this.getWeather()
      } catch(e) {
        this.gettingLocation = false;
        this.errorStr = e.message;
      }
    },
    async getAddress(){
     this.city=await weatherService.getMyAddress(this.location.lat,this.location.lng)
     console.log(this.city);

    },
    async getWeather(){
      this.weather=await weatherService.getWeather(this.location.lat,this.location.lng)
    this.days=this.setCurrWeek()
    }
  },
  computed:{
    bgImg(){
      let now=new Date()
      return (now.getHours()>19 || now.getHours()<6)?'night':'daytime'
    }
  },
  async created(){
    await this.locateMe()

  },
  components:{
    dayList
  },
};
</script>
