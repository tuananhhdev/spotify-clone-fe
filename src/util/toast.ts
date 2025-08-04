import { toast } from 'sonner'

export const showComingSoon = () =>
    toast('🚧 This feature is coming soon!', {
        description: 'It will be available in a future update.',
        duration: 3000,
    })

export const showSuccess = (message: string) =>
    toast.success(message, {
        duration: 3000,
    })

export const showError = (message: string) =>
    toast.error(message, {
        duration: 3000,
    })
