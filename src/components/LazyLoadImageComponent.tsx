import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import defaultBanner from "../assets/images/defaltsongbanner.jpg";
export const LazyLoadImageComponent: React.FC<imageProps> = ({
  alt,
  src,
  className,
}) => {
  return (
    <LazyLoadImage
      alt={alt}
      effect="blur"
      wrapperProps={{
        style: { transitionDelay: "0.5s" },
      }}
      className={className}
      src={src ? src : defaultBanner}
    />
  );
};
