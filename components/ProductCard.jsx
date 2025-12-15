"use client";

import { deleteProduct } from "@/app/actions";
import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./ui/card";
import {
  ChevronUp,
  ExternalLink,
  Trash2,
  ChevronDown,
  LineChart,
} from "lucide-react";
import { Button } from "./ui/button";
import PriceChart from "./PriceChart";

const ProductCard = ({ product }) => {
  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setDeleting(true);

    const result = await deleteProduct(product.id);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message || "Product deleted successfully!");
    }

    setDeleting(false);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex gap-4">
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-md border"
            />
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-orange-500">
                {product.currency} {product.current_price}
              </span>

              <div className="flex items-center gap-1 text-sm text-gray-600">
            <LineChart className="w-4 h-4" />
          <span>Tracking</span>
              </div>

            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {/* Price History Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className="gap-1"
          >
            {showChart ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide Price History
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show Price History
              </>
            )}
          </Button>

          {/* View Product */}
          <Button variant="outline" size="sm" asChild className="gap-1">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
              View Product
            </a>
          </Button>

          {/* Delete */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-600 hover:bg-red-50 hover:text-red-700 gap-1"
          >
            <Trash2 className="w-4 h-4" />
            {deleting ? "Removing..." : "Remove Product"}
          </Button>
        </div>
      </CardContent>

      {showChart && (
        <CardFooter className="pt-0">
          <PriceChart productId={product.id} />
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;
