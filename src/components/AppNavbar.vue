<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary m-0">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">RickAndMorty</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav gap-3 justify-content-end">
                        <li class="nav-item">
                            <RouterLink to="/">Home</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/about">About</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>