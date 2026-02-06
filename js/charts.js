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
  // Keep the Jia image and render all provided memes (no empty upload boxes)
  const IMAGES = [
    "https://res.cloudinary.com/duim49h6r/image/upload/v1770383628/xigaepauivpxirmlxyzh.jpg",
    "https://res.cloudinary.com/duim49h6r/image/upload/v1770394589/b93ca6dae5a03bafee6411db808dcbe7_shag6u.jpg",
    "https://res.cloudinary.com/duim49h6r/image/upload/v1770394590/128f1d6c0caa8c4905f90b206642edd7_lwkijj.jpg",
    "https://res.cloudinary.com/duim49h6r/image/upload/v1770394590/4286a9c23d2bb2664ee930b331a058e7_glizyy.jpg",
    "https://res.cloudinary.com/duim49h6r/image/upload/v1770394589/9668b53900c96bc46ce898e35bb286b1_buro6d.jpg",
    "https://res.cloudinary.com/duim49h6r/image/upload/v1770394589/d1ac328927c2105963045d28ac4a827e_spyzdn.jpg",
    "https://res.cloudinary.com/duim49h6r/image/upload/v1770394588/41e73397ce7428cbabfbe5e4c455e5a8_ycfbco.jpg",
    "https://res.cloudinary.com/duim49h6r/image/upload/v1770394588/2377c6a984a5fff7dd410b688fa50600_hx01vq.jpg",
    "https://res.cloudinary.com/duim49h6r/image/upload/v1770394588/3ccf18e19be0d719060becb74d72ed5f_bpuagm.jpg",
    "https://res.cloudinary.com/duim49h6r/image/upload/v1770394588/9ca9426172c54d176ce5674a73626bd7_adlgkg.jpg",
    "https://res.cloudinary.com/duim49h6r/image/upload/v1770386521/juk9wynjrev67owbgktq.jpg"
  ];

  const boxes = IMAGES.map((url, i) => `
    <div id="image-box-${i}" class="image-box has-image">
      <img src="${url}" alt="Meme ${i + 1}" class="uploaded-image" onclick="window.openImageModal('${url}')" />
    </div>
  `).join("");

  container.innerHTML = `
    <div class="chart" style="margin-top: 20px;">
      <div class="image-grid">
        ${boxes}
      </div>
    </div>
  `;
};

window.renderText = function(container, content) {
  // If content looks like preformatted HTML (contains tags), render as-is.
  const looksLikeHTML = /<\/?[a-z][\s\S]*>/i.test(content);
  if (looksLikeHTML) {
    container.innerHTML = `
      <div class="chart text-content" style="margin-top: 20px; line-height: 1.8;">${content}</div>
    `;
  } else {
    container.innerHTML = `
      <div class="chart text-content" style="margin-top: 20px; line-height: 1.8;">
        ${content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
      </div>
    `;
  }
};
