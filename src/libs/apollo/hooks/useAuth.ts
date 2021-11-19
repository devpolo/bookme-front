import { useEffect } from "react"

import { useRouter } from "next/dist/client/router"

import { makeVar, ReactiveVar, gql, useMutation } from "@apollo/client"

import { User } from "typescript"

type TUser = User | {}

interface IAuthHookResponse {
  me: User
  login: (name: string) => void
  logout: () => void
  loading: boolean
}

const LOGIN_MUTATION = gql`
  mutation login($name: String!) {
    login(name: $name) {
      id
      name
    }
  }
`

const connectedUser: ReactiveVar<TUser> = makeVar({})

export const useAuth = (): IAuthHookResponse => {
  const [readOrCreateUser, { loading }] = useMutation(LOGIN_MUTATION)
  const router = useRouter()

  const login = async (name: string): Promise<void> => {
    try {
      const { data } = await readOrCreateUser({ variables: { name } })

      connectedUser(data.login)
    } catch {}
  }

  const logout = async () => {
    try {
      connectedUser({})
      router.push("/")
    } catch (error) {
      console.log(error)
    }
  }
  const user = connectedUser()
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      router.push("/")
    }
  }, [user])

  // @ts-ignore
  return { me: connectedUser(), login, logout, loading }
}
