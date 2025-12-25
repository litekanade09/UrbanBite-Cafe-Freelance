"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"
import emailjs from "@emailjs/browser"

export function Contact() {
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Initialize EmailJS with your public key
      emailjs.init("YOUR_PUBLIC_KEY")

      await emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formRef.current)

      setSubmitStatus("success")
      formRef.current.reset()
    } catch (error) {
      console.error("Email send failed:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
            Have questions or feedback? We'd love to hear from you. Drop us a message or visit us at our café.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="w-full flex items-center justify-center"
          >
            <div className="w-full max-w-xl">
              <Card className="p-8 md:p-10 lg:p-12 bg-card">
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                variants={formVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="space-y-6 md:space-y-7"
              >
                <motion.div variants={fieldVariants}>
                  <Input type="text" name="user_name" placeholder="Your Name" required className="bg-background h-12 md:h-14 text-base" />
                </motion.div>
                <motion.div variants={fieldVariants}>
                  <Input type="email" name="user_email" placeholder="Your Email" required className="bg-background h-12 md:h-14 text-base" />
                </motion.div>
                <motion.div variants={fieldVariants}>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    rows={7}
                    className="bg-background resize-none text-base"
                  />
                </motion.div>
                <motion.div variants={fieldVariants}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 md:h-14 text-base font-medium"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.div>
                </motion.div>
                {submitStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-accent text-sm"
                  >
                    Message sent successfully!
                  </motion.p>
                )}
                {submitStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-destructive text-sm"
                  >
                    Failed to send message. Please try again.
                  </motion.p>
                )}
              </motion.form>
            </Card>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 w-full flex flex-col justify-center"
          >
            <motion.div whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
              <Card className="p-5 md:p-6 bg-card">
                <div className="space-y-4 md:space-y-5">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-3 md:gap-4"
                  >
                    <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-1 text-sm md:text-base">Address</h3>
                      <p className="text-muted-foreground text-xs md:text-sm">
                        Bandra Kurla Complex, Plot C-59
                        <br />
                        G Block BKC, Bandra East
                        <br />
                        Mumbai, Maharashtra 400051
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-3 md:gap-4"
                  >
                    <Phone className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-1 text-sm md:text-base">Phone</h3>
                      <p className="text-muted-foreground text-xs md:text-sm">+91 22 6123 4567</p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start gap-3 md:gap-4"
                  >
                    <Mail className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-1 text-sm md:text-base">Email</h3>
                      <p className="text-muted-foreground text-xs md:text-sm">hello@urbanbitecafe.com</p>
                    </div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>

            {/* Google Maps Embed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg h-56 md:h-64 lg:h-80 w-full"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.1743872415826!2d72.86366731490067!3d19.063287387091988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8c6e1b2e5e1%3A0x6e3b6e3b6e3b6e3b!2sBandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Café Location - Bandra Kurla Complex, Mumbai"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}