export const getDateFromRu = (str: string) => {
  const arrDate = str.split('.') // Ex. [08, 09, 2022] = [day, month, year]
  return new Date(+arrDate[2], (+arrDate[1] - 1), +arrDate[0])
}

export const getNowDateRu = () => {
  const nowDate = new Date()
  const dateItemFormat = (num: number) => num < 10 ? `0${num}` : `${num}`
  const nowYear = `${nowDate.getFullYear()}`
  const nowMonth = dateItemFormat(nowDate.getMonth() + 1)
  const nowDay = dateItemFormat(nowDate.getDate())
  const nowFullDate = `${nowDay}.${nowMonth}.${nowYear}` // Ex. '08.09.2022'
  return nowFullDate
}