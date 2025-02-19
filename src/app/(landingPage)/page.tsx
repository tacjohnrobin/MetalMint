import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-lg">
        <nav className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17.2l3-3 4 4L21 11" />
              <path d="M21 11V7h-4" />
            </svg>
            <span className="text-xl font-semibold">MetalMint</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Products
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Learn
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Community
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              FAQ
            </Link>
            <Button className="bg-green-600 hover:bg-green-700">
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative min-h-screen flex items-center">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('/image/coingraph.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: "75% 50%",
              
            }}
          />
          <div className="container mx-auto px-4 z-10">
            <div className="grid md:grid-cols-2 gap-12 md:items-center ">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold  md:font-bold leading-tight tracking-tight">
                  Dream big
                  <br />
                  Invest smart
                  </h1>
                <p className="text-lg text-gray-600 md:text-xl"> Unlock the power of metal markets with smart investments.</p>
                <Button className="bg-[#e8ff54] text-black hover:bg-[#d4eb40] text-lg px-8 py-6">
                  Start investing
                </Button>
              </div>
              <div className="relative">
                <div className="" />
                {/* 
                <Image
                  width={1000}
                  height={1000}
                  layout="responsive"
                  objectFit="cover"
                  src="/image/coingraph.jpg"
                  alt="Investment App Interface"
                  
                />
                */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}