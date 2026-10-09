import Link from 'next/link'
export default function NotFoundUI({title, subtitle, linkText, linkHref}:{
    title?: string, 
    subtitle?: string, 
    linkText?: string, 
    linkHref?: string}) 
{
  return (
    <main className="flex flex-col items-center justify-center gap-2 mt-10">
      <span className="mt-10 text-7xl">🙈</span>
      <h1 className="text-4xl font-semibold">{title || "Page Not Found"}</h1>
      <p>{subtitle || "Sorry, we couldn't find the requested page!"}</p>
      <Link
        href={linkHref || "/"}
        className="border-2 border-orange-400 px-3 py-3 rounded-lg text-orange-400 font-semibold"
      >
        {linkText || "Go Back Home"}
      </Link>
  </main>
  )
}