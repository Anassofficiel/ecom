import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
    return (
        <footer className="bg-zinc-950 text-zinc-400 mt-20">
            {/* Newsletter */}
            <div className="container mx-auto px-4 py-12">
                <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-md text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-black text-white mb-2 italic tracking-tight">Stay Updated!</h2>
                        <p className="text-zinc-400">Subscribe to get exclusive deals, new arrivals, and kitchen tips delivered directly to your inbox.</p>
                    </div>
                    <div className="flex w-full md:w-auto gap-2">
                        <div className="relative flex-1 md:w-80 group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Your email address"
                                className="pl-10 h-12 bg-zinc-900 border-zinc-800 text-white focus-visible:ring-primary/50"
                            />
                        </div>
                        <Button size="icon" className="h-12 w-12 rounded-xl group">
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="space-y-6">
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-black italic text-primary tracking-tighter">
                            ELECTRO MOSTAFA
                        </span>
                    </Link>
                    <p className="text-sm leading-relaxed">
                        Your trusted partner for premium home appliances and kitchen electronics in Morocco.
                        Level up your home experience with our top-tier products.
                    </p>
                    <div className="flex gap-4">
                        <Button variant="outline" size="icon" className="rounded-full h-9 w-9 bg-zinc-900 border-zinc-800 hover:text-primary hover:border-primary">
                            <Facebook className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full h-9 w-9 bg-zinc-900 border-zinc-800 hover:text-primary hover:border-primary">
                            <Instagram className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full h-9 w-9 bg-zinc-900 border-zinc-800 hover:text-primary hover:border-primary">
                            <Twitter className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full h-9 w-9 bg-zinc-900 border-zinc-800 hover:text-primary hover:border-primary">
                            <Youtube className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-bold mb-6 text-lg">Shop Categories</h3>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="#" className="hover:text-primary transition-colors">Refrigerators</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Kitchen Appliances</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Washing Machines</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Dishwashers</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Coffee Machines</Link></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className="text-white font-bold mb-6 text-lg">Support</h3>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="#" className="hover:text-primary transition-colors">Track Order</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Warranty Info</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">FAQs</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <h3 className="text-white font-bold mb-6 text-lg">Contact Us</h3>
                    <div className="flex gap-3 text-sm">
                        <MapPin className="h-5 w-5 text-primary shrink-0" />
                        <span>123 Boulevard Zerktouni, Casablanca, Morocco</span>
                    </div>
                    <div className="flex gap-3 text-sm">
                        <Phone className="h-5 w-5 text-primary shrink-0" />
                        <span>+212 5 22 12 34 56</span>
                    </div>
                    <div className="flex gap-3 text-sm">
                        <Mail className="h-5 w-5 text-primary shrink-0" />
                        <span>contact@electromostafa.ma</span>
                    </div>
                </div>
            </div>

            <Separator className="bg-zinc-900" />

            {/* Bottom Footer */}
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                <p>© {new Date().getFullYear()} ELECTRO MOSTAFA. Tous droits réservés.</p>
                <div className="flex gap-6">
                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
                </div>
                <div className="flex gap-2">
                    {/* Payment Icons Placeholder */}
                    <div className="h-6 w-10 bg-zinc-900 rounded border border-zinc-800" />
                    <div className="h-6 w-10 bg-zinc-900 rounded border border-zinc-800" />
                    <div className="h-6 w-10 bg-zinc-900 rounded border border-zinc-800" />
                    <div className="h-6 w-10 bg-zinc-900 rounded border border-zinc-800" />
                </div>
            </div>
        </footer>
    )
}
