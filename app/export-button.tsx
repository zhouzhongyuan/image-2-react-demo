"use client";

import dynamic from "next/dynamic";
import React, {useState} from "react";
import {blobToBase64} from "@/lib/blobToBase64";

interface IExportButtonProps {
    setHtml: (html: string) => void;
    base64Image: string;
    openAIKey: string;
}
function ExportButton(props: IExportButtonProps){

    const { setHtml, base64Image, openAIKey } = props;


    const [loading, setLoading] = useState(false);
    // A tailwind styled button that is pinned to the bottom right of the screen
    return (
        <button
            onClick={async (e) => {
        setLoading(true);
        try {
            e.preventDefault();
            const dataUrl = base64Image;
            // const dataUrl = sketchList;
            const resp = await fetch("/api/image-to-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image: dataUrl, openAIKey }),
            });

            const json = await resp.json();

            if (json.error) {
                alert("Error from open ai: " + JSON.stringify(json.error));
                return;
            }

            const message = json.choices[0].message.content;
            // const start = message.indexOf("<!DOCTYPE html>");
            // const end = message.indexOf("</html>");
            // const html = message.slice(start, end + "</html>".length);
            setHtml(message);
        } finally {
            setLoading(false);
        }
    }}
    className="bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ="
    style={{ zIndex: 1000 }}
    disabled={loading}
        >
        {loading ? (
                <div className="flex justify-center items-center ">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    </div>
            ) : (
                "Generate Code"
            )}
        </button>
);
}
export default ExportButton;
