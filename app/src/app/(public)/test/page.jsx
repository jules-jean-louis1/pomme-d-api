"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { CommandList } from "cmdk";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("product_name");
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const params = [
    {
      value: "product_name",
      label: "Nom du produit",
    },
    {
      value: "brands",
      label: "Marques",
    },
    {
      value: "generic_name_fr",
      label: "Déscriptif du produit",
    },
    {
      value: "categories_tags",
      label: "Catégories",
    },
    {
      value: "additives_tags",
      label: "Additifs",
    },
    {
      value: "quantity",
      label: "Quantité",
    },
    {
      value: "ingredients_text_fr",
      label: "Ingrédients",
    },
  ];

  const searchProducts = async (value, query) => {
    const API_URL_V2 = `https://world.openfoodfacts.org/api/v2/search?${value}=${query}&fields=abbreviated_product_name_fr,brands,code,generic_name_fr,image_front_small_url,nutrient_levels,nutriments,nutriscore`;
    const API_URL_V1 = `https://fr.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&fields=abbreviated_product_name_fr,brands,code,generic_name_fr,image_front_small_url,nutrient_levels,nutriments,nutriscore`;
    let url;

    if (value === "") {
      url = `${API_URL_V1}`;
    } else if (value === "product_name") {
      url = `${API_URL_V1}`;
    } else {
      url = `${API_URL_V2}`;
    }
    try {
      const response = await fetch(`${url}`);
      const data = await response.json();
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        searchProducts(value, query);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);
  return (
    <div className="flex flex-col max-w-[600px] border rounded-lg z-50">
      <div className="flex items-center p-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? params.find((framework) => framework.value === value)?.label
                : "Selectionner..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Filtres..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {params.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === framework.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Input
          type="text"
          placeholder="Rechercher un produit"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="h-full max-h-[600px] overflow-y-auto">
        {products.length > 0 && (
          <Table>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.code}>
                  <TableCell>
                    <img
                      src={product.image_front_small_url}
                      alt={product.abbreviated_product_name_fr}
                    />
                  </TableCell>
                  <TableCell>{product.abbreviated_product_name_fr}</TableCell>
                  <TableCell>{product.brands}</TableCell>
                  <TableCell>{product.categories_tags}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default ComboboxDemo;
