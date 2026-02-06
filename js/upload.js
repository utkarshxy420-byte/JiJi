// Supabase Image Upload Module
const SUPABASE_URL = "https://xreheedqnskwloiexmir.supabase.co";
const SUPABASE_KEY = "sb_publishable_s95UGRzVfpccIwEpbLWikA_DWrWXJjL";

window.uploadedImages = {};

window.uploadImage = async function(boxId, file) {
  if (!file.type.startsWith("image/")) {
    alert("Please select an image file");
    return false;
  }

  const fileName = `${boxId}-${Date.now()}-${file.name}`;
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${SUPABASE_URL}/storage/v1/object/jia-charts/${fileName}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/jia-charts/${fileName}`;
    
    window.uploadedImages[boxId] = {
      fileName,
      url: imageUrl,
    };

    window.renderImageBox(boxId, imageUrl);
    return true;
  } catch (error) {
    console.error("Upload error:", error);
    alert("Failed to upload image");
    return false;
  }
};

window.deleteImage = async function(boxId) {
  const imageData = window.uploadedImages[boxId];
  if (!imageData) return;

  try {
    const response = await fetch(
      `${SUPABASE_URL}/storage/v1/object/jia-charts/${imageData.fileName}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (response.ok) {
      delete window.uploadedImages[boxId];
      window.renderImageBox(boxId, null);
    }
  } catch (error) {
    console.error("Delete error:", error);
  }
};

window.renderImageBox = function(boxId, imageUrl) {
  const box = document.getElementById(`image-box-${boxId}`);
  if (!box) return;

  if (imageUrl) {
    box.innerHTML = `
      <img src="${imageUrl}" alt="Uploaded image" class="uploaded-image" />
      <button class="delete-btn" onclick="window.deleteImage('${boxId}')">Delete</button>
    `;
    box.classList.add("has-image");
  } else {
    box.innerHTML = `
      <label class="upload-label">
        <input 
          type="file" 
          accept="image/*" 
          onchange="window.handleImageUpload('${boxId}', this.files[0])"
        />
        <span>+ Upload Image</span>
      </label>
    `;
    box.classList.remove("has-image");
  }
};

window.handleImageUpload = async function(boxId, file) {
  if (file) {
    const success = await window.uploadImage(boxId, file);
    if (!success) {
      document.getElementById(`image-box-${boxId}`).querySelector("input").value = "";
    }
  }
};
