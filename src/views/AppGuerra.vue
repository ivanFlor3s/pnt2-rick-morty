<template>
    <div class="row">
        <div class="col-6">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">{{ jugador1.nombre }}</h5>
                    <p class="card-text">{{ jugador1.stamina }}</p>
                    <img class="m-3" v-if="jugador1.stamina > 10000" src="https://media.tenor.com/qsvNX-PZDLkAAAAC/simpsons-jewels.gif" alt="homer">

                    <div class="d-flex gap-3">
                        <button class="btn btn-danger" @click="lastimar(jugador2)">Lastimar</button>
                        <button class="btn btn-success" @click="curar(jugador1, 10)">Curarse</button>
                        <button class="btn btn-outline-primary" @click="curar(jugador1, 100000)">Vivir de angular</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">{{ jugador2.nombre }}</h5>
                    <p class="card-text">{{ jugador2.stamina }}</p>
                    <img class="m-3" v-if="jugador2.stamina > 10000" src="https://media.tenor.com/qsvNX-PZDLkAAAAC/simpsons-jewels.gif" alt="homer">

                    <div class="d-flex gap-3">
                        <button class="btn btn-success" @click="lastimar(jugador1)">Lastimar</button>
                        <button class="btn btn-danger" @click="curar(jugador2, 10)">Curarse</button>
                        <button class="btn btn-outline-primary" @click="curar(jugador2, 100000)">Vivir de angular</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Jugador {
    stamina: number,
    nombre: string
}

const lastimar = (jugador: Jugador) => {
    jugador.stamina = jugador.stamina - 10
}

const curar = (jugador: Jugador, cant: number) => {
    jugador.stamina += cant;
}
const jugador1 = ref({
    nombre: '',
    stamina: 99
})
const jugador2 = ref({
    nombre: '',
    stamina: 100
})
onMounted(() => {
    jugador1.value.nombre = 'Eduardo'
    jugador2.value.nombre = 'Ricardo'
});
</script>