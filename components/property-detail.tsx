"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Bath,
  BedDouble,
  Building,
  Car,
  Home,
  Maximize2,
  MonitorSmartphone,
  Printer,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

/* eslint-disable  @typescript-eslint/no-explicit-any */

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  images: string[];
  created_at: string;
  updated_at: string;
  code?: string;
  totalArea?: number;
  landArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  hasGarage?: boolean;
  isFurnished?: boolean;
}

interface PropertyDetailProps {
  propertyId: number;
  isAuthenticated?: boolean;
}

// function SampleNextArrow(props: any) {
//   const { onClick } = props;
//   return (
//     <Button
//       className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
//       size="icon"
//       variant="secondary"
//       onClick={onClick}
//     >
//       <span className="sr-only">Next</span>
//     </Button>
//   );
// }

// function SamplePrevArrow(props: any) {
//   const { onClick } = props;
//   return (
//     <Button
//       className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
//       size="icon"
//       variant="secondary"
//       onClick={onClick}
//     >
//       <span className="sr-only">Previous</span>
//     </Button>
//   );
// }

export function PropertyDetail({
  propertyId,
  isAuthenticated = false,
}: PropertyDetailProps) {
  const [property, setProperty] = useState<Property | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          isAuthenticated
            ? `/api/properties/${propertyId}`
            : `/api/public-properties/${propertyId}`
        );
        const data = await response.json();
        if (data.success) {
          setProperty(data.property);
          // Fetch related properties
          const relatedResponse = await fetch("/api/public-properties");
          const relatedData = await relatedResponse.json();
          if (relatedData.success) {
            setRelatedProperties(
              relatedData.properties
                .filter((p: Property) => p.id !== propertyId)
                .slice(0, 3)
            );
          }
        } else {
          setError("Failed to fetch property details");
        }
      } catch (err) {
        console.log("error", err);
        setError("An error occurred while fetching property details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, isAuthenticated]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  // };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...contactForm,
          propertyId,
        }),
      });
      if (response.ok) {
        alert("Message sent successfully!");
        setContactForm({ name: "", phone: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.log("error", error);
      alert("Failed to send message. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="text-sm text-muted-foreground mb-2">
            Código: {property.code || propertyId}
          </div>
          <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
        </div>
        <Button variant="ghost" className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Imprimir
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            {property.images.length > 0 ? (
              // <Slider {...settings} className="property-carousel">
              property.images.map((image, index) => (
                <div key={index} className="relative aspect-video">
                  <Image
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              ))
            ) : (
              // </Slider>
              <div className="aspect-video bg-muted flex items-center justify-center rounded-lg">
                <Building className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-8">
            <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
              <Home className="h-6 w-6 mb-2" />
              <div className="text-sm font-medium">
                {property.totalArea || 0}m²
              </div>
              <div className="text-xs text-muted-foreground">total</div>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
              <Maximize2 className="h-6 w-6 mb-2" />
              <div className="text-sm font-medium">
                {property.landArea || 0}m²
              </div>
              <div className="text-xs text-muted-foreground">terreno</div>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
              <BedDouble className="h-6 w-6 mb-2" />
              <div className="text-sm font-medium">
                {property.bedrooms || 0}
              </div>
              <div className="text-xs text-muted-foreground">dormitórios</div>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
              <Bath className="h-6 w-6 mb-2" />
              <div className="text-sm font-medium">
                {property.bathrooms || 0}
              </div>
              <div className="text-xs text-muted-foreground">banheiro</div>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
              <Car className="h-6 w-6 mb-2" />
              <div className="text-sm font-medium">
                {property.hasGarage ? "Sim" : "-"}
              </div>
              <div className="text-xs text-muted-foreground">garagem</div>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-muted rounded-lg">
              <MonitorSmartphone className="h-6 w-6 mb-2" />
              <div className="text-sm font-medium">
                {property.isFurnished ? "Sim" : "Sem"}
              </div>
              <div className="text-xs text-muted-foreground">mobília</div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Descrição</h2>
              <p className="text-muted-foreground">{property.description}</p>
            </div>

            {relatedProperties.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Imóveis Relacionados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedProperties.map((related) => (
                    <Link href={`/properties/${related.id}`} key={related.id}>
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                          <div className="relative aspect-video">
                            {related.images[0] ? (
                              <Image
                                src={related.images[0]}
                                alt={related.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-lg"
                              />
                            ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center">
                                <Building className="h-12 w-12 text-muted-foreground" />
                              </div>
                            )}
                            <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                              COMPRAR
                            </div>
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                              Cód. {related.code || related.id}
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium truncate">
                              {related.title}
                            </h3>
                            <p className="text-primary font-bold">
                              {formatPrice(related.price)}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-1">Venda:</div>
                <div className="text-2xl font-bold text-primary">
                  {formatPrice(property.price)}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold">Entrar em contato</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Nome"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Telefone"
                      value={contactForm.phone}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="E-mail"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Informe uma mensagem"
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Enviar
                  </Button>
                </form>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Compartilhar</div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .property-carousel .slick-list,
        .property-carousel .slick-track,
        .property-carousel .slick-slide > div {
          height: 100%;
        }
        .property-carousel .slick-slide > div > div {
          height: 100%;
        }
      `}</style>
    </div>
  );
}
