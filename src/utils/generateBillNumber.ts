export const generateBillNumber = (): number => {
  const now = new Date()
  return parseInt(
    `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getTime().toString().slice(-4)}`
  )
}
