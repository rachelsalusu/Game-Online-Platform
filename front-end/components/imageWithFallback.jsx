import React, { useState } from 'react';
import Image from 'next/image';

const ImageWithFallback = (props) => {
    const { imgWidth, imgHeight, desc, src, fallbackSrc, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
            alt={desc}
            width={imgWidth}
            height={imgHeight}
        />
    );
};

export default ImageWithFallback;