<template>
  <div>
    <button @click="handlePermissionRequest" :disabled="notificationPermission === 'denied'">
      {{ notificationPermission === 'granted' ? 'Notifications Enabled' : 'Enable Notifications' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { requestPermission, onMessageListener } from '../firebase';

const notificationPermission = ref('default');

onMounted(() => {
  // Initialize message listener
  onMessageListener();
});

const handlePermissionRequest = async () => {
  try {
    await requestPermission();
    notificationPermission.value = 'granted';
  } catch (error) {
    console.error('Error requesting permission:', error);
    notificationPermission.value = 'denied';
  }
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
