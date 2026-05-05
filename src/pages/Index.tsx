import { ArrowRight, Coffee, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/repuro-hero.png";
import bestsellerImg from "@/assets/repuro-bestseller.png";
import story1 from "@/assets/repuro-story1.png";
import story2 from "@/assets/repuro-story2.png";
import aren from "@/assets/menu-aren.png";
import americano from "@/assets/menu-americano.png";
import caffe from "@/assets/menu-caffe.jpeg";
import choco from "@/assets/menu-choco.png";

const MENU = [
  { name: "Aren Latte", price: "Rp 28.000", img: aren },
  { name: "Iced Americano", price: "Rp 22.000", img: americano },
  { name: "Signature Oat Latte", price: "Rp 19.000", img: caffe },
  { name: "Choco Latte", price: "Rp 32.000", img: choco },
];

export default function Index() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      {/* HERO */}
      <section
        id="home"
        className="relative overflow-hidden bg-navy text-cream"
      >
        <div className="container grid min-h-[100svh] grid-cols-1 items-center gap-10 pb-16 pt-28 md:grid-cols-2 md:pt-32">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-sky">
              <span className="h-px w-10 bg-sky" /> Specialty Coffee Studio
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[1.02] md:text-7xl">
              Coffee first, <br />
              <em className="font-normal italic text-sky">everything later.</em>
            </h1>
            <p className="mt-6 max-w-md text-base text-cream/75 md:text-lg">
              Small-batch espresso, oat-forward signatures, and seasonal
              jars — brewed slow, served bright.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => scrollTo("menu")}
                className="bg-sky text-navy hover:bg-sky/90"
              >
                See the menu <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("story")}
                className="border-cream/30 bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
              >
                Our story
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-sky/20 blur-3xl" />
            <img
              src={heroImg}
              alt="A takeaway coffee cup beside a jar of signature oat latte"
              width={1600}
              height={1024}
              className="relative mx-auto w-full max-w-md rounded-2xl object-cover shadow-elegant md:max-w-full"
            />
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section id="story" className="bg-paper py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-navy/60">
              Since 2021
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-navy md:text-5xl">
              Our Story
            </h2>
            <div className="mx-auto mt-5 h-px w-16 bg-navy/30" />
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="space-y-4">
              <img
                src={story1}
                alt="RE:PURO baristas serving customers at the bar"
                width={1200}
                height={900}
                loading="lazy"
                className="w-full rounded-xl object-cover shadow-soft"
              />
              <p className="text-navy/80">
                RE: PURO began in the halls of BINUS University as a simple academic challenge: create a business that matters. What started as a project quickly turned into a passion for the perfect brew.

              </p>
            </div>
            <div className="space-y-4 md:pt-16">
              <p className="text-navy/80">
                Today, we are a team of coffee enthusiasts committed to bringing high-quality, order-based coffee to our community, one cup at a time.

              </p>
              <img
                src={story2}
                alt="A barista pouring milk at a RE:PURO market pop-up"
                width={1200}
                height={900}
                loading="lazy"
                className="w-full rounded-xl object-cover shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BESTSELLER */}
      <section id="bestseller" className="bg-navy py-24 text-cream md:py-32">
        <div className="container">
          <p className="text-center text-xs uppercase tracking-[0.32em] text-sky">
            Meet our bestseller
          </p>

          <div className="mt-10 grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="font-display text-6xl font-semibold leading-[0.95] md:text-8xl">
                The <br />
                <span className="italic text-sky">Signature</span> <br />
                Oat Latte
              </h2>
              <p className="mt-6 max-w-md text-cream/75">
                A silky, oat-milk sweetened blend brought together with a
                double shot and a kiss of palm-sugar caramel. Bottled cold,
                shaken before sipping.
              </p>
              <p className="mt-6 font-display text-2xl text-sky">Rp 19.000</p>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="absolute inset-0 mx-auto h-72 w-72 translate-y-8 rounded-full bg-sky/30 blur-3xl md:h-96 md:w-96" />
              <img
                src={bestsellerImg}
                alt="A jar of RE:PURO signature oat latte"
                width={1024}
                height={1024}
                loading="lazy"
                className="relative mx-auto w-72 md:w-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scallop divider */}
      <div aria-hidden className="h-8 scallop-top bg-navy" />

      {/* MENU */}
      <section id="menu" className="bg-paper py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-navy/60">
              Brewed daily
            </p>
            <h2 className="mt-3 font-display text-5xl font-semibold text-navy md:text-6xl">
              Menu
            </h2>
            <div className="mx-auto mt-5 h-px w-16 bg-navy/30" />
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">
            {MENU.map((item) => (
              <article
                key={item.name}
                className="group rounded-2xl bg-sky-soft p-4 transition-shadow hover:shadow-soft"
              >
                <div className="overflow-hidden rounded-xl bg-cream">
                  <img
                    src={item.img}
                    alt={item.name}
                    width={800}
                    height={800}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-1 pb-1 pt-4">
                  <h3 className="font-display text-lg font-semibold text-navy">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-navy/70">{item.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="bg-navy text-cream">
        <div className="container grid gap-10 py-16 md:grid-cols-3">
          <div>
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm text-cream/70">
              A small specialty coffee studio. Brewed slow, served honest,
              shared often.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <h4 className="font-display text-base text-sky">Contact Us</h4>
            <a
              href="https://www.instagram.com/pur0.coffee/?hl=en"
              className="mt-3 inline-flex items-center gap-2 text-sky hover:underline"
            >
              <Instagram className="h-4 w-4" /> @repuro.coffee
            </a>
            <p className="flex items-center gap-2 text-cream/80">
              <Phone className="h-4 w-4 text-sky" /> +62 812 3456 7890
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <h4 className="font-display text-base text-sky"></h4>
            {/* // sebelah nya buat contact */}
          
          </div>
        </div>

        <div className="border-t border-cream/10">
          <div className="container flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-cream/60">
            <p className="inline-flex items-center gap-2">
              <Coffee className="h-3.5 w-3.5" /> © {new Date().getFullYear()} RE:PURO. All rights reserved.
            </p>
            <p>Coffee first, everything later.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}