"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
}

export function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/properties?${searchParams.toString()}`
        );
        const data = await response.json();
        if (data.success) {
          setProperties(data.properties);
        } else {
          setError("Failed to fetch properties");
        }
      } catch (err) {
        console.log("error", err);
        setError("An error occurred while fetching properties");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

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

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        No properties found matching your criteria.
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
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
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>{property.bedrooms} bed</span>
                <span>{property.bathrooms} bath</span>
                <span>{property.area} m²</span>
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
