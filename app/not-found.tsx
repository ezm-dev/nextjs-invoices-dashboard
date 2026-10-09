import NotFoundUI from "@/app/ui/NotFoundUI";

export default function NotFoundHome() {
  return <NotFoundUI 
  title="404 - Page Not Found" 
  subtitle="The page you are looking for does not exist." 
  linkText="Go Back Home" 
  linkHref="/" />;
}