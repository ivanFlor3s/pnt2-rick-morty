<template>
    <div class="row">
        <div class="col-12">
            Turno de : {{ jugador1.esMiTurno ? jugador1.nombre : jugador2.nombre }}
        </div>
    </div>
    <div class="row">
        <div class="col-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ jugador1.nombre }}</h5>
                    <p class="card-text">{{ jugador1.stamina }}</p>
                    <img class="m-3" v-if="jugador1.stamina > 10000"
                        src="https://media.tenor.com/qsvNX-PZDLkAAAAC/simpsons-jewels.gif" alt="homer">

                    <div class="d-flex gap-3" v-if="jugador1.esMiTurno && juegoActivo">
                        <button class="btn btn-danger" @click="lastimar(jugador2)">Lastimar</button>
                        <button class="btn btn-success" @click="curar(jugador1, 10)">Curarse</button>
                        <button class="btn btn-outline-primary" @click="curar(jugador1, 100000)">Vivir de angular</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ jugador2.nombre }}</h5>
                    <p class="card-text">{{ jugador2.stamina }}</p>
                    <img class="m-3" v-if="jugador2.stamina > 10000"
                        src="https://media.tenor.com/qsvNX-PZDLkAAAAC/simpsons-jewels.gif" alt="homer">

                    <div class="d-flex gap-3" v-if="jugador2.esMiTurno && juegoActivo">
                        <button class="btn btn-success" @click="lastimar(jugador1)">Lastimar</button>
                        <button class="btn btn-danger" @click="curar(jugador2)">Curarse</button>
                        <button class="btn btn-outline-primary" @click="curar(jugador2, 100000)">Vivir de angular</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row m-5" v-if="!juegoActivo">
        <h1 class="text-center">
            El ganador es

            <br>
            {{ jugador1.stamina > jugador2.stamina ? jugador1.nombre : jugador2.nombre }}
        </h1>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import JSConfetti from 'js-confetti'


const jsConfetti = new JSConfetti()

interface Jugador {
    stamina: number,
    nombre: string,
    esMiTurno: boolean
}

const lastimar = (jugador: Jugador) => {
    var numeroAleatorio = Math.floor(Math.random() * 15) + 5;
    accionar(jugador, -numeroAleatorio)
    jsConfetti.addConfetti({
        emojis: [ '💥'],
    })
}

const curar = (jugador: Jugador, cant?: number) => {
    var numeroAleatorio = Math.floor(Math.random() * 20) + 1;
    if(cant){
        jsConfetti.addConfetti({
        emojis: [ '💰','💸','💵'],
    })
    }else {
        jsConfetti.addConfetti({
           emojis: ['💖']
        })

    }
       
    accionar(jugador, cant || numeroAleatorio)
}

const accionar = (jugador: Jugador, valor: number) => {
    jugador.stamina = jugador.stamina + valor
    jugador1.value.esMiTurno = !jugador1.value.esMiTurno
    jugador2.value.esMiTurno = !jugador2.value.esMiTurno
}

const jugador1 = ref<Jugador>({
    nombre: '',
    stamina: 50,
    esMiTurno: false
})
const jugador2 = ref<Jugador>({
    nombre: '',
    stamina: 80,
    esMiTurno: false
})
onMounted(() => {
    jugador1.value.nombre = 'Eduardo'
    jugador1.value.esMiTurno = true
    jugador2.value.nombre = 'Ricardo'
});

const juegoActivo = computed(() => {
    return (jugador1.value.stamina > 0 && jugador2.value.stamina > 0)
});

watch(juegoActivo, (value)=>{
    if(!value){
        jsConfetti.addConfetti({
        emojis: ['🌈', '⚡️', '💥', '✨', '💫'],
    })
    }
})
</script>