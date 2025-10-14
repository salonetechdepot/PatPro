import { Card, CardContent } from "@/components/ui/card"
import { Home, Building2, Sparkles, Droplets } from "lucide-react"

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    description:
      "Comprehensive home cleaning services tailored to your needs, from regular maintenance to deep cleaning.",
    image: "/clean-modern-home-interior--living-room.jpg",
  },
  {
    icon: Building2,
    title: "Commercial Cleaning",
    description:
      "Professional office and commercial space cleaning to maintain a pristine work environment for your business.",
    image: "/clean-modern-office-space--professional-workspace.jpg",
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    description:
      "Intensive cleaning services that reach every corner, perfect for move-ins, move-outs, or seasonal refreshes.",
    image: "/deep-cleaning--sparkling-clean-kitchen.jpg",
  },
  {
    icon: Droplets,
    title: "Specialized Services",
    description: "Carpet cleaning, window washing, and other specialized services to keep your space looking its best.",
    image: "/carpet-cleaning--window-washing-service.jpg",
  },
]

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Comprehensive cleaning solutions designed to meet your unique needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 md:p-8">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
