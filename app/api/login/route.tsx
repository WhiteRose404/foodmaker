import { SignJWT } from "jose"

import hash from '@/utils/hash';

const database = {
    email: "digitabadmin@digitab.ma",
    passwd: process.env.PASSWORD_HASH
}

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json()
        // const rawBody = await req.body;
        const { email, password } = body 
        // Basic validation
        if (!email || !password) {
            return new Response(JSON.stringify({message: 'Email and password are required'}),{ status: 400})
        }
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({message: 'Invalid email format'}),{ status: 400})
        }
        // Password length validation
        if (password.length < 3) {
            return new Response(JSON.stringify({message: 'Password must be at least 6 characters long'}),{ status: 400})
        }
        // Return the credentials (for demonstration purposes only)
        console.log("debug", email != database.email, hash(password) != database.passwd, body)
        if(email != database.email || hash(password) != database.passwd)
            return new Response(JSON.stringify({message: 'Incorrect Credentials'}),{ status: 401})
        const secret = new TextEncoder().encode(process.env.SECRET_KEY)
        const alg = 'HS256'
        const token = await new SignJWT({ 
                email,
        }).setProtectedHeader({ alg }).setIssuedAt().setExpirationTime('3h') // Token expires in 2 hours
        .setIssuer('Food_maker_yoedd').setAudience('What-are-you-doing-hacker-man').sign(secret)
        return new Response(JSON.stringify({message: 'Sign in successful'}) ,{ status: 200, headers: {"set-cookie": `authToken=${token}; HttpOnly; Path=/; Max-Age=${10800}; SameSite=Strict; Secure`}})
    } catch (error) {
      console.error('Sign-in error:', error)
      return new Response(JSON.stringify({message: 'Sign-in error'}),{ status: 400})
    }
}