"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Clock, TrendingUp } from "lucide-react"

const menuCategories = {
  Coffee: [
    { name: "Espresso", price: "₹250", description: "Rich and bold single shot" },
    { name: "Cappuccino", price: "₹320", description: "Espresso with steamed milk foam" },
    { name: "Latte", price: "₹340", description: "Smooth espresso with steamed milk" },
    { name: "Americano", price: "₹270", description: "Espresso with hot water" },
    { name: "Mocha", price: "₹360", description: "Espresso with chocolate and steamed milk" },
    { name: "Cold Brew", price: "₹320", description: "Smooth cold-steeped coffee" },
  ],
  Snacks: [
    { name: "Croissant", price: "₹250", description: "Buttery and flaky pastry" },
    { name: "Avocado Toast", price: "₹610", description: "Fresh avocado on sourdough" },
    { name: "Breakfast Sandwich", price: "₹540", description: "Egg, cheese, and bacon" },
    { name: "Granola Bowl", price: "₹470", description: "Yogurt, granola, and berries" },
    { name: "Turkey Club", price: "₹680", description: "Turkey, bacon, lettuce, tomato" },
    { name: "Caesar Salad", price: "₹575", description: "Romaine, parmesan, croutons" },
  ],
  Desserts: [
    { name: "Chocolate Cake", price: "₹395", description: "Rich chocolate layer cake" },
    { name: "Cheesecake", price: "₹430", description: "New York style cheesecake" },
    { name: "Tiramisu", price: "₹470", description: "Classic Italian dessert" },
    { name: "Brownie", price: "₹320", description: "Fudgy chocolate brownie" },
    { name: "Lemon Tart", price: "₹360", description: "Tangy lemon custard tart" },
    { name: "Cookie Platter", price: "₹540", description: "Assorted fresh-baked cookies" },
  ],
}

const todaysSpecial = {
  name: "Caramel Macchiato Supreme",
  description: "Velvety espresso layered with vanilla-infused milk, topped with rich caramel drizzle and a hint of sea salt",
  originalPrice: "₹450",
  specialPrice: "₹299",
  discount: "34% OFF",
  endsIn: "Today Only!",
}

export function Menu() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState<keyof typeof menuCategories>("Coffee")
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const endOfDay = new Date()
      endOfDay.setHours(23, 59, 59, 999)
      
      const difference = endOfDay.getTime() - now.getTime()
      
      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      
      setTimeLeft({ hours, minutes, seconds })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="menu" className="py-20 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Our Menu</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Crafted with care, served with passion. Explore our selection of premium coffee and homemade treats.
          </p>
        </motion.div>

        {/* Today's Special Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Special Badge */}
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="absolute -top-4 -right-4 z-10"
            >
              <div className="bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {todaysSpecial.discount}
              </div>
            </motion.div>

            <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-2 border-accent/20">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  {/* Left Content */}
                  <div className="flex-1 text-center md:text-left">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-2 justify-center md:justify-start mb-3"
                    >
                      <TrendingUp className="w-5 h-5 text-accent" />
                      <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                        Today's Special
                      </span>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: 0.5 }}
                      className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3"
                    >
                      {todaysSpecial.name}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-muted-foreground text-sm md:text-base mb-4"
                    >
                      {todaysSpecial.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center gap-3 justify-center md:justify-start mb-4"
                    >
                      <span className="text-muted-foreground line-through text-lg">
                        {todaysSpecial.originalPrice}
                      </span>
                      <span className="text-accent font-bold text-3xl">
                        {todaysSpecial.specialPrice}
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Button
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 shadow-lg"
                      >
                        Order Now
                      </Button>
                    </motion.div>
                  </div>

                  {/* Right - Countdown Timer */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-accent" />
                      <span className="text-sm font-semibold text-muted-foreground uppercase">
                        Offer Ends In
                      </span>
                    </div>
                    <div className="flex gap-2 md:gap-3">
                      {[
                        { value: timeLeft.hours, label: "Hours" },
                        { value: timeLeft.minutes, label: "Mins" },
                        { value: timeLeft.seconds, label: "Secs" },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                          className="flex flex-col items-center"
                        >
                          <div className="bg-accent text-accent-foreground rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[60px] md:min-w-[70px] shadow-md">
                            <span className="text-2xl md:text-3xl font-bold block">
                              {String(item.value).padStart(2, "0")}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1 font-medium">
                            {item.label}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {Object.keys(menuCategories).map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category as keyof typeof menuCategories)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-card-foreground hover:bg-muted"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Items */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {menuCategories[activeCategory].map((item) => (
            <motion.div key={item.name} variants={itemVariants}>
              <motion.div whileHover={{ y: -8, rotateZ: 1 }} transition={{ duration: 0.3 }}>
                <Card className="p-6 hover:shadow-2xl transition-all duration-300 bg-card h-full">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl font-semibold text-card-foreground">{item.name}</h3>
                    <motion.span
                      className="text-accent font-bold text-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      {item.price}
                    </motion.span>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}