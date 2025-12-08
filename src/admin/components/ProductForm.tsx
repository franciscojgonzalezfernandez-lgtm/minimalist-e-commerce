import { Button } from "@/components/ui/button";
import type { Product, size } from "@/interfaces/Product";
import { X, SaveAll, Tag, Plus, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { Link } from "react-router";
import { AdminTitle } from "./AdminTitle";

import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

interface Props {
  product: Partial<Product>;
  title: string;
  subtitle: string;
  onSubmit: (productLike: Partial<Product>) => Promise<void>;
  isFetching: boolean;
}

const availableSizes: size[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({
  product,
  title,
  subtitle,
  onSubmit,
  isFetching,
}: Props) => {
  const [dragActive, setDragActive] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: product,
  });

  const selectedSizes = watch("sizes") || [];
  const appliedTags = watch("tags") || [];
  const currentStock = watch("stock") || 0;

  const tagInputRef = useRef<HTMLInputElement>(null);

  const addTag = (): void => {
    const refValue = tagInputRef.current?.value || "";
    if (!refValue) return;
    if (!appliedTags.includes(refValue)) {
      setValue("tags", [...appliedTags, refValue]);
    }
    if (tagInputRef.current) {
      tagInputRef.current.value = "";
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (appliedTags.includes(tagToRemove)) {
      setValue(
        "tags",
        appliedTags.filter((elem) => elem !== tagToRemove)
      );
    }
  };

  const addSize = (size: size) => {
    const actualValues = getValues("sizes") || [];
    if (!actualValues.includes(size)) {
      setValue("sizes", [...actualValues, size]);
    }
  };

  const removeSize = (size: size) => {
    const actualValues = getValues("sizes") || [];
    if (actualValues.includes(size)) {
      setValue(
        "sizes",
        actualValues.filter((elem) => elem !== size)
      );
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    console.log(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center">
        <AdminTitle greet={title} subtitle={subtitle} />
        <div className="flex justify-end mb-10 gap-4">
          <Button variant="outline" type="button">
            <Link to="/admin/products" className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Cancel
            </Link>
          </Button>

          <Button type="submit" disabled={isFetching}>
            <SaveAll className="w-4 h-4" />
            Save changes
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Product information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product title
                  </label>
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    className={`${
                      errors.title
                        ? "border-red-700 focus:ring-red-700"
                        : "focus:ring-blue-500 border-slate-300"
                    } w-full px-4 py-3 border  rounded-lg focus:ring-2  focus:border-transparent transition-all duration-200`}
                    placeholder="Título del producto"
                  />
                  {errors.title && (
                    <p className="text-red-700 text-sm">
                      This field is required
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Price (CHF)
                    </label>
                    <input
                      type="number"
                      {...register("price", {
                        required: true,
                        min: 0.1,
                      })}
                      className={`${
                        errors.price
                          ? "border-red-700 focus:ring-red-700"
                          : "focus:ring-blue-500 border-slate-300"
                      } w-full px-4 py-3 border  rounded-lg focus:ring-2  focus:border-transparent transition-all duration-200`}
                      placeholder="Product price"
                    />
                    {errors.price && (
                      <p className="text-red-700 text-sm">
                        Price has to be greater than 0.1
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Product's stock
                    </label>
                    <input
                      type="number"
                      {...register("stock", {
                        required: true,
                      })}
                      className={`${
                        errors.stock
                          ? "border-red-700 focus:ring-red-700"
                          : "focus:ring-blue-500 border-slate-300"
                      } w-full px-4 py-3 border  rounded-lg focus:ring-2  focus:border-transparent transition-all duration-200`}
                      placeholder="Product stock"
                    />
                  </div>
                  {errors.stock && (
                    <p className="text-red-700 text-sm">Stock is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product slug
                  </label>
                  <input
                    type="text"
                    {...register("slug", {
                      required: true,
                      validate: (value) =>
                        !/\s/.test(value?.toString() || "") ||
                        "Slug can't contain whitespaces",
                    })}
                    className={`${
                      errors.slug
                        ? "border-red-700 focus:ring-red-700"
                        : "focus:ring-blue-500 border-slate-300"
                    } w-full px-4 py-3 border  rounded-lg focus:ring-2  focus:border-transparent transition-all duration-200`}
                    placeholder="Product slug"
                  />
                  {errors.slug && (
                    <p className="text-red-700 text-sm">
                      {errors.slug.message || "Slug is required"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product gender
                  </label>
                  <select
                    {...register("gender")}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                    <option value="kids">Childs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product description
                  </label>
                  <textarea
                    {...register("description", {
                      required: true,
                    })}
                    rows={5}
                    className={`${
                      errors.description
                        ? "border-red-700 focus:ring-red-700"
                        : "focus:ring-blue-500 border-slate-300"
                    } w-full px-4 py-3 border  rounded-lg focus:ring-2  focus:border-transparent transition-all duration-200`}
                    placeholder="Product description"
                  />
                  {errors.description && (
                    <p className="text-red-700 text-sm">
                      Description is required
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Available sizes
              </h2>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <span
                      key={size}
                      className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200",
                        {
                          hidden: !selectedSizes.includes(size),
                        }
                      )}
                    >
                      {size}
                      <button
                        onClick={() => removeSize(size)}
                        className="ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
                        type="button"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                  <span className="text-sm text-slate-600 mr-2">
                    Add sizes:
                  </span>
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => addSize(size)}
                      disabled={selectedSizes.includes(size)}
                      type="button"
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedSizes.includes(size)
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Tags
              </h2>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {appliedTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="cursor-pointer ml-2 text-green-600 hover:text-green-800 transition-colors duration-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    ref={tagInputRef}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " " || e.key === ",") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Add new tag..."
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <Button onClick={addTag} className="px-4 py-2rounded-lg ">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Images */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Imágenes del producto
              </h2>

              {/* Drag & Drop Zone */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                  dragActive
                    ? "border-blue-400 bg-blue-50"
                    : "border-slate-300 hover:border-slate-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <div className="space-y-4">
                  <Upload className="mx-auto h-12 w-12 text-slate-400" />
                  <div>
                    <p className="text-lg font-medium text-slate-700">
                      Drag the images here
                    </p>
                    <p className="text-sm text-slate-500">
                      o click here to search
                    </p>
                  </div>
                  <p className="text-xs text-slate-400">
                    PNG, JPG, WebP until 10MB each one
                  </p>
                </div>
              </div>

              {/* Current Images */}
              <div className="mt-6 space-y-3">
                <h3 className="text-sm font-medium text-slate-700">
                  Current images
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.images?.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                        <img
                          src={image}
                          alt="Product"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <button className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <X className="h-3 w-3" />
                      </button>
                      <p className="mt-1 text-xs text-slate-600 truncate">
                        {image}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Status */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Product status
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">
                    Status
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">
                    Inventary
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      currentStock > 5
                        ? "bg-green-100 text-green-800"
                        : currentStock > 0
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {currentStock > 5
                      ? `${currentStock} in stock`
                      : currentStock > 0
                      ? `${currentStock} in stock - low`
                      : "No stock"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">
                    Images
                  </span>
                  <span className="text-sm text-slate-600">
                    {product.images?.length || 0} images
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">
                    Available sizes
                  </span>
                  <span className="text-sm text-slate-600">
                    {selectedSizes.length} sizes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
