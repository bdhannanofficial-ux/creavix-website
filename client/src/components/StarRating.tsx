import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  readonly?: boolean;
}

export function StarRating({ rating, onRatingChange, readonly = false }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          className={`focus:outline-none transition-transform ${
            !readonly ? "hover:scale-110 active:scale-95" : "cursor-default"
          }`}
        >
          <Star
            size={28}
            className={`transition-colors duration-200 ${
              star <= (hoverRating || rating)
                ? "fill-primary text-primary drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
