<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <h1 class="text-3xl font-bold mb-6 text-center">Todo List</h1>

        <!-- Form Tambah -->
        <div class="bg-white shadow-md rounded-lg p-4 mb-6">
            <input
                v-model="newTodo.title"
                type="text"
                placeholder="Judul todo"
                class="border p-2 rounded w-full mb-2"
            />
            <textarea
                v-model="newTodo.description"
                placeholder="Deskripsi (opsional)"
                class="border p-2 rounded w-full mb-2"
            ></textarea>
            <button
                @click="addTodo"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Tambah
            </button>
        </div>

        <!-- Daftar Todo -->
        <div v-if="todos.length" class="space-y-3">
            <div
                v-for="todo in todos"
                :key="todo.id"
                class="flex items-center justify-between bg-white p-4 shadow rounded"
            >
                <div>
                    <h2
                        :class="{
                            'line-through text-gray-400': todo.status,
                            'text-gray-900': !todo.status,
                        }"
                        class="font-semibold text-lg"
                    >
                        {{ todo.title }}
                    </h2>
                    <p class="text-gray-600 text-sm">{{ todo.description }}</p>
                </div>

                <div class="space-x-2">
                    <button
                        @click="toggleStatus(todo)"
                        class="px-3 py-1 rounded text-sm"
                        :class="
                            todo.status
                                ? 'bg-yellow-500 text-white'
                                : 'bg-green-500 text-white'
                        "
                    >
                        {{ todo.status ? "Belum" : "Selesai" }}
                    </button>
                    <button
                        @click="deleteTodo(todo.id)"
                        class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>

        <p v-else class="text-gray-500 text-center">Belum ada todo.</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const API_URL = "http://127.0.0.1:8000/api/todos";

const todos = ref([]);
const newTodo = ref({ title: "", description: "", status: false });

async function getTodos() {
    try {
        const res = await fetch(API_URL);
        todos.value = await res.json();
    } catch (err) {
        console.error("Gagal memuat data:", err);
    }
}

async function addTodo() {
    if (!newTodo.value.title.trim()) return alert("Judul tidak boleh kosong");

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo.value),
    });

    newTodo.value = { title: "", description: "", status: false };
    getTodos();
}

async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    getTodos();
}

async function toggleStatus(todo) {
    await fetch(`${API_URL}/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...todo,
            status: !todo.status,
        }),
    });
    getTodos();
}

onMounted(getTodos);
</script>

<style>
.container {
    max-width: 500px;
    margin: 30px auto;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
input,
textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 12px;
    border-radius: 5px;
    border: 1px solid #ced4da;
}
.btn {
    padding: 8px 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    margin-left: 5px;
}
.btn-primary {
    background-color: #007bff;
    color: white;
}
.btn-success {
    background-color: #28a745;
    color: white;
}
.btn-warning {
    background-color: #ffc107;
    color: black;
}
.btn-danger {
    background-color: #dc3545;
    color: white;
}
.todo-card {
    background: white;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
