import { getCurrentInstance } from 'vue'

export const useRoot = () => getCurrentInstance().appContext.config.globalProperties
