interface ErrorCategory {
    [status: string]: string
}
  
export function handleErrorMessage(status: string | number) {
  console.log("status", status)
    const keyActionMap: ErrorCategory = { 
      "Unauthorized": 'user not registered',
      "wrong password, try again": "wrong password, try again",
      "e-mail not registered": "e-mail not registered",
      "Forbidden": "wrong password, try again",
      "e-mail already registered": "e-mail already registered"
    }
    return keyActionMap[status]
}