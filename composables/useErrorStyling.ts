export function useErrorStyling (hasErrorProp: boolean) {
  const hasError = ref(hasErrorProp)

  const errorStyling = computed(() => {
    return hasError.value
      ? ['border-red-400', 'outline-red-400', 'bg-red-400', 'text-primary']
      : ['border-gray-400']
  })

  return {
    hasError,
    errorStyling
  }
}
