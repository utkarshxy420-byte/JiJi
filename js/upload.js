// Cloudinary Image Upload Module
const CLOUDINARY_CLOUD_NAME = "duim49h6r";
const CLOUDINARY_API_KEY = "wPF1vV-YzSWaTm8fwAjM1B5OnR8";

// --- Persistence helpers (per-browser using localStorage) ---
const UPLOADED_IMAGES_STORAGE_KEY = "uploadedImages";

function loadUploadedImagesFromStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return {};
    }
    const raw = window.localStorage.getItem(UPLOADED_IMAGES_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // Basic shape validation
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  } catch (err) {
    console.error("Failed to load uploaded images from storage:", err);
  }
  return {};
}

function saveUploadedImagesToStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(
      UPLOADED_IMAGES_STORAGE_KEY,
      JSON.stringify(window.uploadedImages || {})
    );
  } catch (err) {
    console.error("Failed to save uploaded images to storage:", err);
  }
}

// Initialize in-memory map from storage so that refresh keeps state
window.uploadedImages = loadUploadedImagesFromStorage();

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

      // Persist to localStorage so that a refresh keeps the image
      saveUploadedImagesToStorage();

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
      saveUploadedImagesToStorage();
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

// Called after the image boxes for the page are rendered.
// It rehydrates any previously uploaded images from localStorage.
window.initializeImageBoxes = function(boxCount) {
  if (!window.uploadedImages) return;
  
  for (let i = 0; i < boxCount; i++) {
    const key = String(i);
    const imageData = window.uploadedImages[key];
    if (imageData && imageData.url) {
      window.renderImageBox(key, imageData.url);
    }
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
