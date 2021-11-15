import { makeVar, ReactiveVar } from "@apollo/client"

interface IUser {
  id: number
  name: string
}

export const useAuth = () => {
  const me: ReactiveVar<IUser | {}> = makeVar({})

  const setMe = (user: IUser) => {
    me(user)
  }

  return { me, setMe }
}
