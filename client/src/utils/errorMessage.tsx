interface ErrorCategory {
    [status: string]: string
}
  
export function handleErrorMessage(status: string | number) {
  console.log("status", status)
    const keyActionMap: ErrorCategory = { 
      "Unauthorized": 'user not registered',
      "wrong password, try again": "wrong password, try again",
      "email not registered": "e-mail not registered"
    }
    return keyActionMap[status]
}