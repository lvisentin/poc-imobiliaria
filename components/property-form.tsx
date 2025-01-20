"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Upload, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export function PropertyForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [totalArea, setTotalArea] = useState("");
  const [landArea, setLandArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [hasGarage, setHasGarage] = useState(false);
  const [isFurnished, setIsFurnished] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages((prevImages) => [...prevImages, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!title || !description || !price || !address || images.length === 0) {
      setError(
        "Please fill in all required fields and upload at least one image"
      );
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append(
      "price",
      price.replace("R$", "").replace(".", "").replace(",", ".").trim()
    );
    formData.append("address", address);
    formData.append("totalArea", totalArea);
    formData.append("landArea", landArea);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("hasGarage", hasGarage.toString());
    formData.append("isFurnished", isFurnished.toString());
    formData.append("userId", "1"); // Replace with actual user ID from authentication
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        router.push("/dashboard/properties");
      } else {
        setError(data.message || "Failed to register property");
      }
    } catch (err) {
      console.error("Property registration error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register New Property</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <NumericFormat
              id="price"
              value={price}
              onValueChange={(values) => setPrice(values.formattedValue)}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              customInput={Input}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalArea">Total Area (m²)</Label>
              <Input
                id="totalArea"
                type="number"
                value={totalArea}
                onChange={(e) => setTotalArea(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landArea">Land Area (m²)</Label>
              <Input
                id="landArea"
                type="number"
                value={landArea}
                onChange={(e) => setLandArea(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                min="0"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasGarage"
                checked={hasGarage}
                onCheckedChange={(checked) => setHasGarage(checked as boolean)}
              />
              <Label htmlFor="hasGarage">Has Garage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isFurnished"
                checked={isFurnished}
                onCheckedChange={(checked) =>
                  setIsFurnished(checked as boolean)
                }
              />
              <Label htmlFor="isFurnished">Is Furnished</Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="images"
                type="file"
                onChange={handleImageChange}
                multiple
                accept="image/*"
                className="hidden"
              />
              <Label htmlFor="images" className="cursor-pointer">
                <div className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md">
                  <Upload className="h-5 w-5" />
                  <span>Upload Images</span>
                </div>
              </Label>
              <span>{images.length} image(s) selected</span>
            </div>
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-0 right-0 -mt-2 -mr-2"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register Property"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
