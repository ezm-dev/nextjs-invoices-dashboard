'use server' // all exported functions in this file will be treated as server actions, allowing them to be called from the client and executed on the server.
import { Palanquin_Dark } from 'next/font/google';
import {z} from 'zod'

const FromSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string()
})

const CreateInvoiceSchema = FromSchema.omit({id: true, date: true})

export async function createInvoice(formData: FormData){
const{ customerId, amount, status} = CreateInvoiceSchema.parse({
    cusomerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
})

const amountInCents = Math.round(amount * 100)
const date = new Date().toISOString().split('T')[0]

}