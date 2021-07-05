<template>
<section>
    <div class="day-container flex column space-between" :class="{selected:isSelected}" @click="selectDay">
        <div class="date-container flex">
            <p class="day">{{dayToShow}}</p>
            <p>{{dateToShow}}</p>
        </div>
        <div class="flex">
        <div class="flex center">
            <div class="img-container">
                <img :src="url">
        </div>
        <div class="flex column">
            <p class="maxDeg">{{day.maxDeg}}&#176;</p>
            <p class="minDeg">{{day.minDeg}}&#176;</p>
            </div>
        </div>
        <div v-if="isSelected" class="description">{{day.description}}</div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    name:"day-preview",
    props:{
        day:Object,
        selected:Number
    },
    methods:{
        selectDay(){
        this.$emit('selected',this.day.timestamp)
        }
    },
    computed:{
        dayToShow(){
            return new Date(this.day.timestamp).toString().substring(0,3)
        },
        dateToShow(){
            const date=new Date(this.day.timestamp).toString().substring(8,10)
            let suff='th'
            switch (date) {
                case '01':
                    suff='st'
                    break;
                case '02':
                    suff='nd'
                    break;
                default:
                    suff='th'
                    break;
            }
            return date+suff
        },
        isSelected(){
            return (this.day.timestamp===this.selected)
        },
        url(){
            var desc=''
            switch (this.day.description) {
                case 'clear sky':
                    desc='clear_sky'
                    break;
                case 'mist':
                    desc='mist'
                    break;
                case 'few clouds':
                    desc='few_clouds'
                    break;
                case 'broken clouds':
                    desc='few_clouds'
                    break;
                case 'rain':
                    desc='rain'
                    break;
                case 'shower rain':
                    desc='shower_rain'
                    break;
                case 'scattered clouds':
                    desc='scattered_clouds'
                    break;
                case 'thunderstorm':
                    desc='thunderstorm'
                    break;
                case 'snow':
                    desc='snow'
                    break;
            
                default:
                    desc='clear_sky'
                    break;
            }
            return require(`../assets/imgs/weather-icons/png/${desc}.png`)
        }
    },
}
</script>