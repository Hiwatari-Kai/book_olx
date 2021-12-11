import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            /*authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              },*/
             
        })
    ],
    secret : process.env.SECRET,
}

export default (req, res) => NextAuth(req, res, options)