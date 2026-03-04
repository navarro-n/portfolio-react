import { useEffect } from "react";

export default function usePreloadImages(urls = []) {
    useEffect(() => {
        const unique = Array.from(new Set(urls.filter(Boolean)));

        unique.forEach((url) => {
        const img = new Image();
        img.decoding = "async";
        img.loading = "eager";
        img.src = url;
        });
    }, [urls]);
}