<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <h1 class="text-3xl font-bold mb-6">📋 Todo App</h1>

        <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <input
                v-model="title"
                type="text"
                placeholder="Judul todo"
                class="w-full p-2 border rounded mb-2"
            />
            <textarea
                v-model="description"
                placeholder="Deskripsi"
                class="w-full p-2 border rounded mb-2"
            ></textarea>
            <button
                @click="addTodo"
                class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
            >
                Tambah Todo
            </button>
        </div>

        <ul class="mt-6 w-full max-w-md">
            <li
                v-for="todo in todos"
                :key="todo.id"
                class="bg-white flex justify-between items-center p-3 rounded shadow mb-2"
            >
                <span>{{ todo.title }} - {{ todo.description }}</span>
                <button
                    @click="deleteTodo(todo.id)"
                    class="text-red-500 hover:text-red-700 font-semibold"
                >
                    Hapus
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const API_URL = "http://127.0.0.1:8000/api/todos";

const todos = ref([]);
const title = ref("");
const description = ref("");

async function getTodos() {
    const res = await fetch(API_URL);
    todos.value = await res.json();
}

async function addTodo() {
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title.value,
            description: description.value,
            status: false,
        }),
    });
    title.value = "";
    description.value = "";
    getTodos();
}

async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    getTodos();
}

onMounted(() => {
    getTodos();
});
</script>

<style>
body {
    font-family: "Inter", sans-serif;
}
</style>
