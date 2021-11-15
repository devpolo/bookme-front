import { useEffect } from "react"

import { useRouter } from "next/dist/client/router"

import { makeVar, ReactiveVar, gql, useMutation } from "@apollo/client"

type TUser = { id: number; name: string } | {}

const LOGIN_MUTATION = gql`
  mutation login($name: String!) {
    login(name: $name) {
      id
      name
    }
  }
`

const connectedUser: ReactiveVar<TUser> = makeVar({})

export const useAuth = () => {
  const [readOrCreateUser] = useMutation(LOGIN_MUTATION)
  const router = useRouter()

  const login = async (name: string): Promise<void> => {
    try {
      const { data } = await readOrCreateUser({ variables: { name } })

      connectedUser(data.login)
    } catch {}
  }

  useEffect(() => {
    const user = connectedUser()
    if (Object.keys(user).length === 0) {
      router.push("/")
    }
  }, [connectedUser()])

  return { me: connectedUser(), login }
}
