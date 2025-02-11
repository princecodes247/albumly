'use client';

import { Camera, Share2, Users, Shield, ArrowRight, Check, CreditCard, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Navbar from './(landing)/_components/navbar';
import Hero from './(landing)/_components/hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar/>
      {/* Hero Section */}
     <Hero/>

      {/* Album Creation Feature */}
      <section className="py-20 bg-gradient-to-r from-black/50 via-black/40 to-black/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <Camera className="h-12 w-12 text-indigo-400" />
              <h2 className="text-3xl md:text-4xl font-bold">Beautiful Album Creation</h2>
              <p className="text-lg text-white/60">
                Create stunning collections with our modern, intuitive interface. Our powerful editor lets you organize, arrange, and enhance your photos with just a few clicks.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-white/80">
                  <Check className="h-5 w-5 text-indigo-400" />
                  Drag-and-drop photo organization
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <Check className="h-5 w-5 text-indigo-400" />
                  Smart album suggestions
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <Check className="h-5 w-5 text-indigo-400" />
                  Automatic photo enhancement
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 rounded-2xl bg-white/5 p-6 border border-white/10"
            >
              <div className="aspect-video rounded-lg bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Camera className="h-20 w-20 text-indigo-400/50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sharing Capabilities Feature */}
      <section className="py-20 bg-gradient-to-l from-black/50 via-black/40 to-black/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <Share2 className="h-12 w-12 text-indigo-400" />
              <h2 className="text-3xl md:text-4xl font-bold">Seamless Sharing</h2>
              <p className="text-lg text-white/60">
                Share your memories with family and friends instantly. Our platform makes it easy to collaborate and stay connected through your precious moments.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-white/80">
                  <Check className="h-5 w-5 text-indigo-400" />
                  One-click sharing with anyone
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <Check className="h-5 w-5 text-indigo-400" />
                  Collaborative album editing
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <Check className="h-5 w-5 text-indigo-400" />
                  Real-time updates and notifications
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 rounded-2xl bg-white/5 p-6 border border-white/10"
            >
              <div className="aspect-video rounded-lg bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Share2 className="h-20 w-20 text-indigo-400/50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-gradient-to-r from-black/50 via-black/40 to-black/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <Shield className="h-12 w-12 text-indigo-400" />
              <h2 className="text-3xl md:text-4xl font-bold">Bank-Level Security</h2>
              <p className="text-lg text-white/60">
                Your memories are protected with enterprise-grade encryption. We take security seriously to ensure your precious moments stay private and secure.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-white/80">
                  <Check className="h-5 w-5 text-indigo-400" />
                  End-to-end encryption
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <Check className="h-5 w-5 text-indigo-400" />
                  Secure access controls
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <Check className="h-5 w-5 text-indigo-400" />
                  Regular security audits
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 rounded-2xl bg-white/5 p-6 border border-white/10"
            >
              <div className="aspect-video rounded-lg bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Shield className="h-20 w-20 text-indigo-400/50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-black/50 to-black">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Loved by Families Worldwide
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Albumly has transformed how we share our family memories. It's so easy to use and beautifully designed.",
                author: 'Sarah Johnson',
                role: 'Family Photographer'
              },
              {
                quote: 'The security features give me peace of mind knowing our precious memories are safe and private.',
                author: 'Michael Chen',
                role: 'Parent of Two'
              },
              {
                quote: 'We use Albumly for all our family events. The sharing features make it perfect for keeping everyone connected.',
                author: 'Emma Rodriguez',
                role: 'Event Organizer'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <p className="text-lg text-white/80 mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-white/60">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-white/60 text-lg">Choose the perfect plan for your memories</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Basic',
                price: 'Free',
                description: 'Perfect for getting started',
                features: [
                  'Up to 3 albums',
                  '100 photos per album',
                  'Basic sharing features',
                  'Standard support'
                ]
              },
              {
                name: 'Pro',
                price: '$9.99/month',
                description: 'For active memory keepers',
                features: [
                  'Unlimited albums',
                  '1000 photos per album',
                  'Advanced sharing features',
                  'Priority support'
                ]
              },
              {
                name: 'Family',
                price: '$19.99/month',
                description: 'For the whole family',
                features: [
                  'Unlimited everything',
                  'Collaborative albums',
                  'Premium features',
                  '24/7 support'
                ]
              }
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col"
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold mb-4">{plan.price}</p>
                <p className="text-white/60 mb-6">{plan.description}</p>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-indigo-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-white/60 text-lg">Everything you need to know about Albumly</p>
          </motion.div>
          <div className="max-w-3xl mx-auto grid gap-6">
            {[
              {
                question: 'How secure are my photos?',
                answer: 'Your photos are protected with enterprise-grade encryption. We use the same security standards as major banks to ensure your memories stay private and secure.'
              },
              {
                question: 'Can I share albums with non-members?',
                answer: "Yes! You can share albums with anyone via a secure link, even if they don't have an Albumly account. They'll be able to view and download photos but won't be able to edit the album."
              },
              {
                question: 'What file formats are supported?',
                answer: 'We support all major image formats including JPG, PNG, HEIC, and RAW files. Photos are automatically optimized for web viewing while maintaining original quality for downloads.'
              },
              {
                question: 'Is there a limit to storage?',
                answer: 'Storage limits depend on your plan. Free users get 5GB of storage, Pro users get 100GB, and Family plan users enjoy unlimited storage for all their memories.'
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <HelpCircle className="h-6 w-6 text-indigo-400" />
                  {faq.question}
                </h3>
                <p className="text-white/60">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Preserving Your Memories Today
            </h2>
            <p className="text-white/60 mb-8">
              Join thousands of families who trust Albumly to keep their precious moments safe and beautiful.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8 py-6">
                Get Started Free
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-20 bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-white/60 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-white/60 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/demo" className="text-white/60 hover:text-white transition-colors">Demo</Link></li>
                <li><Link href="/security" className="text-white/60 hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-white/60 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="text-white/60 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="text-white/60 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="text-white/60 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-white/60 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/documentation" className="text-white/60 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/status" className="text-white/60 hover:text-white transition-colors">Status</Link></li>
                <li><Link href="/terms" className="text-white/60 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Connect</h4>
              <ul className="space-y-2">
                <li><a href="https://twitter.com/albumly" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="https://facebook.com/albumly" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">Facebook</a></li>
                <li><a href="https://instagram.com/albumly" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">Instagram</a></li>
                <li><a href="https://linkedin.com/company/albumly" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-xl font-bold">Albumly</Link>
              <span className="text-white/60">&copy; {new Date().getFullYear()} All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="text-white/60 hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}