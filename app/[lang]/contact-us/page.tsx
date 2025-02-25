
import ContactPage from "@/components/ui/contact-us";
import { getDictionary } from "./dictionaire";

const Landing = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const param: {lang: string} = await params;
  const script = await getDictionary(param.lang.toLowerCase() == "fr" ? "fr" : (param.lang.toLowerCase() == "en" ? "en" : (param.lang.toLowerCase() == "ar" ? "ar" : "fr")));
  return (
    <ContactPage dict={script} lang={param.lang} />
  )
};

export default Landing;