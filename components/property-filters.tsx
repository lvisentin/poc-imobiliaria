"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "");
  const [propertyType, setPropertyType] = useState(
    searchParams.get("propertyType") || ""
  );
  const [area, setArea] = useState(
    searchParams.get("area") ? parseInt(searchParams.get("area")!) : 0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (bedrooms) params.append("bedrooms", bedrooms);
    if (propertyType) params.append("propertyType", propertyType);
    if (area > 0) params.append("area", area.toString());
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="minPrice">Min Price</Label>
            <Input
              id="minPrice"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min Price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxPrice">Max Price</Label>
            <Input
              id="maxPrice"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max Price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger id="bedrooms">
                <SelectValue placeholder="Select bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger id="propertyType">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="area">Minimum Area (m²): {area}</Label>
            <Slider
              id="area"
              min={0}
              max={500}
              step={10}
              value={[area]}
              onValueChange={(value) => setArea(value[0])}
            />
          </div>
          <Button type="submit" className="w-full">
            Apply Filters
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
