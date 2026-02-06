// Cloudinary Image Upload Module (no backend API)
const CLOUDINARY_CLOUD_NAME = "duim49h6r";
const CLOUDINARY_API_KEY = "wPF1vV-YzSWaTm8fwAjM1B5OnR8";

// Simple in-memory map of uploaded images for this session only.
// (No persistence and no shared backend.)
window.uploadedImages = {};

async function copyTextToClipboard(text) {
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    // Some browsers block clipboard without user gesture / HTTPS.
    console.warn("Clipboard API failed, trying fallback:", err);
  }

  // Fallback: create a temporary textarea and use execCommand
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch (err) {
    console.warn("Clipboard fallback failed:", err);
    return false;
  }
}

window.uploadImage = async function(boxId, file) {
  if (!file.type.startsWith("image/")) {
    alert("Please select an image file");
    return false;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "jia_birthday");
  formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const result = await response.json();
    
    if (result.secure_url) {
      const imageUrl = result.secure_url;
      const imageId = result.public_id;
      
      window.uploadedImages[boxId] = {
        url: imageUrl,
        id: imageId,
      };

      // Copy the Cloudinary link to clipboard (test behavior)
      const copied = await copyTextToClipboard(imageUrl);
      if (!copied) {
        console.warn("Could not copy image URL to clipboard. URL:", imageUrl);
      }

      window.renderImageBox(boxId, imageUrl);
      return true;
    } else {
      throw new Error("Invalid response from Cloudinary");
    }
  } catch (error) {
    console.error("Upload error:", error);
    alert("Failed to upload image. Make sure the upload_preset 'jia_birthday' is configured in Cloudinary as unsigned.");
    return false;
  }
};

window.deleteImage = async function(boxId) {
  const imageData = window.uploadedImages[boxId];
  if (!imageData) return;

  try {
    const formData = new FormData();
    formData.append("public_id", imageData.id);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (result.result === "ok") {
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
      <img src="${imageUrl}" alt="Uploaded image" class="uploaded-image" onclick="window.openImageModal('${imageUrl}')" />
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

window.openImageModal = function(imageUrl) {
  let modal = document.getElementById("image-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "image-modal";
    modal.className = "image-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <img id="modal-image" src="" alt="Enlarged image" />
        <button class="modal-close" onclick="window.closeImageModal()">&times;</button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) window.closeImageModal();
    });
  }
  
  document.getElementById("modal-image").src = imageUrl;
  modal.classList.add("active");
};

window.closeImageModal = function() {
  const modal = document.getElementById("image-modal");
  if (modal) {
    modal.classList.remove("active");
  }
};

window.handleImageUpload = async function(boxId, file) {
  if (file) {
    const success = await window.uploadImage(boxId, file);
    if (!success) {
      const input = document.getElementById(`image-box-${boxId}`).querySelector("input");
      if (input) input.value = "";
    }
  }
};
