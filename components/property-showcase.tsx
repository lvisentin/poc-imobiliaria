"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Building } from "lucide-react";

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  images: string[];
}

export function PropertyShowcase() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/public-properties");
        const data = await response.json();
        if (data.success) {
          setProperties(data.properties);
        } else {
          setError("Failed to fetch properties");
        }
      } catch (err) {
      console.log("error", err)
        setError("An error occurred while fetching properties");
      }
    };

    fetchProperties();
  }, []);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <section id="properties" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          Featured Properties
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card key={property.id}>
              <Link href={`/properties/${property.id}`} className="block">
                <CardHeader>
                  <CardTitle>{property.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 h-48 relative">
                    {property.images.length > 0 ? (
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center rounded-md">
                        <Building className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {property.description}
                  </p>
                  <p className="font-bold">{formatPrice(property.price)}</p>
                  <p className="text-sm truncate">{property.address}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
