interface ErrorCategory {
    [status: string]: string
}
  
export function handleErrorMessage(status: string | number) {
    const keyActionMap: ErrorCategory = { 
      "Unauthorized": 'user not registered',
      "wrong password, try again": "wrong password, try again",
      "e-mail not registered": "e-mail not registered"
    }
    return keyActionMap[status]
}