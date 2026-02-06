// FreeImage.host Image Upload Module
const API_KEY = "6d207e02198a847aa98d0a2a901485a5";

window.uploadedImages = {};

window.uploadImage = async function(boxId, file) {
  if (!file.type.startsWith("image/")) {
    alert("Please select an image file");
    return false;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("key", API_KEY);

  try {
    const response = await fetch("https://freeimage.host/api/1/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const result = await response.json();
    
    if (!result.image || !result.image.url) {
      throw new Error("Invalid response from server");
    }

    const imageUrl = result.image.url;
    const imageId = result.image.id;
    
    window.uploadedImages[boxId] = {
      url: imageUrl,
      id: imageId,
    };

    window.renderImageBox(boxId, imageUrl);
    return true;
  } catch (error) {
    console.error("Upload error:", error);
    alert("Failed to upload image: " + error.message);
    return false;
  }
};

window.deleteImage = async function(boxId) {
  const imageData = window.uploadedImages[boxId];
  if (!imageData) return;

  try {
    const response = await fetch("https://freeimage.host/api/1/delete/" + imageData.id, {
      method: "GET",
      headers: {
        "key": API_KEY,
      },
    });

    if (response.ok) {
      delete window.uploadedImages[boxId];
      window.renderImageBox(boxId, null);
    } else {
      alert("Failed to delete image");
    }
  } catch (error) {
    console.error("Delete error:", error);
    alert("Error deleting image");
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
