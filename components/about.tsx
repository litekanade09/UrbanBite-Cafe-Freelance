"use client"

import { motion, useScroll, useTransform, useInView as useFramerInView } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Coffee, Users, Award, Heart } from "lucide-react"

const statistics = [
  {
    icon: Coffee,
    value: 50000,
    suffix: "+",
    label: "Cups Served",
    color: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Happy Customers",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Award,
    value: 15,
    suffix: "+",
    label: "Awards Won",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: Heart,
    value: 7,
    suffix: " Years",
    label: "In Business",
    color: "text-rose-600 dark:text-rose-400",
  },
]

function CountUpAnimation({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let startTime: number
    const duration = 2000
    const startValue = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * (value - startValue) + startValue)
      
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, value])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function About() {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const statsRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const statsInView = useFramerInView(statsRef, { once: true, margin: "-50px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-20 md:py-32 bg-card overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <motion.img
              style={{ y, opacity }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              src="/artisan-coffee-being-prepared-by-barista.jpg"
              alt="About UrbanBite"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </motion.div>

          <motion.div variants={textContainerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              Our Story
            </motion.h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <motion.p variants={textVariants}>
                Founded in 2018, UrbanBite Café was born from a simple passion: to create a warm, welcoming space where
                exceptional coffee meets genuine hospitality.
              </motion.p>
              <motion.p variants={textVariants}>
                We source our beans from sustainable farms around the world, roasting them in small batches to bring out
                their unique character. Every cup tells a story of craftsmanship and care.
              </motion.p>
              <motion.p variants={textVariants}>
                Whether you're here for a quick espresso or planning to stay awhile with your laptop, we've created a
                space that feels like home. Come for the coffee, stay for the community.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={statsInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-background rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={statsInView ? { rotate: 0, opacity: 1 } : { rotate: -180, opacity: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                className="flex justify-center mb-4"
              >
                <div className={`${stat.color} bg-current/10 rounded-full p-3`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-2"
              >
                <CountUpAnimation value={stat.value} suffix={stat.suffix} inView={statsInView} />
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                className="text-sm text-muted-foreground font-medium"
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}