window.renderChart = function(container, chartType) {
  chartType = chartType || "performance";
  
  if (chartType === "personality") {
    container.innerHTML = `
      <div class="chart" style="margin-top: 20px;">
        <div class="chart-label">Personality Matrix</div>
        <div class="chart-bars">
          <div class="bar-item">
            <div class="bar-label">Chaotic Energy</div>
            <div class="bar-container">
              <div class="bar-fill" style="width: 88%; background: linear-gradient(90deg, #ffd36a, #ff9800);"></div>
            </div>
            <div class="bar-value">88%</div>
          </div>
          <div class="bar-item">
            <div class="bar-label">Humor Output</div>
            <div class="bar-container">
              <div class="bar-fill" style="width: 92%; background: linear-gradient(90deg, #3cffb0, #00e676);"></div>
            </div>
            <div class="bar-value">92%</div>
          </div>
          <div class="bar-item">
            <div class="bar-label">Procrastination Index</div>
            <div class="bar-container">
              <div class="bar-fill" style="width: 99%; background: linear-gradient(90deg, #2a6cf5, #1e3a8a);"></div>
            </div>
            <div class="bar-value">99%</div>
          </div>
        </div>
      </div>
    `;
  } else if (chartType === "performance") {
    container.innerHTML = `
      <div class="chart" style="margin-top: 20px;">
        <div class="chart-label">Annual Performance Metrics</div>
        <div class="mini-stats">
          <div class="stat-box">
            <div class="stat-number">365</div>
            <div class="stat-label">Days Survived</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">∞</div>
            <div class="stat-label">Awkward Moments</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">42</div>
            <div class="stat-label">Self-Roasts</div>
          </div>
        </div>
        <div class="chart-bars" style="margin-top: 16px;">
          <div class="bar-item">
            <div class="bar-label">Productivity</div>
            <div class="bar-container">
              <div class="bar-fill" style="width: 36%; background: linear-gradient(90deg, #2a6cf5, #1e3a8a);"></div>
            </div>
            <div class="bar-value">36%</div>
          </div>
          <div class="bar-item">
            <div class="bar-label">Fun Factor</div>
            <div class="bar-container">
              <div class="bar-fill" style="width: 94%; background: linear-gradient(90deg, #ffd36a, #ff9800);"></div>
            </div>
            <div class="bar-value">94%</div>
          </div>
        </div>
      </div>
    `;
  } else if (chartType === "social") {
    container.innerHTML = `
      <div class="chart" style="margin-top: 20px;">
        <div class="chart-label">Social Dynamics</div>
        <div class="chart-bars">
          <div class="bar-item">
            <div class="bar-label">Friend Tolerance</div>
            <div class="bar-container">
              <div class="bar-fill" style="width: 94%; background: linear-gradient(90deg, #3cffb0, #00e676);"></div>
            </div>
            <div class="bar-value">94%</div>
          </div>
          <div class="bar-item">
            <div class="bar-label">Humor Appreciation</div>
            <div class="bar-container">
              <div class="bar-fill" style="width: 87%; background: linear-gradient(90deg, #ffd36a, #ff9800);"></div>
            </div>
            <div class="bar-value">87%</div>
          </div>
          <div class="bar-item">
            <div class="bar-label">Ghosting Ability</div>
            <div class="bar-container">
              <div class="bar-fill" style="width: 91%; background: linear-gradient(90deg, #2a6cf5, #1e3a8a);"></div>
            </div>
            <div class="bar-value">91%</div>
          </div>
        </div>
      </div>
    `;
  }
};

window.renderBullets = function(container, items) {
  const bulletList = items
    .map(item => `<li class="bullet-item">${item}</li>`)
    .join("");
  container.innerHTML = `
    <div class="chart" style="margin-top: 20px;">
      <ul class="bullet-list">
        ${bulletList}
      </ul>
    </div>
  `;
};

window.renderMilestone = function(container, stats) {
  const statRows = Object.values(stats)
    .map(stat => `
      <div class="milestone-row">
        <div class="milestone-label">${stat.label}</div>
        <div class="milestone-value">${stat.value.toLocaleString()}</div>
      </div>
    `)
    .join("");
  
  container.innerHTML = `
    <div class="chart milestone-chart" style="margin-top: 20px;">
      ${statRows}
    </div>
  `;
};

window.renderImageBoxes = function(container, boxCount) {
  const STATIC_IMAGE_URL = "https://res.cloudinary.com/duim49h6r/image/upload/v1749424797/legacy_vault/syziddiq4eycjmmyf7ju.jpg";
  const JIA_IMAGE_URL = "https://res.cloudinary.com/duim49h6r/image/upload/v1770383628/xigaepauivpxirmlxyzh.jpg";

  const boxes = Array.from({ length: boxCount })
    .map((_, i) => {
      // Box 0 shows the fixed test image
      if (i === 0) {
        return `
          <div id="image-box-${i}" class="image-box has-image">
            <img 
              src="${STATIC_IMAGE_URL}" 
              alt="Test image" 
              class="uploaded-image" 
              onclick="window.openImageModal('${STATIC_IMAGE_URL}')" 
            />
          </div>
        `;
      }

      // Box 1 shows the Jia slide image
      if (i === 1) {
        return `
          <div id="image-box-${i}" class="image-box has-image">
            <img 
              src="${JIA_IMAGE_URL}" 
              alt="Jia slide image" 
              class="uploaded-image" 
              onclick="window.openImageModal('${JIA_IMAGE_URL}')" 
            />
          </div>
        `;
      }

      // Other boxes stay as upload inputs
      return `
        <div id="image-box-${i}" class="image-box">
          <label class="upload-label">
            <input 
              type="file" 
              accept="image/*" 
              onchange="window.handleImageUpload('${i}', this.files[0])"
            />
            <span>+ Upload Image</span>
          </label>
        </div>
      `;
    })
    .join("");
  
  container.innerHTML = `
    <div class="chart" style="margin-top: 20px;">
      <div class="image-grid">
        ${boxes}
      </div>
    </div>
  `;
};

window.renderText = function(container, content) {
  container.innerHTML = `
    <div class="chart text-content" style="margin-top: 20px; line-height: 1.8;">
      ${content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
    </div>
  `;
};
