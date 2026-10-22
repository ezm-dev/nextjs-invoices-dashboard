'use server' // all exported functions in this file will be treated as server actions, allowing them to be called from the client and executed on the server.
import { Palanquin_Dark } from 'next/font/google';
import {z} from 'zod'
import postgres from 'postgres'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'

const sql = postgres(process.env.POSTGRES_URL!,{ssl: 'require'})

const FromSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string()
})
const CreateInvoiceSchema = FromSchema.omit({id: true, date: true})
const UpdateInvoiceSchema = FromSchema.omit({id: true, date: true})


/**
 * Creates a new invoice
 * @param formData 
 */
export async function createInvoice(formData: FormData){
const{ customerId, amount, status} = CreateInvoiceSchema.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
})

const amountInCents = Math.round(amount * 100)
const date = new Date().toISOString().split('T')[0]
try{
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `
} catch (error) {
    console.error('Error creating invoice:', error)
    return{message: 'Failed to create invoice'}
    //throw new Error('Failed to create invoice')
}
revalidatePath('/dashboard/invoices')
redirect('/dashboard/invoices')
}



/**
 * Updates an existing invoice
 * @param id 
 * @param formData 
 */
export async function updateInvoice(id: string, formData: FormData){
    const{ customerId, amount, status} = UpdateInvoiceSchema.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    })
    const amountInCents = Math.round(amount * 100)
  
    try{
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
    `
    } catch (error) {
        console.error('Error updating invoice:', error)
        return{message: 'Failed to update invoice'}
        //throw new Error('Failed to update invoice')
    }
    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}

export async function deleteInvoice(id: string){
try{
    await sql`
        DELETE FROM invoices
        WHERE id = ${id}
    `
} catch (error) {
    console.error('Error deleting invoice:', error)
    return{message: 'Failed to delete invoice'}
    //throw new Error('Failed to delete invoice')
}
    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}