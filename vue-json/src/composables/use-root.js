import { getCurrentInstance } from 'vue'

export const useRoot = () => getCurrentInstance().ctx
