"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { PreviewModal } from "@/components/PreviewModal";
import ExportButton from "@/app/export-button";

export default function Home() {
  const [html, setHtml] = useState<null | string>(null);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHtml(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  });

    const [openAIKey, setOpenAIKey] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [base64Image, setBase64Image] = useState('');

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];

        if (imageFile) {
            // Display the preview image
            setImagePreview(URL.createObjectURL(imageFile));

            // Convert the image to base64
            const reader = new FileReader();
            reader.onload = function () {
                const base64Image = reader.result;
                console.log("Base64 Image:", base64Image);
                setBase64Image(base64Image);
            };
            reader.readAsDataURL(imageFile);
        }
    };

  return (
    <>
      <div className={`w-screen h-screen`}>
        <h1 className="text-3xl font-bold place-content-center w-screen flex justify-center py-10">
          <div>Image to React</div>
        </h1>
          <div className="max-w-xl mx-auto my-8">
              {/*<h1 className="text-3xl font-semibold mb-4">Image Upload Page</h1>*/}
              <form>
                  <div className="flex align-middle">
                      <label className="block mb-2  py-2 px-4" htmlFor="imageInput">Select an image:</label>
                      <input
                          type="file"
                          id="imageInput"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="mb-4 text-white py-2  rounded"
                          required
                      />
                  </div>
                  <div className="flex align-middle">
                      <label className="block mb-2 align-middle py-2 px-4"  htmlFor="textInput">OpenAI key:</label>
                      <input
                          type="text"
                          id="textInput"
                          placeholder="ak-******"
                          value={openAIKey}
                          onChange={(e) => setOpenAIKey(e.target.value)}
                          className="mb-4 p-2 border border-gray-300 rounded"
                          required
                      />
                  </div>
              </form>
              <div id="imageContainer" className="mt-8">
                  {/*<h2 className="text-xl font-semibold mb-2">Preview:</h2>*/}
                  {imagePreview && (
                      <img
                          src={imagePreview}
                          alt="Preview Image"
                          className="max-w-full max-h-48 mb-4"
                      />
                  )}
              </div>
              <ExportButton setHtml={setHtml} base64Image={base64Image} openAIKey={openAIKey} />
          </div>
      </div>
      {html &&
        ReactDOM.createPortal(
          <div
            className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
            style={{ zIndex: 2000, backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setHtml(null)}
          >
            <PreviewModal html={html} setHtml={setHtml} />
          </div>,
          document.body
        )}
    </>
  );
}
