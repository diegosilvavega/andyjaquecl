<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Header -->
    <header class="bg-gray-800 border-b border-gray-700">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="text-yellow-400 hover:text-yellow-300">
              ← Volver al Panel
            </NuxtLink>
            <h1 class="text-2xl font-capture text-yellow-400">
              GESTIÓN DE PRECIOS
            </h1>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="text-yellow-400 text-4xl mb-4">💰</div>
        <p class="text-gray-300">Cargando precios...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-600/20 border border-red-500 rounded-xl p-6 mb-8">
        <p class="text-red-400">{{ error }}</p>
        <button 
          @click="loadPrices" 
          class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-capture"
        >
          Reintentar
        </button>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Quick Stats -->
        <section class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Cursos Activos</p>
                  <p class="text-2xl font-bold text-white">{{ priceStats.activeCourses }}</p>
                </div>
                <div class="text-blue-400 text-2xl">🎹</div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Servicios Activos</p>
                  <p class="text-2xl font-bold text-green-400">{{ priceStats.activeServices }}</p>
                </div>
                <div class="text-green-400 text-2xl">🎵</div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Descuento Promedio Cursos</p>
                  <p class="text-2xl font-bold text-purple-400">{{ priceStats.avgCourseDiscount }}%</p>
                </div>
                <div class="text-purple-400 text-2xl">🎯</div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Descuento Promedio Servicios</p>
                  <p class="text-2xl font-bold text-orange-400">{{ priceStats.avgServiceDiscount }}%</p>
                </div>
                <div class="text-orange-400 text-2xl">⚡</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Tabs -->
        <div class="mb-8">
          <div class="bg-gray-800 rounded-xl p-2 inline-flex space-x-2">
            <button
              @click="activeTab = 'courses'"
              :class="[
                'px-6 py-3 rounded-lg font-capture text-sm transition-all duration-300 relative overflow-hidden',
                activeTab === 'courses'
                  ? 'bg-yellow-400 text-black shadow-lg transform scale-105'
                  : 'text-gray-100 bg-transparent hover:text-yellow-300 hover:bg-gray-700/50'
              ]"
            >
              <span class="relative z-10 flex items-center space-x-2">
                <span>🎹</span>
                <span>CURSOS</span>
                <span class="bg-black/20 text-xs px-2 py-1 rounded-full">{{ coursePrices.length }}</span>
              </span>
            </button>
            <button
              @click="activeTab = 'production'"
              :class="[
                'px-6 py-3 rounded-lg font-capture text-sm transition-all duration-300 relative overflow-hidden',
                activeTab === 'production'
                  ? 'bg-yellow-400 text-black shadow-lg transform scale-105'
                  : 'text-gray-100 bg-transparent hover:text-yellow-300 hover:bg-gray-700/50'
              ]"
            >
              <span class="relative z-10 flex items-center space-x-2">
                <span>🎵</span>
                <span>PRODUCCIÓN</span>
                <span class="bg-black/20 text-xs px-2 py-1 rounded-full">{{ productionServices.length }}</span>
              </span>
            </button>
          </div>
        </div>

        <!-- Courses Tab -->
        <section v-if="activeTab === 'courses'" class="bg-gray-800 rounded-xl border border-gray-700">
          <div class="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 class="text-xl font-capture text-yellow-400">Precios de Cursos</h2>
            <button
              @click="openCourseModal()"
              class="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-capture font-bold transition-colors"
            >
              ➕ NUEVO CURSO
            </button>
          </div>

          <div class="p-6">
            <div v-if="coursePrices.length === 0" class="text-center py-12">
              <div class="text-gray-400 text-4xl mb-4">🎹</div>
              <p class="text-gray-400 mb-4">No hay cursos registrados</p>
              <button
                @click="openCourseModal()"
                class="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-colors"
              >
                ➕ CREAR PRIMER CURSO
              </button>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="course in coursePrices"
                :key="course.id"
                class="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-yellow-400/50 transition-colors"
              >
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-capture text-white mb-1">{{ course.name }}</h3>
                    <p class="text-sm text-gray-400">{{ course.description }}</p>
                  </div>
                  <div class="flex items-center space-x-1">
                    <span 
                      v-if="course.isPopular"
                      class="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded text-xs font-capture"
                    >
                      Popular
                    </span>
                    <span 
                      :class="course.isActive ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'"
                      class="px-2 py-1 rounded text-xs font-capture"
                    >
                      {{ course.isActive ? 'Activo' : 'Inactivo' }}
                    </span>
                  </div>
                </div>

                <div class="mb-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-500 line-through">{{ formatPrice(course.originalPrice) }}</span>
                    <span class="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">-{{ course.discountPercentage }}%</span>
                  </div>
                  <div class="text-2xl font-capture text-white mb-1">{{ formatPrice(course.currentPrice) }}</div>
                  <div class="text-sm text-gray-400">{{ course.duration }}</div>
                </div>

                <div class="flex space-x-2">
                  <button
                    @click="editCourse(course as CoursePrice)"
                    class="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-blue-500/20 hover:border-blue-500/40"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    @click="deleteCourseConfirm(course as CoursePrice)"
                    class="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Production Tab -->
        <section v-if="activeTab === 'production'" class="bg-gray-800 rounded-xl border border-gray-700">
          <div class="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 class="text-xl font-capture text-yellow-400">Servicios de Producción</h2>
            <button
              @click="openServiceModal()"
              class="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-capture font-bold transition-colors"
            >
              ➕ NUEVO SERVICIO
            </button>
          </div>

          <div class="p-6">
            <div v-if="productionServices.length === 0" class="text-center py-12">
              <div class="text-gray-400 text-4xl mb-4">🎵</div>
              <p class="text-gray-400 mb-4">No hay servicios registrados</p>
              <button
                @click="openServiceModal()"
                class="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-colors"
              >
                ➕ CREAR PRIMER SERVICIO
              </button>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="service in productionServices"
                :key="service.id"
                class="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-yellow-400/50 transition-colors"
              >
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-lg font-capture text-white mb-1">{{ service.name }}</h3>
                    <p class="text-sm text-gray-400">{{ service.description }}</p>
                  </div>
                  <span 
                    :class="service.isActive ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'"
                    class="px-2 py-1 rounded text-xs font-capture"
                  >
                    {{ service.isActive ? 'Activo' : 'Inactivo' }}
                  </span>
                </div>

                <div class="mb-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-500 line-through">{{ formatPrice(service.originalPrice) }}</span>
                    <span class="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">-{{ service.discountPercentage }}%</span>
                  </div>
                  <div class="text-2xl font-capture text-white mb-1">{{ formatPrice(service.currentPrice) }}</div>
                  <div class="text-sm text-gray-400">Entrega: {{ service.deliveryTime }}</div>
                </div>

                <div class="flex space-x-2">
                  <button
                    @click="editService(service as ProductionService)"
                    class="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-blue-500/20 hover:border-blue-500/40"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    @click="deleteServiceConfirm(service as ProductionService)"
                    class="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Course Modal -->
    <div 
      v-if="showCourseModal" 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeCourseModal"
    >
      <div class="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-700">
          <h3 class="text-xl font-capture text-yellow-400">
            {{ isEditingCourse ? 'EDITAR CURSO' : 'NUEVO CURSO' }}
          </h3>
        </div>

        <form @submit.prevent="saveCourse" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Nombre del Curso *
              </label>
              <input
                v-model="courseForm.name"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Ej: BÁSICO"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Duración
              </label>
              <input
                v-model="courseForm.duration"
                type="text"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Ej: 4 clases mensuales"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <input
              v-model="courseForm.description"
              type="text"
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Ej: Ideal para progreso rápido"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Precio Original *
              </label>
              <input
                v-model.number="courseForm.originalPrice"
                type="number"
                required
                min="0"
                step="1000"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="45000"
                @input="updateCourseDiscount"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Precio Actual *
              </label>
              <input
                v-model.number="courseForm.currentPrice"
                type="number"
                required
                min="0"
                step="1000"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="30000"
                @input="updateCourseDiscount"
              />
            </div>
          </div>

          <div v-if="courseForm.originalPrice && courseForm.currentPrice" class="text-center">
            <p class="text-green-400 font-capture">
              Descuento: {{ calculateDiscount(courseForm.originalPrice, courseForm.currentPrice) }}%
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Características (una por línea)
            </label>
            <textarea
              v-model="courseFeaturesText"
              rows="5"
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Clase individual 1 hora&#10;Presencial u online&#10;Material didáctico incluido"
            ></textarea>
          </div>

          <div class="flex items-center space-x-6">
            <label class="flex items-center">
              <input
                v-model="courseForm.isActive"
                type="checkbox"
                class="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
              />
              <span class="ml-2 text-gray-300">Curso activo</span>
            </label>

            <label class="flex items-center">
              <input
                v-model="courseForm.isPopular"
                type="checkbox"
                class="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
              />
              <span class="ml-2 text-gray-300">Marcar como popular</span>
            </label>
          </div>

          <div v-if="courseFormErrors.length > 0" class="bg-red-600/20 border border-red-500 rounded-lg p-4">
            <ul class="text-red-400 text-sm space-y-1">
              <li v-for="error in courseFormErrors" :key="error">• {{ error }}</li>
            </ul>
          </div>

          <div class="flex space-x-4 pt-4">
            <button
              type="button"
              @click="closeCourseModal"
              class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-capture transition-colors"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-colors disabled:opacity-50"
            >
              {{ saving ? 'GUARDANDO...' : isEditingCourse ? 'ACTUALIZAR' : 'CREAR' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Service Modal -->
    <div 
      v-if="showServiceModal" 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeServiceModal"
    >
      <div class="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-700">
          <h3 class="text-xl font-capture text-yellow-400">
            {{ isEditingService ? 'EDITAR SERVICIO' : 'NUEVO SERVICIO' }}
          </h3>
        </div>

        <form @submit.prevent="saveService" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Nombre del Servicio *
              </label>
              <input
                v-model="serviceForm.name"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Ej: PRODUCCIÓN BÁSICA"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Tiempo de Entrega
              </label>
              <input
                v-model="serviceForm.deliveryTime"
                type="text"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Ej: 7-10 días"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <input
              v-model="serviceForm.description"
              type="text"
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Ej: Ideal para demos y maquetas"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Precio Original *
              </label>
              <input
                v-model.number="serviceForm.originalPrice"
                type="number"
                required
                min="0"
                step="1000"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="220000"
                @input="updateServiceDiscount"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Precio Actual *
              </label>
              <input
                v-model.number="serviceForm.currentPrice"
                type="number"
                required
                min="0"
                step="1000"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="150000"
                @input="updateServiceDiscount"
              />
            </div>
          </div>

          <div v-if="serviceForm.originalPrice && serviceForm.currentPrice" class="text-center">
            <p class="text-green-400 font-capture">
              Descuento: {{ calculateDiscount(serviceForm.originalPrice, serviceForm.currentPrice) }}%
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Incluye (una por línea)
            </label>
            <textarea
              v-model="serviceIncludesText"
              rows="5"
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Grabación básica&#10;Mezcla básica&#10;Master básico"
            ></textarea>
          </div>

          <div class="flex items-center space-x-6">
            <label class="flex items-center">
              <input
                v-model="serviceForm.isActive"
                type="checkbox"
                class="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
              />
              <span class="ml-2 text-gray-300">Servicio activo</span>
            </label>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Categoría
              </label>
              <select
                v-model="serviceForm.category"
                class="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              >
                <option value="recording">Grabación</option>
                <option value="mixing">Mezcla</option>
                <option value="mastering">Mastering</option>
                <option value="full_production">Producción Completa</option>
              </select>
            </div>
          </div>

          <div v-if="serviceFormErrors.length > 0" class="bg-red-600/20 border border-red-500 rounded-lg p-4">
            <ul class="text-red-400 text-sm space-y-1">
              <li v-for="error in serviceFormErrors" :key="error">• {{ error }}</li>
            </ul>
          </div>

          <div class="flex space-x-4 pt-4">
            <button
              type="button"
              @click="closeServiceModal"
              class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-capture transition-colors"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-colors disabled:opacity-50"
            >
              {{ saving ? 'GUARDANDO...' : isEditingService ? 'ACTUALIZAR' : 'CREAR' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modals -->
    <div 
      v-if="showDeleteModal" 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeDeleteModal"
    >
      <div class="bg-gray-800 rounded-xl max-w-md w-full">
        <div class="p-6">
          <h3 class="text-xl font-capture text-red-400 mb-4">CONFIRMAR ELIMINACIÓN</h3>
          <p class="text-gray-300 mb-6">
            ¿Estás seguro de que deseas eliminar "{{ itemToDelete?.name }}"? Esta acción no se puede deshacer.
          </p>
          
          <div class="flex space-x-4">
            <button
              @click="closeDeleteModal"
              class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-capture transition-colors"
            >
              CANCELAR
            </button>
            <button
              @click="confirmDelete"
              :disabled="saving"
              class="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-capture transition-colors disabled:opacity-50"
            >
              {{ saving ? 'ELIMINANDO...' : 'ELIMINAR' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <AdminNotificationToast />
  </div>
</template>

<script setup lang="ts">
import type { CoursePrice, ProductionService } from '~/types/admin'

// Auth check
definePageMeta({
  layout: false
})

// Composables
const { 
  coursePrices, 
  productionServices, 
  loading, 
  saving, 
  error,
  loadPrices,
  createCoursePrice,
  updateCoursePrice,
  deleteCoursePrice,
  createProductionService,
  updateProductionService,
  deleteProductionService,
  formatPrice,
  calculateDiscount,
  getPriceStats
} = useAdminPrices()

const { success, error: notifyError } = useNotifications()

// Función de validación local
const validatePrice = (data: any) => {
  const errors: string[] = []
  
  if (!data.name || data.name.trim().length === 0) {
    errors.push('El nombre es requerido')
  }
  
  if (!data.currentPrice || data.currentPrice <= 0) {
    errors.push('El precio actual debe ser mayor a 0')
  }
  
  if (data.originalPrice && data.originalPrice < data.currentPrice) {
    errors.push('El precio original no puede ser menor al precio actual')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// State
const activeTab = ref<'courses' | 'production'>('courses')

// Course Modal
const showCourseModal = ref(false)
const isEditingCourse = ref(false)
const courseForm = ref<{
  id?: string
  name: string
  description: string
  duration: string
  originalPrice: number | null
  currentPrice: number | null
  isActive: boolean
  isPopular: boolean
}>({
  name: '',
  description: '',
  duration: '',
  originalPrice: null,
  currentPrice: null,
  isActive: true,
  isPopular: false
})
const courseFeaturesText = ref('')
const courseFormErrors = ref<string[]>([])

// Service Modal
const showServiceModal = ref(false)
const isEditingService = ref(false)
const serviceForm = ref<{
  id?: string
  name: string
  description: string
  deliveryTime: string
  originalPrice: number | null
  currentPrice: number | null
  isActive: boolean
  category: 'recording' | 'mixing' | 'mastering' | 'full_production'
}>({
  name: '',
  description: '',
  deliveryTime: '',
  originalPrice: null,
  currentPrice: null,
  isActive: true,
  category: 'full_production'
})
const serviceIncludesText = ref('')
const serviceFormErrors = ref<string[]>([])

// Delete Modal
const showDeleteModal = ref(false)
const itemToDelete = ref<CoursePrice | ProductionService | null>(null)
const deleteType = ref<'course' | 'service'>('course')

// Computed
const priceStats = computed(() => getPriceStats.value)

// Methods
const openCourseModal = (course?: CoursePrice) => {
  isEditingCourse.value = !!course
  if (course) {
    courseForm.value = {
      id: course.id,
      name: course.name,
      description: course.description,
      duration: course.duration,
      originalPrice: course.originalPrice,
      currentPrice: course.currentPrice,
      isActive: course.isActive,
      isPopular: course.isPopular || false
    }
    courseFeaturesText.value = course.features.join('\n')
  } else {
    resetCourseForm()
  }
  showCourseModal.value = true
}

const closeCourseModal = () => {
  showCourseModal.value = false
  resetCourseForm()
  courseFormErrors.value = []
}

const resetCourseForm = () => {
  courseForm.value = {
    name: '',
    description: '',
    duration: '',
    originalPrice: null,
    currentPrice: null,
    isActive: true,
    isPopular: false
  }
  courseFeaturesText.value = ''
}

const editCourse = (course: CoursePrice) => {
  const courseToEdit = {
    ...course,
    features: [...course.features]
  }
  openCourseModal(courseToEdit)
}

const saveCourse = async () => {
  courseFormErrors.value = []
  
  const courseData = {
    name: courseForm.value.name,
    description: courseForm.value.description,
    duration: courseForm.value.duration,
    originalPrice: courseForm.value.originalPrice || 0,
    currentPrice: courseForm.value.currentPrice || 0,
    discountPercentage: calculateDiscount(courseForm.value.originalPrice || 0, courseForm.value.currentPrice || 0),
    features: courseFeaturesText.value.split('\n').filter(f => f.trim()),
    isActive: courseForm.value.isActive,
    isPopular: courseForm.value.isPopular
  }

  const validation = validatePrice(courseData)
  if (!validation.isValid) {
    courseFormErrors.value = validation.errors
    return
  }

  let result
  if (isEditingCourse.value) {
    result = await updateCoursePrice(courseForm.value.id!, courseData)
  } else {
    result = await createCoursePrice(courseData as Omit<CoursePrice, 'id'>)
  }

  if (result.success) {
    closeCourseModal()
    if (isEditingCourse.value) {
      success('Curso actualizado', 'Los cambios se han guardado correctamente')
    } else {
      success('Curso creado', 'El nuevo curso se ha agregado exitosamente')
    }
  } else {
    courseFormErrors.value = [result.error || 'Error desconocido']
    notifyError('Error al guardar', result.error || 'Error desconocido')
  }
}

const updateCourseDiscount = () => {
  // Auto calculate discount percentage when prices change
  // (This is calculated automatically in the save function)
}

const deleteCourseConfirm = (course: CoursePrice) => {
  itemToDelete.value = course
  deleteType.value = 'course'
  showDeleteModal.value = true
}

// Service methods
const openServiceModal = (service?: ProductionService) => {
  isEditingService.value = !!service
  if (service) {
    serviceForm.value = {
      id: service.id,
      name: service.name,
      description: service.description,
      deliveryTime: service.deliveryTime,
      originalPrice: service.originalPrice,
      currentPrice: service.currentPrice,
      isActive: service.isActive,
      category: service.category
    }
    serviceIncludesText.value = service.includes.join('\n')
  } else {
    resetServiceForm()
  }
  showServiceModal.value = true
}

const closeServiceModal = () => {
  showServiceModal.value = false
  resetServiceForm()
  serviceFormErrors.value = []
}

const resetServiceForm = () => {
  serviceForm.value = {
    name: '',
    description: '',
    deliveryTime: '',
    originalPrice: null,
    currentPrice: null,
    isActive: true,
    category: 'full_production'
  }
  serviceIncludesText.value = ''
}

const editService = (service: ProductionService) => {
  openServiceModal(service)
}

const saveService = async () => {
  serviceFormErrors.value = []
  
  const serviceData = {
    name: serviceForm.value.name,
    description: serviceForm.value.description,
    deliveryTime: serviceForm.value.deliveryTime,
    originalPrice: serviceForm.value.originalPrice || 0,
    currentPrice: serviceForm.value.currentPrice || 0,
    discountPercentage: calculateDiscount(serviceForm.value.originalPrice || 0, serviceForm.value.currentPrice || 0),
    includes: serviceIncludesText.value.split('\n').filter(i => i.trim()),
    isActive: serviceForm.value.isActive,
    category: serviceForm.value.category
  }

  const validation = validatePrice(serviceData)
  if (!validation.isValid) {
    serviceFormErrors.value = validation.errors
    return
  }

  let result
  if (isEditingService.value) {
    result = await updateProductionService(serviceForm.value.id!, serviceData)
  } else {
    result = await createProductionService(serviceData as Omit<ProductionService, 'id'>)
  }

  if (result.success) {
    closeServiceModal()
    if (isEditingService.value) {
      success('Servicio actualizado', 'Los cambios se han guardado correctamente')
    } else {
      success('Servicio creado', 'El nuevo servicio se ha agregado exitosamente')
    }
  } else {
    serviceFormErrors.value = [result.error || 'Error desconocido']
    notifyError('Error al guardar', result.error || 'Error desconocido')
  }
}

const updateServiceDiscount = () => {
  // Auto calculate discount percentage when prices change
  // (This is calculated automatically in the save function)
}

const deleteServiceConfirm = (service: ProductionService) => {
  itemToDelete.value = service
  deleteType.value = 'service'
  showDeleteModal.value = true
}

// Delete methods
const closeDeleteModal = () => {
  showDeleteModal.value = false
  itemToDelete.value = null
}

const confirmDelete = async () => {
  if (!itemToDelete.value) return

  let result
  if (deleteType.value === 'course') {
    result = await deleteCoursePrice(itemToDelete.value.id)
  } else {
    result = await deleteProductionService(itemToDelete.value.id)
  }

  if (result.success) {
    closeDeleteModal()
    success(
      deleteType.value === 'course' ? 'Curso eliminado' : 'Servicio eliminado',
      'El elemento se ha eliminado correctamente'
    )
  } else {
    notifyError('Error al eliminar', result.error || 'Error desconocido')
  }
}

// Lifecycle
onMounted(() => {
  loadPrices()
})
</script>

<style scoped>
/* Remove link underlines */
a {
  text-decoration: none !important;
}

a:visited {
  text-decoration: none !important;
}

a:hover {
  text-decoration: none !important;
}
</style> 