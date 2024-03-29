import { blurData } from "@/constants";
import Image from "next/image";
import React, { memo, useState } from "react";

interface CryptoSlideProps {
    image: string;
    currency: string;
}

// slide for slider(Crypto Slide)
const CryptoSlide = ({ image, currency }: CryptoSlideProps) => {
    const [src, setSrc] = useState(image);

    return (
        <Image
            src={src}
            alt={currency}
            width={0}
            height={0}
            sizes="100vw"
            style={{
                width: "100%",
                height: "350px",
            }}
            placeholder="blur"
            loading="lazy"
            blurDataURL={blurData}
            onErrorCapture={() => {
                setSrc("/assets/images/placeholder.png");
            }}
        />
    );
};

export default memo(
    CryptoSlide,
    (prevProps: CryptoSlideProps, nextProps: CryptoSlideProps) =>
        prevProps.currency === nextProps.currency &&
        prevProps.image === nextProps.image
);
