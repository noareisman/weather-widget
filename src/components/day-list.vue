<template>
    <ul class="list-container flex align-end">
      <li v-for="day in days" :key="day.timestamp"  value="day" class="clean-list">
        <day-preview  :day="day" @selected="setSelect" :selected="selected"/>
      </li>
    </ul>
</template>

<script>
import dayPreview from "../components/day-preview.vue"
export default {
    name:"day-list",
    props:{
      days:Array
    },
    data(){
      return{
        selected:0
      }
    },
    methods:{
      setSelect(selectedDayTimestamp){
        this.selected=selectedDayTimestamp
      }
    },
    components:{
      dayPreview
    },
    created(){
      setTimeout(() => {
        this.setSelect(this.days[0].timestamp)
        
      }, 300);
    }
}
</script>